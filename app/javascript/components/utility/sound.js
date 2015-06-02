const React = require("react");
const soundManager = require("sound/sound-manager");

const Sound = React.createClass({
    componentWillMount() {
        this.sound = soundManager.get(this.props.path);

        if(this.props.onPlay) {
            this.sound.on("play", this.props.onPlay);
        }
        if(this.props.onEnd) {
            this.sound.on("end", this.props.onEnd);
        }

        this.sound.load().then(() => {
            if(this.props.autoplay) {
                if(this.props.delay) {
                    this.timeout = setTimeout(() => {
                        this.timeout = null;
                        this.sound.play();
                    }, this.props.delay);
                }
                else {
                    this.sound.play();
                }
            }
        });
    },

    componentWillUnmount() {
        if(this.sound) {
            soundManager.release(this.sound);
        }
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    },

    play() {
        if(this.isMounted()) {
            return this.sound.play();
        }
    },

    stop() {
        if(this.isMounted()) {
            return this.sound.stop();
        }
    },

    isPlaying() {
        return this.sound.isPlaying();
    },

    render() {
        return <div style={{display: "none"}}/>;
    }
});

module.exports = Sound;
