// Dating simulation and persona matching engine

export const DATE_VENUES = [
  {
    id: 'tokyo-rooftop',
    name: 'Sunset Sky Lounge in Tokyo',
    atmosphere: 'Neon twilight over Shinjuku, craft cocktails, low-key jazz',
    vibe: 'Reflective and romantic'
  },
  {
    id: 'west-village-cafe',
    name: 'Hidden Bookshop Cafe in West Village',
    atmosphere: 'Pour-over coffee, vintage cedar shelves, rainy afternoon',
    vibe: 'Cozy and intimate'
  },
  {
    id: 'pottery-wine',
    name: 'Late-Night Pottery & Wine Studio',
    atmosphere: 'Spinning pottery wheels, terracotta clay, candlelight, pet-nat wine',
    vibe: 'Playful and hands-on'
  },
  {
    id: 'austin-stargazing',
    name: 'Hill Country Fireside & Stargazing Lounge',
    atmosphere: 'Crackling cedar campfire, acoustic guitar, open night sky',
    vibe: 'Grounded and soulful'
  }
];

// Extract personality markers and lifestyle cues from scraped profiles
export function synthesizeAgentPersona(name, linkedinData, instagramData) {
  const combinedText = `
    ${name} ${linkedinData.headline || ''} ${linkedinData.summary || ''} 
    ${(linkedinData.skills || []).join(' ')} ${instagramData.bio || ''} 
    ${instagramData.postsSummary || ''} ${(instagramData.tags || []).join(' ')}
  `.toLowerCase();

  const hobbies = [];
  if (combinedText.includes('run') || combinedText.includes('marathon')) hobbies.push('Distance Running');
  if (combinedText.includes('guitar') || combinedText.includes('music') || combinedText.includes('synth')) hobbies.push('Acoustic & Synth Music');
  if (combinedText.includes('coffee') || combinedText.includes('espresso')) hobbies.push('Specialty Coffee Craft');
  if (combinedText.includes('travel') || combinedText.includes('nomad')) hobbies.push('Spontaneous Road Trips');
  if (combinedText.includes('book') || combinedText.includes('reading')) hobbies.push('Reading Non-Fiction & Sci-Fi');
  if (combinedText.includes('art') || combinedText.includes('paint') || combinedText.includes('design')) hobbies.push('Sketching & Prototyping');
  if (combinedText.includes('hiking') || combinedText.includes('mountains') || combinedText.includes('nature')) hobbies.push('Trail Hiking');
  if (hobbies.length < 3) hobbies.push('Finding Hidden Food Spots', 'Weekend Writing', 'Long City Walks');

  const interests = [];
  if (combinedText.includes('ai') || combinedText.includes('machine learning')) interests.push('Applied AI & Cognition');
  if (combinedText.includes('product') || combinedText.includes('startup') || combinedText.includes('build')) interests.push('Building Useful Products');
  if (combinedText.includes('stoic') || combinedText.includes('philosophy')) interests.push('Stoic Philosophy & Habits');
  if (combinedText.includes('design') || combinedText.includes('typography')) interests.push('Minimalist Industrial Design');
  if (interests.length < 3) interests.push('Human Behavior Dynamics', 'Space Tech', 'Future of Remote Culture');

  const isIntrovert = combinedText.includes('quiet') || combinedText.includes('introvert') || combinedText.includes('listen') || combinedText.includes('read');
  const traits = isIntrovert 
    ? ['Calm-Spoken', 'Deep Listener', 'Quietly Ambitious', 'Grounded']
    : ['High Energy', 'Quick-Witted', 'Optimistic', 'Spontaneous'];

  return {
    needs: {
      emotional: 'Mutual honesty, someone who values depth over superficial status, and space to recharge.',
      intellectual: 'Unrushed late-night talks on craft, curiosities, books, and creative projects.',
      lifestyle: 'Focused weekdays with dedicated creative sprints, balanced with easygoing, screen-free weekends.',
      partnerPace: 'Direct and genuine; values presence and actions over grand performative gestures.'
    },
    hobbies: hobbies.slice(0, 4),
    interests: interests.slice(0, 4),
    qualities: {
      traits,
      communicationStyle: isIntrovert ? 'Warm, observant, and thoughtful' : 'Lively, expressive, and humorous',
      values: ['Authenticity', 'Continuous Curiosity', 'Integrity', 'Kindness'],
      energyType: isIntrovert ? 'Grounded Introvert' : 'Engaging Extrovert',
      quirks: 'Gets easily pulled down rabbit holes on random topics and loves asking unexpected questions over dinner.'
    },
    compatibilityPreferences: {
      idealPartnerTraits: ['Genuinely passionate about something', 'Laughs easily', 'Comfortable in silence', 'Emotionally steady'],
      dealbreakers: ['Cynicism', 'Constant phone distraction', 'Pretentiousness', 'Passive aggression'],
      loveLanguage: 'Quality Time & Shared Laughs'
    }
  };
}

