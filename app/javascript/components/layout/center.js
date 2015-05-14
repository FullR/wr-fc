var React = require("react");
var HCenter = require("./h-center");
var VCenter = require("./v-center");

var Center = React.createClass({
    render: function() {
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
