class Menu extends Phaser.Scene {
    constructor() {
      super({
        key: "menu",
      })
    }
    preload() {
      this.load.image("background", "assets/background.avif") // Fundo da cena do Main Menu
      this.load.image("inteliLogo", "assets/logo-inteli_branco.png") // Logo inteli
      this.load.image("botaoJogar", "assets/button.png") // Imagem para botaoJogar
  
    }
  
    create() {
      // Carrega a cena Main Menu
      this.mainMenu = this.add.image(gameDimensions.width/2, gameDimensions.height/2, "background").setScale(1.6)
      this.logoInteli = this.add.image(1050, 530, "inteliLogo").setScale(0.5)
      this.botaoJogar = this.add.image(gameDimensions.width/2, gameDimensions.height/1.5, "botaoJogar").setInteractive().setScale(0.156)

  
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
        this.input.setDefaultCursor("default") // Retorno do cursor do mouse para setinha (padrão)
      })
    }
  
    update() {}
    
  }
  