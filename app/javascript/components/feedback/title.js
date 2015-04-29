var React = require("react");
var _ = require("lodash");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var FeedbackTitle = React.createClass({
    render: function() {
        var style = _.extend({
            position: "absolute",
            top: "4rem",
            fontSize: "3.2rem",
            textAlign: "center",
            width: "100%"
        }, bp({
            [small]: {
                top: "1rem",
                fontSize: "2rem"
            },
            [medium]: {
                top: "2rem",
                fontSize: "2.4rem"
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