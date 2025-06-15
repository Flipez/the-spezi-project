# Drink Ratings – Next.js App

A small, single‑page application built with **Next.js 14**, **Tailwind CSS**, **Recharts** and **React‑Leaflet** that visualises Cola & Spezi ratings stored in `public/drinks.csv`.

## Getting Started locally

```bash
pnpm i        # or npm install / yarn
pnpm dev      # starts http://localhost:3000
```

## Deploying to Vercel

1. Push this folder to GitHub/GitLab.
2. In Vercel, **Import Project** → pick the repo → *Framework: Next.js*.
3. Use the default build settings (`pnpm build` / `next build`).
4. 🚀 Hit **Deploy**.

The CSV is bundled as static asset and parsed at build time; publish a new deployment whenever you update the file.
