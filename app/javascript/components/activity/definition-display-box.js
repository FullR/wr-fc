var React = require("react");
var DisplayBox = require("components/activity/display-box");
var Definition = require("components/activity/definition");

var DefinitionDisplayBox = React.createClass({
    render: function() {
        var size = this.props.size;
        var style = size === "small" ? {
            fontSize: 32,
            lineHeight: "38px"
        } : {
            fontSize: 52,
            lineHeight: "64px"
        };

        return (
            <DisplayBox {...this.props}>
                <Definition partId={this.props.partId} style={style}/>
            </DisplayBox>
        );
    }
});

module.exports = DefinitionDisplayBox;