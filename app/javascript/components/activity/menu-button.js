var React = require("react");
var _ = require("lodash");
var {Link} = require("react-router");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var MenuButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            display: "block",
            position: "absolute"
        });

        _.extend(style, bp({
            [micro]: {
                left: 2,
                bottom: 2,
                width: 0.5 * 92,
                height: 0.5 * 95
            },
            [small]: {
                left: 5,
                bottom: 5,
                width: 0.6 * 92,
                height: 0.6 * 95,
            },

            [medium]: {
                left: 10,
                bottom: 10,
                width: 0.85 * 92,
                height: 0.85 * 95
            },
            defaults: {
                left: 16,
                bottom: 16,
                width: 92,
                height: 95
            }
        }));

        var stateEvents = this.getBrowserStateEvents();

        return (
            <Link {...stateEvents} style={style} to="menu" className="menu-button"/>
        );
    }
});

module.exports = MenuButton;
