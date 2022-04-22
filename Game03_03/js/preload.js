class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    preload() {
        //this.load.image("sky","assets/sky.png");
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.tilemapTiledJSON('map2', 'assets/map2.json');
        //tile set
        this.load.image('tiles-1', 'assets/main_lev_build_1.png');

        this.load.image('iceball', 'assets/iceball.png');
        this.load.image('star', 'assets/weed2.png');
        //this.load.image('weed', 'assets/weed.jpg');

        //add sprite
        //this.load.image('player','assets/player/movements/idle01.png');
        this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
            frameWidth: 32, frameHeight: 38, spacing: 32
        });

        //add enemy
        this.load.spritesheet('birdman', 'assets/enemy/enemy_sheet.png', {
            frameWidth: 32, frameHeight: 64, spacing: 32
        });

    }
    create() {
        this.scene.start('SceneMain');
    }
}
