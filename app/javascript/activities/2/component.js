const React = require("react");
const Root = require("components/activity/root");
const ActivityType1 = require("screens/activity-types/1");
const actions = require("./actions");
const store = require("./store");

const Activity2 = React.createClass({
    render() {
        const title = (<span>Game 2 - <Root>Roots</Root></span>);
        const instructions = (<span>Touch the definition of this <Root>root:</Root></span>);
        return (<ActivityType1 
            id="2"
            store={store} 
            actions={actions} 
            title={title}
            instructions={instructions}
            next="activity/3"
            demoText={`There are ${window.dictionary.roots.length - 2} additional roots in the full version.`}/>);
    }
});

module.exports = Activity2;
