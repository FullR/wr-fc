const React = require("react");

const style = {
    fontSize: 22
};

const ProductGrade = React.createClass({
    render() {
        return (
            <span style={style}>({this.props.children})</span>
        );
    }
});

module.exports = ProductGrade;
