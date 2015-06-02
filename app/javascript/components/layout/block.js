const React = require("react");
const _ = require("lodash");

const Block = React.createClass({
    render() {
        const style = _.extend({
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
