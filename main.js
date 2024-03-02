
// Cria as configurações para Phaser.Game
const gameDimensions = {
    width: 1200,
    height: 600,
}
const config = {
    type: Phaser.AUTO, // Ajusta o renderizador automaticamente (WebGL e Canvas)
    width: gameDimensions.width,  // Ajusta a largura para 1200 pixels
    height: gameDimensions.height, // Ajusta a altura
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },

    scene: [
        Menu, Scene1
    ],
    
};

// Cria o jogo passando a variável config como atributos
const game = new Phaser.Game(config);


