const React = require("react");
const ModalButton = require("components/menu/modal-button");
const colors = require("colors");

const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    zIndex: 10
};

const windowStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 352,
    height: 262,
    margin: "-131px 0 0 -176px",
    border: "1px solid #000000",
    background: "#FFFFFF",
    zIndex: 11
};

const textStyle = {
    position: "absolute",
    top: 32,
    left: "10%",
    display: "inline-block",
    width: "80%",
    fontSize: 22,
    textAlign: "center",
    color: "#000000"
};

const yesStyle = {
    position: "absolute",
    bottom: 32,
    right: 32
};

const noStyle = {
    position: "absolute",
    bottom: 32,
    left: 32
};

const Modal = React.createClass({
    render() {
        return (
            <div style={overlayStyle} onClick={this.props.onNoClick}>
                <div style={windowStyle}>
                    <div style={textStyle}>
                        {this.props.children}
                    </div>
                    <ModalButton 
                        background={colors.MODAL_NO} 
                        backgroundHover={colors.MODAL_NO_HOVER}
                        style={noStyle}
                        onClick={this.props.onNoClick} 
                    >
                        No
                    </ModalButton>

                    <ModalButton
                        background={colors.MODAL_YES}
                        backgroundHover={colors.MODAL_YES_HOVER}
                        style={yesStyle}
                        onClick={this.props.onYesClick}
                    >
                        Yes
                    </ModalButton>
                </div>
            </div>
        );
    }
});

module.exports = Modal;
