import Phaser from 'phaser'
import { GameScene } from './scenes/GameScene.js'

const config = {
  type: Phaser.AUTO,
  width: 640,  // 20 tiles * 32px
  height: 480, // 15 tiles * 32px
  parent: 'game-container',
  backgroundColor: '#2d2d44',
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

new Phaser.Game(config)
