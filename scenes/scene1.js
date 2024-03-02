class Scene1 extends Phaser.Scene {
    constructor() {
      super({
        key: "scene1",
      })
    }
    preload() {
      this.load.image("background1", "assets/m_merged.png")
      this.load.image("inteliLogo", "assets/.png")
      this.load.image("botaoJogar", "assets/.png")
  
    }
  
    create() {
      // Carrega a cena Main Menu
      this.mainMenu = this.add.image(gameDimensions.width/2, gameDimensions.height/2, "background1").setScale(1.4)
      this.logoInteli = this.add.image(100, 200, "")
      this.botaoJogar = this.add.image(900, 575, "")

    }
  
    update() {}
    
  }
  