
// Cria as configurações para Phaser.Game
const gameDimensions = {
    width: 1280,
    height: 580,
}
const config = {
    type: Phaser.AUTO, // Ajusta o renderizador automaticamente (WebGL e Canvas)
    width: gameDimensions.width,  // Define a largura para 1280 pixels
    height: gameDimensions.height, // Define a altura
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

// Cria o jogo colocando a variável config como atributo(parâmetro)
const game = new Phaser.Game(config);


