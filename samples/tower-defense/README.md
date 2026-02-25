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
├── CLAUDE.md                    # Plan Stack workflow instructions
├── .claude/
│   └── settings.json            # plansDirectory config
├── docs/
│   ├── plans/                   # Active implementation plans
│   │   └── completed/           # Archived completed plans
│   └── templates/               # Plan & review templates
├── src/
│   ├── main.js                  # Phaser game config
│   ├── scenes/
│   │   └── GameScene.js         # Main game scene
│   ├── entities/
│   │   ├── Enemy.js             # Enemy class
│   │   ├── Tower.js             # Tower class
│   │   └── Projectile.js
│   └── config/
│       └── mapData.js           # Map configuration
├── index.html
└── package.json
```

## Development Phases

See `docs/plans/` for active plans and `docs/plans/completed/` for archives.

- [x] **Phase 1**: Core mechanics — [plan](docs/plans/completed/20250108_phase1_core_mechanics.md)
- [ ] **Phase 2**: Game loop (waves, lives, gold)
- [ ] **Phase 3**: Variety (tower types, enemy types)
- [ ] **Phase 4**: Depth (upgrades, abilities)
- [ ] **Phase 5**: Content (multiple maps, progression)

## Tech Stack

- **Phaser 3** - Game framework
- **Vite** - Build tool
- **Vanilla JS** - No TypeScript, no framework
