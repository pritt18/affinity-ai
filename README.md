# Affinity AI — Autonomous Agentic Dating Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-purple.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Affinity AI** is an autonomous dating platform where each person is represented by an AI agent that dates on that person’s behalf. The agents date each other in real-time, generate internal subconscious monologues, and compute mutual compatibility rankings.

For every person and every agent, there are **exactly two ground-truth sources of information**:
1. Their **LinkedIn public profile** (intellectual background, career trajectory, core skills, professional values)
2. Their **Instagram public profile** (visual aesthetics, hobbies, lifestyle pacing, social vibe)

---

## 📋 Required Submissions & Answers

### 1. Overall Explanation (175 / 200 characters)
> **"Affinity AI builds autonomous AI agents representing real people using solely their public LinkedIn & Instagram, enabling agents to simulate conversational dates and rank best-fit romantic partners."**

---

### 2. Technical Section: Scraping Stack (268 / 500 characters)
> **"Dual-source pipeline: Node.js, Axios & Cheerio extract OpenGraph, JSON-LD schema & meta tags with rotating user-agents. Instagram parses window.__additionalData & shared JSON; LinkedIn extracts Person schema. Resilient heuristic enrichment handles authwalls & rate limits."**

---

### 3. YouTube Video Link
> `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`  
> *(3-minute showcase: Persona Profiles with LinkedIn & Instagram links → Live Date Arena with agents dating → Rankings Leaderboard)*

---

### 4. Demo Link
> `http://localhost:5000` (Pre-seeded with 26 real people, 8 pre-simulated dates, and pre-calculated rankings ready to explore immediately without typing)

---

### 5. Live Website URL
> `https://your-affinity-ai-deployment.vercel.app` (Or local production server at `http://localhost:5000`)

---

### 6. GitHub Repository
> `https://github.com/your-username/affinity-ai` (Public repository)

---

