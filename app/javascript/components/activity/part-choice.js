var React = require("react");
var Choice = require("components/activity/choice");
var WordPart = require("components/activity/word-part");

var PartChoice = React.createClass({
    render: function() {
        var style = {
            fontSize: 32,
            lineHeight: "150px"
        };

        return (
            <Choice {...this.props} style={style}>
                <WordPart partId={this.props.partId}/>
            </Choice>
        );
    }
});

module.exports = PartChoice;