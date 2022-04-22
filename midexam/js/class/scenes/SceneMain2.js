var cursors;
var player;
var platforms;
var stars;
var scoreText;
var pcars;
var objects;
class SceneMain2 extends Phaser.Scene {
    constructor() {
        super('SceneMain2');
    }
    preload() {
        this.load.audio('bgm', 'audio/background.mp3');
        this.load.image('ground', 'images/platform.png');
        this.load.image('star', 'images/star.png');
        this.load.image('bomb', 'images/bomb.png');
        this.load.image("sky", "images/sky.png");
        this.load.spritesheet("alien", "images/dude.png",
            {
                frameWidth: 32,
                frameHeight: 48
            });
        this.load.image("button1", "images/buttons/1.png");
        this.load.image("button2", "images/buttons/4.png");
        this.load.audio("whoosh", ['audio/whoosh.mp3', 'audio/whoosh.ogg']);
        this.load.audio("boom", ['audio/boom.mp3', 'audio/boom.ogg']);
        this.load.image("toggleBack", "images/toggles/1.png");
        this.load.image("sfx_off", "images/icons/sfx_off.png");
        this.load.image("sfx_on", "images/icons/sfx_on.png");
        this.load.image("music_on", "images/icons/music_on.png");
        this.load.image("music_off", "images/icons/music_off.png");
        this.load.image("cone", "images/cone.png");
        this.load.image("pcar", "images/pcar1.png");

    }

    create() {
        emitter = new Phaser.Events.EventEmitter();//已存在

        var mediaMananger = new MediaManager({ scene: this });

        var sky = new Sky({ scene: this });
        sky.x = game.config.width / 2;
        sky.y = game.config.height / 2;

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, "alien");
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 3 }),
            frameRate: 10, //每秒10個frame
            repeat: -1      //重複播放
        });

        //move to left
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('alien', { start: 5, end: 8 }),
            frameRate: 10, //每秒10個frame
            repeat: -1      //重複播放
        });

        // 轉身動作
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'alien', frame: 4 }],
            frameRate: 20
        });

        cursors = this.input.keyboard.createCursorKeys();

        var objs = ['star', 'cone'];
        objects = this.physics.add.group();
        //var index = Math.floor(Math.random() * 3);
        var index;

        for (let i = 0; i < 12; i++) {
            index = Math.floor(Math.random() * 10) > 1 ? 0 : 1;
            objects.create(40 + i * 70, 50, objs[index]);
        }

        /*stars = this.physics.add.group({
            key: objs[Math.floor(Math.random() * 3)].key,
            repeat: 11, //(0---11) 共12 個
            setXY: { x: 12, y: 0, stepX: 70 }
        });*/


        objects.children.iterate(function (child) {
            child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.overlap(player, objects, Collect, null, this);
        this.physics.add.collider(platforms, objects);

        scoreText = this.add.text(100, 16, 'Score:0', { fontSize: '32px', fill: '#000' });

        //加入障礙物
        pcars = this.physics.add.group();

        //障礙物與平台的關係
        this.physics.add.collider(pcars, platforms);

        //障礙物與主角的關係
        this.physics.add.collider(pcars, player, hitcar, null, this);

        function hitcar(player, bomb) {

            if ((score - 100) > 0) {
                score -= 100;
                scoreText.setText('Score: ' + score);
            } else {
                this.physics.pause();
                player.setTint(0xff0000);
                player.anims.play('turn');
                emitter.emit(G.PLAY_SOUND, "boom");
                model.gameOver = true;
                this.scene.start("SceneOver");
            }

        };

        var score = 0;

        //紀錄使用者碰到星星之後的效果
        function Collect(player, obj) {
            obj.disableBody(true, true);
            if (obj.texture.key[0] == 's') {
                score += 15;
            } else {
                score += 5;
            }
            scoreText.setText('Score: ' + score);
            emitter.emit(G.PLAY_SOUND, "whoosh");
        };
        var flatButton = new FlatButton({ scene: this, key: 'button1', text: 'mute', x: 450, y: 50, event: 'button_pressed' });
        var toggleButton = new ToggleButton({ scene: this, backKey: 'toggleBack', onIcon: 'sfx_on', offIcon: 'sfx_off', event: G.TOGGLE_SOUND, x: 650, y: 50 });
        var toggleButton = new ToggleButton({ scene: this, backKey: 'toggleBack', onIcon: 'music_on', offIcon: 'music_off', event: G.TOGGLE_MUSIC, x: 750, y: 50 });

        emitter.on('button_pressed', this.buttonPressed, this);

        mediaMananger.setBackgroundMusic('bgm');
    }

    buttonPressed(params) {
        console.log(params);
        model.musicOn = !model.musicOn;
        //emitter.emit(G.PLAY_SOUND, 'whoosh')
    }

    update() {
        if (cursors.right.isDown) {
            player.setVelocityX(160); //每秒 160 px 向右移動
            player.anims.play('right', true); //執行你在 create 中的動作
        }
        //to left
        else if (cursors.left.isDown) {
            player.setVelocityX(-160); //每秒 160 px 向左移動
            player.anims.play('left', true); //執行你在 create 中的動作
        }
        //don't move
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        //向上跳躍
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-350);
        }
        console.log(objects.countActive(true));
        if (objects.countActive(true) == 0) {
            //重新產生星星

            objects.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            //判斷主角出現的位置 若主角在左邊 炸彈就應該落在右邊
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            //bomb 的位置 :x
            console.log(x);

            //增加困難度
            //var bomb = bombs.create(0,16,'bomb');

            var pcar = pcars.create(x, 16, 'pcar');


            pcar.setBounce(1);

            //碰到邊界要會彈回來
            pcar.setCollideWorldBounds(true);

            pcar.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

}