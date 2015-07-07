const Q = require("q");

function applyMediaPolyfill() {
    const noop = () => {};
    let HowlerModule;
    let Howler;
    let Howl;

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
