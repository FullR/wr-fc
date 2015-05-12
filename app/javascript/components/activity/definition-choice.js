var React = require("react");
var Choice = require("components/activity/choice");
var Definition = require("components/activity/definition");
var dictionary = window.dictionary;
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
        var defLength = dictionary.get(this.props.partId).definition.length;
        var fontSizeRatio;

        if(defLength > 60) {
            fontSizeRatio = 0.6;
        }
        else if(defLength > 40) {
            fontSizeRatio = 0.8;
        }
        else {
            fontSizeRatio = 1;
        }

        var definitionStyle = {
            display: "table-cell",
            verticalAlign: "middle",
            width: "100%",
            fontSize: bp({
                [small]: 20,
                [medium]: 24,
                defaults: 30
            }) * fontSizeRatio,
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
