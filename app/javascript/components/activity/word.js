const React = require("react");
const WordPart = require("components/activity/word-part");
const _ = require("lodash");
const dictionary = window.dictionary;

const Word = React.createClass({
    propTypes: {
        wordId: React.PropTypes.string.isRequired,
        underlinedPartId: React.PropTypes.string
    },

    render() {
        const word = dictionary.get(this.props.wordId);
        let parts;

        if(!word) {
            return <span {...this.props}>WORD NOT FOUND: {this.props.wordId}</span>;
        }

        parts = [...word.prefixes, ...word.roots, ...word.suffixes];

        return (
            <span {...this.props}>
                {parts.map((partId) => {
                    let style;
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
