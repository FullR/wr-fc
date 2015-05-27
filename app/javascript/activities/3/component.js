var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType1 = require("screens/activity-types/1");
var actions = require("./actions");
var store = require("./store");

var Activity3 = React.createClass({
    render: function() {
        var title = (<span>Game 3 - <Suffix>Suffixes</Suffix></span>);
        var instructions = (<span>Touch the definition of this <Suffix>suffix:</Suffix></span>);
        return (<ActivityType1 
            id="3"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-4"
            demoText={`There are ${window.dictionary.suffixes.length - 2} additional suffixes in the full version`}/>);
    }
});

module.exports = Activity3;
