var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType3 = require("screens/activity-types/3");
var actions = require("./actions");
var store = require("./store");

var Activity10 = React.createClass({
    render: function() {
        var index = window.level.id === "beginning" ? "9" : "10";
        var title = `Game ${index} - Two Word Parts`;
        var instructions = "Touch the two word parts that together make a word.";
        return (<ActivityType3
            id="10"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            next="activity-11"
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version`}/>);
    }
});

module.exports = Activity10;
