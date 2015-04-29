var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity11 = React.createClass({
    render: function() {
        var title = "Game 11 - Two Word Parts";
        var instructions = "Touch the three word parts that together make a word.";
        return (<ActivityType3
            id="11"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={4}
            next="activity-12"/>);
    }
});

module.exports = Activity11;