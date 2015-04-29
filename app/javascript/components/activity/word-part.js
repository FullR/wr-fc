var React = require("react");
var _ = require("lodash");
var colors = require("colors");
var dictionary = window.dictionary;

function wrapMiddle(start, end, wrapStart, wrapEnd, str) {
    return str.substring(0, start) + wrapStart + str.substring(start, end) + wrapEnd + str.substring(end, str.length);
}

var WordPart = React.createClass({
    propTypes: {
        partId: React.PropTypes.string.isRequired
    },

    render: function() {
        var part = dictionary.get(this.props.partId);
        var joiner;
        var html;

        if(!part) {
            return <span {...this.props} style={_.extend(style, this.props.style)}>WORD PART NOT FOUND: {this.props.partId}</span>;
        }

        joiner = part.joiner;
        html = part.html || part.id;

        if(joiner) {
            html = wrapMiddle(joiner[0], joiner[1], `<span style="color:${colors.JOINER}">`, "</span>", html);
        }

        var style = {
            color: colors[part.type.toUpperCase()]
        };

        return (
            <span {...this.props} style={_.extend(style, this.props.style)}
                dangerouslySetInnerHTML={{__html: html}} />
        );
    }
});

module.exports = WordPart;