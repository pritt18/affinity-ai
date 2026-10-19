/**
 * Affinity AI — Agentic Persona Synthesis & Multi-Turn Dating Simulation Engine
 */

// Curated date venues for atmosphere
export const DATE_VENUES = [
  {
    id: 'tokyo-rooftop',
    name: 'Sunset Sky Lounge in Tokyo',
    atmosphere: 'Neon twilight over Shinjuku, artisanal yuzu cocktails, ambient lo-fi jazz',
    vibe: 'Reflective, sleek, romantic'
  },
  {
    id: 'west-village-cafe',
    name: 'Hidden Bookshop Cafe in West Village',
    atmosphere: 'Aroma of fresh pour-over Ethiopian coffee, vintage wooden shelves, rainy afternoon',
    vibe: 'Introspective, cozy, intellectually stimulating'
  },
  {
    id: 'pottery-wine',
    name: 'Late-Night Artisan Pottery & Natural Wine Studio',
    atmosphere: 'Spinning pottery wheels, terracotta clay, candlelight, chilled pet-nat',
    vibe: 'Playful, tactile, creatively vulnerable'
  },
  {
    id: 'austin-stargazing',
    name: 'Hill Country Fireside & Stargazing Lounge',
    atmosphere: 'Crackling cedar campfire, acoustic guitar strings, vast starlit Texas horizon',
    vibe: 'Grounded, honest, soul-stirring'
  }
];

/**
 * Synthesizes an agent persona from LinkedIn and Instagram profiles
 */
export function synthesizeAgentPersona(name, linkedinData, instagramData) {
  const combinedText = `
    ${name} ${linkedinData.headline || ''} ${linkedinData.summary || ''} 
    ${(linkedinData.skills || []).join(' ')} ${instagramData.bio || ''} 
    ${instagramData.postsSummary || ''} ${(instagramData.tags || []).join(' ')}
  `.toLowerCase();

  const hobbies = [];
  if (combinedText.includes('run') || combinedText.includes('marathon')) hobbies.push('Distance Running');
  if (combinedText.includes('guitar') || combinedText.includes('music') || combinedText.includes('synth')) hobbies.push('Acoustic & Electronic Music');
  if (combinedText.includes('coffee') || combinedText.includes('espresso')) hobbies.push('Artisanal Coffee Craft');
  if (combinedText.includes('travel') || combinedText.includes('nomad')) hobbies.push('Off-the-beaten-path Travel');
  if (combinedText.includes('book') || combinedText.includes('reading')) hobbies.push('Philosophical & Sci-Fi Reading');
  if (combinedText.includes('art') || combinedText.includes('paint') || combinedText.includes('design')) hobbies.push('Visual Art & Prototyping');
  if (combinedText.includes('hiking') || combinedText.includes('mountains') || combinedText.includes('nature')) hobbies.push('Mountain Hiking');
  if (hobbies.length < 3) hobbies.push('Culinary Exploration', 'Creative Writing', 'Deep Conversation Walks');

  const interests = [];
  if (combinedText.includes('ai') || combinedText.includes('machine learning')) interests.push('Artificial Intelligence & Cognitive Science');
  if (combinedText.includes('product') || combinedText.includes('startup') || combinedText.includes('build')) interests.push('Venture Craft & Systems Building');
  if (combinedText.includes('stoic') || combinedText.includes('philosophy')) interests.push('Ancient Philosophy & Mindset');
  if (combinedText.includes('design') || combinedText.includes('typography')) interests.push('Ergonomics & Minimalist Aesthetics');
  if (interests.length < 3) interests.push('Human Connection Dynamics', 'Space & Technological Frontiers', 'Future of Digital Culture');

  const traits = [];
  if (combinedText.includes('quiet') || combinedText.includes('introvert') || combinedText.includes('listen')) {
    traits.push('Introspective', 'Gentle-Spoken', 'Thoughtful Listener');
  } else {
    traits.push('Charismatic', 'High-Energy', 'Visionary Communicator');
  }
  traits.push('Intellectually Tenacious', 'Emotionally Grounded');

  return {
    needs: {
      emotional: 'Craves unconditional authenticity, psychological safety to explore vulnerabilities, and deep mutual respect.',
      intellectual: 'Enjoys spirited dialogues connecting technological possibilities, artistic nuance, and human nature.',
      lifestyle: 'Thrives on focused daily creative flow balanced with rich conversation over good food and coffee.',
      partnerPace: 'Warm, intentional, and communicative; values presence over digital distractions.'
    },
    hobbies: hobbies.slice(0, 4),
    interests: interests.slice(0, 4),
    qualities: {
      traits,
      communicationStyle: 'Articulate, empathetic, intellectually playful, and deeply engaged.',
      values: ['Truthfulness', 'Continuous Craftsmanship', 'Emotional Warmth', 'Independence'],
      energyType: traits.includes('Introspective') ? 'Mindful Introvert' : 'Radiant Ambivert',
      quirks: 'Takes mental notes during lively dinner discussions and loves introducing unexpected questions.'
    },
    compatibilityPreferences: {
      idealPartnerTraits: ['Passionate about their work', 'Enjoys deep evening conversation', 'Kind-hearted', 'Emotionally secure'],
      dealbreakers: ['Cynicism', 'Pretentiousness', 'Superficial status games', 'Cruelty'],
      loveLanguage: 'Quality Time & Words of Affirmation'
    }
  };
}

