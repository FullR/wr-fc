const React = require("react");
const Reflux = require("reflux");
const ScoreTable = require("components/feedback/score-table");
const colors = require("colors");
const FeedbackButton = require("components/feedback/button");
const appStore = require("app-store");
const EndGameWindow = require("components/feedback/end-game");
const DemoModal = require("components/feedback/demo-modal");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const style = {
    background: colors.FEEDBACK_BG,
    width: "100%",
    height: "100%"
};

const buttonStyle = {
    marginLeft: 30
};

const Feedback = React.createClass({
    mixins: [Reflux.connect(appStore, "app")],

    contextTypes: {
        router: React.PropTypes.func,
        level: React.PropTypes.object,
        dictionary: React.PropTypes.object
    },

    goToNextGame() {
        this.context.router.transitionTo(this.props.next);
    },

    canReview() {
        const lastScore = this.props.scores[0];
        return lastScore.correct < lastScore.max;
    },

    render() {
        const mostRecentArrowStyle = {
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

        const scoreStyle = {
            position: "absolute",
            top: "15%",
            bottom: "15%",
            left: "25%",
            right: "25%"
        };

        const buttonPadding = bp({
            [micro]: 5,
            [small]: 10,
            [medium]: 20,
            defaults: 30
        });

        const buttonGroupStyle = {
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
                    window.level.demo ? 
                        <DemoModal>{this.props.demoText}</DemoModal>:
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
