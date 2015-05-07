var React = require("react");
var _ = require("lodash");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var WordPart = require("components/activity/word-part");
var Word = require("components/activity/word");
var colors = require("colors");
var dictionary = window.dictionary;
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var PartPieceDisplay = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var {choices, wordId, revealed} = this.props;
        var word = dictionary.get(wordId);
        var parts = [...word.prefixes, ...word.roots, ...word.suffixes];

        var fontSize = bp({
            [micro]: 25,
            [small]: 35,
            [medium]: 55,
            defaults: 75
        });

        var style = {
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

        var partStyle = {
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

        var interactableStyle = this.buildStyles({
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
                <div {...this.getBrowserStateEvents()} style={interactableStyle} onClick={this.props.onClick}>
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