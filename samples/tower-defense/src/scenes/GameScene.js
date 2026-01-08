import Phaser from 'phaser'
import { Enemy } from '../entities/Enemy.js'
import { Tower } from '../entities/Tower.js'
import {
  TILE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  PATH_WAYPOINTS,
  generatePathTiles,
  isBuildableTile,
  tileToPixel,
  pixelToTile
} from '../config/mapData.js'

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    this.pathTiles = generatePathTiles()
    this.towers = []
    this.enemies = []
    this.projectiles = []

    // Game state
    this.spawnTimer = 0
    this.spawnInterval = 2000 // ms between enemy spawns

    this.drawGrid()
    this.setupInput()
    this.setupEvents()

    // Spawn first enemy
    this.spawnEnemy()
  }

  drawGrid() {
    // Draw all tiles
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        const pixelPos = tileToPixel(x, y)
        const isPath = this.pathTiles.has(`${x},${y}`)

        // Path tiles: light brown, Buildable: dark green
        const color = isPath ? 0x8b7355 : 0x2d5a27
        const alpha = isPath ? 1 : 0.6

        const tile = this.add.rectangle(
          pixelPos.x,
          pixelPos.y,
          TILE_SIZE - 1,
          TILE_SIZE - 1,
          color,
          alpha
        )

        // Add subtle border
        tile.setStrokeStyle(1, 0x000000, 0.2)
      }
    }

    // Draw waypoint markers (debug)
    PATH_WAYPOINTS.forEach((wp, index) => {
      const pos = tileToPixel(wp.x, wp.y)
      this.add.circle(pos.x, pos.y, 4, 0xffffff, 0.5)
    })
  }

  setupInput() {
    this.input.on('pointerdown', (pointer) => {
      const tile = pixelToTile(pointer.x, pointer.y)

      if (isBuildableTile(tile.x, tile.y, this.pathTiles)) {
        // Check if tower already exists at this position
        const existingTower = this.towers.find(t => {
          const towerTile = pixelToTile(t.x, t.y)
          return towerTile.x === tile.x && towerTile.y === tile.y
        })

        if (!existingTower) {
          this.placeTower(tile.x, tile.y)
        }
      }
    })

    // Hover effect for buildable tiles
    this.hoverIndicator = this.add.rectangle(0, 0, TILE_SIZE - 2, TILE_SIZE - 2, 0x3498db, 0.3)
    this.hoverIndicator.setVisible(false)

    this.input.on('pointermove', (pointer) => {
      const tile = pixelToTile(pointer.x, pointer.y)

      if (isBuildableTile(tile.x, tile.y, this.pathTiles)) {
        const existingTower = this.towers.find(t => {
          const towerTile = pixelToTile(t.x, t.y)
          return towerTile.x === tile.x && towerTile.y === tile.y
        })

        if (!existingTower) {
          const pos = tileToPixel(tile.x, tile.y)
          this.hoverIndicator.setPosition(pos.x, pos.y)
          this.hoverIndicator.setVisible(true)
        } else {
          this.hoverIndicator.setVisible(false)
        }
      } else {
        this.hoverIndicator.setVisible(false)
      }
    })
  }

  setupEvents() {
    this.events.on('enemyKilled', (enemy) => {
      this.enemies = this.enemies.filter(e => e !== enemy)
    })

    this.events.on('enemyReachedEnd', (enemy) => {
      this.enemies = this.enemies.filter(e => e !== enemy)
    })
  }

  placeTower(tileX, tileY) {
    const pos = tileToPixel(tileX, tileY)
    const tower = new Tower(this, pos.x, pos.y)
    this.towers.push(tower)
  }

  spawnEnemy() {
    const startWaypoint = PATH_WAYPOINTS[0]
    const pos = tileToPixel(startWaypoint.x, startWaypoint.y)
    const enemy = new Enemy(this, pos.x, pos.y)
    this.enemies.push(enemy)
  }

  update(time, delta) {
    // Spawn enemies periodically
    this.spawnTimer += delta
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnEnemy()
      this.spawnTimer = 0
    }

    // Update enemies
    this.enemies.forEach(enemy => {
      if (enemy.alive) {
        enemy.update()
      }
    })

    // Update towers
    this.towers.forEach(tower => {
      tower.update(time, this.enemies)
    })

    // Update projectiles
    this.children.list.forEach(child => {
      if (child.constructor.name === 'Projectile' && child.alive) {
        child.update()
      }
    })
  }
}
