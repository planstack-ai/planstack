import Phaser from 'phaser'
import { PATH_WAYPOINTS, tileToPixel, TILE_SIZE } from '../config/mapData.js'

export class Enemy extends Phaser.GameObjects.Arc {
  constructor(scene, x, y) {
    super(scene, x, y, 12, 0, 360, false, 0xe74c3c) // Red circle

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.hp = 100
    this.maxHp = 100
    this.speed = 80
    this.currentWaypointIndex = 0
    this.alive = true

    // Health bar background
    this.healthBarBg = scene.add.rectangle(x, y - 20, 24, 4, 0x333333)
    // Health bar fill
    this.healthBar = scene.add.rectangle(x, y - 20, 24, 4, 0x2ecc71)

    this.moveToNextWaypoint()
  }

  moveToNextWaypoint() {
    if (this.currentWaypointIndex >= PATH_WAYPOINTS.length) {
      // Reached the end
      this.reachEnd()
      return
    }

    const waypoint = PATH_WAYPOINTS[this.currentWaypointIndex]
    const target = tileToPixel(waypoint.x, waypoint.y)

    // Calculate direction and velocity
    const dx = target.x - this.x
    const dy = target.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 0) {
      this.body.setVelocity(
        (dx / distance) * this.speed,
        (dy / distance) * this.speed
      )
    }

    this.targetX = target.x
    this.targetY = target.y
  }

  update() {
    if (!this.alive) return

    // Update health bar position
    this.healthBarBg.setPosition(this.x, this.y - 20)
    this.healthBar.setPosition(this.x, this.y - 20)

    // Check if reached current waypoint
    const dx = this.targetX - this.x
    const dy = this.targetY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 5) {
      this.currentWaypointIndex++
      this.moveToNextWaypoint()
    }
  }

  takeDamage(amount) {
    this.hp -= amount

    // Update health bar
    const healthPercent = Math.max(0, this.hp / this.maxHp)
    this.healthBar.setScale(healthPercent, 1)

    if (this.hp <= 0) {
      this.die()
    }
  }

  die() {
    this.alive = false
    this.body.setVelocity(0, 0)
    this.healthBarBg.destroy()
    this.healthBar.destroy()
    this.destroy()

    // Emit event for scoring/etc
    this.scene.events.emit('enemyKilled', this)
  }

  reachEnd() {
    this.alive = false
    this.body.setVelocity(0, 0)
    this.healthBarBg.destroy()
    this.healthBar.destroy()
    this.destroy()

    // Emit event for life loss
    this.scene.events.emit('enemyReachedEnd', this)
  }
}
