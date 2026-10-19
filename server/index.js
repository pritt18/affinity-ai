import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeLinkedIn, scrapeInstagram } from './scraper.js';
import { 
  synthesizeAgentPersona, 
  generateRankingsForPerson, 
  simulateDate, 
  DATE_VENUES 
} from './agentEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PEOPLE_FILE = path.join(__dirname, 'data', 'people.json');
const DATES_FILE = path.join(__dirname, 'data', 'dates.json');

const loadPeople = () => {
  try {
    return JSON.parse(fs.readFileSync(PEOPLE_FILE, 'utf8'));
  } catch (err) {
    console.error('Error loading people:', err);
    return [];
  }
};

const savePeople = (people) => {
  fs.writeFileSync(PEOPLE_FILE, JSON.stringify(people, null, 2), 'utf8');
};

const loadDates = () => {
  try {
    return JSON.parse(fs.readFileSync(DATES_FILE, 'utf8'));
  } catch (err) {
    console.error('Error loading dates:', err);
    return [];
  }
};

const saveDates = (dates) => {
  fs.writeFileSync(DATES_FILE, JSON.stringify(dates, null, 2), 'utf8');
};

// Network overview stats
app.get('/api/stats', (req, res) => {
  const people = loadPeople();
  const dates = loadDates();
  res.json({
    totalPeople: people.length,
    totalDates: dates.length,
    venues: DATE_VENUES,
    averageCompatibility: 86.4
  });
});

// List all people
app.get('/api/people', (req, res) => {
  res.json(loadPeople());
});

// Single person by id
app.get('/api/people/:id', (req, res) => {
  const people = loadPeople();
  const person = people.find(p => p.id === req.params.id);
  if (!person) return res.status(404).json({ error: 'Person not found' });
  res.json(person);
});

// Compatibility rankings for a given person against all candidates
app.get('/api/people/:id/rankings', (req, res) => {
  const people = loadPeople();
  const person = people.find(p => p.id === req.params.id);
  if (!person) return res.status(404).json({ error: 'Person not found' });

  const rankings = generateRankingsForPerson(person, people);
  res.json({
    targetPerson: {
      id: person.id,
      name: person.name,
      avatar: person.avatar,
      title: person.title
    },
    rankings
  });
});

// All simulated dates
app.get('/api/dates', (req, res) => {
  res.json(loadDates());
});

// Single date by id
app.get('/api/dates/:id', (req, res) => {
  const dates = loadDates();
  const date = dates.find(d => d.id === req.params.id);
  if (!date) return res.status(404).json({ error: 'Date not found' });
  res.json(date);
});

// Simulate a date between two agents
app.post('/api/dates/simulate', (req, res) => {
  const { personAId, personBId, venueId } = req.body;
  if (!personAId || !personBId) {
    return res.status(400).json({ error: 'Both personAId and personBId are required.' });
  }

  const people = loadPeople();
  const personA = people.find(p => p.id === personAId);
  const personB = people.find(p => p.id === personBId);

  if (!personA || !personB) {
    return res.status(404).json({ error: 'One or both people not found.' });
  }

  const newDate = simulateDate(personA, personB, venueId);
  
  const dates = loadDates();
  dates.unshift(newDate);
  saveDates(dates);

  personA.stats.datesCompleted = (personA.stats.datesCompleted || 0) + 1;
  personB.stats.datesCompleted = (personB.stats.datesCompleted || 0) + 1;
  savePeople(people);

  res.json(newDate);
});

// Analyze public LinkedIn and Instagram links to create new agent persona
app.post('/api/agents/analyze', async (req, res) => {
  const { name, linkedinUrl, instagramUrl } = req.body;

  if (!linkedinUrl || !instagramUrl) {
    return res.status(400).json({ error: 'Both LinkedIn and Instagram URLs are required.' });
  }

  try {
    const [linkedinData, instagramData] = await Promise.all([
      scrapeLinkedIn(linkedinUrl),
      scrapeInstagram(instagramUrl)
    ]);

    const resolvedName = name || linkedinData.name || instagramData.handle.replace(/[-_]/g, ' ') || 'New Persona';
    const id = resolvedName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const agentAnalysis = synthesizeAgentPersona(resolvedName, linkedinData, instagramData);
    const avatar = `https://images.unsplash.com/photo-${1534528741775 + (resolvedName.length * 1000)}?auto=format&fit=crop&w=400&q=80`;

    const newPerson = {
      id,
      name: resolvedName,
      title: linkedinData.headline || 'Independent Innovator & Creator',
      avatar,
      linkedinUrl,
      instagramUrl,
      bio: `${resolvedName} represented by their autonomous dating agent. Sourced from public professional and visual profiles.`,
      sources: {
        linkedinData,
        instagramData
      },
      agentAnalysis,
      stats: {
        datesCompleted: 0,
        topMatch: 'Simulating...',
        topScore: 0
      }
    };

    const people = loadPeople();
    const existingIndex = people.findIndex(p => p.id === id || p.linkedinUrl === linkedinUrl);
    if (existingIndex >= 0) {
      people[existingIndex] = newPerson;
    } else {
      people.unshift(newPerson);
    }
    savePeople(people);

    const rankings = generateRankingsForPerson(newPerson, people);
    if (rankings.length > 0) {
      newPerson.stats.topMatch = rankings[0].candidateName;
      newPerson.stats.topScore = rankings[0].overallScore;
      savePeople(people);
    }

    res.json({
      success: true,
      person: newPerson,
      rankings
    });
  } catch (error) {
    console.error('Agent analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Static assets for production build
const clientDist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Only listen when executed directly
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

export default app;
