var React = require("react");
var Reflux = require("reflux");
var ScoreTable = require("components/feedback/score-table");
var colors = require("colors");
var FeedbackButton = require("components/feedback/button");
var appStore = require("app-store");
var EndGameWindow = require("components/feedback/end-game");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var style = {
    background: colors.FEEDBACK_BG,
    width: "100%",
    height: "100%"
};

var buttonStyle = {
    marginLeft: 30
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
        var mostRecentArrowStyle = {
            position: "absolute",
            width: "100%",
            textAlign: "right",
            left: bp({
                [micro]: "-100.5%",
                [small]: "-102%",
                [medium]: "-103.5%",
                defaults: "-105%"
            }),
            fontWeight: "bold",
            fontSize: bp({
                [small]: 20,
                [medium]: 25,
                defaults: 30
            }),
            lineHeight: bp({
                [small]: "40px",
                [medium]: "50px",
                defaults: "60px"
            }),
            color: "#FF0000"
        };
        var scoreStyle = {
            position: "absolute",
            top: "15%",
            bottom: "15%",
            left: "25%",
            right: "25%"
        };

        var buttonPadding = bp({
            [micro]: 5,
            [small]: 10,
            [medium]: 20,
            defaults: 30
        });
        var buttonGroupStyle = {
            position: "absolute",
            right: buttonPadding,
            bottom: buttonPadding
        };
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