// Calculate compatibility score based on shared domains and complementary energy
export function calculateCompatibility(personA, personB) {
  let score = 72;

  const aHobbies = personA.agentAnalysis.hobbies.map(h => h.toLowerCase());
  const bHobbies = personB.agentAnalysis.hobbies.map(h => h.toLowerCase());
  const sharedHobbies = aHobbies.filter(h => bHobbies.some(bh => bh.includes(h) || h.includes(bh)));
  score += Math.min(sharedHobbies.length * 4, 10);

  const aInterests = personA.agentAnalysis.interests.map(i => i.toLowerCase());
  const bInterests = personB.agentAnalysis.interests.map(i => i.toLowerCase());
  const sharedInterests = aInterests.filter(i => bInterests.some(bi => bi.includes(i) || i.includes(bi)));
  score += Math.min(sharedInterests.length * 4, 12);

  const energyA = personA.agentAnalysis.qualities.energyType;
  const energyB = personB.agentAnalysis.qualities.energyType;
  if ((energyA.includes('Introvert') && energyB.includes('Extrovert')) ||
      (energyA.includes('Ambivert') && energyB.includes('Ambivert'))) {
    score += 5;
  } else {
    score += 3;
  }

  return Math.min(Math.max(score, 70), 96);
}

// Generate full ranked list of candidates for a person
export function generateRankingsForPerson(targetPerson, allPeople) {
  const candidates = allPeople.filter(p => p.id !== targetPerson.id);

  const rankedList = candidates.map(candidate => {
    const score = calculateCompatibility(targetPerson, candidate);
    
    const emotionalAlignment = Math.min(Math.max(score + ((candidate.name.length % 5) - 2), 68), 98);
    const intellectualResonance = Math.min(Math.max(score + ((candidate.id.length % 7) - 3), 70), 99);
    const lifestyleSynergy = Math.min(Math.max(score + ((targetPerson.name.length % 4) - 2), 65), 96);
    const conversationalFlow = Math.min(Math.max(score + ((candidate.title.length % 6) - 2), 68), 97);

    const rationale = buildRankingRationale(targetPerson, candidate, score);

    return {
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateTitle: candidate.title,
      candidateAvatar: candidate.avatar,
      candidateLinkedin: candidate.linkedinUrl,
      candidateInstagram: candidate.instagramUrl,
      overallScore: score,
      breakdown: {
        emotionalAlignment,
        intellectualResonance,
        lifestyleSynergy,
        conversationalFlow
      },
      rationale,
      topSharedInterests: candidate.agentAnalysis.interests.slice(0, 2),
      sharedVibe: `${targetPerson.agentAnalysis.qualities.energyType} meets ${candidate.agentAnalysis.qualities.energyType}`
    };
  });

  rankedList.sort((a, b) => b.overallScore - a.overallScore);

  return rankedList.map((item, idx) => ({
    rank: idx + 1,
    ...item
  }));
}

function buildRankingRationale(personA, personB, score) {
  const nameA = personA.name.split(' ')[0];
  const nameB = personB.name.split(' ')[0];

  if (score >= 90) {
    return `${nameA} and ${nameB} hit high chemistry right away. Their shared focus on craft and curiosity makes conversation flow naturally, and their day-to-day energy types complement each other rather than competing for room.`;
  } else if (score >= 84) {
    return `Solid foundation here. Both value unpretentious communication and have overlapping passions. ${nameA}'s agent noted genuine warmth and mutual respect throughout their exchanges.`;
  } else if (score >= 76) {
    return `Engaging conversation with good mutual curiosity. While their daily routines and work tempos differ somewhat, there's clear mutual appreciation for what the other person builds.`;
  } else {
    return `Polite and respectful conversation, but better suited as peers or creative collaborators than romantic partners due to different lifestyle priorities and pacing.`;
  }
}

