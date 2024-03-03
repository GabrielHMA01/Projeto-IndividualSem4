class Scene1 extends Phaser.Scene {
    constructor() {
      super({
        key: "scene1",
      })
    }
    preload() {
      this.load.image("background1", "assets/m_merged.png")
      this.load.image("logCollect", "assets/logCollect.png")
      this.load.image("background1", "assets/m_merged.png")
      this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 200, frameHeight: 300 })
      this.load.spritesheet("personagem", "assets/Woodcutter_run.png", { frameWidth: 48, frameHeight: 48 })
  
    }

    create() {
      // window.alert("Olá, pronto para começar? Clique na tecla de espaço para pular, boa sorte!")
      this.volta = 0
      this.mainMenu = this.add.image(-5, -20, "background1").setScale(1.5).setOrigin(0, 0)

      this.coin = this.physics.add.sprite(1200, 500, "coin").setScale(0.2)
      this.coin.setCollideWorldBounds(true)
      this.coin.setVelocityX(-300)
      this.coin.body.setSize(120, 310, true)
      this.anims.create({
        key: "animar",
        frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      })
      this.coin.anims.play("animar", true)



      this.personagem = this.physics.add.sprite(50, 510, "personagem").setScale(2.1)
      this.personagem.setCollideWorldBounds(true)
      this.personagem.setSize(30, 60, true)
      this.anims.create({
        key: "running",
        frames: this.anims.generateFrameNumbers("personagem", { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
      })
      // if(this.touchingGround === true){
      this.personagem.anims.play("running", true)
      // }
      // //else if (){
      //   this.personagem.anims.play("jumping", true)
      // }

      this.physics.add.overlap(this.personagem, this.coin, function(){ 
        // this.coin.setVisible(false);
        this.positionCoinX = Phaser.Math.RND.between(500, 1200);
        this.coin.setPosition(this.positionCoinX, 500);
        // this.coin.setVisible(true)
      })

      this.logCollect = this.physics.add.sprite(1000, 520, "logCollect").setScale(0.4)
      this.logCollect.setCollideWorldBounds(true)
      this.logCollect.setVelocityX(-300 - this.volta)
      this.logCollect.body.setSize(120, 150, true)

    }
    
    update() {

      // Deslocamento do fundo
      if (this.mainMenu.width < 3000) {
        this.mainMenu.x -= 5 - this.volta;
        console.log(`Você está na volta ${-this.volta/0.08}`)
      }

      // Reposicionamento do fundo
      if (this.mainMenu.x <= -2001.89) {
        this.mainMenu.x = this.mainMenu.x + 2001.89;
        this.volta = this.volta - 0.08
      }
    }
    
  }
  