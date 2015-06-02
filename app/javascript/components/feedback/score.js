const React = require("react");
const _ = require("lodash");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const textStyle = {
    display: "inline-block",
    width: "60%",
    marginLeft: 10
};

const percentStyle = {
    display: "inline-block",
    width: "10%"
};

const fractionStyle = {
    display: "inline-block",
    width: "20%",
    marginRight: 10,
    textAlign: "right"
};

const Score = React.createClass({
    render() {
        const correct = this.props.correct;
        const max = this.props.max;
        const percent = Math.floor((correct/max)*100);
        const style = {
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
