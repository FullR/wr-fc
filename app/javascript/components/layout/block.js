const React = require("react");
const _ = require("lodash");

/*
    Simple default container element
    Meant to be used as an alternative to vanilla div elements
    I find myself using position relative and display inline-block
    far more than position default and display block
*/
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
