class Model {
    constructor() {
        this.soundOn = true;
        this._musicOn = true;
        //this.gameOver = false;
    }
    set musicOn(val) {
        this._musicOn = val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOn() {
        return this._musicOn;
    }

}