var React = require("react");
var _ = require("lodash");

var VCenter = React.createClass({
    render: function() {
        var style = _.extend({
            height: "100%"
        }, this.props.style);

        var wrapperStyle = {
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            "-webkitTransform": "translateY(-50%)"
        };

        return (
            <div {...this.props} style={style}>
                <div style={wrapperStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = VCenter;
