class SceneMainTwo extends Phaser.Scene {
    constructor() {
        super('SceneMainTwo');
        //this.config=config;

    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones);
        const enemy = this.createEnemy();
        const enemy2 = this.createEnemy2();
        const enemy3 = this.createEnemy3();
        const enemy4 = this.createEnemy4();

        this.physics.add.collider(enemy, layers.platformsColliders);
        this.physics.add.collider(enemy, layers.block, this.hitblock, null, this);
        this.physics.add.collider(enemy, player, this.hitEnemy, null, this);

        this.physics.add.collider(enemy2, layers.platformsColliders);
        this.physics.add.collider(enemy2, layers.block, this.hitblock, null, this);
        this.physics.add.collider(enemy2, player, this.hitEnemy2, null, this);

        this.physics.add.collider(enemy3, layers.platformsColliders);
        this.physics.add.collider(enemy3, layers.block, this.hitblock, null, this);
        this.physics.add.collider(enemy3, player, this.hitEnemy2, null, this);

        this.physics.add.collider(enemy4, layers.platformsColliders);
        this.physics.add.collider(enemy4, layers.block, this.hitblock, null, this);
        this.physics.add.collider(enemy4, player, this.hitEnemy2, null, this);

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                //godie : layers.godie                 
            }
        });


        this.physics.add.collider(layers.platformsColliders);
        this.physics.add.collider(player);

        //add camera on player
        this.setupFollowupCameraOn(player);
        stars = this.physics.add.group();
        stars.create(50, 250, 'star');
        stars.create(500, 250, 'star');
        stars.create(700, 250, 'star');
        stars.create(900, 250, 'star');
        stars.create(1500, 250, 'star');


        this.physics.add.collider(stars, layers.platformsColliders);
        this.physics.add.overlap(player, stars, this.CollectStar, null, this);
    }
    CollectStar(player, stars) {
        stars.disableBody(true, true);
        score += 10;
        if (score >= 50) {
            this.scene.start('SceneOver');
        }
    }
    hitblock() {
        var flag = 0;
        if (flag == 0) {
            this.enemy.setFlipX(false);
            flag = 1;
        }
        else {
            this.enemy.setFlipX(false);
            flag = 0;
        }
    }
    hitEnemy() {
        this.scene.start('SceneOver');
    }
    hitEnemy2() {
        this.scene.start('SceneOver');
    }
    hitEnemy3() {
        this.scene.start('SceneOver');
    }
    hitEnemy4() {
        this.scene.start('SceneOver');
    }

    createMap() {
        const map = this.make.tilemap({ key: 'map2' });
        map.addTilesetImage('main_lev_build_1', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset1 = map.getTileset('main_lev_build_1');

        const environment = map.createStaticLayer('environment', tileset1);
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset1);
        const platforms = map.createStaticLayer('platform', tileset1);
        const playerZones = map.getObjectLayer('player_zones');
        //const godie = map.createStaticLayer('die',tileset1);  
        const block = map.createStaticLayer('block', tileset1);


        //platforms.setCollisionByExclusion(-1,true);
        platformsColliders.setCollisionByExclusion(-1, true);
        //godie.setCollisionByExclusion(-1,true);
        return { environment, platforms, platformsColliders, playerZones };
    }

    createPlayer({ start, end }) {
        //return new Player(this,100,250);  
        return new Player(this, start.x, start.y, end.x, end.y);
    }

    createEnemy() {
        return new Birdman(this, 600, 350);

    }
    createEnemy2() {
        return new Birdman(this, 330, 150);

    }
    createEnemy3() {
        return new Birdman(this, 1310, 210);

    }
    createEnemy4() {
        return new Birdman(this, 1045, 580);

    }

    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformsColliders);
        player.addCollider(colliders.godie);
    }

    setupFollowupCameraOn(player) {
        //const{height, width, mapOffset} = this.config;
        const MAP_WIDTH = 1600;
        const Height = 600 + 50;
        this.physics.world.setBounds(0, 0, MAP_WIDTH, Height + 200);
        this.cameras.main.setBounds(0, 0, MAP_WIDTH, Height).setZoom(1.5);
        this.cameras.main.startFollow(player);

    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            //start: playerZones[0],
            start: playerZones.find(zone => zone.name === 'startZone'),
            //end: playerZones[1]
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }
}   
