# Plan: Phase 1 — Core Mechanics

**Created:** 2025-01-08
**Status:** Implemented

## Overview

Implement the minimum viable tower defense game: enemies walk a path, player places towers, towers attack enemies.

## Background & Objectives

- Build a playable prototype to validate the core game loop
- Use simple colored shapes — no art assets needed yet
- Establish the codebase structure for future phases

## Related Past Implementations

None (first plan in project).

## Implementation Approach

### Approach

- Phaser 3 for rendering and game loop
- Vite for dev server (fast HMR)
- Vanilla JS for simplicity
- Grid-based map with waypoint pathfinding

### Scope of Impact

- New project — all files created from scratch
- `src/` — game source code
- `docs/plans/` — this plan

## Implementation Steps

1. [x] **Project Setup** — npm init, install Phaser 3 + Vite, create index.html and main.js
2. [x] **GameScene Foundation** — Create GameScene class, draw grid, define path waypoints, mark buildable tiles
3. [x] **Enemy** — Enemy class with path following, HP, spawn on scene start
4. [x] **Tower** — Tower class, place on click, range indicator, targeting logic
5. [x] **Combat** — Projectile class, tower fires at target, damage on hit, enemy death
6. [x] **Polish** — Basic UI, colored shapes, restart

## Game Design

### Map
- Grid-based map (20x15 tiles, 32px each)
- Path defined as array of waypoints
- Buildable areas marked separately

### Enemy
- Spawns at path start, follows waypoints
- Has HP, speed
- Disappears when reaching end or HP <= 0

### Tower
- Placed on buildable tiles (click to place)
- Has range, damage, fire rate
- Targets nearest enemy in range

### Visual Design
- **Path**: Light brown tiles
- **Buildable**: Green tiles
- **Enemy**: Red circle
- **Tower**: Blue square
- **Projectile**: Yellow small circle

## Considerations

### Performance

- Simple shapes keep rendering fast
- Single enemy type avoids premature optimization

### Backward Compatibility

- N/A (new project)

## Test Plan

- [x] Enemy spawns and walks the path
- [x] Click to place tower on valid tile
- [x] Tower shoots at enemies in range
- [x] Enemy HP decreases, dies at 0
- [x] Game runs without errors

## Open Questions (Resolved)

1. Single enemy type for Phase 1? → **Yes**, but Enemy class designed for extension
2. Tower placement cost? → **Skip** for Phase 1, unlimited placement
3. Win/lose condition? → **Skip** for Phase 1, endless spawning for testing

## Notes

Phase 2 will add: wave system, lives, gold & tower purchase cost, game over / victory conditions.
