import Phaser from 'phaser'

export class Projectile extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, target, damage) {
    super(scene, x, y, 4, 0, 360, false, 0xf1c40f) // Yellow circle

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.target = target
    this.damage = damage
    this.speed = 300
    this.alive = true

    this.moveToTarget()
  }

  moveToTarget() {
    if (!this.target || !this.target.alive) {
      this.destroy()
      return
    }

    const dx = this.target.x - this.x
    const dy = this.target.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 0) {
      this.body.setVelocity(
        (dx / distance) * this.speed,
        (dy / distance) * this.speed
      )
    }
  }

  update() {
    if (!this.alive) return

    // If target is dead, destroy projectile
    if (!this.target || !this.target.alive) {
      this.alive = false
      this.destroy()
      return
    }

    // Update trajectory towards target
    this.moveToTarget()

    // Check if hit target
    const dx = this.target.x - this.x
    const dy = this.target.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 10) {
      this.hit()
    }
  }

  hit() {
    if (this.target && this.target.alive) {
      this.target.takeDamage(this.damage)
    }
    this.alive = false
    this.destroy()
  }
}
