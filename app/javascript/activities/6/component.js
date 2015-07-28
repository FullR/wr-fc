const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType2 = require("screens/activity-types/2");
const actions = require("./actions");
const store = require("./store");

const Activity6 = React.createClass({
    render() {
        const title = (<span>Game 6 - <Suffix>Suffixes</Suffix></span>);
        const instructions = (<span>Touch the <Suffix>suffix</Suffix> with this definition:</span>);
        return (<ActivityType2 
            id="6"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity/7"
            demoText={`There are ${window.dictionary.suffixes.length - 2} additional suffixes in the full version.`}/>);
    }
});

module.exports = Activity6;