/**
 * Calculates multi-dimensional compatibility score between two personas
 */
export function calculateCompatibility(personA, personB) {
  let score = 70; // baseline

  // Shared hobbies bonus
  const aHobbies = personA.agentAnalysis.hobbies.map(h => h.toLowerCase());
  const bHobbies = personB.agentAnalysis.hobbies.map(h => h.toLowerCase());
  const sharedHobbies = aHobbies.filter(h => bHobbies.some(bh => bh.includes(h) || h.includes(bh)));
  score += Math.min(sharedHobbies.length * 4, 10);

  // Shared interests bonus
  const aInterests = personA.agentAnalysis.interests.map(i => i.toLowerCase());
  const bInterests = personB.agentAnalysis.interests.map(i => i.toLowerCase());
  const sharedInterests = aInterests.filter(i => bInterests.some(bi => bi.includes(i) || i.includes(bi)));
  score += Math.min(sharedInterests.length * 4, 12);

  // Energy type synergy
  const energyA = personA.agentAnalysis.qualities.energyType;
  const energyB = personB.agentAnalysis.qualities.energyType;
  if ((energyA.includes('Introvert') && energyB.includes('Extrovert')) ||
      (energyA.includes('Ambivert') && energyB.includes('Ambivert'))) {
    score += 5; // complementary balance
  } else {
    score += 3;
  }

  // Cap between 68 and 97
  return Math.min(Math.max(score, 68), 97);
}

/**
 * Generates an in-depth ranking list of all candidates for a specific person
 */
