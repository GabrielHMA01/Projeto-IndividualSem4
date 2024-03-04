// Definição da classe Scene1, que estende (herda) Phaser.Scene
class Scene1 extends Phaser.Scene {

  // Construtor da classe
  constructor() {

    // "Chama" o construtor da classe pai com a chave da cena
    super({
      key: "scene1",
    })
  }

  // Função de pré-carregamento de recursos
  preload() {
    // Carregamento de imagens e spritesheets necessários
    this.load.image("background1", "assets/m_merged.png")  // Carrega a imagem de fundo
    this.load.image("button", "button.png")  // Carrega a imagem da platafotma
    this.load.image("logCollect", "assets/logCollect.png")  // Carrega a imagem do tronco coletável
    this.load.image("logo", "assets/logo-inteli_branco.png")  // Carrega a imagem do logo
    this.load.image("logHurt", "assets/logHurt.png")  // Carrega a imagem do tronco prejudicial
    this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 200, frameHeight: 300 })  // Carrega a spritesheet da moeda
    this.load.spritesheet("personagem", "assets/Woodcutter_run.png", { frameWidth: 48, frameHeight: 48 })  // Carrega a spritesheet do personagem
  }

  // Função de criação de elementos na cena
  create() {
    // Exibição de mensagem de boas-vindas
    window.alert("Olá, pronto para começar? Clique na tecla de espaço para pular, desvie dos troncos que estão plantados (em pé) e colete os que já foram cortados e, é claro, pegue todas as moedas que puder! Boa sorte!")

    // Inicialização de variáveis de pontuação, posição e velocidade
    this.score = 0  // Inicializa a pontuação
    this.volta = 0  // Inicializa a volta
    this.velocidadeObjetos = -300  // Inicializa a velocidade dos objetos

    // Adição de elementos visuais
    this.mainMenu = this.add.image(-5, -20, "background1").setScale(1.5).setOrigin(0, 0)  // Adiciona a imagem de fundo
    this.placar = this.add.text(50, 50, `Score: 0`, { fontSize: "40px", fill: "#ffffff" })  // Adiciona o texto de pontuação

    // Configuração e animação da moeda
    this.coin = this.physics.add.sprite(1200, 540, "coin").setScale(0.2)  // Adiciona a moeda
    this.coin.setCollideWorldBounds(true)  // Define colisão com os limites do mundo
    this.coin.setVelocityX(this.velocidadeObjetos)  // Define a velocidade da moeda
    this.coin.body.setSize(120, 310, true)  // Define o tamanho do corpo para colisão
    this.anims.create({
      key: "animar",
      frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1,
    })
    this.coin.anims.play("animar", true)  // Inicia a animação da moeda

    // Configuração e animação do personagem
    this.personagem = this.physics.add.sprite(150, 510, "personagem").setScale(2.4)  // Adiciona o personagem
    this.personagem.setCollideWorldBounds(true)  // Define colisão com os limites do mundo
    this.personagem.setSize(10, 40, true)  // Define o tamanho do corpo para colisão
    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("personagem", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1,
    })
    this.personagem.anims.play("running", true)  // Inicia a animação do personagem

    // Configuração e animação do tronco coletável
    this.logCollect = this.physics.add.sprite(700, 540, "logCollect").setScale(0.4)  // Adiciona o tronco coletável
    this.logCollect.setCollideWorldBounds(true)  // Define colisão com os limites do mundo
    this.logCollect.setVelocityX(this.velocidadeObjetos)  // Define a velocidade do tronco coletável
    this.logCollect.body.setSize(180, 150, true)  // Define o tamanho do corpo para colisão

    // Colisão entre personagem e tronco coletável
    this.physics.add.overlap(this.personagem, this.logCollect, () => {
      this.score += 20  // Incrementa a pontuação
      this.placar.setText(`Score: ${this.score}`)  // Atualiza o texto de pontuação
      this.logCollect.setVisible(false)  // Torna o tronco coletável invisível
      this.positionLogX = Phaser.Math.RND.between(300, 900)  // Gera uma nova posição para o tronco coletável
      this.logCollect.setPosition(this.positionLogX, 540)  // Define a nova posição do tronco coletável
      this.logCollect.setVisible(true)  // Torna o tronco coletável visível novamente
    })

    // Colisão entre personagem e moeda
    this.physics.add.overlap(this.personagem, this.coin, () => {
      this.score += 50  // Incrementa a pontuação
      this.placar.setText(`Score: ${this.score}`)  // Atualiza o texto de pontuação
      this.coin.setVisible(false)  // Torna a moeda invisível
      this.positionCoinX = Phaser.Math.RND.between(300, 900)  // Gera uma nova posição para a moeda
      this.coin.setPosition(this.positionCoinX, 540)  // Define a nova posição da moeda
      this.coin.setVisible(true)  // Torna a moeda visível novamente
    })

    // Configuração e animação do tronco prejudicial
    this.logHurt = this.physics.add.sprite(1000, 530, "logHurt").setScale(0.4)  // Adiciona o tronco prejudicial
    this.logHurt.setCollideWorldBounds(true)  // Define colisão com os limites do mundo
    this.logHurt.setVelocityX(this.velocidadeObjetos)  // Define a velocidade

    // Colisão entre personagem e tronco prejudicial
    this.physics.add.overlap(this.personagem, this.logHurt, () => {
      this.scene.start("scene1")  // Reinicia a cena
    })

    // Configuração do logo
    this.logo = this.physics.add.sprite(50, 540, "logo").setScale(0.3)  // Adiciona o logo
    this.logo.setCollideWorldBounds(true)  // Define colisão com os limites do mundo
    this.logo.body.setSize(50, 200, true)  // Define o tamanho do corpo para colisão

    // Configuração de tecla de espaço
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)  // Adiciona o input da tecla de espaço

    // Colisões entre logo e elementos do cenário
    this.physics.add.overlap(this.logo, this.logCollect, () => {
      this.logCollect.setVisible(false)  // Torna o tronco coletável invisível
      this.positionLogX = Phaser.Math.RND.between(300, 900)  // Gera uma nova posição X para o tronco coletável
      this.logCollect.setPosition(this.positionLogX, 540)  // Define a nova posição do tronco coletável
      this.logCollect.setVisible(true)  // Torna o tronco coletável visível novamente
    })
    this.physics.add.overlap(this.logo, this.logHurt, () => {
      this.logHurt.setVisible(false)  // Torna o tronco prejudicial invisível
      this.positionLogHurtX = Phaser.Math.RND.between(1000, 1250)  // Gera uma nova posição X para o tronco prejudicial
      this.logHurt.setPosition(this.positionLogHurtX, 540)  // Define a nova posição do tronco prejudicial
      this.logHurt.setVisible(true)  // Torna o tronco prejudicial visível novamente
    })
    this.physics.add.overlap(this.logo, this.coin, () => {
      this.coin.setVisible(false)  // Torna a moeda invisível
      this.positionCoinX = Phaser.Math.RND.between(300, 900)  // Gera uma nova posição X para a moeda
      this.coin.setPosition(this.positionCoinX, 540)  // Define a nova posição da moeda
      this.coin.setVisible(true)  // Torna a moeda visível novamente
    })
    this.plataform = this.physics.add.sprite(100, 580, "button")  // Adiciona plataforma para o personagem
    this.plataform.setVisible(false)
    this.plataform.body.setSize(100, 25, true)  // Define o tamanho do corpo para colisão
    this.plataform.setCollideWorldBounds(true)
    this.physics.add.collider(this.plataform, this.personagem)

    
  }

  // Função de atualização da cena
  update() {
    // Deslocamento do fundo
    if (this.mainMenu.width < 3000) {
      this.mainMenu.x -= 6 - this.volta  // Desloca o fundo
      console.log(`Você está na volta ${this.volta / 0.07}`)  // Exibe em qual volta o jogador está no console
    }

    // Reposicionamento do fundo
    if (this.mainMenu.x <= -2001.89) {
      this.mainMenu.x = this.mainMenu.x + 2001.89  // Reposiciona o fundo
      this.volta -= -0.07  // Atualiza a volta, que irá aumentar a velocidade do jogo progressivamente
      this.velocidadeObjetos -= +(100000 * this.volta)  // Atualiza a velocidade dos objetos
    }

    // Verifica se a tecla de espaço está pressionada e se o personagem está no chão
    if (this.space.isDown && this.personagem.body.onFloor()) {
      this.personagem.setVelocityY(-900)  // Aplica uma velocidade vertical para simular o pulo
    }
  }
}