var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var FooterMenu = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            left: "8rem",
            right: "8rem",
            textAlign: "center",
            fontSize: bp({
                [medium]: "1.75rem",
                defaults: "2.5rem"
            }),
            bottom: bp({
                [medium]: "4rem",
                defaults: "8rem"
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
