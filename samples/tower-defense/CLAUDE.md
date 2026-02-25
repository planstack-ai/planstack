# CLAUDE.md

## Project Overview

A browser-based tower defense game built with Phaser 3 and Vanilla JS.

This project follows the **Plan Stack** workflow.

## Tech Stack

- Phaser 3 (game framework)
- Vite (dev server & bundler)
- Vanilla JS (no TypeScript)

## Development Commands

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
```

## Plan Stack Workflow

Before implementing any feature or fix:
1. Search `docs/plans/` for similar past implementations
2. Enter Plan Mode (Shift+Tab twice in Claude Code)
3. Create implementation plan in `docs/plans/YYYYMMDD_feature_name.md`
4. Get human approval before coding
5. Exit Plan Mode and implement

After implementation:
- AI review compares plan vs code
- Move completed plan to `docs/plans/completed/`

## Development Phases

- [x] Phase 1: Core mechanics (enemies, towers, combat) — see `docs/plans/completed/`
- [ ] Phase 2: Game loop (waves, lives, gold)
- [ ] Phase 3: Variety (tower types, enemy types)
- [ ] Phase 4: Depth (upgrades, abilities)
- [ ] Phase 5: Content (multiple maps, progression)
