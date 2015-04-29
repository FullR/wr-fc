var React = require("react");
var Reflux = require("reflux");
var _ = require("lodash");
var {Link} = require("react-router");
var s = require("utility/styles");
var appStore = require("app-store");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var Header = require("components/menu/header");
var ButtonContainer = require("components/menu/button-container");
var ButtonGroupHeader = require("components/menu/button-group-header");
var ButtonRow = require("components/menu/button-row");
var ActivityButton = require("components/menu/activity-button");
var ChangeUserButton = require("components/menu/change-user-button");
var FooterMenu = require("components/menu/footer-menu");
var UsernameLabel = require("components/menu/username-label");
var ScoreLabel = require("components/menu/score-label");
var ActivityButtonTitle = require("components/menu/activity-button-title");
var Logo = require("components/menu/logo");
var Modal = require("components/menu/modal");
var modalMixin = require("mixins/modal-manager");

var reset = require("actions/reset");
var setUsername = require("actions/set-username");

var style = {
    width: "100%",
    height: "100%"
};

var footerLinkStyle = {
    margin: bp({
        [small]: "0 0.25rem",
        [medium]: "0 1rem",
        defaults: "0 1.6rem"
    }),
    color: "#0000FF",
    textDecoration: "underline",
    cursor: "pointer"
};

var logoStyle = {
    position: "absolute",
    left: 16,
    top: 16
};

var Menu = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        modalMixin
    ],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            appStore: appStore
        };
    },

    componentDidMount: function() {
        this.listenTo(appStore, () => {
            this.setState(_.extend({}, this.state, {
                appStore: appStore
            }));
        });
    },

    clearUserData: function() {
        var username = this.state.appStore.getUsername();
        reset();
        setUsername(username);
        this.closeModal();
    },

    changeUser: function() {
        reset();
        this.context.router.transitionTo("login");
    },

    renderLabel: function(activityId) {
        var appStore = this.state.appStore;
        var highscore;
        var percent;

        if(appStore.isStarted(activityId)) {
            if(appStore.isCompleted(activityId)) {
                highscore = appStore.getHighscore(activityId);
                percent = Math.floor((highscore.correct / highscore.max)*100);
                return (<ScoreLabel>{percent}%</ScoreLabel>);
            }
            else {
                return (<ScoreLabel>Incomplete</ScoreLabel>);
            }
        }
        return null;
    },

    render: function() {
        var isActive = this.state.appStore.isLastActivity.bind(this.state.appStore);

        var clearModal = (
            <Modal
                key="clear-user-modal"
                onNoClick={this.closeModal}
                onYesClick={this.clearUserData}
            >
                Are you sure you want to clear this user{"'"}s data?
            </Modal>
        );

        var changeUserModal = (
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
                        <ActivityButton activityId="9" active={isActive("9")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Four Word Parts From the Word{"'"}s Definition</ActivityButtonTitle>
                            {this.renderLabel("9")}
                        </ActivityButton>
                    </ButtonRow>

                    <ButtonRow>
                        <ActivityButton activityId="10" active={isActive("10")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Two Word Parts That Form a Word</ActivityButtonTitle>
                            {this.renderLabel("10")}
                        </ActivityButton>
                        <ActivityButton activityId="11" active={isActive("11")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Three Word Parts That Form a Word</ActivityButtonTitle>
                            {this.renderLabel("11")}
                        </ActivityButton>
                        <ActivityButton activityId="12" active={isActive("12")} color="cyan" large={true}>
                            <ActivityButtonTitle>Identify Four Word Parts That Form a Word</ActivityButtonTitle>
                            {this.renderLabel("12")}
                        </ActivityButton>
                    </ButtonRow>
                </ButtonContainer>

                <ChangeUserButton onClick={this.openModal.bind(this, changeUserModal)}/>
                <FooterMenu>
                    <Link to="about" style={footerLinkStyle}>About</Link>
                    <Link to="license" style={footerLinkStyle}>License Agreement</Link>
                    <Link to="products" style={footerLinkStyle}>Other Products</Link>
                    <Link to="credits" style={footerLinkStyle}>Credits</Link>
                    <span style={footerLinkStyle} onClick={this.openModal.bind(this, clearModal)}>Clear User Data</span>
                </FooterMenu>
            </div>
        );
    }
});

module.exports = Menu;
