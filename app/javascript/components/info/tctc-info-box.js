var React = require("react");
var WebLink = require("components/utility/web-link");
var colors = require("colors");

var TctcInfoBox = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            bottom: 4,
            width: "83rem",
            left: "50%",
            padding: "8px 0 8px 0",
            marginLeft: "-41.5rem",
            fontSize: "2rem",
            background: colors.INFO_FOOTER_INFO_BG,
            border: "3px solid #000000",
            borderRadius: 3,
            textAlign: "center"
        };

        return (
            <div style={style}>
                &copy; 2015 The Critical Thinking Co.&trade; &#8226; <WebLink href="http://www.CriticalThinking.com">www.CriticalThinking.com</WebLink> &#8226; 800-458-4849
            </div>
        );
    }
});

module.exports = TctcInfoBox;