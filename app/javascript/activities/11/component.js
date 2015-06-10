const React = require("react");
const Suffix = require("components/activity/suffix");
const ActivityType3 = require("screens/activity-types/3");
const actions = require("./actions");
const store = require("./store");

const Activity11 = React.createClass({
    render() {
        const index = window.level.id === "beginning" ? "10" : "11";
        const title = `Game ${index} - Three Word Parts`;
        const instructions = "Touch the three word parts that together make a word.";
        const isBeginning = (window.level.id === "beginning");
        return (<ActivityType3
            id="11"
            hideDefinition={true}
            store={store}
            actions={actions}
            title={title}
            instructions={instructions}
            choiceCount={4}
            next={isBeginning ? null : "activity-12"}
            demoText={`There are ${window.dictionary.words.length - 2} additional words in the full version.`}/>);
    }
});

module.exports = Activity11;
