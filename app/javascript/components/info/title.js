var React = require("react");
var level = window.level;

var Title = React.createClass({
    render: function() {
        var style = {
            fontStyle: "italic"
        };

        return (
            <span {...this.props}><span style={style}>Word Roots {level.title} Flashcards</span>&trade;</span>
        );
    }
});

module.exports = Title;