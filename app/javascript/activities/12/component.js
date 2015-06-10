const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType3 = require("screens/activity-types/3");
const actions = require("./actions");
const store = require("./store");

const Activity12 = React.createClass({
    render() {
        const title = "Game 12 - Four Word Parts";
        const instructions = "Touch the four word parts that together make a word.";
        return (<ActivityType3
            id="12"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={5}
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version.`}/>);
    }
});

module.exports = Activity12;
