class Sky extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, "sky");
        //add into container
        this.add(this.back);
        this.scene.add.existing(this);

    }
}