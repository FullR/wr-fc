var React = require("react");
var _ = require("lodash");

var HCenter = React.createClass({
    render: function() {
        var style = _.extend({
            width: "100%",
            textAlign: "center",
            verticalAlign: "middle"
        }, this.props.style);

        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = HCenter;
