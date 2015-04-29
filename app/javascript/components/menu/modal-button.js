var React = require("react");
var _ = require("lodash");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

var ModalButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = _.extend({
            backgroundColor: this.props.background,
            fontSize: 24,
            border: "1px solid black",
            padding: 15,
            width: 75,
            borderRadius: 5,
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "background-color 0.25s",
            textAlign: "center",

            states: [
                {hover: {
                    backgroundColor: this.props.hoverBackground
                }}
            ]
        }, this.props.style);

        return (
            <div {...this.props} {...this.getBrowserStateEvents()} style={this.buildStyles(style)}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ModalButton;
