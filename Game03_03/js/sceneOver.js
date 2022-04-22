//copy from the begiging
class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {
        this.load.image("title2", "assets/over.png");
        this.load.image("button1", "assets/1.png");

    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        var title = this.add.image(game.config.width / 2, 100, 'title2');
        Align.scaleToGameW(title, .8);

        //show button
        var flatButton = new FlatButton({ scene: this, key: 'button1', text: 'gameover!', x: game.config.width / 2, y: 400, event: 'start_game' });
        emitter.on('start_game', this.startGame, this);

    }

    startGame() {
        this.scene.start('PreloadScene');
    }
    update() {

    }
}