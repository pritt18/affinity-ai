# Affinity AI

An autonomous dating platform where individuals are represented by AI agents that date on their behalf. Each agent is modeled exclusively from two public digital footprints: an official **LinkedIn profile** (career, skills, intellectual values) and a public **Instagram profile** (lifestyle, hobbies, aesthetic rhythm). The agents converse in real-time, generate internal subconscious monologues, and compute mutual compatibility rankings across the network.

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

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: version `18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: version `9.0.0` or higher (bundled with Node.js)
- **Git**: ([Download Git](https://git-scm.com/))
- **Code Editor**: [Visual Studio Code](https://code.visualstudio.com/) (recommended)

---

### Step 1: Clone the Repository

Clone the project repository to your local machine and navigate into the project folder:

```bash
git clone https://github.com/pritt18/affinity-ai.git
cd affinity-ai
```

*(If you are opening an existing local copy, open your terminal inside the project root directory, or open the folder directly in VS Code by typing `code .`)*

---

### Step 2: Install Project Dependencies

Run the following command in the project root to install all backend and frontend packages:

```bash
npm install
```

This installs:
- **Backend**: `express`, `cors`, `axios`, `cheerio`, `dotenv`
- **Frontend**: `react`, `react-dom`, `vite`, `tailwindcss`, `lucide-react`
- **Tooling**: `concurrently`, `postcss`, `autoprefixer`

---

### Step 3: Run the Application

You can start the project using either of the following methods:

#### Method A: 1-Click Launch with VS Code Debugger (Recommended)
The repository includes a ready-to-use `.vscode/launch.json` configuration.
1. Open the project folder in VS Code (`code .`).
2. Press **`F5`** on your keyboard.
   *(Or click the **Run & Debug** icon on the left sidebar `Ctrl+Shift+D` and click the green play button next to **"Affinity AI - Full Application"**)*.
3. VS Code will automatically start both the backend server and frontend development server in the integrated terminal.
4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

#### Method B: Run via Terminal Command
In your terminal, run:

```bash
npm run dev
```

This concurrently launches:
- **API Server**: `http://localhost:5000`
- **Vite React Client**: `http://localhost:5173` (proxies `/api` requests to port 5000)

Open your browser and navigate to **`http://localhost:5173`**.

---

### Step 4: Production Build & Standalone Run

To verify the optimized production build served directly from the Express backend:

1. Build the frontend bundle:
   ```bash
   npm run build
   ```

2. Start the unified production server:
   ```bash
   npm start
   ```

3. Open **`http://localhost:5000`** in your browser. The single Express process serves both the REST API and the compiled static React application.

---

### Troubleshooting

- **Port 5000 Already in Use (`EADDRINUSE`)**:
  - **Windows (PowerShell)**:
    ```powershell
    Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
    ```
  - **macOS / Linux**:
    ```bash
    kill -9 $(lsof -ti:5000)
    ```
  - Alternatively, specify a different port in a `.env` file (e.g. `PORT=5001`).
- **Dependencies Cache Reset**:
  If you ever encounter module resolution warnings across different node versions:
  ```bash
  npm clean-install
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
│     Date Arena          │               │  Compatibility Rankings │
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
├── .vscode/
│   └── launch.json            # 1-click VS Code debugger configuration
├── server/
│   ├── data/
│   │   ├── people.json        # 26 real people profiles (LinkedIn + Instagram)
│   │   └── dates.json         # Simulated date transcripts with monologues
│   ├── scraper.js             # Dual-source scraping & metadata parser
│   ├── agentEngine.js         # Persona synthesis, date simulator, rankings
│   └── index.js               # Express API and static file server
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky navigation header
│   │   ├── ProfileExplorer.jsx# Persona grid with search and category filters
│   │   ├── ProfileModal.jsx   # Detailed agent dossier inspection modal
│   │   ├── DateArena.jsx      # Multi-turn live date simulator with monologues
│   │   ├── RankingsDashboard.jsx # 25-candidate leaderboard with rationales
│   │   ├── AddPersonModal.jsx # URL ingestion modal for deploying new agents
│   │   └── ArchitectureView.jsx# Architecture documentation and pipeline view
│   ├── App.jsx                # Main layout and tab orchestrator
│   ├── index.css              # Custom Tailwind styles and scrollbars
│   └── main.jsx               # React client entry point
├── index.html                 # HTML template
├── package.json               # Scripts and dependency definitions
├── tailwind.config.js         # Theme styling configuration
└── vite.config.js             # Vite build and proxy configuration
```

---

## Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express 4, Axios, Cheerio
- **Database**: File-backed JSON store with in-memory caching
- **Theme**: Clean elevated light canvas with soft ambient glow

---

## License

MIT License. Open-source for personal and educational use.
