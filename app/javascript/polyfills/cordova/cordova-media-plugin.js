var Q = require("q");

function applyMediaPolyfill() {
    var noop = function() {},
        HowlerModule,
        Howler,
        Howl;

    function MediaPollyfill(url, onFinishPlaying, onErrorPlaying, onPlayingStatus) {
        this.url = url;
        this.onFinishPlaying = onFinishPlaying || noop;
        this.onErrorPlaying = onErrorPlaying || noop;
        this.onPlayingStatus = onPlayingStatus || noop;
    }

    if(!window.Media) {
        HowlerModule = require("howler");
        Howl = HowlerModule.Howl;
        Howler = HowlerModule.Howler;

        MediaPollyfill.prototype = {
            load: function() {
                var deferred = Q.defer();

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

            stop: function() {
                if(this.sound) {
                    this.sound.stop();
                }
            },

            play: function() {
                if(this.sound) {
                    this.sound.play();
                }
            },

            release: function() {
                //if(this.sound) {
                //    this.sound.unload();
                //    this.sound = null;
                //}
            }
        };

        MediaPollyfill.mute = function() {
            Howler.mute();
        };

        MediaPollyfill.unmute = function() {
            Howler.unmute();
        };

        window.Media = MediaPollyfill;
    }
    return window.Media;
}

module.exports = applyMediaPolyfill;