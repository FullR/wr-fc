var React = require("react");
var soundManager = require("sound/sound-manager");
var Word = require("components/activity/word");
var Definition = require("components/activity/definition");
var Sound = require("components/utility/sound");
var colors = require("colors");
var dictionary = window.dictionary;

var ExampleWord = React.createClass({
    mixins: [require("mixins/style")],

    getInitialState: function() {
        return {
            playing: false
        };
    },

    isPlaying: function() {
        return this.state.playing;
    },

    onPlay: function() {
        if(this.isMounted()) {
            this.setState({
                playing: true
            });
        }
    },

    onEnd: function() {
        if(this.isMounted()) {
            this.setState({
                playing: false
            });
        }
    },

    play: function() {
        this.refs.sound.play();
        if(this.props.onPlay) {
            this.props.onPlay();
        }
    },

    render: function() {
        var playable = this.props.playable;
        var style = {
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
