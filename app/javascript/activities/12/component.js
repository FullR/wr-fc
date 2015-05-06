var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity12 = React.createClass({
    render: function() {
        var title = "Game 12 - Four Word Parts";
        var instructions = "Touch the four word parts that together make a word.";
        return (<ActivityType3
            id="12"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={5}/>);
    }
});

module.exports = Activity12;