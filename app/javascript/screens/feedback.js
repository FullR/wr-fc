var React = require("react");
var Reflux = require("reflux");
var ScoreTable = require("components/feedback/score-table");
var colors = require("colors");
var FeedbackButton = require("components/feedback/button");
var appStore = require("app-store");
var EndGameWindow = require("components/feedback/end-game");

var style = {
    background: colors.FEEDBACK_BG,
    width: "100%",
    height: "100%"
};

var mostRecentArrowStyle = {
    position: "absolute",
    width: "100%",
    textAlign: "right",
    left: "-105%",
    fontWeight: "bold",
    fontSize: "2.5rem",
    color: "#FF0000"
};

var scoreStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-22rem 0 0 -25rem",
};

var buttonGroupStyle = {
    position: "absolute",
    right: "3rem",
    bottom: "3rem"
};

var buttonStyle = {
    marginLeft: "3rem"
};

var Feedback = React.createClass({
    mixins: [Reflux.connect(appStore, "app")],

    contextTypes: {
        router: React.PropTypes.func,
        level: React.PropTypes.object,
        dictionary: React.PropTypes.object
    },

    goToNextGame: function() {
        this.context.router.transitionTo(this.props.next);
    },

    canReview: function() {
        var lastScore = this.props.scores[0];
        return lastScore.correct < lastScore.max;
    },

    render: function() {
        return (
            <div style={style}>
                {this.props.children}
                <div style={scoreStyle}>
                    <div style={mostRecentArrowStyle}>Most Recent {">"}</div>
                    <ScoreTable scores={this.props.scores}/>
                </div>

                {appStore.areAllCompleted() ?
                    <EndGameWindow/> :
                    null
                }

                <div style={buttonGroupStyle}>
                    {this.canReview() ?
                        <FeedbackButton style={buttonStyle} onClick={this.props.onReviewClick}>Replay Incorrect</FeedbackButton> :
                        null
                    }
                    <FeedbackButton style={buttonStyle} onClick={this.props.onReplayClick}>Replay</FeedbackButton>
                    {this.props.next ?
                        <FeedbackButton style={buttonStyle} onClick={this.goToNextGame}>Next Game</FeedbackButton> :
                        null
                    }
                </div>
            </div>
        );
    }
});

module.exports = Feedback;