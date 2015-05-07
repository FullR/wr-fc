var React = require("react");
var _ = require("lodash");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var textStyle = {
    display: "inline-block",
    width: "60%",
    marginLeft: 10
};

var percentStyle = {
    display: "inline-block",
    width: "10%"
};

var fractionStyle = {
    display: "inline-block",
    width: "20%",
    marginRight: 10,
    textAlign: "right"
};

var Score = React.createClass({
    render: function() {
        var correct = this.props.correct;
        var max = this.props.max;
        var percent = Math.floor((correct/max)*100);
        var style = {
            height: bp({
                [micro]: 30,
                [small]: 40,
                [medium]: 50,
                defaults: 60
            }),
            fontSize: bp({
                [micro]: 15,
                [small]: 20,
                [medium]: 25,
                defaults: 30
            }),
            lineHeight: bp({
                [micro]: "30px",
                [small]: "40px",
                [medium]: "50px",
                defaults: "60px"
            }),
            width: "100%",
            boxSizing: "border-box",
            borderBottom: "1px solid #CCC",
            whiteSpace: "nowrap",
            fontWeight: "bold"
        };

        return (
            <div style={_.extend({}, style, this.props.style)}>
                <div style={textStyle}>
                    {this.props.children}
                </div>
                <div style={percentStyle}>
                    {percent}%
                </div>
                <div style={fractionStyle}>
                    {correct}/{max}
                </div>
            </div>
        );
    }
});

module.exports = Score;