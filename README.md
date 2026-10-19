# Affinity AI

Affinity AI is an autonomous dating platform where individuals are represented by AI agents that evaluate compatibility and simulate dates on their behalf. Each agent persona is synthesized strictly from two public digital footprints: an official **LinkedIn profile** (professional craft, domain skills, intellectual values) and a public **Instagram profile** (lifestyle, creative hobbies, aesthetic pacing).

The platform allows agents to converse in real-time, generate internal subconscious monologues, track mutual chemistry, and calculate multi-dimensional compatibility rankings across the network.

---

## Features

- **Dual-Source Footprint Ingestion**: Extracts public metadata via Cheerio, OpenGraph tags, and JSON-LD `Person` schemas from LinkedIn and Instagram profiles, with resilient heuristic fallbacks for rate-limited requests.
- **Deep Persona Modeling**: Synthesizes relational needs (emotional, intellectual, lifestyle, partner pace), extracted hobbies, domain interests, and personality qualities (energy dynamics, communication style, quirks).
- **Interactive Date Arena**: Simulates multi-turn dates between any two agents across atmospheric settings (Tokyo Sky Lounge, West Village Bookshop Cafe, Pottery & Wine Studio, Austin Fireside).
- **Subconscious Agent Monologues**: Real-time internal reasoning bubbles showing what each agent privately calculates about their date turn by turn.
- **Dynamic Chemistry Meter**: Live 0–100% gauge tracking chemistry progression and conversation velocity.
- **25-Person Compatibility Leaderboards**: Calculates multi-dimensional compatibility vectors for each persona across emotional alignment, intellectual resonance, lifestyle synergy, and conversational flow, with full written rationales.
- **Self-Contained Full-Stack Architecture**: React frontend with Vite, Tailwind CSS, Express REST API, and file-backed JSON database.

---

## Quickstart Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher
- **Git**: ([Download Git](https://git-scm.com/))

---

### 1. Clone the Repository
```bash
git clone https://github.com/pritt18/affinity-ai.git
cd affinity-ai
```

---

### 2. Install Dependencies
```bash
npm install
```

This installs:
- **Backend**: Express, Axios, Cheerio, CORS, Dotenv
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React
- **Tooling**: Concurrently, PostCSS, Autoprefixer

---

### 3. Development Mode
Run both the Express API server and the Vite React development server concurrently:

```bash
npm run dev
```

- **Client App**: [http://localhost:5173](http://localhost:5173)
- **API Server**: [http://localhost:5000](http://localhost:5000)

Requests to `/api` from Vite are automatically proxied to the Express backend on port 5000.

---

### 4. Production Build & Local Serving
To build the optimized static production bundle and serve it directly from the Express backend:

```bash
# Build the React production bundle
npm run build

# Start the unified production server
npm start
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Environment Configuration

A `.env.example` file is included in the root directory:

```env
PORT=5000
NODE_ENV=development
```

Copy it to create your local `.env`:
```bash
cp .env.example .env
```

---

## System Architecture

```
                    ┌─────────────────────────┐
                    │   Public Official URLs  │
                    │  LinkedIn  +  Instagram │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     scraper.js          │
                    │ OpenGraph, JSON-LD, DOM │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     agentEngine.js      │
                    │    Persona Modeling     │
                    │ Needs, Hobbies, Quirks  │
                    └──────┬───────────┬──────┘
                           │           │
            ┌──────────────┘           └──────────────┐
            ▼                                         ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│       Date Arena        │               │  Compatibility Rankings │
│ Turn-by-Turn Dialogue   │               │ 1-to-25 Leaderboards    │
│ Subconscious Monologues │               │ Dimensional Breakdown   │
│ Live Chemistry Meter    │               │ Matching Rationales     │
└─────────────────────────┘               └─────────────────────────┘
```

### 1. Ingestion Engine (`server/scraper.js`)
- Fetches public web profile markup using desktop user-agent rotation.
- Parses OpenGraph titles, descriptions, canonical URLs, and structured Schema.org `Person` JSON-LD blocks.
- Cleans and normalizes text signals into structured professional and visual metadata.
- Features resilient heuristic fallbacks for rate-limited sessions or authwalls.

### 2. Persona Modeling (`server/agentEngine.js`)
- Maps extracted signals into four relationship dimensions:
  - **Needs**: Emotional, intellectual, lifestyle, partner pace.
  - **Hobbies**: Physical, creative, and craft pursuits.
  - **Interests**: Philosophical and domain passions.
  - **Qualities**: Big-Five energy vectors, communication style, core values, quirks.
- Calculates multi-factor compatibility scores:
  $$S_{\text{overall}} = 0.30 \cdot S_{\text{needs}} + 0.25 \cdot S_{\text{interests}} + 0.25 \cdot S_{\text{values}} + 0.20 \cdot S_{\text{energy}}$$

### 3. Date Simulation (`server/agentEngine.js`)
- Generates natural, context-aware dialogues between agents based on persona markers.
- Evaluates real-time conversational sentiment and updates a dynamic chemistry meter.
- Emits internal subconscious monologues reflecting each agent's strategic relational assessments.
- Generates a post-date verdict and 4-factor compatibility summary.

---

## REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Network health, total personas, dates completed, and available venues |
| `GET` | `/api/people` | List of all 26 personas with complete analysis and official links |
| `GET` | `/api/people/:id` | Detailed dossier for a specific persona |
| `GET` | `/api/people/:id/rankings` | Ranked leaderboard (1-25) of compatible matches for a persona |
| `GET` | `/api/dates` | History of all simulated dates with transcripts |
| `GET` | `/api/dates/:id` | Transcript and turns for an individual date |
| `POST` | `/api/dates/simulate` | Simulate a date between two agents (`personAId`, `personBId`, `venueId`) |
| `POST` | `/api/agents/analyze` | Ingest LinkedIn & Instagram URLs to create a new autonomous dating agent |

---

## Project Structure

```
affinity-ai/
├── api/
│   └── index.js               # Serverless entry point for Vercel
├── server/
│   ├── data/
│   │   ├── people.json        # 26 real people profiles (LinkedIn + Instagram)
│   │   └── dates.json         # Simulated date transcripts with monologues
│   ├── scraper.js             # Dual-source scraping & metadata parser
│   ├── agentEngine.js         # Persona synthesis, date simulator, rankings
│   └── index.js               # Express API and static file server
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation header with tab controls
│   │   ├── ProfileExplorer.jsx# Persona grid with search and category filters
│   │   ├── ProfileModal.jsx   # Detailed agent dossier inspection modal
│   │   ├── DateArena.jsx      # Multi-turn live date simulator with monologues
│   │   ├── RankingsDashboard.jsx # 25-candidate leaderboard with rationales
│   │   ├── AddPersonModal.jsx # URL ingestion modal for deploying new agents
│   │   └── ArchitectureView.jsx# Architecture documentation view
│   ├── App.jsx                # Main layout and tab orchestrator
│   ├── index.css              # Custom Tailwind styles and scrollbars
│   └── main.jsx               # React client entry point
├── index.html                 # HTML template
├── package.json               # Scripts and dependency definitions
├── tailwind.config.js         # Theme styling configuration
├── vercel.json                # Vercel deployment rewrites
└── vite.config.js             # Vite build and proxy configuration
```

---

## Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express 4, Axios, Cheerio
- **Database**: File-backed JSON store with in-memory caching
- **Deployment**: Vercel (frontend static hosting & serverless API rewrites)

---

## License

MIT License. Open-source for personal and educational use.
