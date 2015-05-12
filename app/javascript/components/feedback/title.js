var React = require("react");
var _ = require("lodash");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var FeedbackTitle = React.createClass({
    render: function() {
        var style = _.extend({
            position: "absolute",
            top: 40,
            fontSize: 32,
            textAlign: "center",
            width: "100%"
        }, bp({
            [small]: {
                top: 10,
                fontSize: 20
            },
            [medium]: {
                top: 20,
                fontSize: 24
            },
            defaults: {}
        }));
        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = FeedbackTitle;
