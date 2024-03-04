class Scene1 extends Phaser.Scene {
    constructor() {
      super({
        key: "scene1",
      })
    }
    preload() {
      this.load.image("background1", "assets/m_merged.png")
      this.load.image("logCollect", "assets/logCollect.png")
      this.load.image("logo", "assets/logo-inteli_branco.png")
      this.load.image("logHurt", "assets/logHurt.png")
      this.load.image("background1", "assets/m_merged.png")
      this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 200, frameHeight: 300 })
      this.load.spritesheet("personagem", "assets/Woodcutter_run.png", { frameWidth: 48, frameHeight: 48 })
  
    }

    create() {
      // window.alert("Olá, pronto para começar? Clique na tecla de espaço para pular, boa sorte!")
      this.volta = 0
      this.velocidadeObjetos = -300
      this.mainMenu = this.add.image(-5, -20, "background1").setScale(1.5).setOrigin(0, 0)

      this.coin = this.physics.add.sprite(1200, 500, "coin").setScale(0.2)
      this.coin.setCollideWorldBounds(true)
      this.coin.setVelocityX(this.velocidadeObjetos)
      this.coin.body.setSize(120, 310, true)
      this.anims.create({
        key: "animar",
        frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      })
      this.coin.anims.play("animar", true)


      this.personagem = this.physics.add.sprite(150, 510, "personagem").setScale(2.1)
      this.personagem.setCollideWorldBounds(true)
      this.personagem.setCollideWorldBounds(true)
      this.personagem.setSize(20, 60, true)
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

      this.logCollect = this.physics.add.sprite(1000, 520, "logCollect").setScale(0.4)
      this.logCollect.setCollideWorldBounds(true)
      this.logCollect.setVelocityX(this.velocidadeObjetos)
      this.logCollect.body.setSize(120, 150, true)
      this.physics.add.overlap(this.personagem, this.logCollect, () => { 
        this.logCollect.setVisible(false);
        this.positionLogX = Phaser.Math.RND.between(300, 1200);
        this.logCollect.setPosition(this.positionLogX, 500);
        this.logCollect.setVisible(true)}
      )

      
      this.physics.add.overlap(this.personagem, this.coin, () => { 
        this.coin.setVisible(false);
        this.positionCoinX = Phaser.Math.RND.between(300, 1200);
        this.coin.setPosition(this.positionCoinX, 500);
        this.coin.setVisible(true)}
      )


      this.logHurt = this.physics.add.sprite(1000, 520, "logHurt").setScale(0.4)
      this.logHurt.setCollideWorldBounds(true)
      this.logHurt.setVelocityX(this.velocidadeObjetos)
      this.logHurt.body.setSize(90, 140, true)
      this.physics.add.overlap(this.personagem, this.logHurt, () => { 
        this.scene.start("scene1")
        }
      )

      this.logo = this.physics.add.sprite(45, 540, "logo").setScale(0.3)
      this.logo.setCollideWorldBounds(true)
      this.logo.body.setSize(410, 160, true)

      this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

      
      this.physics.add.overlap(this.logo, this.logCollect, () => { 
        this.logCollect.setVisible(false);
        this.positionLogX = Phaser.Math.RND.between(300, 1200);
        this.logCollect.setPosition(this.positionLogX, 500);
        this.logCollect.setVisible(true)}
      )
      this.physics.add.overlap(this.logo, this.logHurt, () => { 
        this.logHurt.setVisible(false);
        this.positionLogHurtX = Phaser.Math.RND.between(800, 1250);
        this.logHurt.setPosition(this.positionLogHurtX, 500);
        this.logHurt.setVisible(true)}
      )
      this.physics.add.overlap(this.logo, this.coin, () => { 
        this.coin.setVisible(false);
        this.positionCoinX = Phaser.Math.RND.between(300, 1200);
        this.coin.setPosition(this.positionCoinX, 500);
        this.coin.setVisible(true)}
      )
      this.physics.add.collider(this.personagem, this.logo)

      this.add.text(50, 50, "Score:", {fontSize:'40px', fill:'#ffffff'})

    }
    
    update() {

      // Deslocamento do fundo
      if (this.mainMenu.width < 3000) {
        this.mainMenu.x -= 6 - this.volta;
        console.log(`Você está na volta ${-this.volta/0.07}`)
      }

      // Reposicionamento do fundo
      if (this.mainMenu.x <= -2001.89) {
        this.mainMenu.x = this.mainMenu.x + 2001.89;
        this.volta -= - 0.07
        this.velocidadeObjetos -= + 500*this.volta
      }
      if (this.space.isDown){
        this.personagem.setVelocityY(-600)
      }
    }
    
  }
  