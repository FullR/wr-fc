var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity8 = React.createClass({
    render: function() {
        var title = "Game 8 - Three Word Parts";
        var instructions = "Touch the two word parts that together mean:";
        var isBeginning = (window.level.id === "beginning");
        return (<ActivityType3
            id="8"
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={4}
            next={isBeginning ? "activity-10" : "activity-9"}/>);
    }
});

module.exports = Activity8;
