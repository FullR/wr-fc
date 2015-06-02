const React = require("react");
const colors = require("colors");
const WebLink = require("components/utility/web-link");

const DemoModal = React.createClass({
    mixins: [require("mixins/style")],
    getInitialState() {
        return {
            open: true
        };
    },

    close() {
        this.setState({
            open: false
        });
    },

    render() {
        const windowWidth = 550;
        const windowHeight = 350;

        const overlayStyle = {
            position: "absolute",
            height: "100%",
            width: "100%",
            background: "rgba(0,0,0,0.8)",
            zIndex: 5
        };

        const windowStyle = {
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

        const bgImageOverlayStyle = {
            position: "relative",
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.85)",
            borderRadius: 8,
            padding: 30
        };

        const textStyle = {
            fontSize: 28,
            marginTop: 20
        };

        const buttonContainerStyle = {
            position: "absolute",
            bottom: 30,
            left: 0,
            width: "100%"
        };

        const buttonStyle = {
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

        const purchaseLinkStyle = {
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