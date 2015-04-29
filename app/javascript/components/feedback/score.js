var React = require("react");
var _ = require("lodash");

var style = {
    height: 40,
    width: "100%",
    fontSize: "2.5rem",
    lineHeight: "4rem",
    fontWeight: "bold"
};

var textStyle = {
    display: "inline-block",
    width: "60%",
    marginLeft: "5%"
};

var percentStyle = {
    display: "inline-block",
    width: "10%"
};

var fractionStyle = {
    display: "inline-block",
    width: "20%",
    marginRight: "5%",
    textAlign: "right"
};

var Score = React.createClass({
    render: function() {
        var correct = this.props.correct;
        var max = this.props.max;
        var percent = Math.floor((correct/max)*100);

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