const React = require("react");
const soundManager = require("sound/sound-manager");
const Word = require("components/activity/word");
const Definition = require("components/activity/definition");
const Sound = require("components/utility/sound");
const colors = require("colors");
const dictionary = window.dictionary;

const ExampleWord = React.createClass({
    mixins: [require("mixins/style")],

    getInitialState() {
        return {
            playing: false
        };
    },

    isPlaying() {
        return this.state.playing;
    },

    onPlay() {
        if(this.isMounted()) {
            this.setState({
                playing: true
            });
        }
    },

    onEnd() {
        if(this.isMounted()) {
            this.setState({
                playing: false
            });
        }
    },

    play() {
        this.refs.sound.play();
        if(this.props.onPlay) {
            this.props.onPlay();
        }
    },

    render() {
        const playable = this.props.playable;
        const style = {
            width: "100%",
            fontSize: 32,
            marginTop: 6,
            paddingTop: 10,
            paddingBottom: 10,
            transition: "opacity 0.25s",
            opacity: this.props.hidden ? 0 : 1,
            cursor: playable ? "pointer" : null,
            background: this.isPlaying() ? colors.DISPLAY_BOX_BG_HOVER : null,

            states: [
                {hover: {
                    background: playable ? colors.DISPLAY_BOX_BG_HOVER : null
                }}
            ]
        };

        return (
            <div {...this.getStyle(style)} onClick={playable ? this.play : null}>
                {playable ?
                    <Sound ref="sound" 
                        path={dictionary.get(this.props.wordId).soundFile}
                        onPlay={this.onPlay}
                        onEnd={this.onEnd}/> :
                    null
                }
                <Word wordId={this.props.wordId} underlinedPartId={this.props.underlinedPartId}/>: <Definition partId={this.props.wordId}/>
            </div>
        );
    }
});

module.exports = ExampleWord;
