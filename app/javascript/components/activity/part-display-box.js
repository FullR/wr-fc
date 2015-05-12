var React = require("react");
var DisplayBox = require("components/activity/display-box");
var WordPart = require("components/activity/word-part");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var PartDisplayBox = React.createClass({
    render: function() {
        var style = {
            fontSize: bp({
                [small]: 36,
                [medium]: 44,
                defaults: 52
            }),
            lineHeight: bp({
                [small]: "48px",
                [medium]: "56px",
                defaults: "64px"
            })
        };
        return (
            <DisplayBox {...this.props}>
                <WordPart partId={this.props.partId} style={style}/>
            </DisplayBox>
        );
    }
});

module.exports = PartDisplayBox;
