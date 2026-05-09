# GhostPilot AI

Futuristic AI browser co-pilot MVP built for Xiaomi MiMo Orbit / AI Builder Program showcase.

## Branding

- **Name:** GhostPilot AI
- **Tagline:** Turn any website into an AI-operated workspace.
- **Positioning:** AI-native browser co-pilot for reading websites, understanding tasks, suggesting smart actions, and creating lightweight reusable workflows.
- **Visual language:** dark cyber workspace, glassmorphism, cyan/violet neon, live AI typing, animated browser activity.
- **Reviewer hook:** in 30 seconds, reviewer sees a landing page, a live browser panel, AI suggestions, workflow cards, and automation history.

## MVP Scope

This is intentionally frontend-first and showcase-focused:

- Landing page modern and futuristic
- Dashboard-style AI cockpit
- AI task input with typing animation
- Fake/live-feeling browser activity panel
- Workflow cards
- Automation history
- AI suggestions panel
- Animated UI with Framer Motion
- Fully responsive layout
- No backend required

## Tech Stack

- Next.js
- TypeScript
- TailwindCSS v4
- Framer Motion
- Lucide React icons

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel Free

Option 1 — Vercel dashboard:

1. Push this folder to GitHub.
2. Open https://vercel.com/new
3. Import the GitHub repository.
4. Framework preset should auto-detect **Next.js**.
5. Build command: `npm run build`
6. Output directory: leave default.
7. Deploy.

Option 2 — Vercel CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Suggested X/Twitter Pitch

> Meet GhostPilot AI — a futuristic browser co-pilot that reads websites, understands intent, suggests smart actions, and turns repetitive web tasks into reusable workflows. Built as an AI-native showcase MVP for the Xiaomi MiMo Orbit / AI Builder Program.

## Demo Flow for Reviewers

1. Start at the hero section.
2. Show the live browser activity panel.
3. Point to the typing AI suggestions.
4. Scroll to dashboard.
5. Explain the user gives a browser task.
6. GhostPilot reads page state and proposes actions.
7. Approved steps become workflow cards and history.

## Notes

The current MVP uses mock data and simulated AI/browser activity to prioritize visual impact, clarity, and demo smoothness for application review.
