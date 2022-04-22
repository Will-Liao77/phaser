class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, a, b) {
        super(scene, x, y, 'player');
        this.a = a;
        this.b = b;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        this.playerSpeed = 140;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setCollideWorldBounds(true);
        this.item;

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 11, end: 16 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 17, end: 23 }),
            frameRate: 2,
            repeat: 1
        })

        this.scene.input.keyboard.on('keydown-Q', () => {
            console.log("OYA");
            const projectile = new Projectile(this.scene, this.x, this.y, 'iceball');
            // key 的部分輸入我們要發射的武器,現階段先命名為 iceball, 接著我們將圖案載入(如下)
            //發射武器
            projectile.fire();
            item = projectile;
        })

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        const { left, right, space, up } = this.cursors;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const onFloor = this.body.onFloor();
        if ((((this.a - 10) <= this.x) && (this.x <= (this.a + 10))) && (((this.b - 10) <= this.y) && (this.y <= (this.b + 10)))) {
            this.scene.scene.start('SceneMainTwo');
        }

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
            //console.log("this.a = " + this.a);
            //console.log("this.b = " + this.b);
            //console.log("this.x = " + this.x);
            //console.log("this.y = " + this.y);
        }
        else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        }
        else {
            this.setVelocityX(0);
            //console.log(this.x+","+this.y);
        }

        if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerSpeed * 1.6);
            this.jumpCount++;
            console.log(this.jumpCount);
        }

        if (onFloor) {
            this.jumpCount = 0;
        }

        onFloor ?
            this.body.velocity.x !== 0 ?
                this.play('run', true) : this.play('idle', true) :
            this.play('jump', true);

    }

    addCollider(otherGameobject, callback) {
        this.scene.physics.add.collider(this, otherGameobject, callback, null, this);
    }

}