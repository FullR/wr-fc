const Q         = require("q");
const _         = require("lodash");
const emitter   = require("mixins/emitter");
const normalize = require("polyfills/cordova/normalize-sound-ext");

function Sound(options) {
    _.extend(this, options);
    _.bindAll(this);
}

_.extend(Sound.prototype, emitter, {
    // Get the full sound path with the correct extention for the current platform
    getNormalizedPath() {
        return normalize.path(this.path) + "." + (this.extention || normalize.audioExtention);
    },

    load() {
        let media;
        let loadPromise;
        
        if(!this._loadPromise) {
            this.media = media = new window.Media(this.getNormalizedPath(), 
                                     this._finishedPlaying.bind(this), 
                                     this._finishedPlaying.bind(this));

            if(media.load) {
                this._isLoading = true;
                loadPromise = media.load().then(() => {
                    this._isLoading = false;
                    return this;
                });
            }
            else {
                loadPromise = Q.resolve(this);
            }

            this._loadPromise = loadPromise.then(function() {
                return this;
            }.bind(this));
        }

        return this._loadPromise;
    },

    _finishedPlaying(stopped) {
        let deferred = this.deferred;
        this.playing = false;
        this.timeout = null;
        
        if(deferred) {
            deferred.resolve();
            this.deferred = null;
            return deferred.promise;
        }

        return Q.resolve();
    },

    play(delay) {
        return this.load()
            .then(() => this.stop())
            .then(() => {
                let deferred;
                if(delay) {
                    deferred = Q.defer();
                    this.timeout = setTimeout(deferred.resolve, delay);
                    return deferred.promise;
                }
                return Q.resolve();
            })
            .then(() => {
                let deferred = Q.defer();
                this.timeout = null;
                this.deferred = deferred;
                this.playing = true;
                this.media.play();

                this.fire("play");
                return deferred.promise;
            }.bind(this))
            .then(() => {
                this.playing = false;
                this.fire("end");
            }.bind(this));
    },

    isPlaying() {
        return this.playing;
    },

    stop() {
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if(this.deferred) {
            this.media.stop();
            return this._finishedPlaying();
        }
        return Q.resolve();
    },

    isLoaded() {
        return !!this.media;
    },

    release() {
        if(this._loadPromise) {
            this._loadPromise.then(() => {
                console.log(`Releasing ${this.path}`);
                this.fire("end");
                this.media.release();
                this.media = null;
                this._loadPromise = null;
            });
        }
    }
});

module.exports = Sound;
