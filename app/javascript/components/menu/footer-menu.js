var React = require("react");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var FooterMenu = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            left: "8rem",
            right: "8rem",
            textAlign: "center",
            fontSize: bp({
                [small]: 18,
                [medium]: 22,
                defaults: 25
            }),
            bottom: bp({
                [micro]: 25,
                [small]: 35,
                [medium]: 45,
                defaults: 60
            })
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = FooterMenu;
