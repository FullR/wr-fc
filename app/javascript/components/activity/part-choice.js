const React = require("react");
const Choice = require("components/activity/choice");
const WordPart = require("components/activity/word-part");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const PartChoice = React.createClass({
    render() {
        const style = {
            fontSize: bp({
                [micro]: 16,
                [small]: 24,
                [medium]: 32,
                defaults: 40
            }),
            fontWeight: 700,
            lineHeight: bp({
                [micro]: "75px",
                [small]: "100px",
                [medium]: "125px",
                defaults: "150px"
            })
        };

        return (
            <Choice {...this.props} style={style}>
                <WordPart partId={this.props.partId}/>
            </Choice>
        );
    }
});

module.exports = PartChoice;
