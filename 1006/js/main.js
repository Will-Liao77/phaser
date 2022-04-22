
var game;

window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 600,

        parent: 'phaser-game',

        scene: [SceneMain]
    };

    game = new Phaser.Game(config);

}