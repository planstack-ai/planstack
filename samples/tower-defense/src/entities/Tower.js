import Phaser from 'phaser'
import { Projectile } from './Projectile.js'
import { TILE_SIZE } from '../config/mapData.js'

export class Tower extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, TILE_SIZE - 4, TILE_SIZE - 4, 0x3498db) // Blue square

    scene.add.existing(this)

    this.range = 100
    this.damage = 25
    this.fireRate = 1000 // ms between shots
    this.lastFired = 0

    // Range indicator (semi-transparent circle)
    this.rangeIndicator = scene.add.circle(x, y, this.range, 0x3498db, 0.1)
    this.rangeIndicator.setStrokeStyle(1, 0x3498db, 0.3)
  }

  update(time, enemies) {
    if (time < this.lastFired + this.fireRate) {
      return
    }

    // Find nearest enemy in range
    const target = this.findTarget(enemies)

    if (target) {
      this.fire(target)
      this.lastFired = time
    }
  }

  findTarget(enemies) {
    let nearestEnemy = null
    let nearestDistance = this.range

    enemies.forEach(enemy => {
      if (!enemy.alive) return

      const dx = enemy.x - this.x
      const dy = enemy.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= this.range && distance < nearestDistance) {
        nearestDistance = distance
        nearestEnemy = enemy
      }
    })

    return nearestEnemy
  }

  fire(target) {
    new Projectile(this.scene, this.x, this.y, target, this.damage)
  }

  showRange() {
    this.rangeIndicator.setAlpha(1)
  }

  hideRange() {
    this.rangeIndicator.setAlpha(0.1)
  }

  destroy() {
    this.rangeIndicator.destroy()
    super.destroy()
  }
}
