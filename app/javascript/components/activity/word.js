var React = require("react");
var WordPart = require("components/activity/word-part");
var _ = require("lodash");
var dictionary = window.dictionary;

var Word = React.createClass({
    propTypes: {
        wordId: React.PropTypes.string.isRequired,
        underlinedPartId: React.PropTypes.string
    },

    render: function() {
        var word = dictionary.get(this.props.wordId);
        var parts;

        if(!word) {
            return <span {...this.props}>WORD NOT FOUND: {this.props.wordId}</span>;
        }

        parts = [...word.prefixes, ...word.roots, ...word.suffixes];

        return (
            <span {...this.props}>
                {parts.map((partId) => {
                    var style;
                    if(this.props.underlinedPartId === partId) {
                        style = {
                            textDecoration: "underline"
                        };
                    }
                    if(word.spacing) {
                        console.log("spacing");
                        style = _.extend(style || {}, {
                            wordSpacing: "1rem"
                        });
                    }
                    return (<WordPart key={partId} partId={partId} style={style}/>);
                })}
            </span>
        );
    }
});

module.exports = Word;
