var React = require("react");
var DisplayBox = require("components/activity/display-box");
var WordPart = require("components/activity/word-part");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var PartDisplayBox = React.createClass({
    render: function() {
        var style = {
            fontSize: "5.2rem",
            lineHeight: "6.4rem"
        };
        return (
            <DisplayBox {...this.props}>
                <WordPart partId={this.props.partId} style={style}/>
            </DisplayBox>
        );
    }
});

module.exports = PartDisplayBox;