var React = require("react");
var _ = require("lodash");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var WordPart = require("components/activity/word-part");
var Word = require("components/activity/word");
var colors = require("colors");
var dictionary = window.dictionary;
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var PartPieceDisplay = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var {choices, wordId, revealed} = this.props;
        var word = dictionary.get(wordId);
        var parts = [...word.prefixes, ...word.roots, ...word.suffixes];

        var style = {
            position: "absolute",
            top: bp({
                [medium]: "35%",
                defaults: "50%"
            }),
            width: "100%",
            textAlign: "center",
            verticalAlign: "middle"
        };

        var partStyle = {
            display: "inline-block",
            fontSize: "5.6rem",
            lineHeight: "5.6rem",
            borderBottom: "0.3rem solid #000000",
            height: "6rem",
            verticalAlign: "middle"
        };

        _.extend(partStyle, bp({
            [medium]: {
                height: "5rem",
                fontSize: "4.8rem",
                lineHeight: "4.8rem",
                margin: revealed && !word.space ? 0 : "0 0.6rem",
                width: revealed ? "auto" : "14rem"
            },

            defaults: {
                height: "6rem",
                fontSize: "5.6rem",
                lineHeight: "5.6rem",
                margin: revealed && !word.space ? 0 : "0 0.8rem",
                width: revealed ? "auto" : "19rem"
            }
        }));

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