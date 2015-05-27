var React = require("react");
var colors = require("colors");
var WebLink = require("components/utility/web-link");

var DemoModal = React.createClass({
    mixins: [require("mixins/style")],
    getInitialState: function() {
        return {
            open: true
        };
    },

    close: function() {
        this.setState({
            open: false
        });
    },

    render: function() {
        var windowWidth = 550;
        var windowHeight = 350;

        var overlayStyle = {
            position: "absolute",
            height: "100%",
            width: "100%",
            background: "rgba(0,0,0,0.8)",
            zIndex: 5
        };

        var windowStyle = {
            position: "absolute",
            textAlign: "center",
            left: "50%",
            top: "50%",
            width: windowWidth,
            height: windowHeight,
            margin: `-${windowHeight/2}px 0 0 -${windowWidth/2}px`,
            border: "2px solid black",
            borderRadius: 8,
            zIndex: 6,
            background: "#FFF"
        };

        var bgImageOverlayStyle = {
            position: "relative",
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.85)",
            borderRadius: 8,
            padding: 30
        };

        var textStyle = {
            fontSize: 28,
            marginTop: 20
        };

        var buttonContainerStyle = {
            position: "absolute",
            bottom: 30,
            left: 0,
            width: "100%"
        };

        var buttonStyle = {
            display: "inline-block",
            fontSize: 22,
            color: "#FFFFFF",
            cursor: "pointer",
            border: "2px solid black",
            borderRadius: 5,
            background: colors.INFO_BUTTON_BG,
            padding: "10px 15px 10px 15px",

            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        };

        var purchaseLinkStyle = {
            fontSize: 28,
            textAlign: "center",
            marginTop: 60
        };

        if(!this.state.open) {
            return null;
        }

        return (
            <div style={overlayStyle} onClick={this.close}>
                <div style={{position: "relative", width: "100%", height: "100%"}}>
                    <div style={windowStyle}>
                        <div style={bgImageOverlayStyle}>
                            <div style={textStyle}>{this.props.children}</div>
                            <div style={purchaseLinkStyle}><WebLink href={window.level.href}>Purchase Full Version</WebLink></div>
                            <div style={buttonContainerStyle}>
                                <div {...this.getStyle(buttonStyle)} onClick={this.close}>Close</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DemoModal;