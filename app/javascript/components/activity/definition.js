var React = require("react");
var dictionary = window.dictionary;

var Definition = React.createClass({
    render: function() {
        var word = dictionary.get(this.props.partId);

        if(!word) {
            return <span {...this.props}></span>
        }

        return (
            <span {...this.props}>{word.definition}</span>
        );
    }
});

module.exports = Definition;
