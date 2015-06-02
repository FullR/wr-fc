const React = require("react");
const _ = require("lodash");
const styles = {
    display: "block",
    width: "100%",
    height: "19%",
    textAlign: "center",
    verticalAlign: "middle",
    margin: "0 0 2% 0"
};

const ButtonRow = React.createClass({
    render() {
        return (
            <div style={styles}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ButtonRow;
