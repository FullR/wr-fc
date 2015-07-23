const React = require("react");
const _ = require("lodash");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const MenuButton = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = {
            display: "block",
            position: "absolute"
        };

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

        return (
            <a {...this.getStyle(style)} href="#menu" className="menu-button"/>
        );
    }
});

module.exports = MenuButton;
