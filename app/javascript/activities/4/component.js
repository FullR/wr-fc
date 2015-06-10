const React = require("react");
const Prefix = require("components/activity/prefix");
const ActivityType2 = require("screens/activity-types/2");
const actions = require("./actions");
const store = require("./store");

const Activity4 = React.createClass({
    render() {
        const title = (<span>Game 4 - <Prefix>Prefixes</Prefix></span>);
        const instructions = (<span>Touch the <Prefix>prefix</Prefix> with this definition:</span>);
        return (<ActivityType2 
            id="4"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-5"
            demoText={`There are ${window.dictionary.prefixes.length - 2} additional prefixes in the full version.`}/>);
    }
});

module.exports = Activity4;
