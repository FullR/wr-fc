var React = require("react");
var DisplayBox = require("components/activity/display-box");
var Definition = require("components/activity/definition");

var DefinitionDisplayBox = React.createClass({
    render: function() {
        var size = this.props.size;
        var style = size === "small" ? {
            fontSize: "3.2rem",
            lineHeight: "3.8rem"
        } : {
            fontSize: "5.2rem",
            lineHeight: "6.4rem"
        };

        return (
            <DisplayBox {...this.props}>
                <Definition partId={this.props.partId} style={style}/>
            </DisplayBox>
        );
    }
});

module.exports = DefinitionDisplayBox;