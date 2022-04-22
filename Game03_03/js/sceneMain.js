class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain');               
        //this.config=config;
        
    }

    create()
    {
        const map = this.createMap();
        const layers=this.createLayers(map); 
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones);
        //const enemy = this.createEnemy();
        
                      
        //this.physics.add.collider(player,layers.platformsColliders);
        //player.addCollider(layers.platformsColliders);
        this.createPlayerColliders(player, {
            colliders:{
                platformsColliders : layers.platformsColliders,
                //godie : layers.godie                 
            }
        });


        this.physics.add.collider(layers.platformsColliders);
        this.physics.add.collider(player);

        //add camera on player
        this.setupFollowupCameraOn(player);
    }


    createMap(){
        const map = this.make.tilemap({key:'map'});
        map.addTilesetImage('main_lev_build_1','tiles-1');
        return map;
    }

    createLayers(map){
        const tileset1 = map.getTileset('main_lev_build_1');
        
        const environment = map.createStaticLayer('environment',tileset1);
        const platformsColliders = map.createStaticLayer('platforms_colliders',tileset1);
        const platforms = map.createStaticLayer('platform',tileset1);
        const playerZones = map.getObjectLayer('player_zones');   
        //const godie = map.createStaticLayer('die',tileset1);   
        

        //platforms.setCollisionByExclusion(-1,true);
        platformsColliders.setCollisionByExclusion(-1,true);
        //godie.setCollisionByExclusion(-1,true);
        return{environment,platforms,platformsColliders,playerZones};
    }

    createPlayer({start,end}){        
        //return new Player(this,100,250);  
        return new Player(this,start.x,start.y,end.x,end.y);        
    }

    createEnemy(){
        return new Birdman(this,400,150);

    }

    createPlayerColliders(player,{ colliders }){
        player.addCollider(colliders.platformsColliders);
        player.addCollider(colliders.godie);
    }

    setupFollowupCameraOn(player){
        //const{height, width, mapOffset} = this.config;
        const MAP_WIDTH =1600;
        const Height =600+50;
        this.physics.world.setBounds(0,0, MAP_WIDTH,Height+200);
        this.cameras.main.setBounds(0,0,MAP_WIDTH, Height).setZoom(1.5);
        this.cameras.main.startFollow(player);

    }

    getPlayerZones(playerZonesLayer){
        const playerZones = playerZonesLayer.objects;
        return{
            //start: playerZones[0],
            start: playerZones.find(zone => zone.name === 'startZone'),
            //end: playerZones[1]
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }
}