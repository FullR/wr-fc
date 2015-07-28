const React = require("react");
const Root = require("components/activity/root");
const ActivityType2 = require("screens/activity-types/2");
const actions = require("./actions");
const store = require("./store");

const Activity5 = React.createClass({
    render() {
        const title = (<span>Game 5 - <Root>Roots</Root></span>);
        const instructions = (<span>Touch the <Root>root</Root> with this definition:</span>);
        return (<ActivityType2 
            id="5"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity/6"
            demoText={`There are ${window.dictionary.roots.length - 2} additional roots in the full version.`}/>);
    }
});

module.exports = Activity5;
