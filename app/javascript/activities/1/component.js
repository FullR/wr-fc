var React = require("react");
var Prefix = require("components/activity/prefix");
var ActivityType1 = require("screens/activity-types/1");
var actions = require("./actions");
var store = require("./store");

var Activity1 = React.createClass({
    render: function() {
        var title = (<span>Game 1 - <Prefix>Prefixes</Prefix></span>);
        var instructions = (<span>Touch the definition of this <Prefix>prefix:</Prefix></span>);
        return (<ActivityType1
            id="1"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-2"/>);
    }
});

module.exports = Activity1;