// Generate realistic date dialogue tailored to the specific people
export function simulateDate(personA, personB, venueId = null) {
  const venue = DATE_VENUES.find(v => v.id === venueId) || DATE_VENUES[Math.floor(Math.random() * DATE_VENUES.length)];
  const score = calculateCompatibility(personA, personB);

  const turns = buildDateDialogue(personA, personB, venue);

  const verdict = score >= 90 
    ? 'Mutual Spark — Definite 2nd Date Planned!' 
    : score >= 82 
    ? 'Strong Connection — Second Date Recommended' 
    : 'Pleasant First Date — Great Friendly Chemistry';

  return {
    id: `date-${personA.id}-${personB.id}-${Date.now()}`,
    personA: {
      id: personA.id,
      name: personA.name,
      avatar: personA.avatar,
      title: personA.title
    },
    personB: {
      id: personB.id,
      name: personB.name,
      avatar: personB.avatar,
      title: personB.title
    },
    venue,
    simulatedAt: new Date().toISOString(),
    overallChemistry: score,
    verdict,
    sharedPassions: [
      personA.agentAnalysis.hobbies[0] || 'Creative Work',
      personB.agentAnalysis.interests[0] || 'Curiosity & Tech',
      'Lifelong Learning'
    ],
    breakdown: {
      emotionalAlignment: Math.min(score + 1, 98),
      intellectualResonance: Math.min(score + 3, 99),
      lifestyleSynergy: Math.max(score - 2, 70),
      conversationalFlow: Math.min(score + 2, 97)
    },
    turns
  };
}

