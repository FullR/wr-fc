const React = require("react");
const HCenter = require("./h-center");
const VCenter = require("./v-center");

const Center = React.createClass({
    render() {
        return (
            <VCenter {...this.props}>
                <HCenter>
                    {this.props.children}
                </HCenter>
            </VCenter>
        );
    }
});

module.exports = Center;
