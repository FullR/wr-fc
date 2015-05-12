var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var colors = require("colors");

var EndGameWindow = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],
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
            background: "rgba(0,0,0,0.2)",
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
            background: "url('assets/images/end-game.png') no-repeat #FFFFFF",
            backgroundPosition: "center",
            backgroundSize: "100% 100%"
        };

        var bgImageOverlayStyle = {
            position: "relative",
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.85)",
            borderRadius: 8,
            padding: 30
        };

        var headerStyle = {
            width: "100%",
            fontSize: 32,
            fontWeight: 700,
        };

        var textStyle = {
            fontSize: 22,
            marginTop: 60
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

        if(!this.state.open) {
            return null;
        }

        return (
            <div style={overlayStyle}>
                <div style={{position: "relative", width: "100%", height: "100%"}}>
                    <div style={windowStyle}>
                        <div style={bgImageOverlayStyle}>
                            <div style={headerStyle}>Congratulations!</div>
                            <div style={textStyle}>You have completed all of the games.<br/>You can restart by selecting Clear User Data from the Admin/Score screen.</div>
                            <div style={buttonContainerStyle}>
                                <div {...this.getBrowserStateEvents()} style={this.buildStyles(buttonStyle)} onClick={this.close}>Close</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EndGameWindow;
