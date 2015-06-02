const React = require("react");
const Choice = require("components/activity/choice");
const Definition = require("components/activity/definition");
const dictionary = window.dictionary;
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const definitionContainerStyle = {
    position: "relative",
    left: "10%",
    width: "80%",
    height: "100%",
    display: "table",
    textAlign: "center"
};

const DefinitionChoice = React.createClass({
    render() {
        const defLength = dictionary.get(this.props.partId).definition.length;
        let fontSizeRatio;

        if(defLength > 60) {
            fontSizeRatio = 0.7;
        }
        else if(defLength > 50) {
            fontSizeRatio = 0.8;
        }
        else if(defLength > 40) {
            fontSizeRatio = 0.9;
        }
        else {
            fontSizeRatio = 1;
        }

        const definitionStyle = {
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
