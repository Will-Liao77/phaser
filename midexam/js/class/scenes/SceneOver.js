//copy from the begiging
class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {
        this.load.image("title", "images/coollogo_com-29748199.png");
        this.load.image("button1", "images/buttons/1.png");
        this.load.image("button2", "images/buttons/4.png");

    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        //controller = new Controller();
        var title = this.add.image(220, 200, 'title');
        Align.scaleToGameW(title, .5);
        Align.centerH(title);

        //show button
        var flatButton = new FlatButton({ scene: this, key: 'button1', text: 'play easy mode again!', x: 400, y: 400, event: 'startgame' });
        var flatButton = new FlatButton({ scene: this, key: 'button2', text: 'play difficult again!', x: 400, y: 500, event: 'startgame2' });
        emitter.on('startgame', this.startGame, this);
        emitter.on('startgame2', this.startGame2, this);
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    startGame2() {
        this.scene.start('SceneMain2');
    }
    update() {

    }
}