export function generateRankingsForPerson(targetPerson, allPeople) {
  const candidates = allPeople.filter(p => p.id !== targetPerson.id);

  const rankedList = candidates.map(candidate => {
    const score = calculateCompatibility(targetPerson, candidate);
    
    // Determine category breakdowns
    const emotionalAlignment = Math.min(Math.max(score + Math.floor((candidate.name.length % 5) - 2), 65), 98);
    const intellectualResonance = Math.min(Math.max(score + Math.floor((candidate.id.length % 7) - 3), 68), 99);
    const lifestyleSynergy = Math.min(Math.max(score + Math.floor((targetPerson.name.length % 4) - 2), 64), 96);
    const conversationalFlow = Math.min(Math.max(score + Math.floor((candidate.title.length % 6) - 2), 67), 98);

    // Synthesize tailored rationale
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

  // Sort descending by score
  rankedList.sort((a, b) => b.overallScore - a.overallScore);

  // Assign ranking numbers
  return rankedList.map((item, idx) => ({
    rank: idx + 1,
    ...item
  }));
}

function buildRankingRationale(personA, personB, score) {
  const nameA = personA.name.split(' ')[0];
  const nameB = personB.name.split(' ')[0];

  if (score >= 90) {
    return `${nameA}'s agent detected magnetic synergy with ${nameB}'s dedication to craftsmanship and curiosity. Their shared appetite for deep philosophical inquiry and creative independence produces an effortless conversational current. Minor lifestyle differences complement rather than clash.`;
  } else if (score >= 84) {
    return `Strong resonance across values and creative ambition. ${nameA}'s agent appreciated ${nameB}'s emotional grounding and humor. The date demonstrated genuine intellectual spark, with high potential for long-term domestic warmth and mutual encouragement.`;
  } else if (score >= 76) {
    return `Enjoyable conversational chemistry with stimulating intellectual exchanges. While their daily rhythms and energy dynamics differ slightly, their respect for each other's achievements created a warm, engaging date dynamic.`;
  } else {
    return `A cordial and respectful interaction where both agents exchanged polite perspectives. Differences in communication tempo and lifestyle priorities suggest stronger alignment as supportive collaborators rather than romantic partners.`;
  }
}

/**
 * Simulates a full multi-turn romantic date between two agents
 */
export function simulateDate(personA, personB, venueId = null) {
  const venue = DATE_VENUES.find(v => v.id === venueId) || DATE_VENUES[Math.floor(Math.random() * DATE_VENUES.length)];
  const score = calculateCompatibility(personA, personB);

  const turns = buildDateDialogue(personA, personB, venue);

  const verdict = score >= 90 
    ? '✨ Electric Spark — Both Agents Confirmed 2nd Date!' 
    : score >= 82 
    ? '🌟 Strong Warmth — Second Date Recommended with High Synergy' 
    : '☕ Pleasant Connection — Meaningful Friendly Resonance';

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
      personA.agentAnalysis.hobbies[0] || 'Creative Exploration',
      personB.agentAnalysis.interests[0] || 'Deep Technology',
      'Lifelong Learning & Craft'
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

/**
 * Constructs multi-turn dialogue with character-specific nuances and inner monologues
 */
function buildDateDialogue(personA, personB, venue) {
  const pAFirst = personA.name.split(' ')[0];
  const pBFirst = personB.name.split(' ')[0];

  const hobbyA = personA.agentAnalysis.hobbies[0] || 'building things';
  const hobbyB = personB.agentAnalysis.hobbies[0] || 'creative pursuits';
  const interestA = personA.agentAnalysis.interests[0] || 'the future of intelligence';
  const interestB = personB.agentAnalysis.interests[0] || 'human potential';
  const quirkA = personA.agentAnalysis.qualities.quirks || 'thoughtful habits';
  const quirkB = personB.agentAnalysis.qualities.quirks || 'unique perspectives';

  return [
    {
      turn: 1,
      speakerId: personA.id,
      speakerName: personA.name,
      text: `Hello ${pBFirst}. The ambience here at ${venue.name} is remarkable. I was just reading through the quiet signals in your profile—there is an unmistakable gravity and focus to your work.`,
      innerMonologue: `Agent Analysis: Noticing initial poise and open posture. The balance between her public accomplishments and grounded hobbies suggests genuine substance. Let's establish comfort first.`,
      sentiment: 'Warm & Observant',
      chemistryGauge: 72
    },
    {
      turn: 2,
      speakerId: personB.id,
      speakerName: personB.name,
      text: `Thank you, ${pAFirst}. I appreciate you noticing that. I usually spend most of my days knee-deep in ${hobbyB}, so being in a space like this feels like a breath of fresh air. I noticed your interest in ${interestA}—that's rare to see paired with such quiet discipline.`,
      innerMonologue: `Agent Reflection: He skipped superficial pleasantries and went straight to what matters. His voice modulation matches his calm energy profile. I feel relaxed already.`,
      sentiment: 'Engaged & Intrigued',
      chemistryGauge: 77
    },
    {
      turn: 3,
      speakerId: personA.id,
      speakerName: personA.name,
      text: `It's funny you mention ${hobbyB}. People often think dedication to craft isolates you, but I find it actually deepens your capacity for connection. When you care intensely about something, you recognize that exact same fire in someone else. What keeps you grounded when everything gets noisy?`,
      innerMonologue: `Agent Probing: Testing emotional vulnerability and coping mechanisms. Her Instagram showed serene weekend moments alongside intense work sprints—checking if that matches reality.`,
      sentiment: 'Curious & Soulful',
      chemistryGauge: 83
    },
    {
      turn: 4,
      speakerId: personB.id,
      speakerName: personB.name,
      text: `Honestly? It's the small, tactile rituals. Pouring a careful cup in the morning, stepping away from notifications, and being around people who don't care about your resume. Also, a little bit of playful chaos—like how ${quirkB.toLowerCase()}.`,
      innerMonologue: `Agent Spark: He smiles at the quirk! The warmth in his eyes is authentic. His emotional needs for quiet devotion clearly harmonize with my longing for genuine presence.`,
      sentiment: 'Playfully Candid',
      chemistryGauge: 88
    },
    {
      turn: 5,
      speakerId: personA.id,
      speakerName: personA.name,
      text: `That is brilliant. I have this habit myself—${quirkA.toLowerCase()}. Life is too short to take ourselves overly seriously, even while we work on monumental challenges. I feel like we could sit here for three more hours and only scratch the surface of ${interestB}.`,
      innerMonologue: `Agent Assessment: Chemistry delta is surging (+8). The dialogue rhythm has moved past cautious dating into genuine intellectual and emotional resonance.`,
      sentiment: 'Deep Resonance',
      chemistryGauge: 93
    },
    {
      turn: 6,
      speakerId: personB.id,
      speakerName: personB.name,
      text: `Three hours might not be enough, ${pAFirst}. It's so refreshing to meet an agent who truly captures the human behind the screen. I'd love to continue this conversation—perhaps next time on a quiet trail or over acoustic guitar?`,
      innerMonologue: `Agent Conclusion: Mutual high compatibility confirmed. Romantic pacing aligned. Proposing a second encounter with high confidence.`,
      sentiment: 'Affectionate & Anticipating',
      chemistryGauge: 95
    }
  ];
}
