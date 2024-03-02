class Scene1 extends Phaser.Scene {
    constructor() {
      super({
        key: "scene1",
      })
    }
    preload() {
      this.load.image("background1", "assets/m_merged.png")
      this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 200, frameHeight: 300 })
  
    }

    create() {
      // Carrega a cena Main Menu
      this.mainMenu = this.add.image(gameDimensions.width/2, gameDimensions.height/2, "background1").setScale(1.4)
      this.coin = this.add.sprite(100.6, 500, "coin").setScale(0.25)
      this.anims.create({
        key: "animar",
        frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      })
      this.coin.anims.play("animar", true)

      // this.load.image("", "assets/.png")
      // this.botaoJogar = this.add.image(900, 575, "")

    }
    
  
    update() {}
    
  }
  