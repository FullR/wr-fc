const React = require("react");
const Reflux = require("reflux");
const activityMixin = require("mixins/activity");
const windowListener = require("mixins/window-listener");
const isMounted = require("utility/mounted-only");

const Feedback = require("screens/feedback");
const FeedbackTitle = require("components/feedback/title");

const ChoiceContainer = require("components/activity/choice-container");
const PartChoice = require("components/activity/part-choice");
const WordPart = require("components/activity/word-part");
const Word = require("components/activity/word");
const ContinueButton = require("components/activity/continue-button");
const Info = require("components/activity/info");
const InstructionsBox = require("components/activity/instructions-box");
const Instructions = require("components/activity/instructions");
const DefinitionDisplayBox = require("components/activity/definition-display-box");
const BottomContainer = require("components/activity/bottom-container");
const PartPieceDisplay = require("components/activity/part-piece-display");
const Sound = require("components/utility/sound");

const ActivityType3 = React.createClass({
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

    renderTitle() {
        return (
            <span>{this.props.title}</span>
        );
    },

    renderInstructions() {
        return this.props.instructions;
    },

    renderActivity() {
        const revealed = this.state.isWaiting();
        const choices = this.state.getCurrentChoiceGroup().choices;
        const actions = this.props.actions;
        const correctWordId = this.state.getCorrectWordId();
        const correctWordSound = this.state.getCorrectWordSound();
        const index = this.state.getIndex();
        let sounds;

        return (
            <div>
                {revealed ?
                    <Sound
                        ref="correctWord"
                        key={index}
                        path={correctWordSound}
                        delay={250}
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
                                key={`${index}-${choice.partId}`} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}
                                choiceCount={choices.length}/>
                        )}
                    </ChoiceContainer>

                    {revealed ?
                        <ContinueButton onClick={actions.continueActivity}/> :
                        null 
                    }
                </BottomContainer>
                <button onClick={this.debugSelectCorrect} style={{position: "absolute", left: 20, top: 20, height: 100, width:200}}>Next</button>
            </div>
        );
    },

    renderFeedback() {
        return (
            <Feedback
                demoText={`There are an additional ${window.dictionary.words.length - 2} words in the full version`}
                scores={this.state.data.scores}
                onReviewClick={this.props.actions.review}
                onReplayClick={this.props.actions.replay}
                next={this.props.next}>

                <FeedbackTitle>{this.renderTitle()} Completed</FeedbackTitle>
            </Feedback>
        );
    },

    render() {
        if(this.state.isShowingFeedback()) {
            return this.renderFeedback();
        }
        else {
            return this.renderActivity();
        }
    }
});

module.exports = ActivityType3;
