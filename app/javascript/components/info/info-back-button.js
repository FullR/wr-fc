var React = require("react");
var {Link} = require("react-router");
var colors = require("colors");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

var InfoBackButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            position: "absolute",
            bottom: "0.8rem",
            right: "1.2rem",
            padding: "2rem 3rem 2rem 3rem",
            fontSize: "2rem",
            color: "#FFFFFF",
            border: "1px solid #000000",
            background: colors.INFO_BUTTON_BG,
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: 700,
            borderRadius: 5,

            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        });

        return (
            <Link {...this.getBrowserStateEvents()} style={style} to="menu">Back</Link>
        );
    }
});

module.exports = InfoBackButton;