var React = require("react");
var _ = require("lodash");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var ButtonGroupHeader = React.createClass({
    render: function() {
        var baseStyles = {
            textAlign: "center",
            width: "100%",
            height: "5%",
            fontSize: bp({
                [micro]: 12,
                [small]: 15,
                [medium]: 20,
                defaults: 25
            }),
            fontWeight: "bold"
        };
        var styles = this.props.styles ? _.extend(baseStyles, this.props.styles) : baseStyles;
        return (
            <div style={styles}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ButtonGroupHeader;