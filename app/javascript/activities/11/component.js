var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity11 = React.createClass({
    render: function() {
        var index = window.level.id === "beginning" ? "10" : "11";
        var title = `Game ${index} - Three Word Parts`;
        var instructions = "Touch the three word parts that together make a word.";
        var isBeginning = (window.level.id === "beginning");
        return (<ActivityType3
            id="11"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={4}
            next={isBeginning ? null : "activity-12"}/>);
    }
});

module.exports = Activity11;
