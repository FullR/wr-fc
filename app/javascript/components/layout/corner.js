const React = require("react");
const _ = require("lodash");
const style = {
    position: "absolute"
};

/* 
    A corner positioned element

    props:
        corner: top left, top right, bottom left, or bottom right
        vDistance: distance from the top or bottom
        hDistance: distance from the left or right
        distance: shorthand for both vDistance and hDistance
*/
const Corner = React.createClass({
    render() {
        const corner = this.props.corner;
        const distance = this.props.distance || 0;
        const vDistance = this.props.vDistance || distance;
        const hDistance = this.props.hDistance || distance;
        
        if(corner === "top left") {
            style.top = vDistance;
            style.left = hDistance;
        } else if(corner === "top right") {
            style.top = vDistance;
            style.right = hDistance;
        } else if(corner === "bottom right") {
            style.bottom = vDistance;
            style.right = hDistance;
        } else if(corner === "bottom left") {
            style.bottom = vDistance;
            style.left = hDistance;
        }
        _.extend(style, this.props.style);

        return (
            <div {...this.props} style={style}>{this.props.children}</div>
        );
    }
});

module.exports = Corner;
