var game;
var model;
var emitter;
var G; // stand for Game
var controller;

window.onload = function () {
    //paste the config
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        parent: 'phaser-game',
        scene: [SceneTitle, SceneMain, SceneOver, SceneMain2]    //SceneMain
    };

    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
}