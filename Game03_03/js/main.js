var game;
var model;
var emitter;
var score=0;
var G; // stand for Game
var controller;
var stars;

window.onload=function(){

    const MAP_WIDTH =1600;
    const WIDTH = document.body.offsetWidth;
    const HEIGHT =600;


     const config = {
        type: Phaser.AUTO,
        mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH:0,  
        width:WIDTH,
        height:HEIGHT,
        
        physics:{
            default:'arcade',
            arcade:{
                gravity:{y:300},
                debug:false
            }
        },
        parent: 'phaser-game',
        scene: [SceneTitle,PreloadScene,SceneMain,SceneMainTwo,SceneOver]
    };
   
    G=new Constants();
    model = new Model();
    game = new Phaser.Game(config);
   

}