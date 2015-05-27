var React = require("react");
var Suffix = require("components/activity/suffix");
var ActivityType2 = require("screens/activity-types/2");
var actions = require("./actions");
var store = require("./store");

var Activity6 = React.createClass({
    render: function() {
        var title = (<span>Game 6 - <Suffix>Suffixes</Suffix></span>);
        var instructions = (<span>Touch the <Suffix>suffix</Suffix> with this definition:</span>);
        return (<ActivityType2 
            id="6"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-7"
            demoText={`There are ${window.dictionary.suffixes.length - 2} additional suffixes in the full version`}/>);
    }
});

module.exports = Activity6;
