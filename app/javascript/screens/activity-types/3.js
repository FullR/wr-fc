var React = require("react");
var Reflux = require("reflux");
var activityMixin = require("mixins/activity");
var windowListener = require("mixins/window-listener");
var isMounted = require("utility/mounted-only");

var Feedback = require("screens/feedback");
var FeedbackTitle = require("components/feedback/title");

var ChoiceContainer = require("components/activity/choice-container");
var PartChoice = require("components/activity/part-choice");
var WordPart = require("components/activity/word-part");
var Word = require("components/activity/word");
var ContinueButton = require("components/activity/continue-button");
var Info = require("components/activity/info");
var InstructionsBox = require("components/activity/instructions-box");
var Instructions = require("components/activity/instructions");
var DefinitionDisplayBox = require("components/activity/definition-display-box");
var BottomContainer = require("components/activity/bottom-container");
var PartPieceDisplay = require("components/activity/part-piece-display");
var Sound = require("components/utility/sound");

var ActivityType3 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener
    ],

    onSoundPlay: isMounted(function() {
        this.state.soundPlaying = true;
        this.setState(this.state);
    }),

    onSoundEnd: isMounted(function() {
        this.state.soundPlaying = false;
        this.setState(this.state);
    }),

    playCorrectWord: isMounted(function() {
        this.refs.correctWord.play();
    }),

    renderTitle: function() {
        return (
            <span>{this.props.title}</span>
        );
    },

    renderInstructions: function() {
        return this.props.instructions;
    },

    componentDidMount: function() {
        this.on("keydown", (event) => {
            switch(event.keyCode) {
                case 32: if(!this.state.isShowingFeedback() && this.state.isWaiting()) {
                    this.props.actions.continueActivity();
                    break;
                }
            }
        });
    },

    renderActivity: function() {
        var revealed = this.state.isWaiting();
        var choices = this.state.getCurrentChoiceGroup().choices;
        var actions = this.props.actions;
        var correctWordId = this.state.getCorrectWordId();
        var correctWordSound = this.state.getCorrectWordSound();
        var sounds;
        var index = this.state.getIndex();
        
        return (
            <div>
                {revealed ?
                    <Sound
                        ref="correctWord"
                        key={index}
                        path={correctWordSound}
                        autoplay={true}
                        onPlay={this.onSoundPlay}
                        onEnd={this.onSoundEnd}/> :
                    null
                }

                <Info>
                    {this.renderTitle()} {index}/{this.state.getCount()}
                </Info>

                <InstructionsBox>
                    <Instructions fade={revealed}>{this.renderInstructions()}</Instructions>
                    {this.props.hideDefinition ?
                        null :
                        <DefinitionDisplayBox size="small" partId={correctWordId}/>
                    }
                </InstructionsBox>

                <PartPieceDisplay
                    revealed={revealed}
                    wordId={correctWordId}
                    choices={choices}
                    highlighted={this.state.soundPlaying}
                    onClick={revealed ? this.playCorrectWord : null}/>

                <BottomContainer>
                    <ChoiceContainer choiceCount={this.props.choiceCount}>
                        {choices.map((choice) =>
                            <PartChoice 
                                onClick={actions.selectChoice.bind(null, choice)} 
                                key={choice.partId} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}/>
                        )}
                    </ChoiceContainer>

                    {revealed ?
                        <ContinueButton onClick={actions.continueActivity}/> :
                        null 
                    }
                </BottomContainer>
            </div>
        );
    },

    renderFeedback: function() {
        return (
            <Feedback
                scores={this.state.data.scores}
                onReviewClick={this.props.actions.review}
                onReplayClick={this.props.actions.replay}
                next={this.props.next}>

                <FeedbackTitle>{this.renderTitle()} Completed</FeedbackTitle>
            </Feedback>
        );
    },

    render: function() {
        if(this.state.isShowingFeedback()) {
            return this.renderFeedback();
        }
        else {
            return this.renderActivity();
        }
    }
});

module.exports = ActivityType3;