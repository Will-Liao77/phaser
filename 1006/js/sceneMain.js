class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image("face", "assets/face.png");
        this.load.spritesheet("boy", 'assets/boy.png', { frameWidth: 120, frameHeight: 210 })
    }
    create() {
        this.boy = this.add.sprite(game.config.width / 2, game.config.height / 2, 'boy');

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'boy', frame: 0 },
                { key: 'boy', frame: 1 },
                { key: 'boy', frame: 2 },
                { key: 'boy', frame: 3 },
                { key: 'boy', frame: 4 },
                { key: 'boy', frame: 5 }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.boy.play('walk');
        console.log(this.boy);
        //console.log("Ready!");
    }
    update() {

        this.tweens.add({ targets: this.boy, duration: 100, x: game.config.width });

        /*this.boy.x += 2;
        if (this.boy.x > game.config.width) {
            this.boy.x = 0;
        }*/
    }
}