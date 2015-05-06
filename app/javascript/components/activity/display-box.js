var React = require("react");
var _ = require("lodash");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var colors = require("colors");

var DisplayBox = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var disabled = this.props.disabled || !this.props.onClick;
        var style = {
            background: colors.DISPLAY_BOX_BG,
            cursor: disabled ? "default" : "pointer",
            marginTop: 16,
            padding: 8,
            textAlign: "center",
            modifiers: [
                {highlighted: {
                    background: colors.DISPLAY_BOX_BG_HOVER
                }}
            ],
            states: [
                {hover: disabled ? {} : {
                    background: colors.DISPLAY_BOX_BG_HOVER
                }}
            ]
        };

        return (
            <div {...this.props} {...this.getBrowserStateEvents()} style={this.buildStyles(style)}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = DisplayBox;