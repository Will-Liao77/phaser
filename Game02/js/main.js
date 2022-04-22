var game;
var model;
var emitter;
var G; // stand for Game
var controller;

window.onload=function(){
    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        parent: 'phaser-game',
        //scene: [SceneTitle,SceneMain]
        scene: [SceneTitle,SceneMain,SceneOver]
    };

    G=new Constants();
    model = new Model();
    game = new Phaser.Game(config);
}