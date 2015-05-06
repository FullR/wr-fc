var React = require("react");
var Choice = require("components/activity/choice");
var Definition = require("components/activity/definition");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var definitionContainerStyle = {
    position: "relative",
    left: "10%",
    width: "80%",
    height: "100%",
    display: "table",
    textAlign: "center"
};

var DefinitionChoice = React.createClass({
    render: function() {
        var definitionStyle = {
            display: "table-cell",
            verticalAlign: "middle",
            width: "100%",
            fontSize: bp({
                //[medium]: "1.4rem",
                defaults: 22
            }),
            fontWeight: 800
        };

        return (
            <Choice {...this.props}>
                <div style={definitionContainerStyle}>
                    <Definition partId={this.props.partId} style={definitionStyle}/>
                </div>
            </Choice>
        );
    }
});

module.exports = DefinitionChoice;