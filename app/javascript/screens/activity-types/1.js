const React = require("react");
const Reflux = require("reflux");
const activityMixin = require("mixins/activity");
const windowListener = require("mixins/window-listener");
const isMounted = require("utility/mounted-only");

const Feedback = require("screens/feedback");
const FeedbackTitle = require("components/feedback/title");

const ChoiceContainer = require("components/activity/choice-container");
const DefinitionChoice = require("components/activity/definition-choice");
const WordPart = require("components/activity/word-part");
const Word = require("components/activity/word");
const ContinueButton = require("components/activity/continue-button");
const Info = require("components/activity/info");
const InstructionsBox = require("components/activity/instructions-box");
const Instructions = require("components/activity/instructions");
const PartDisplayBox = require("components/activity/part-display-box");
const ExampleWord = require("components/activity/example-word");
const BottomContainer = require("components/activity/bottom-container");
const dictionary = window.dictionary;

const ActivityType1 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener,
        require("mixins/audio")
    ],

    componentDidMount() {
        if(!this.state.isShowingFeedback()) {
            this.loadSounds();
            if(this.state.isWaiting()) {
                this.playDefinitionSound(250);
            } else {
                this.playWordSound(250);
            }
        }
    },

    loadSounds() {
        return this.load(
            this.state.getCorrectSound(),
            this.state.getCorrectDefinitionSound()
        );
    },

    playWordSound(delay=0) {
        this.stop();
        this.play(this.state.getCorrectSound(), delay, true);
    },

    playDefinitionSound(delay=0) {
        const soundPath = this.state.getCorrectDefinitionSound();
        this.stop();
        if(soundPath) {
            this.play(soundPath, delay, true);
        }
    },

    selectChoice(choice) {
        if(!this.state.isWaiting()) {
            this.props.actions.selectChoice(choice);
            this.playDefinitionSound();
        }
    },

    continueActivity() {
        if(this.state.isWaiting()) {
            this.props.actions.continueActivity();
            
            setTimeout(() => {
                this.playWordSound();
            }, 1);
        }
    },

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
        const choices = this.state.getCurrentChoiceGroup();
        const exampleWordId = this.state.data.currentAttempt.exampleWordId;
        const correctPartId = this.state.getCorrectChoice().partId;
        const actions = this.props.actions;
        const index = this.state.getIndex();

        const isChoicePlaying = this.isPlaying(this.state.getCorrectDefinitionSound());
        const isDisplayPlaying = this.isPlaying(this.state.getCorrectSound());

        return (
            <div>
                <Info>
                    {this.renderTitle()} {index}/{this.state.getCount()}
                </Info>

                <InstructionsBox>
                    <Instructions>{this.renderInstructions()}</Instructions>
                    <PartDisplayBox 
                        partId={this.state.getCorrectChoice().partId} 
                        onClick={isDisplayPlaying ? null : this.playWordSound}
                        highlighted={isDisplayPlaying}/>
                    <ExampleWord
                        key={index + exampleWordId}
                        wordId={exampleWordId}
                        underlinedPartId={correctPartId}
                        hidden={!revealed}/>
                </InstructionsBox>

                <BottomContainer>
                    <ChoiceContainer choiceCount={3}>
                        {choices.map((choice) =>
                            <DefinitionChoice 
                                onClick={this.selectChoice.bind(this, choice)}
                                onRevealedClick={(revealed && choice.correct && !isChoicePlaying) ? this.playDefinitionSound : null}
                                key={`${index}-${choice.partId}`} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}
                                highlighted={(revealed && choice.correct) && isChoicePlaying}/>
                        )}
                    </ChoiceContainer>
                </BottomContainer>

                {revealed ?
                    <ContinueButton onClick={this.continueActivity}/> :
                    null
                }
            </div>
        );
//<button onClick={this.debugSelectCorrect} style={{position: "absolute", left: 20, top: 20, height: 100, width:200}}>Next</button>
    },

    replay() {
        this.props.actions.replay();
        setTimeout(() => this.playWordSound(250), 1);
    },

    review() {
        this.props.actions.review();
        setTimeout(() => this.playWordSound(250), 1);
    },

    renderFeedback() {
        return (
            <Feedback
                demoText={this.props.demoText}
                scores={this.state.data.scores}
                onReviewClick={this.review}
                onReplayClick={this.replay}
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

module.exports = ActivityType1;
