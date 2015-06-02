const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType1 = require("screens/activity-types/1");
const actions = require("./actions");
const store = require("./store");

const Activity3 = React.createClass({
    render() {
        const title = (<span>Game 3 - <Suffix>Suffixes</Suffix></span>);
        const instructions = (<span>Touch the definition of this <Suffix>suffix:</Suffix></span>);
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
