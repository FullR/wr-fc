var React = require("react");
var bp = require("utility/bp");
var {Link} = require("react-router");
var {small, medium} = require("sizes");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

var FooterLink = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            margin: bp({
                [small]: "0 0.25rem",
                [medium]: "0 1rem",
                defaults: "0 1.6rem"
            }),
            color: "#0000FF",
            textDecoration: "underline",
            cursor: "pointer",

            states: [
                {hover: {
                    color: "#000088"
                }}
            ]
        });

        return this.props.to ?
            <Link {...this.getBrowserStateEvents()} {...this.props} style={style}>{this.props.children}</Link> :
            <span {...this.getBrowserStateEvents()} {...this.props} style={style}>{this.props.children}</span>;
    }
});

module.exports  =FooterLink;