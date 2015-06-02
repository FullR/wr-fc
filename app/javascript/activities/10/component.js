const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType3 = require("screens/activity-types/3");
const actions = require("./actions");
const store = require("./store");

const Activity10 = React.createClass({
    render() {
        const index = window.level.id === "beginning" ? "9" : "10";
        const title = `Game ${index} - Two Word Parts`;
        const instructions = "Touch the two word parts that together make a word.";
        return (<ActivityType3
            id="10"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            next="activity-11"
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version`}/>);
    }
});

module.exports = Activity10;
