class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain');
    }

    preload()
    {
        this.load.image("road","images/road.jpg");
        this.load.spritesheet("cars","images/cars.png",
              {   frameWidth:60,
                  frameHeight:126
              });
            
        this.load.image("line","images/lines.png");   
        this.load.image("pcar1","images/pcar1.png");
        this.load.image("pcar2","images/pcar2.png");
        this.load.image("barrier","images/barrier.png");
        this.load.image("cone","images/cone.png");    
        
        //button
        this.load.image("button1","images/buttons/1.png");
        //button2
        //this.load.image("button2","images/buttons/5.png");

        //sound
        this.load.audio("boom",["audio/boom.mp3","audio/boom.ogg"]);
        this.load.audio('backgroundMusic',["audio/random-race.mp3","audio/random-race.ogg"]);
        this.load.audio('whoosh',['audio/whoosh.mp3','audio/whoosh.ogg']);

        //music related
        this.load.image("toggleBack","images/toggles/1.png");
        this.load.image("sfx_off","images/icons/sfx_off.png");
        this.load.image("sfx_on","images/icons/sfx_on.png");
        this.load.image("music_on","images/icons/music_on.png");
        this.load.image("music_off","images/icons/music_off.png");
    }

    create()
    {
        model.gameOver=false;
        //emitter=new Phaser.Events.EventEmitter();
        //controller = new Controller();

        //console.log("Ready!");
        this.road = new Road({scene:this});
        this.road.x=game.config.width/2;
        this.road.makeLines();

        //show score
        this.sb=new ScoreBox({scene:this});
        this.sb.x=game.config.width-50;
        this.sb.y=50;

        model.score=100;
        console.log(model.score);

        //set up the font size
        var fireText={color:'black',fontSize:30};

        //show button
        var flatButton=new FlatButton({scene:this,key:'button1',text:'Fire!',x:240,y:200,event:'button_pressed',params:'fire_lasers',textConfig:fireText});
        //button 2
        //var flatButton2=new FlatButton({scene:this,key:'button2',text:'Destruct!',x:240,y:450,event:'button_pressed',params:'self_descruct'});
        
        //button 3
        var toggleButton= new ToggleButton({scene:this,backKey:'toggleBack',onIcon:'sfxOn',offIcon:'sfxOff',event:G.TOGGLE_SOUND,x:50,y:20});

        //button 4
        var toggleButton= new ToggleButton({scene:this,backKey:'toggleBack',onIcon:'musicOn',offIcon:'musicOff',event:G.TOGGLE_MUSIC,x:450,y:20});


        emitter.on('button_pressed', this.buttonPressed, this);

        var mediaMananger=new MediaManager({scene:this});     
        mediaMananger.setBackgroundMusic('backgroundMusic');  
       
    }

    buttonPressed(params){
        console.log(params);
        //model.musicOn=false;
        model.musicOn=!model.musicOn;
        //this.scene.start("SceneOver");
        //emitter.emit(G.PLAY_SOUND,'boom');
    }

    update()
    {
        this.road.moveLines();

        this.road.moveObject();
        
    }

}