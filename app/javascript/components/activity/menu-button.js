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
            position: "absolute"
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

        var stateEvents = this.getBrowserStateEvents();

        return (
            <Link {...stateEvents} style={style} to="menu" className="menu-button"/>
        );
    }
});

module.exports = MenuButton;
