const React = require("react");
const soundManager = require("sound/sound-manager");
const Word = require("components/activity/word");
const Definition = require("components/activity/definition");
const colors = require("colors");
const dictionary = window.dictionary;

const ExampleWord = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = {
            width: "100%",
            fontSize: 32,
            marginTop: 6,
            paddingTop: 10,
            paddingBottom: 10,
            transition: "opacity 0.25s",
            opacity: this.props.hidden ? 0 : 1,
//           cursor: playable ? "pointer" : null,
//           background: this.isPlaying() ? colors.DISPLAY_BOX_BG_HOVER : null,

            states: [
                {hover: {
//                    background: playable ? colors.DISPLAY_BOX_BG_HOVER : null
                }}
            ]
        };

        return (
            <div {...this.props} {...this.getStyle(style)}>
                <Word wordId={this.props.wordId} underlinedPartId={this.props.underlinedPartId}/>: <Definition partId={this.props.wordId}/>
            </div>
        );
    }
});

module.exports = ExampleWord;
