var React = require("react");
var Root = require("components/activity/root");
var ActivityType2 = require("screens/activity-types/2");
var actions = require("./actions");
var store = require("./store");

var Activity5 = React.createClass({
    render: function() {
        var title = (<span>Game 5 - <Root>Roots</Root></span>);
        var instructions = (<span>Touch the <Root>root</Root> with this definition:</span>);
        return (<ActivityType2 
            id="5"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-6"/>);
    }
});

module.exports = Activity5;