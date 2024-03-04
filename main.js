// Cria as configurações para Phaser.Game
var fundo1 = new Image()
fundo1.src = "assets/m_merged.png"

// Coloca as dimensões do jogo em uma variável
const gameDimensions = {
  width: 1280,
  height: 580,
}
const config = {
  type: Phaser.AUTO, // Ajusta o renderizador automaticamente (WebGL e Canvas)
  width: gameDimensions.width, // Define a largura como 1280 pixels
  height: gameDimensions.height, // Define a altura como 580 pixels
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1400 },// Define aceleração da gravidade
      debug: false, // Desativa ou ativa o debug
    },
  },

  scene: [Menu, Scene1], //Define a ordem das cenas
}

// Cria o jogo colocando a variável config como atributo(parâmetro)
const game = new Phaser.Game(config)
