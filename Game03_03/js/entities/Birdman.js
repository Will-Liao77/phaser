class Birdman extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'birdman');     
        

        scene.add.existing(this);
        scene.physics.add.existing(this);  
        
        this.init();
        this.update();
    }

    init(){
        this.gravity = 500;
        this.birdmanSpeed = 10;
        
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true); 
        this.setOrigin(0.5,1);
        this.setSize(20,45);
        this.setOffset(7,20);

        //animation of enemy
        this.scene.anims.create({
            key:'birdman-idle',
            frames:this.scene.anims.generateFrameNumbers('birdman',{start:0, end:12}),
            frameRate:8,
            repeat:-1
                })
    } 


    update(){
        this.play('birdman-idle',true);

        this.setVelocityX(5);

    }

       
}