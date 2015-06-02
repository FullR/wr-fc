const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType3 = require("screens/activity-types/3");
const actions = require("./actions");
const store = require("./store");

const Activity8 = React.createClass({
    render() {
        const title = "Game 8 - Three Word Parts";
        const instructions = "Touch the two word parts that together mean:";
        const isBeginning = (window.level.id === "beginning");
        return (<ActivityType3
            id="8"
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={4}
            next={isBeginning ? "activity-10" : "activity-9"}
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version`}/>);
    }
});

module.exports = Activity8;
