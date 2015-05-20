var React = require("react");
var _ = require("lodash");
var {Link} = require("react-router");
var s = require("utility/styles");
var bp = require("utility/bp");
var colors = require("colors");

var {small, medium} = require("sizes");

function backgroundColor(color, hoverColor) {
    return {
        background: color,
        states: [
            {hover: { background: hoverColor }},
            {active: { background: hoverColor }}
        ]
    };
}

var style = {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: "100%",
    border: "1px solid black",
    borderRadius: 8,
    textAlign: "center",
    verticalAlign: "middle",
    cursor: "pointer",
    transition: "background 0.25s",
    margin: "0 2% 0 2%",
    overflow: "hidden",
    zIndex: 3,

    modifiers: [
        {color: {
            green: backgroundColor(colors.PREFIX, colors.PREFIX_HOVER),
            red: backgroundColor(colors.ROOT, colors.ROOT_HOVER),
            blue: backgroundColor(colors.SUFFIX, colors.SUFFIX_HOVER),
            cyan: backgroundColor(colors.WORD, colors.WORD_HOVER)
        }},
        {large: {
            width: window.level.id === "beginning" ?  "37%" : "25%"
        }},
        {active: {
            boxShadow: `0px 0px 15px 5px ${colors.GLOW}`
        }}
    ]
};

var ActivityButton = React.createClass({
    mixins: [require("mixins/style")],
    render: function() {
        var indexStyle = {
            position: "absolute",
            left: -1,
            top: -1,
            width: bp({
                [medium]: 20,
                defaults: 30
            }),
            height: bp({
                [medium]: 20,
                defaults: 30
            }),
            fontSize: bp({
                [medium]: 14,
                defaults: 22.5
            }),
            lineHeight: bp({
                [medium]: "20px",
                defaults: "30px"
            }),
            borderBottomRightRadius: 4,
            borderTopLeftRadius: 6,
            border: "1px solid black",
            background: "#FFFFFF",
            textAlign: "center",
            color: "#000000"
        };

        return (
            <Link {...this.getStyle(style)} to={"activity-"+this.props.activityId}>
                <div style={indexStyle}>{this.props.index || this.props.activityId}</div>
                {this.props.children}
            </Link>
        );
    }
});

module.exports = ActivityButton;
