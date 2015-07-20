const React = require("react");
const soundManager = require("sound/sound-manager");
const Word = require("components/activity/word");
const Definition = require("components/activity/definition");
const colors = require("colors");
const dictionary = window.dictionary;

const ExampleWord = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const {onClick, hidden, wordId, underlinedPartId, highlighted} = this.props;
        const style = {
            width: "100%",
            fontSize: 32,
            marginTop: 6,
            paddingTop: 10,
            paddingBottom: 10,
            transition: "opacity 0.25s",
            opacity: hidden ? 0 : 1,
            cursor: !!onClick ? "pointer" : null,
            background: highlighted ? colors.DISPLAY_BOX_BG_HOVER : null,

            states: [
                {hover: {
                    background: !!onClick ? colors.DISPLAY_BOX_BG_HOVER : null
                }}
            ]
        };

        return (
            <div {...this.props} {...this.getStyle(style)}>
                <Word wordId={wordId} underlinedPartId={underlinedPartId}/>: <Definition partId={wordId}/>
            </div>
        );
    }
});

module.exports = ExampleWord;
