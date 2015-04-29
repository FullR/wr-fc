var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
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
            {hover: { background: hoverColor }}
        ]
    };
}

var style = {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: "100%",
    border: "1px solid black",
    borderRadius: "0.8rem",
    textAlign: "center",
    verticalAlign: "middle",
    cursor: "pointer",
    transition: "background 0.25s",
    margin: "0 2% 0 2%",
    overflow: "hidden",

    modifiers: [
        {color: {
            green: backgroundColor(colors.PREFIX, colors.PREFIX_HOVER),
            red: backgroundColor(colors.ROOT, colors.ROOT_HOVER),
            blue: backgroundColor(colors.SUFFIX, colors.SUFFIX_HOVER),
            cyan: backgroundColor(colors.WORD, colors.WORD_HOVER)
        }},
        {large: {
            width: "25%"
        }},
        {active: {
            boxShadow: `0px 0px 1.5rem 0.5rem ${colors.GLOW}`
        }}
    ]
};

var ActivityButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],
    render: function() {
        var indexStyle = {
            position: "absolute",
            left: -1,
            top: -1,
            width: bp({
                [medium]: "2rem",
                defaults: "3rem"
            }),
            height: bp({
                [medium]: "2rem",
                defaults: "3rem"
            }),
            fontSize: bp({
                [medium]: "1rem",
                defaults: "2.25rem"
            }),
            lineHeight: bp({
                [medium]: "2rem",
                defaults: "3rem"
            }),
            borderBottomRightRadius: "0.4rem",
            borderTopLeftRadius: "0.6rem",
            border: "1px solid black",
            background: "#FFFFFF",
            textAlign: "center",
            color: "#000000"
        };

        return (
            <Link
                {...this.getBrowserStateEvents()}
                style={this.buildStyles(style)}
                to={"activity-"+this.props.activityId}
            >
                <div style={indexStyle}>{this.props.index || this.props.activityId}</div>
                {this.props.children}
            </Link>
        );
    }
});

module.exports = ActivityButton;
