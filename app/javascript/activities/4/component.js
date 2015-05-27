var React = require("react");
var Prefix = require("components/activity/prefix");
var ActivityType2 = require("screens/activity-types/2");
var actions = require("./actions");
var store = require("./store");

var Activity4 = React.createClass({
    render: function() {
        var title = (<span>Game 4 - <Prefix>Prefixes</Prefix></span>);
        var instructions = (<span>Touch the <Prefix>prefix</Prefix> with this definition:</span>);
        return (<ActivityType2 
            id="4"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-5"
            demoText={`There are ${window.dictionary.prefixes.length - 2} additional prefixes in the full version`}/>);
    }
});

module.exports = Activity4;
