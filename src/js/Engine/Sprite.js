export default class Sprite extends Phaser.GameObjects.Sprite {
  constructor(config) {
    if (typeof config.key === "string") {
      super(config.scene, config.x, config.y, config.key)
    } else {
      // для загрузки атласа
      super(config.scene, config.x, config.y, config.key[0], config.key[1] + '.png')
    }
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = Object.assign(this.getDefaultConfig(config), config)

    this.alpha = this.config.alpha
    this.setScale(this.config.scale.x, this.config.scale.y)
    this.setOrigin(this.config.origin.x, this.config.origin.y)
    this.setPosition(this.config.x, this.config.y)

    this.changeInteractive(this.config.interactive)
    this.onPointerDown(this.config.OnPointerdown)
    this.setVisible(this.config.visible)
    this.setAngle(this.config.angle)

    if (this.config.devMode) {
      this.turnOnDebug()
    }
  }

  onPointerDown(func) {
    this.on('pointerdown', () => func && func())
  }

  turnOnDebug() {
    this.setInteractive()
    this.game.input.setDraggable(this)

    this.game.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000)
    })
    this.game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX
      gameObject.y = dragY
    })
    this.game.input.on('dragend', function (pointer, gameObject) {
      gameObject.clearTint()
      console.log(`x: ${Math.round(gameObject.x)}, y: ${Math.round(gameObject.y)}`)
    })
  }


  changeInteractive(mode) {
    if (mode) {
      this.enableInteractive()
    } else {
      this.disableInteractive()
    }
  }

  enableInteractive() {
    this.setInteractive()
    this.clearTint()
  }

  disableInteractive() {
    this.removeInteractive()
    // this.tint = 0x808080
  }

  getDefaultConfig(config) {
    return {
      alpha: 1,
      origin: {x: 0.5, y: 0.5},
      scale: {x: 1, y: 1},
      visible: true,
      interactive: false,
      tint: 0xffffff,
      angle: 0, // градусы
      devMode: false,
      key: ''
    }
  }


}


