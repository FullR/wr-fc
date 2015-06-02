const React = require("react");
const _ = require("lodash");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const FeedbackTitle = React.createClass({
    render() {
        const style = _.extend({
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
