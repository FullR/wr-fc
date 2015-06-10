const React = require("react");
const _ = require("lodash");

/*
    Horizontally fills container and horizontally
    centers children

    Note: children must be styled with "position: inline-block"
*/
const HCenter = React.createClass({
    render() {
        const style = _.extend({
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
