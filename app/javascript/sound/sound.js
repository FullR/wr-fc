import {Observable} from "rx";
const {extend, bindAll, noop} = require("lodash");
const emitter = require("mixins/emitter");
const normalize = require("polyfills/cordova/normalize-sound-ext");

const NativeAudioPolyfill = {
    preloadSimple() {},
    preloadComplex() {},
    play() {},
    loop() {},
    stop() {},
    unload() {},
    setVolumeForComplexAsset() {}
}

const NativeAudio = getNativeAudio();

function getNativeAudio() {
    if(window.plugins && window.plugins.NativeAudio) {
        console.log("NativeAudio detected");
        return window.plugins.NativeAudio;
    } else {
        console.log("Could not find NativeAudio. Using polyfill");
        return NativeAudioPolyfill;
    }
}

function getDevicePath(path) {
    return `${normalize.path(`/assets/audio/${path}`)}.${normalize.audioExtention}`;
}

function wait(ms) {
    return Observable.create((observer) => {
        return clearTimeout.bind(null, setTimeout(() => {
            observer.onNext();
            observer.onCompleted();
        }, ms));
    });
}

class Sound {
    constructor(options) {
        extend(this, options);
        bindAll(this);
        this.devicePath = getDevicePath(this.path);
        this.audioId = this.devicePath;
        this._loaded = false;
        this._playing = false;
        console.log("Initialized sound object:", this.path, this);
    }

    _playWithDelay(delayTime) {
        console.log(`Delaying ${delayTime}ms`);
        return wait(delayTime)
            .flatMap(() => this._playWithoutDelay());
    }

    _playWithoutDelay() {
        const {path, audioId} = this;
        return Observable.create((observer) => {
            console.log("Playing:", this.path);
            NativeAudio.play(this.audioId, 
                () => {
                    console.log("Play successful:", this.path);
                    this._playing = true;
                }, // on success
                (error) => {
                    console.log("Play failed:", this.path, error);
                    observer.onError(error);
                },
                () => {
                    console.log("Play completed:", this.path);
                    this._playing = false;
                    observer.onNext();
                    observer.onCompleted();
                }
            );

            return this.stop;
        });
    }

    loadToObservable() {
        return Observable.create((observer) => {
            this.load().then(
                () => observer.onNext(), 
                (error) => observer.onError(error)
            );
        });
    }

    load() {
        if(this._loaded) return Promise.resolve();
        console.log("Loading", this.path);
        return new Promise((resolve, reject) => NativeAudio.preloadSimple(this.audioId, this.devicePath, resolve, reject))
            .then(() => {
                console.log("Load successful:", this.path);
                this._loaded = true;
            }, (error) => {
                console.log("Load failed:", this.path, error);
            });
    }

    play(delay) {
        return this.loadToObservable().flatMap(() => {
            if(delay) {
                return this._playWithDelay(delay);
            } else {
                return this._playWithoutDelay(delay);
            }
        });
    }

    stop() {
        if(!this._playing) return Promise.resolve();
        console.log("Stopping:", this.path);
        return new Promise((resolve) => NativeAudio.stop(this.audioId, resolve, reject)).then(() => {
            console.log("Stopped successfully:", this.path);
            this._playing = false;
        }, (error) => {
            console.log("Stop failed:", this.path, error);
        });
    }

    release() {
        console.log("Releasing:", this.path);
        return new Promise((resolve) => NativeAudio.unload(this.audioId, resolve, reject))
            .then(() => {
                console.log("Release successful:", this.path);
                this._loaded = false;
                this._playing = false;
            }, (error) => {
                console.log("Releasing failed:", this.path, error);
                this._loaded = false;
                this._playing = false;
            });
    }

    isLoaded() {
        return this._loaded;
    }

    isPlaying() {
        return this._playing;
    }
}

extend(Sound.prototype, emitter);

module.exports = Sound;
