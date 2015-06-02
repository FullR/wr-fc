const React = require("react");
const DisplayBox = require("components/activity/display-box");
const WordPart = require("components/activity/word-part");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const PartDisplayBox = React.createClass({
    render() {
        const style = {
            fontSize: bp({
                [small]: 36,
                [medium]: 44,
                defaults: 52
            }),
            lineHeight: bp({
                [small]: "48px",
                [medium]: "56px",
                defaults: "64px"
            })
        };

        return (
            <DisplayBox {...this.props}>
                <WordPart partId={this.props.partId} style={style}/>
            </DisplayBox>
        );
    }
});

module.exports = PartDisplayBox;
