class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        this.load.image("title", "images/coollogo_com-29748199.png");
    }
    create() {
        var title = this.add.image(220, 200, 'title');

    }
    update() {

    }
}