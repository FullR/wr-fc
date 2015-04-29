var React = require("react");
var Word = require("components/activity/word");
var Definition = require("components/activity/definition");

var ExampleWord = React.createClass({
    render: function() {
        var style = {
            width: "100%",
            fontSize: "2.8rem",
            marginTop: "1.6rem",
            transition: "opacity 0.25s",
            opacity: this.props.hidden ? 0 : 1
        };

        return (
            <div style={style}>
                <Word wordId={this.props.wordId} underlinedPartId={this.props.underlinedPartId}/>: <Definition partId={this.props.wordId}/>
            </div>
        );
    }
});

module.exports = ExampleWord;