# Lucy Coach Consistency Tracker — Demo

Interactive frontend demo of the Lucy Coach Consistency Tracker dashboard system.

## What this is

A **visual concept demo** for internal testing and concept validation. It shows how the Lucy Coach consistency tracking experience could look and feel across three roles:

- **Cliente** — Personal dashboard, daily check-in, weekly check-in, Lucy Insights
- **Nutricionista** — Client overview table, individual client detail with charts and "Patrones del Proceso"
- **Admin** — Pilot-level aggregated metrics, emotional safety signals, risk monitoring

## What this is NOT

- Not a production app
- Not connected to any backend or database
- Not using real client data
- Not a SaaS product
- Not using authentication, payments, or external APIs

All data is **mock data** defined in `src/data/mockData.ts`.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Route | Description |
|---|---|
| `/` | Landing — role selector |
| `/cliente` | Client dashboard |
| `/cliente/checkin-diario` | Daily check-in flow |
| `/cliente/checkin-semanal` | Weekly check-in flow |
| `/nutricionista` | Nutritionist client list |
| `/nutricionista/[clientId]` | Nutritionist client detail |
| `/admin` | Admin pilot dashboard |

## Design philosophy

The visual design follows Lucy Coach brand principles:

- Premium, warm, minimal, science-based aesthetic
- Warm neutrals, sage/olive accents, soft beige, charcoal text
- Non-punitive, non-moralistic language
- "Data with context, not judgment"
- No harsh red/green, no gym-bro visuals, no gamification
