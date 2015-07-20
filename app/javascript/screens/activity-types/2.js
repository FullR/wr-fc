const React = require("react");
const Reflux = require("reflux");
const activityMixin = require("mixins/activity");
const windowListener = require("mixins/window-listener");
const soundManager = require("sound/sound-manager");
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
const ExampleWord = require("components/activity/example-word");
const queue = require("utility/queue");

const ActivityType2 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener,
        require("mixins/audio")
    ],

    renderTitle() {
        return (<span>{this.props.title}</span>);
    },

    renderInstructions() {
        return this.props.instructions;
    },

    playCorrectPart(delay=0) {
        this.stop();
        return this.play(this.state.getCorrectSound(), delay, true);
    },

    playAsIn() {
        return this.play("as-in", 250, false);
    },

    playExampleWord(delay=0) {
        this.stop();
        return this.play(this.state.getExampleSoundPath(), delay, true);
    },

    playBoth() {
        this.stopAll();
        this.queue = queue([
            ["playCorrectPart"],
            ["playAsIn"],
            ["playExampleWord"],
        ], ([fnKey]) => this[fnKey]());
    },

    stopAll() {
        if(this.queue) {
            this.queue.stop();
        }
        this.stop();
    },

    componentDidMount() {
        if(this.state.isWaiting() && !this.state.isShowingFeedback()) {
            this.playBoth();
        }
    },

    selectChoice(choice) {
        this.props.actions.selectChoice(choice);
        setTimeout(() => this.playBoth(), 1);
    },

    continueActivity() {
        if(this.queue) {
            this.queue.stop();
            this.queue = null;
        }
        this.stop();
        this.props.actions.continueActivity();
    },

    renderActivity() {
        const revealed = this.state.isWaiting();
        const choices = this.state.getCurrentChoiceGroup();
        const exampleWordId = this.state.data.currentAttempt.exampleWordId;
        const correctPartId = this.state.getCorrectChoice().partId;
        const actions = this.props.actions;
        const index = this.state.getIndex();

        const isChoicePlaying = this.isPlaying(this.state.getCorrectSound());
        const isExamplePlaying = this.isPlaying(this.state.getExampleSoundPath());

        return (
            <div>
                <Info>
                    {this.renderTitle()} {index}/{this.state.getCount()}
                </Info>

                <InstructionsBox>
                    <Instructions>{this.renderInstructions()}</Instructions>
                    <DefinitionDisplayBox
                        partId={this.state.getCorrectChoice().partId}/>
                    <ExampleWord
                        onClick={revealed && !isExamplePlaying ? this.playExampleWord : null}
                        key={index + exampleWordId}
                        wordId={exampleWordId} 
                        underlinedPartId={correctPartId}
                        hidden={!revealed}
                        highlighted={isExamplePlaying}/>
                </InstructionsBox>

                <BottomContainer>
                    <ChoiceContainer choiceCount={3}>
                        {choices.map((choice) =>
                            <PartChoice 
                                onClick={revealed ? null : this.selectChoice.bind(this, choice)} 
                                onRevealedClick={choice.correct && !isChoicePlaying ? this.playCorrectPart : null}
                                key={`${index}-${choice.partId}`} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}
                                highlighted={revealed && choice.correct && isChoicePlaying}/>
                        )}
                    </ChoiceContainer>

                    {revealed ?
                        <ContinueButton onClick={this.continueActivity}/> :
                        null
                    }
                </BottomContainer>
            </div>
        );
    },

    renderFeedback() {
        return (
            <Feedback
                demoText={this.props.demoText}
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
        } else {
            return this.renderActivity();
        }
    }
});

module.exports = ActivityType2;
