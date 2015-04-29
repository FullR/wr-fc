var React = require("react");
var Root = require("components/activity/root");
var ActivityType1 = require("screens/activity-types/1");
var actions = require("./actions");
var store = require("./store");

var Activity2 = React.createClass({
    render: function() {
        var title = (<span>Game 2 - <Root>Roots</Root></span>);
        var instructions = (<span>Touch the definition of this <Root>prefix:</Root></span>);
        return (<ActivityType1 
            id="2"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-3"/>);
    }
});

module.exports = Activity2;