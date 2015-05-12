var React = require("react");
var Choice = require("components/activity/choice");
var WordPart = require("components/activity/word-part");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var PartChoice = React.createClass({
    render: function() {
        var style = {
            fontSize: bp({
                [micro]: 16,
                [small]: 24,
                [medium]: 32,
                defaults: 40
            }),
            fontWeight: 700,
            lineHeight: bp({
                [micro]: "75px",
                [small]: "100px",
                [medium]: "125px",
                defaults: "150px"
            })
        };

        return (
            <Choice {...this.props} style={style}>
                <WordPart partId={this.props.partId}/>
            </Choice>
        );
    }
});

module.exports = PartChoice;
