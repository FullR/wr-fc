const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType3 = require("screens/activity-types/3");
const actions = require("./actions");
const store = require("./store");

const Activity9 = React.createClass({
    render() {
        const title = "Game 9 - Four Word Parts";
        const instructions = "Touch the four word parts that together mean:";
        return (<ActivityType3
            id="9"
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={5}
            next="activity-10"
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version.`}/>);
    }
});

module.exports = Activity9;
