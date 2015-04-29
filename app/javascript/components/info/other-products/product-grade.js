var React = require("react");

var ProductGrade = React.createClass({
    render: function() {
        var style = {
            fontSize: 22
        };

        return (
            <span style={style}>({this.props.children})</span>
        );
    }
});

module.exports = ProductGrade;