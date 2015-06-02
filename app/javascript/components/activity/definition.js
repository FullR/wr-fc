const React = require("react");
const dictionary = window.dictionary;

const Definition = React.createClass({
    render() {
        const word = dictionary.get(this.props.partId);

        if(!word) {
            return <span {...this.props}></span>
        }

        return (
            <span {...this.props}>{word.definition}</span>
        );
    }
});

module.exports = Definition;
