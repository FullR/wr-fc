const React = require("react");
const _ = require("lodash");
const colors = require("colors");
const dictionary = window.dictionary;

function wrapMiddle(start, end, wrapStart, wrapEnd, str) {
    return str.substring(0, start) + wrapStart + str.substring(start, end) + wrapEnd + str.substring(end, str.length);
}

const WordPart = React.createClass({
    propTypes: {
        partId: React.PropTypes.string.isRequired
    },

    render() {
        const part = dictionary.get(this.props.partId);
        let joiner;
        let html;

        if(!part) {
            return <span {...this.props} style={_.extend(style, this.props.style)}>WORD PART NOT FOUND: {this.props.partId}</span>;
        }

        joiner = part.joiner;
        html = part.html || part.id;

        if(joiner) {
            html = wrapMiddle(joiner[0], joiner[1], `<span style="color:${colors.JOINER}">`, "</span>", html);
        }

        const style = {
            color: colors[part.type.toUpperCase()]
        };

        return (
            <span {...this.props} style={_.extend(style, this.props.style)}
                dangerouslySetInnerHTML={{__html: html}} />
        );
    }
});

module.exports = WordPart;
