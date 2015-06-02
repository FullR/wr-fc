const React = require("react");
const Prefix = require("components/activity/prefix");
const ActivityType1 = require("screens/activity-types/1");
const actions = require("./actions");
const store = require("./store");

const Activity1 = React.createClass({
    render() {
        const title = (<span>Game 1 - <Prefix>Prefixes</Prefix></span>);
        const instructions = (<span>Touch the definition of this <Prefix>prefix:</Prefix></span>);
        return (<ActivityType1
            id="1"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity-2"
            demoText={`There are ${window.dictionary.prefixes.length - 2} additional prefixes in the full version`}/>);
    }
});

module.exports = Activity1;
