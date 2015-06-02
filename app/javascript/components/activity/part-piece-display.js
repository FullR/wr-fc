const React = require("react");
const _ = require("lodash");
const WordPart = require("components/activity/word-part");
const Word = require("components/activity/word");
const colors = require("colors");
const dictionary = window.dictionary;
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const PartPieceDisplay = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const {choices, wordId, revealed} = this.props;
        const word = dictionary.get(wordId);
        const parts = [...word.prefixes, ...word.roots, ...word.suffixes];

        const fontSize = bp({
            [micro]: 20,
            [small]: 22,
            [medium]: 40,
            defaults: 60
        });

        const style = {
            position: "absolute",
            bottom: bp({
                [micro]: 150,
                [small]: 200,
                [medium]: 300,
                defaults: 400
            }),
            width: "100%",
            textAlign: "center",
            verticalAlign: "middle"
        };

        const partStyle = {
            display: "inline-block",
            fontSize: fontSize,
            lineHeight: fontSize + "px",
            height: fontSize,
            borderBottom: "3px solid #000000",
            verticalAlign: "middle",
            margin: revealed && !word.space ? 0 : "0 8px",
            width: revealed ? "auto" : bp({
                [micro]: 100,
                [small]: 130,
                [medium]: 160,
                defaults: 190
            })
        };

        const interactableStyle = this.buildStyles({
            display: "inline-block",
            cursor: "default",

            states: [
                {hover: {
                    background: revealed ? colors.DISPLAY_BOX_BG_HOVER : null,
                    cursor: revealed ? "pointer" : "default"
                }}
            ],

            modifiers: [
                {highlighted: {
                    background: revealed ? colors.DISPLAY_BOX_BG_HOVER : null
                }}
            ]
        });

        return (
            <div style={style}>
                <div {...this.getListeners()} style={interactableStyle} onClick={this.props.onClick}>
                    {
                        parts.map((partId, i) => {
                            if(revealed || choices.filter((choice) => choice.partId === partId)[0].selected) {
                                return <WordPart key={partId} style={partStyle} partId={partId}/>;
                            }
                            else {
                                return <span key={partId + "-hidden"} style={partStyle}></span>;
                            }
                        })
                    }
                </div>
            </div>
        );
    }
});

module.exports = PartPieceDisplay;