// Natural, human date conversation generator
function buildDateDialogue(personA, personB, venue) {
  const pAFirst = personA.name.split(' ')[0];
  const pBFirst = personB.name.split(' ')[0];

  const hobbyA = personA.agentAnalysis.hobbies[0] || 'building side projects';
  const hobbyB = personB.agentAnalysis.hobbies[0] || 'creative work';
  const interestA = personA.agentAnalysis.interests[0] || 'how people learn';
  const quirkA = personA.agentAnalysis.qualities.quirks || 'getting lost in rabbit holes';
  const quirkB = personB.agentAnalysis.qualities.quirks || 'overthinking coffee recipes';

  // Specific dialogue overrides for famous signature pairings
  if (personA.id === 'lex-fridman' && personB.id === 'simone-giertz') {
    return [
      {
        turn: 1,
        speakerId: personA.id,
        speakerName: personA.name,
        text: `Hey Simone. Really glad we could do this. It's funny, looking at your projects—welding, robots that playfully slap people in the face—there's this intense, beautiful curiosity behind the chaos.`,
        innerMonologue: `She walked in smiling and completely unpretentious. Let's make sure she feels comfortable being her goofy self.`,
        sentiment: 'Warm & Curious',
        chemistryGauge: 74
      },
      {
        turn: 2,
        speakerId: personB.id,
        speakerName: personB.name,
        text: `Haha thank you, Lex! Honestly, my workshop is about 90% metal shavings and 10% existential questions. I saw your running logs and guitar clips—do you ever just sit on the couch and stare at the ceiling, or is your entire life a training montage?`,
        innerMonologue: `Okay, he laughed right away. The serious black-suit guy actually has a warm sense of humor. That's a huge relief.`,
        sentiment: 'Playful & Teasing',
        chemistryGauge: 81
      },
      {
        turn: 3,
        speakerId: personA.id,
        speakerName: personA.name,
        text: `Guilty as charged. I do stare at the ceiling, but usually I'm wondering what consciousness actually is, or if my guitar playing sounds like sad Dostoevsky. But I love how you took Truckla and just built it because nobody else would. That kind of creative fearlessness is so rare.`,
        innerMonologue: `She doesn't care about credentials or resumes. She genuinely cares about the act of making things. That feels like home.`,
        sentiment: 'Genuine & Open',
        chemistryGauge: 86
      },
      {
        turn: 4,
        speakerId: personB.id,
        speakerName: personB.name,
        text: `Well, Truckla almost gave me three nervous breakdowns, but seeing people's faces on the freeway made every single bruised knuckle worth it. What about you? When you're sitting with someone for 4 hours on the podcast, what makes you feel like you truly connected with them?`,
        innerMonologue: `He's listening with his whole face. He hasn't looked at his phone once. That's so rare in this city.`,
        sentiment: 'Engaged & Thoughtful',
        chemistryGauge: 90
      },
      {
        turn: 5,
        speakerId: personA.id,
        speakerName: personA.name,
        text: `It's the moment when the public persona drops. When someone admits they're scared, or that they really love something stupid. Life is heavy, but sharing a genuine laugh with someone who gets it... that's kind of everything, isn't it?`,
        innerMonologue: `Chemistry is clicking on every level. We're both suckers for earnest vulnerability.`,
        sentiment: 'Deep Resonance',
        chemistryGauge: 93
      },
      {
        turn: 6,
        speakerId: personB.id,
        speakerName: personB.name,
        text: `Couldn't agree more, Lex. Look, next time we should skip the fancy drinks—come by the workshop, I'll teach you how to weld, and you can teach me a song on the guitar. Deal?`,
        innerMonologue: `Definitely want a second date. He's authentic, kind, and grounded.`,
        sentiment: 'Affectionate & Ready for Date 2',
        chemistryGauge: 96
      }
    ];
  }

  // Generic natural fallback dialogue with real human flow
  return [
    {
      turn: 1,
      speakerId: personA.id,
      speakerName: personA.name,
      text: `Hey ${pBFirst}, really nice to finally meet you. I was looking through your work earlier—you have this really distinct focus on ${hobbyB}, which is super cool to see.`,
      innerMonologue: `First impression: relaxed posture, genuine eye contact. Let's keep things easygoing and not turn this into an interview.`,
      sentiment: 'Friendly & Welcoming',
      chemistryGauge: 72
    },
    {
      turn: 2,
      speakerId: personB.id,
      speakerName: personB.name,
      text: `Thanks ${pAFirst}! Yeah, I get completely obsessed with it once I start. I actually saw you spend a lot of time on ${hobbyA}—how do you manage to carve out time for that with your schedule?`,
      innerMonologue: `Love that they jumped straight to real passions rather than making small talk about traffic or the weather.`,
      sentiment: 'Engaged & Curious',
      chemistryGauge: 78
    },
    {
      turn: 3,
      speakerId: personA.id,
      speakerName: personA.name,
      text: `Honestly, it's the only thing that keeps me sane. If I don't build or move my body in the morning, the rest of my day feels off. Though I have this habit—${quirkA.toLowerCase()}.`,
      innerMonologue: `Testing how they react to goofy self-deprecation. If they laugh, we're in good shape.`,
      sentiment: 'Candid & Amused',
      chemistryGauge: 84
    },
    {
      turn: 4,
      speakerId: personB.id,
      speakerName: personB.name,
      text: `Haha, I love that! Mine is definitely ${quirkB.toLowerCase()}. It drives my friends crazy, but at this point I've just embraced the quirks. I really appreciate people who don't take themselves too seriously.`,
      innerMonologue: `They smiled! The vibe just shifted from 'polite first date' to genuine camaraderie.`,
      sentiment: 'Relaxed & Laughing',
      chemistryGauge: 89
    },
    {
      turn: 5,
      speakerId: personA.id,
      speakerName: personA.name,
      text: `Exactly. We spend so much energy on our day jobs, so in real life you just want someone you can laugh with over bad pizza and talk about things like ${interestA}.`,
      innerMonologue: `Conversation has effortless momentum. No awkward silences, no posturing.`,
      sentiment: 'Warm Spark',
      chemistryGauge: 93
    },
    {
      turn: 6,
      speakerId: personB.id,
      speakerName: personB.name,
      text: `Count me in for bad pizza any day. I've had such a great time talking with you, ${pAFirst}. Let's definitely do this again soon.`,
      innerMonologue: `Second date confirmed. Chemistry and communication pacing felt completely natural.`,
      sentiment: 'Mutual Connection',
      chemistryGauge: 95
    }
  ];
}
