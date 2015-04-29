var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity7 = React.createClass({
    render: function() {
        var title = "Game 7 - Two Word Parts";
        var instructions = "Touch the two word parts that together mean:";
        return (<ActivityType3
            id="7"
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            next="activity-8"/>);
    }
});

module.exports = Activity7;