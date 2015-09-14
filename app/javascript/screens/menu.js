const React = require("react");
const Reflux = require("reflux");
const _ = require("lodash");
const s = require("utility/styles");
const appStore = require("app-store");
const bp = require("utility/bp");
const {small, medium} = require("sizes");
const hasher = require("hasher");

const Header = require("components/menu/header");
const ButtonContainer = require("components/menu/button-container");
const ButtonGroupHeader = require("components/menu/button-group-header");
const ButtonRow = require("components/menu/button-row");
const ActivityButton = require("components/menu/activity-button");
const ChangeUserButton = require("components/menu/change-user-button");
const CloseButton = require("components/menu/close-button");
const FooterMenu = require("components/menu/footer-menu");
const FooterLink = require("components/menu/footer-link");
const UsernameLabel = require("components/menu/username-label");
const ScoreLabel = require("components/menu/score-label");
const ActivityButtonTitle = require("components/menu/activity-button-title");
const Logo = require("components/menu/logo");
const Modal = require("components/menu/modal");
const modalMixin = require("mixins/modal-manager");

const reset = require("actions/reset");
const setUsername = require("actions/set-username");

const style = {
    width: "100%",
    height: "100%"
};

const logoStyle = {
    position: "absolute",
    left: 16,
    top: 16
};

const Menu = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        modalMixin
    ],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState() {
        return {
            appStore: appStore
        };
    },

    componentDidMount() {
        //var volumeSlider = window.plugins ? window.plugins.volumeSlider : null;
        //if(volumeSlider) {
        //    volumeSlider.createVolumeSlider(bp.getWidth() - 35, 100, 300, 30); // origin x, origin y, width, height
        //    volumeSlider.showVolumeSlider();
        //}

        this.listenTo(appStore, () => {
            this.setState(_.extend({}, this.state, {
                appStore: appStore
            }));
        });
    },

    clearUserData() {
        const username = this.state.appStore.getUsername();
        reset();
        setUsername(username);
        this.closeModal();
    },

    changeUser() {
        reset();
        hasher.setHash("login");
    },

    renderLabel(activityId) {
        const appStore = this.state.appStore;

        if(appStore.isStarted(activityId)) {
            if(appStore.isCompleted(activityId)) {
                let highscore = appStore.getHighscore(activityId);
                let percent = Math.floor((highscore.correct / highscore.max)*100);
                return (<ScoreLabel>{percent}%</ScoreLabel>);
            }
            else {
                return (<ScoreLabel>Incomplete</ScoreLabel>);
            }
        }
        return null;
    },

    render() {
        const isActive = this.state.appStore.isLastActivity.bind(this.state.appStore);
        const isBeginning = (window.level.levelId === "beginning");
        const clearModal = (
            <Modal
                key="clear-user-modal"
                onNoClick={this.closeModal}
                onYesClick={this.clearUserData}
            >
                Are you sure you want to clear this user{"'"}s data?
            </Modal>
        );

        const changeUserModal = (
            <Modal
                onNoClick={this.closeModal}
                onYesClick={this.changeUser}
            >
                Changing users will permanently remove this user{"'"}s progress.  Are you sure you wish to continue?
            </Modal>
        );

        return (
            <div style={style}>
                {this.renderModal()}
                <UsernameLabel>{this.state.appStore.getUsername()}</UsernameLabel>
                <Logo style={logoStyle}/>
                <Header/>
                <ButtonContainer>
                    <ButtonGroupHeader>Study Games</ButtonGroupHeader>
                    <ButtonRow>
                        <ActivityButton activityId="1" active={isActive("1")} color="green">
                            <ActivityButtonTitle>Identify Prefix Definition</ActivityButtonTitle>
                            {this.renderLabel("1")}
                        </ActivityButton>
                        <ActivityButton activityId="2" active={isActive("2")} color="red">
                            <ActivityButtonTitle>Identify Root Definition</ActivityButtonTitle>
                            {this.renderLabel("2")}
                        </ActivityButton>
                        <ActivityButton activityId="3" active={isActive("3")} color="blue">
                            <ActivityButtonTitle>Identify Suffix Definition</ActivityButtonTitle>
                            {this.renderLabel("3")}
                        </ActivityButton>
                    </ButtonRow>

                    <ButtonRow>
                        <ActivityButton activityId="4" active={isActive("4")} color="green">
                            <ActivityButtonTitle>Identify Prefix From Definition</ActivityButtonTitle>
                            {this.renderLabel("4")}
                        </ActivityButton>
                        <ActivityButton activityId="5" active={isActive("5")} color="red">
                            <ActivityButtonTitle>Identify Root From Definition</ActivityButtonTitle>
                            {this.renderLabel("5")}
                        </ActivityButton>
                        <ActivityButton activityId="6" active={isActive("6")} color="blue">
                            <ActivityButtonTitle>Identify Suffix From Definition</ActivityButtonTitle>
                            {this.renderLabel("6")}
                        </ActivityButton>
                    </ButtonRow>

                    <ButtonGroupHeader>Practice Games</ButtonGroupHeader>
                    <ButtonRow>
                        <ActivityButton activityId="7" active={isActive("7")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Two Word Parts From the Word{"'"}s Definition</ActivityButtonTitle>
                            {this.renderLabel("7")}
                        </ActivityButton>
                        <ActivityButton activityId="8" active={isActive("8")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Three Word Parts From the Word{"'"}s Definition</ActivityButtonTitle>
                            {this.renderLabel("8")}
                        </ActivityButton>
                        {isBeginning ? null :
                            <ActivityButton activityId="9" active={isActive("9")} color="cyan" large={true}>
                                <ActivityButtonTitle>Identify Four Word Parts From the Word{"'"}s Definition</ActivityButtonTitle>
                                {this.renderLabel("9")}
                            </ActivityButton>
                        }
                    </ButtonRow>

                    <ButtonRow>
                        <ActivityButton index={isBeginning ? "9" : "10"} activityId="10" active={isActive("10")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Two Word Parts That Form a Word</ActivityButtonTitle>
                            {this.renderLabel("10")}
                        </ActivityButton>
                        <ActivityButton index={isBeginning ? "10" : "11"} activityId="11" active={isActive("11")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Three Word Parts That Form a Word</ActivityButtonTitle>
                            {this.renderLabel("11")}
                        </ActivityButton>
                        {isBeginning ? null :
                            <ActivityButton activityId="12" active={isActive("12")} color="cyan" large={true}>
                                <ActivityButtonTitle>Identify Four Word Parts That Form a Word</ActivityButtonTitle>
                                {this.renderLabel("12")}
                            </ActivityButton>
                        }
                    </ButtonRow>
                </ButtonContainer>

                <ChangeUserButton onClick={this.openModal.bind(this, changeUserModal)}/>
                <CloseButton/>
                <FooterMenu>
                    <FooterLink href="#about">About</FooterLink>
                    <FooterLink href="#license">License Agreement</FooterLink>
                    <FooterLink href="#products">Other Products</FooterLink>
                    <FooterLink href="#credits">Credits</FooterLink>
                    <FooterLink onClick={this.openModal.bind(this, clearModal)}>Clear User Data</FooterLink>
                </FooterMenu>
            </div>
        );
    }
});

module.exports = Menu;
