const React = require("react");
const setUsername = require("actions/set-username");
const colors = require("colors");
const {StyleResolverMixin, BrowserStateMixin} = require("radium");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const style = {
    width: "100%",
    height: "100%",
    background: colors.LOGIN_BG
};

const labelStyle = {
    position: "absolute",
    top: "25%",
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 400
};

const formStyle = {
    position: "absolute",
    top: "40%",
    width: "100%",
    textAlign: "center",
    fontSize: 32
};

const inputStyle = {
    width: "60%",
    height: 45,
    display: "inline-block",
    fontSize: 32,
    textAlign: "center"
};

const CreateUserScreen = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState() {
        return {
            username: ""
        };
    },

    updateUsername(event) {
        const username = event.target.value;
        this.setState({
            username: username.length > 35 ? username.slice(0, 35) : username
        });
    },

    submit(event) {
        event.preventDefault();
        if(this.state.username.trim().length) {
            setUsername(this.state.username);
            this.context.router.transitionTo("menu");
        }
    },

    componentDidMount() {
        this.refs.input.getDOMNode().focus();
    },

    render() {
        const buttonStyle = {
            fontSize: bp({
                [small]: 24,
                [medium]: 28,
                defaults: 32
            }),
            marginLeft: bp({
                [small]: 8,
                [medium]: 12,
                defaults: 16
            }),
            padding: "8px 12px 8px 12px",
            borderRadius: 5,
            border: "1px solid black",
            color: "#FFFFFF",
            cursor: "pointer",
            background: colors.INFO_BUTTON_BG,

            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        };

        return (
            <div style={style}>
                <div style={labelStyle}>Enter a name to begin.</div>

                <form onSubmit={this.submit} style={formStyle}>
                    <input ref="input" value={this.state.username} onChange={this.updateUsername} placeholder="New User Name" style={inputStyle}/>
                    <button {...this.getBrowserStateEvents()} style={this.buildStyles(buttonStyle)}>Create</button>
                </form>
            </div>
        );
    }
});

module.exports = CreateUserScreen;
