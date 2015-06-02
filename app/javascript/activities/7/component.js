const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType3 = require("screens/activity-types/3");
const actions = require("./actions");
const store = require("./store");

const Activity7 = React.createClass({
    render() {
        const title = "Game 7 - Two Word Parts";
        const instructions = "Touch the two word parts that together mean:";
        return (<ActivityType3
            id="7"
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            next="activity-8"
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version`}/>);
    }
});

module.exports = Activity7;
