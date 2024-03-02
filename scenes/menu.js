class Menu extends Phaser.Scene {
    constructor() {
      super({
        key: "menu",
      })
    }
    preload() {
      this.load.image("background", "assets/background.png") // Fundo da cena do Main Menu
      this.load.image("inteliLogo", "assets/logointeli.png") // Fundo da cena do Main Menu
      this.load.image("botaoJogar", "assets/button.png") // Imagem para botaoJogar
  
    }
  
    create() {
      // Carrega a cena Main Menu
      this.mainMenu = this.add.image(630, 365, "background").setScale(2.1)
      this.logoInteli = this.add.image(1200, 690, "inteliLogo").setScale(1)
      this.botaoJogar = this.add.image(900, 575, "botaoJogar").setInteractive().setScale(2)

  
      // Ajuste visual da imagem do mouse para fornecer feedback que o botão jogar é interativo
      this.botaoJogar.on("pointerover", () => {
        // Evento de passar o mouse sobre o botaoJogar
        this.input.setDefaultCursor("pointer") // Cursor vira mãozinha
      })
      this.botaoJogar.on("pointerout", () => {
        // Evento de retirar o mouse do botaoJogar
        this.input.setDefaultCursor("default") // Cursor vira setinha
      })
  
      this.botaoJogar.on("pointerdown", () => {
        // Evento de click do mouse
        this.scene.start("scene1")
        this.scene.stop('menu')
        this.input.setDefaultCursor("default") // Retorno do cursor do mouse para setinha
        this.openFullScreen()
      })
    }
  
    update() {}
    
  }
  