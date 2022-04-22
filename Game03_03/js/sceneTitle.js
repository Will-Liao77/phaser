//copy from the begiging
class SceneTitle extends Phaser.Scene{
    constructor(){
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("title","assets/logo.png");
        this.load.image("button1","assets/1.png");

    }
    create()
    {
        emitter=new Phaser.Events.EventEmitter();
        controller = new Controller();
        var title=this.add.image(game.config.width/2,100,'title');
        Align.scaleToGameW(title,.8);
    
        //show button
        var flatButton=new FlatButton({scene:this,key:'button1',text:'Start!',x:game.config.width/2,y:400,event:'start_game'});
        emitter.on('start_game',this.startGame,this);

    }

    startGame(){
        this.scene.start('PreloadScene');
    }
    update()
    {

    }
}