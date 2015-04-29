var Q         = require("q");
var _         = require("lodash");
var emitter   = require("mixins/emitter");
var normalize = require("polyfills/cordova/normalize-sound-ext");

function Sound(options) {
    _.extend(this, options);
    _.bindAll(this);
}

_.extend(Sound.prototype, emitter, {
    // Get the full sound path with the correct extention for the current platform
    getNormalizedPath: function() {
        return normalize.path(this.path) + "." + normalize.audioExtention;
    },

    load: function() {
        var media;
        var loadPromise;
        
        if(!this._loadPromise) {
            this.media = media = new window.Media(this.getNormalizedPath(), 
                                     this._finishedPlaying.bind(this), 
                                     this._finishedPlaying.bind(this));
            this.loading = true;

            if(media.load) {
                loadPromise = media.load().then(function() {
                    return this;
                }.bind(this));
            }
            else {
                loadPromise = Q.resolve(this);
            }

            this._loadPromise = loadPromise.then(function() {
                this.loading = false;
                this.loaded = true;
                return this;
            }.bind(this));
        }

        return this._loadPromise;
    },

    _finishedPlaying: function(stopped) {
        var deferred = this.deferred;
        this.playing = false;
        
        if(deferred) {
            deferred.resolve();
            this.deferred = null;
            return deferred.promise;
        }

        return Q.resolve();
    },

    play: function() {
        if(!this.loaded) {
            return Q.resolve();
        }
        return this.stop()
            .then(function() {
                var deferred = Q.defer();
                this.deferred = deferred;
                this.playing = true;
                this.media.play();

                this.fire("play");
                return deferred.promise;
            }.bind(this))
            .then(function() {
                this.playing = false;
                this.fire("end");
            }.bind(this));
    },

    isPlaying: function() {
        return this.playing;
    },

    stop: function() {
        if(this.deferred) {
            this.media.stop();
            return this._finishedPlaying();
        }
        return Q.resolve();
    },

    release: function() {
        if(this.media) {
            this.fire("end");
            this.media.release();
            this._loadPromise = null;
        }
    }
});

module.exports = Sound;
