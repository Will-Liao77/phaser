class Controller {
    constructor() {
        //listening to the emitter
        emitter.on(G.TOGGLE_SOUND, this.toggleSound);
        emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
    }

    toggleSound(val) {
        model.soundOn = val;
    }
    toggleMusic(val) {
        model.musicOn = val;
    }
}