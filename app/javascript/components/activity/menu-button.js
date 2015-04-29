var React = require("react");
var _ = require("lodash");
var {Link} = require("react-router");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var MenuButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            display: "block",
            position: "absolute",
            backgroundImage: "url('assets/images/home-button.png')",
            backgroundSize: "100% 100%",

            states: [
                {hover: {
                    backgroundImage: "url('assets/images/home-button_hover.png')"
                }}
            ]
        });

        _.extend(style, bp({
            [medium]: {
                left: "1rem",
                bottom: "1rem",
                width: "6.9rem",
                height: "7.125rem"
            },

            defaults: {
                left: "1.6rem",
                bottom: "1.6rem",
                width: "9.2rem",
                height: "9.5rem"
            }
        }));

        return (
            <Link {...this.getBrowserStateEvents()} style={style} to="menu"/>
        );
    }
});

module.exports = MenuButton;