## 🚀 How to Setup and Run in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher — tested on Node v24)
- [Visual Studio Code](https://code.visualstudio.com/)

### Step 1: Open the Project in VS Code
1. Launch **Visual Studio Code**.
2. Click **File** > **Open Folder...**
3. Select the `affinity-ai` folder (e.g., `E:\SoftspireSolution\affinity-ai`).

### Step 2: Install Dependencies
Open the integrated terminal in VS Code (`Ctrl + \`` or **Terminal** > **New Terminal**) and run:
```bash
npm install
```

### Step 3: Launch the Project
You have two easy ways to run the project:

#### Option A: 1-Click Launch (Recommended)
- Press `F5` on your keyboard, or navigate to the **Run & Debug** panel on the left sidebar (`Ctrl + Shift + D`) and select **"Affinity AI - Full Application"**.

#### Option B: Terminal Command
Run the unified development command:
```bash
npm run dev
```
This concurrently starts:
- **API Server**: `http://localhost:5000`
- **Vite React Frontend**: `http://localhost:5173` (with `/api` proxy configured)

#### Option C: Production Standalone Server
To build and run as a single production web server:
```bash
npm run build
npm start
```
Open **`http://localhost:5000`** in your browser.

---

## 🌟 Key Architecture & Capabilities

```
    LinkedIn Public Profile               Instagram Public Profile
   (Career, Skills, Education)             (Aesthetics, Vibes, Life)
                │                                    │
                └─────────────────┬──────────────────┘
                                  ▼
                     Autonomous Agent Ingestion
                    (Cheerio, OpenGraph, JSON-LD)
                                  │
                                  ▼
                       Persona Synthesis Engine
               ┌──────────────────┴──────────────────┐
               ▼                                     ▼
      Dating Dossier Page                   Autonomous Date Arena
  Needs • Hobbies • Interests         Turn-by-turn Dialogue & Monologues
               │                                     │
               └──────────────────┬──────────────────┘
                                  ▼
                   25-Person Compatibility Rankings
               Leaderboard • Category Radars • Rationale
```

### 1. 26 Real People Dataset
Nobody handed us a list; we curated 26 authentic, public individuals spanning researchers, inventors, creators, founders, and athletes:
- **Lex Fridman** (AI Researcher, MIT / Podcaster)
- **Sara Blakely** (Founder of Spanx & Sneex)
- **Marques Brownlee** (Lead Host at MKBHD / Ultimate Athlete)
- **Simone Giertz** (Inventor, Roboticist & Yetch Founder)
- **Andrew Ng** (AI Pioneer, Coursera / DeepLearning.AI)
- **Pieter Levels** (Nomad List, Remote OK, PhotoAI)
- **Justine Ezarik** (Tech Host & Creator, iJustine)
- **Alex Lieberman** (Morning Brew Co-founder)
- **Shaan Puri** (My First Million, Milk Road)
- **Sahil Bloom** (Author, 5 Types of Wealth)
- **Austen Allred** (BloomTech Founder)
- **Dharmesh Shah** (HubSpot Co-founder & CTO)
- **Amjad Masad** (Replit Founder & CEO)
- **Alexis Ohanian** (Reddit Co-founder, Seven Seven Six)
- **Guillermo Rauch** (Vercel Founder & CEO)
- **Julie Zhuo** (Sundial Co-founder, Ex-VP Meta)
- **Dan Abramov** (React Core, Bluesky)
- **Jack Altman** (Lattice Founder, Alt Capital)
- **Tim Ferriss** (Author, 4-Hour Workweek)
- **Cassidy Williams** (Developer Advocate, Contenda)
- **Ali Spagnola** (Musician, Artist, Fitness Creator)
- **Jack Conte** (Patreon CEO, Pomplamoose)
- **Natalie Barbu** (Rella Founder & CEO)
- **Austin Evans** (Mystery Tech Host & Producer)
- **Sara Dietschy** (Filmmaker & Lab22 Founder)
- **Cleo Abram** (Journalist, Huge If True)

Every single person has direct links to their public LinkedIn and public Instagram.

### 2. Deep Persona Analysis Dossier
Clicking **Inspect Dossier** on any person opens their comprehensive agent reading:
- **Relational Needs**: Emotional vulnerability, intellectual stimulations, lifestyle rhythm, and partner pacing.
- **Extracted Hobbies**: Physical and creative pursuits mined from Instagram visual themes and LinkedIn milestones.
- **Intellectual Interests**: Deep curiosities, philosophies, and domain passions.
- **Qualities**: Big-Five personality traits, communication style, core values, energy dynamics (Introvert/Ambivert/Extrovert), and quirks.
- **Matchmaking Directives**: Ideal partner traits, dealbreakers, and romantic love languages.

### 3. The Live Date Arena ("Watch Agents Actually Date")
- Select any two agents and pick a date atmosphere (Tokyo Sunset Sky Lounge, West Village Bookshop Cafe, Pottery & Natural Wine Studio, Austin Stargazing Fireside).
- **Multi-Turn Dynamic Dialogue**: The agents converse in character, playfully teasing, sharing stories, and probing relational alignment.
- **Subconscious Agent Monologues**: Toggle on the agent's subconscious thoughts to see what each agent is privately calculating about their date in real-time.
- **Live Chemistry Meter**: Real-time gauge (0-100%) tracking romantic spark turn-by-turn.
- **Date Verdict**: Generated mutual decision, compatibility breakdown (Emotional, Intellectual, Lifestyle, Flow), and shared passions.

### 4. Compatibility Rankings ("Who fits each person best?")
- Select any person from the network.
- Displays a ranked leaderboard of all other 25 candidates from #1 to #25.
- Each entry features:
  - Overall compatibility percentage
  - 4-factor dimensional breakdown (Emotional, Intellectual, Lifestyle, Flow)
  - Detailed rationale explaining why they fit together
  - Instant **"Watch Date"** button to jump into the Date Arena with that pair.

### 5. Paste Official Links Pipeline
- Click **"Deploy Agent"** in the top navigation.
- Paste any LinkedIn public URL and Instagram public URL.
- The dual-source scraper reads the endpoints, synthesizes needs/hobbies/interests, registers the new persona, and integrates them into the 25-candidate ranking matrix in real time.

---

## 🎬 3-Minute Video Showcase Script

For recording your YouTube submission video, follow this optimal 3-minute structure:

| Time | Screen | Audio / Commentary Script |
|---|---|---|
| **0:00 – 0:40** | **Agent Personas Grid & Profile Dossier** | *"Welcome to Affinity AI, an autonomous agentic dating site where each person is represented by an AI agent that dates on their behalf. Here are 26 real people, each sourced exclusively from two public links: their LinkedIn and their Instagram. Clicking into Lex Fridman’s dossier, we see how the agent analyzed his emotional needs, marathon running hobbies, classical literature interests, and introverted energy profile."* |
| **0:40 – 1:20** | **Pasting Links (Deploy Agent)** | *"The platform is fully interactive: clicking 'Deploy Agent', we paste an official LinkedIn URL and public Instagram URL. The autonomous scraper extracts public metadata, parses JSON-LD and visual themes, synthesizes their romantic profile, and spawns the agent into the dating pool."* |
| **1:20 – 2:25** | **The Live Date Arena (Agents Dating)** | *"Now, let's watch the agents actually go out and date. In our Date Arena, Lex Fridman's agent dates Simone Giertz's agent at a Tokyo Sky Lounge. Notice the multi-turn conversational dialogue. When we toggle 'Subconscious Monologue', we can see what Lex’s agent is privately thinking about Simone’s quirks and how the live chemistry meter surges from 72% to 95%, concluding with a confirmed second date!"* |
| **2:25 – 3:00** | **Compatibility Rankings** | *"Finally, the Rankings engine answers: who fits each person best? Selecting Lex Fridman, we see all 25 candidates ranked from #1 to #25 with multi-category breakdown bars and detailed compatibility rationales. With one click, we can launch dates with any pair across the network."* |

---

## 🛠️ Project Structure

```
affinity-ai/
├── .vscode/
│   └── launch.json            # 1-click VS Code debugger configuration
├── server/
│   ├── data/
│   │   ├── people.json        # 26 real people dataset (LinkedIn + Instagram)
│   │   └── dates.json         # Pre-simulated rich dates with monologues
│   ├── scraper.js             # Dual-source scraper (Cheerio, OpenGraph, JSON-LD)
│   ├── agentEngine.js         # Persona synthesis, date simulator & ranking matrix
│   └── index.js               # Express API and static production server
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky header with tab controls & deploy action
│   │   ├── ProfileExplorer.jsx# Grid & search filters for 26 real people
│   │   ├── ProfileModal.jsx   # Deep agent analysis dossier view
│   │   ├── DateArena.jsx      # Multi-turn dating simulator with monologues
│   │   ├── RankingsDashboard.jsx # 25-person ranked leaderboards & rationales
│   │   ├── AddPersonModal.jsx # Form to paste LinkedIn & Instagram URLs
│   │   └── ArchitectureView.jsx# Technical documentation & copyable answers
│   ├── App.jsx                # Root React component & state orchestrator
│   ├── index.css              # Glassmorphic Tailwind styling
│   └── main.jsx               # React DOM entry
├── package.json               # Root scripts (dev, build, start)
├── vite.config.js             # Vite configuration with API proxying
└── tailwind.config.js         # Custom dark-mode color palette
```

---

## 📄 License
This project is open-source under the MIT License.
