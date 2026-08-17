# RummyBoard

A simple scoreboard for Rummy (and similar card games), built with Next.js.

## Features

- Add and remove players before the game starts
- Set a target score — a player is eliminated once their total reaches it
- Enter each round's scores per player and see a running scoreboard
- Automatic alert banner the moment a player crosses the target score
- Automatic winner announcement once only one player remains under the target
- Undo a round or clear round history without losing the player list
- State is saved to `localStorage`, so a refresh doesn't lose the game

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Deploy on Vercel

```bash
npx vercel --prod
```

Or connect this repository in the [Vercel dashboard](https://vercel.com/new) — no environment variables are required, since all state lives in the browser.
