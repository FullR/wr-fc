const Q = require("q");
const HowlerModule = require("howler");
const Howl = HowlerModule.Howl;
const Howler = HowlerModule.Howler;
const noop = () => {};

function applyMediaPolyfill() {
    window.Media = window.Media || (window.plugin || {}).Media || MediaPollyfill;
}

function MediaPollyfill(url, onFinishPlaying, onErrorPlaying, onPlayingStatus) {
    this.url = url;
    this.onFinishPlaying = onFinishPlaying || noop;
    this.onErrorPlaying = onErrorPlaying || noop;
    this.onPlayingStatus = onPlayingStatus || noop;
}


MediaPollyfill.prototype = {
    load() {
        const deferred = Q.defer();

        this.sound = new Howl({
            urls:        [this.url],
            autoplay:    false,
            volume:      1,
            onend:       this.onFinishPlaying,
            onload:      deferred.resolve,
            onloaderror: deferred.reject
        });

        return deferred.promise;
    },

    stop() {
        if(this.sound) {
            this.sound.stop();
        }
    },

    play() {
        if(this.sound) {
            this.sound.play();
        }
    },

    release() {
        if(this.sound) {
            this.sound.unload();
            this.sound = null;
        }
    },

    setVolume() {
        // noop
    }
};

MediaPollyfill.mute = function() {
    Howler.mute();
};

MediaPollyfill.unmute = function() {
    Howler.unmute();
};

module.exports = applyMediaPolyfill;
