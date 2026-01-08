# Tower Defense

A browser-based tower defense game built with Phaser 3.

This is a **Plan Stack sample project** — developed using the Plan Stack methodology where each feature is planned, reviewed, then implemented.

## Quick Start

```bash
cd samples/tower-defense
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## How to Play

- **Click** on green tiles to place towers
- Towers automatically attack enemies in range
- Enemies (red circles) walk along the brown path
- Destroy enemies before they reach the end

## Project Structure

```
samples/tower-defense/
├── docs/
│   └── plans/           # Implementation plans (Plan Stack)
├── src/
│   ├── main.js          # Phaser game config
│   ├── scenes/
│   │   └── GameScene.js # Main game scene
│   ├── entities/
│   │   ├── Enemy.js     # Enemy class
│   │   ├── Tower.js     # Tower class
│   │   └── Projectile.js
│   └── config/
│       └── mapData.js   # Map configuration
├── index.html
└── package.json
```

## Development Phases

See `docs/plans/` for detailed implementation plans.

- [x] **Phase 1**: Core mechanics (enemies, towers, combat)
- [ ] **Phase 2**: Game loop (waves, lives, gold)
- [ ] **Phase 3**: Variety (tower types, enemy types)
- [ ] **Phase 4**: Depth (upgrades, abilities)
- [ ] **Phase 5**: Content (multiple maps, progression)

## Tech Stack

- **Phaser 3** - Game framework
- **Vite** - Build tool
- **Vanilla JS** - No TypeScript, no framework
