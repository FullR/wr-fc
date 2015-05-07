var React = require("react");
var bp = require("utility/bp");
var {Link} = require("react-router");
var {micro, small, medium} = require("sizes");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

var FooterLink = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            margin: bp({
                [micro]: "0 5px",
                [small]: "0 8px",
                [medium]: "0 12px",
                defaults: "0 16px"
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