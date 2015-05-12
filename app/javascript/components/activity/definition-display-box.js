var React = require("react");
var DisplayBox = require("components/activity/display-box");
var Definition = require("components/activity/definition");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var DefinitionDisplayBox = React.createClass({
    render: function() {
        var size = this.props.size;
        var style = size === "small" ? {
            fontSize: bp({
                [small]: 20,
                [medium]: 26,
                defaults: 32
            }),
            lineHeight: bp({
                [small]: "26px",
                [medium]: "32px",
                defaults: "38px"
            })
        } : {
            fontSize: bp({
                [small]: 28,
                [medium]: 40,
                defaults: 52
            }),
            lineHeight: bp({
                [small]: "34px",
                [medium]: "48px",
                defaults: "64px"
            })
        };

        return (
            <DisplayBox {...this.props}>
                <Definition partId={this.props.partId} style={style}/>
            </DisplayBox>
        );
    }
});

module.exports = DefinitionDisplayBox;
