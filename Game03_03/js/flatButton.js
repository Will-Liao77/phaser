class FlatButton extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        if(!config.scene)
        {
            console.log("missing scene!");
            return;
        }
        if(!config.key){
            console.log("missing key");
            return;
        }
        super(config.scene);

        this.config=config;
        this.scene=config.scene;
        this.back=this.scene.add.image(0,0,config.key);

        this.add(this.back);

        this.onIcon=this.scene.add.image(0,0,config.onIcon);
        this.offIcon=this.scene.add.image(0,0,config.offIcon);
        Align.scaleToGameW(this.onIcon,.05);
        Align.scaleToGameW(this.offIcon,.05);
        this.add(this.onIcon);
        this.add(this.offIcon);

        if(!config.value){
            config.value=true;
        }

        this.value=config.value;

        if(config.text){
            //調整圖示
            if(config.textConfig){
                this.text1=this.scene.add.text(0,0,config.text,config.textConfig);
            }
            else
            {                
                this.text1=this.scene.add.text(0,0,config.text);
            }
           
            this.text1.setOrigin(0.5,0.5);
            this.add(this.text1);
        }

        if(config.x){
            this.x=config.x;
        }

        if(config.y){
            this.y=config.y;
        }

        this.scene.add.existing(this);

        if(config.event){
            this.back.setInteractive();
            //check this
            this.back.on('pointerdown', this.pressed ,this);
        }

        this.setIconss();
    }

    pressed(){
        
        if(this.config.params){
            emitter.emit(this.config.event, this.config.params);
            this.value=!this.value;
            this.setIconss();
        }
        else{
            emitter.emit(this.config.event);
        }
        
    }

    setIconss(){
        if(this.value==true)
        {
            this.onIcon.visible=true;
            this.offIcon.visible=false;
        }
        else{
            this.onIcon.visible=false;
            this.offIcon.visible=true;
        }
    }
}