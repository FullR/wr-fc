const React = require("react");
const level = window.level;

const style = {
    fontStyle: "italic"
};

const Title = React.createClass({
    render() {
        return (
            <span {...this.props}><span style={style}>Word Roots {level.title} Flashcards</span>&trade;</span>
        );
    }
});

module.exports = Title;
