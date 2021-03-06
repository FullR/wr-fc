const React = require("react");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const ContinueButton = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = {
            position: "absolute",
            width: bp({
                [small]: 45,
                [medium]: 60,
                defaults: 75
            }),
            height: 150,
            backgroundSize: "100% 100%",
            backgroundImage: "url('assets/images/continue-button.png')",
            cursor: "pointer",
            textAlign: "right",
            bottom: "15%",
            marginBottom: -20,
            right: "2.5%",
            states: window.__platform.cordova ? [] : [ // make sure the hover state never appears on mobile platforms
                {hover: {
                    backgroundImage: "url('assets/images/continue-button_hover.png')"
                }}
            ]
        };

        return (window.__platform.cordova ?
            <div {...this.props} {...this.getStyle(style)} onTouchStart={this.props.onClick} onClick={null}/> :
            <div {...this.props} {...this.getStyle(style)} onTouchStart={null} onClick={this.props.onClick}/>
        );
    }
});

module.exports = ContinueButton;
