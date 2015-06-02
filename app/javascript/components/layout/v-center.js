const React = require("react");
const _ = require("lodash");

const VCenter = React.createClass({
    render() {
        const style = _.extend({
            height: "100%"
        }, this.props.style);

        const wrapperStyle = {
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
