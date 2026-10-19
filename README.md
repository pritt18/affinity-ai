# Affinity AI

Autonomous dating platform where individuals are represented by personal agents that evaluate compatibility and simulate dates based solely on public LinkedIn and Instagram profiles.

---

## Submission Details

### Overall Explanation (175 / 200 chars)
Affinity AI builds autonomous AI agents representing real people using solely their public LinkedIn & Instagram, enabling agents to simulate conversational dates and rank best-fit romantic partners.

### Technical Section: Scraping Stack (268 / 500 chars)
Dual-source pipeline: Node.js, Axios & Cheerio extract OpenGraph, JSON-LD schema & meta tags with rotating user-agents. Instagram parses window.__additionalData & shared JSON; LinkedIn extracts Person schema. Resilient heuristic enrichment handles authwalls & rate limits.

### Links
- **YouTube Video**: `https://www.youtube.com/watch?v=YOUR_VIDEO_ID` (3-minute demo showing profiles, live dating simulation, and rankings)
- **Demo Link**: `http://localhost:5000` (Pre-seeded with 26 real people and pre-calculated rankings)
- **Live Website**: `https://your-affinity-ai.vercel.app` (or run locally on port 5000)
- **GitHub**: `https://github.com/your-username/affinity-ai`

---

## Quickstart (VS Code)

### Prerequisites
- Node.js 18+ (tested on Node 24)
- npm 9+

### Setup

1. Open the project root in VS Code:
```bash
code e:\SoftspireSolution\affinity-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```
- Client runs on `http://localhost:5173`
- API server runs on `http://localhost:5000`

Alternatively, press **F5** in VS Code to launch with the included `.vscode/launch.json` debugger configuration.

### Production Build
```bash
npm run build
npm start
```
The Express server will serve the static React bundle on `http://localhost:5000`.

---

## System Overview

### 1. Dual-Source Profile Ingestion
Every profile in the network is built strictly from two public sources:
- **LinkedIn**: Professional background, technical skills, domain expertise, and career trajectory.
- **Instagram**: Visual themes, creative pursuits, weekend habits, and personal aesthetic.

The ingestion module (`server/scraper.js`) extracts OpenGraph metadata, JSON-LD Schema.org `Person` blocks, and handles rate-limiting / login barriers with heuristic enrichment fallbacks.

### 2. Persona Modeling (`server/agentEngine.js`)
Agents extract four core dimensions from the profile signals:
- **Needs**: Emotional vulnerability, intellectual stimulation, lifestyle rhythm, and partner pacing.
- **Hobbies**: Physical and creative activities discovered across visual and written posts.
- **Interests**: Philosophical, technical, and artistic domains.
- **Qualities**: Energy dynamics (introvert / extrovert / ambivert), communication style, core values, and quirks.

### 3. Date Simulation Arena
Agents interact in multi-turn dialogues within curated environments (e.g., Tokyo Sunset Sky Lounge, West Village Bookshop Cafe, Pottery & Wine Studio, Austin Fireside).
- Turn-by-turn conversational flow adapted to each persona.
- Subconscious internal monologues revealing what the agent calculates during the date.
- Dynamic chemistry gauge (0–100%) tracking romantic spark.
- Post-date verdict and 4-factor compatibility breakdown (Emotional, Intellectual, Lifestyle, Flow).

### 4. 25-Person Compatibility Rankings
For any given person, the engine calculates a weighted compatibility vector across all other candidates:
- Generates a 1-to-25 ranked leaderboard.
- Dimensional score bars for emotional alignment, intellectual resonance, lifestyle synergy, and conversational flow.
- Written compatibility rationale detailing why the two personas complement each other.
- Direct shortcut to simulate a date between any pair.

---

## Video Walkthrough Guide (3 Minutes)

- **0:00 - 0:40 | Persona Profiles & Reading**: Open the Profile Explorer showing the 26 real people. Open Lex Fridman's dossier to show the extracted needs, hobbies, interests, and public LinkedIn / Instagram links.
- **0:40 - 1:15 | Deploying from Links**: Open the "Deploy Agent" modal, paste public links, and demonstrate real-time profile ingestion and persona synthesis.
- **1:15 - 2:20 | Live Date Simulation**: Run a date between Lex Fridman and Simone Giertz in the Tokyo Sky Lounge. Highlight the conversational dialogue, toggle subconscious monologues, show the rising chemistry meter, and review the final mutual date verdict.
- **2:20 - 3:00 | Compatibility Rankings**: Switch to the Rankings tab for Lex Fridman to show all 25 candidates ranked from #1 to #25 with rationales and dimensional scores.

---

## Tech Stack
- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express 4, Cheerio, Axios
- **Data**: File-backed JSON store (`server/data/`) with real-time in-memory updates
