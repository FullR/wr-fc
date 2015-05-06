var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity9 = React.createClass({
    render: function() {
        var title = "Game 9 - Four Word Parts";
        var instructions = "Touch the four word parts that together mean:";
        return (<ActivityType3
            id="9"
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={5}
            next="activity-10"/>);
    }
});

module.exports = Activity9;