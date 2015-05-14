var React = require("react");
var _ = require("lodash");

var Block = React.createClass({
    render: function() {
        var style = _.extend({
            position: "relative",
            display: "inline-block",
            verticalAlign: "middle"
        }, this.props.style);
        
        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Block;
