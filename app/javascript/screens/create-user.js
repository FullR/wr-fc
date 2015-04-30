var React = require("react");
var setUsername = require("actions/set-username");
var colors = require("colors");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

var style = {
    width: "100%",
    height: "100%",
    background: colors.LOGIN_BG
};

var labelStyle = {
    position: "absolute",
    top: "25%",
    width: "100%",
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: 400
};

var formStyle = {
    position: "absolute",
    top: "40%",
    width: "100%",
    textAlign: "center",
    fontSize: "3.2rem"
};

var buttonStyle = {
    width: 120,
    marginLeft: 16,
    fontSize: "3.2rem",
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

var inputStyle = {
    width: "60%",
    height: 45,
    display: "inline-block",
    fontSize: "3.2rem",
    textAlign: "center"
};

var CreateUserScreen = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            username: ""
        };
    },

    updateUsername: function(event) {
        this.setState({
            username: event.target.value
        });
    },

    submit: function(event) {
        event.preventDefault();
        if(this.state.username.trim().length) {
            setUsername(this.state.username);
            this.context.router.transitionTo("menu");
        }
    },

    componentDidMount: function() {
        this.refs.input.getDOMNode().focus();
    },

    render: function() {
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
