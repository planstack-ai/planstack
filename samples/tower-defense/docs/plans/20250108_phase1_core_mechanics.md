# Phase 1: Core Mechanics

## Overview

Implement the minimum viable tower defense game with Phaser.js:
- Enemies walk along a path
- Player can place towers
- Towers attack enemies

## Technical Stack

- **Phaser 3** - Game framework
- **Vite** - Dev server & bundler (simple, fast)
- **Vanilla JS** - No TypeScript for simplicity

## Game Design

### Map
- Grid-based map (e.g., 20x15 tiles, 32px each)
- Path defined as array of waypoints
- Buildable areas marked separately

### Enemy
- Spawns at path start
- Follows waypoints sequentially
- Has HP, speed
- Disappears when reaching end or HP <= 0

### Tower
- Placed on buildable tiles (click to place)
- Has range, damage, fire rate
- Targets nearest enemy in range
- Shoots projectile (visual)

## File Structure

```
samples/tower-defense/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js              # Phaser game config, entry point
│   ├── scenes/
│   │   └── GameScene.js     # Main game scene
│   ├── entities/
│   │   ├── Enemy.js         # Enemy class
│   │   ├── Tower.js         # Tower class
│   │   └── Projectile.js    # Projectile class
│   ├── config/
│   │   └── mapData.js       # Path waypoints, buildable tiles
│   └── utils/
│       └── pathfinding.js   # Path following logic
├── assets/
│   └── (placeholder sprites for now)
└── docs/
    └── plans/
```

## Implementation Steps

### Step 1: Project Setup
- Initialize npm project
- Install Phaser 3 + Vite
- Create index.html with canvas container
- Create main.js with Phaser config

### Step 2: GameScene Foundation
- Create GameScene class
- Draw grid (debug view)
- Define path waypoints
- Mark buildable tiles

### Step 3: Enemy
- Create Enemy class extending Phaser.GameObjects.Sprite
- Implement path following (move toward next waypoint)
- Add HP property
- Spawn enemy on scene start (for testing)

### Step 4: Tower
- Create Tower class
- Place tower on click (if tile is buildable)
- Draw range indicator
- Implement targeting (find nearest enemy in range)

### Step 5: Combat
- Create Projectile class
- Tower fires projectile at target
- Projectile hits enemy, deals damage
- Enemy dies when HP <= 0

### Step 6: Polish
- Basic UI (placeholder)
- Simple sprites or colored shapes
- Restart button

## Visual Design (Phase 1)

For Phase 1, use simple colored shapes:
- **Path**: Light brown tiles
- **Buildable**: Green tiles
- **Enemy**: Red circle
- **Tower**: Blue square
- **Projectile**: Yellow small circle

## Success Criteria

- [ ] Enemy spawns and walks the path
- [ ] Click to place tower on valid tile
- [ ] Tower shoots at enemies in range
- [ ] Enemy HP decreases, dies at 0
- [ ] Game runs without errors

## Open Questions

1. Single enemy type for Phase 1, or already prepare for multiple?
   → **Propose**: Single type, but Enemy class designed for extension

2. Tower placement cost/currency?
   → **Propose**: Skip for Phase 1, unlimited placement

3. Win/lose condition?
   → **Propose**: Skip for Phase 1, endless spawning for testing

## Next Phase Preview

Phase 2 will add:
- Wave system
- Lives (enemies reaching end reduce lives)
- Gold & tower purchase cost
- Game over / victory conditions
