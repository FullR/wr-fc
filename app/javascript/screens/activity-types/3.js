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

const ActivityType3 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener,
        require("mixins/audio")
    ],

    renderTitle() {
        return (
            <span>{this.props.title}</span>
        );
    },

    renderInstructions() {
        return this.props.instructions;
    },

    playCorrectWord(delay=0) {
        const correctWordPath = this.state.getCorrectWordSound();
        this.stop();
        if(correctWordPath) {
            this.play(correctWordPath, delay, true);
        }
    },

    selectChoice(choice) {
        this.props.actions.selectChoice(choice);
        setTimeout(() => {
            if(this.state.isWaiting() && !this.state.isShowingFeedback()) {
                this.playCorrectWord();
            }
        }, 1);
    },

    continueActivity() {
        this.stop();
        this.props.actions.continueActivity();
    },

    componentDidMount() {
        if(this.state.isWaiting() && !this.state.isShowingFeedback()) {
            this.playCorrectWord(250);
        }
    },

    renderActivity() {
        const revealed = this.state.isWaiting();
        const choices = this.state.getCurrentChoiceGroup().choices;
        const actions = this.props.actions;
        const correctWordId = this.state.getCorrectWordId();
        const index = this.state.getIndex();

        const isPlaying = this.isPlaying(this.state.getCorrectWordSound());

        return (
            <div>
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
                    highlighted={isPlaying}
                    onClick={revealed && !isPlaying ? this.playCorrectWord : null}/>

                <BottomContainer>
                    <ChoiceContainer choiceCount={this.props.choiceCount}>
                        {choices.map((choice) =>
                            <PartChoice 
                                onClick={revealed ? null : this.selectChoice.bind(this, choice)} 
                                key={`${index}-${choice.partId}`} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}
                                choiceCount={choices.length}/>
                        )}
                    </ChoiceContainer>

                    {revealed ?
                        <ContinueButton onClick={this.continueActivity}/> :
                        null 
                    }
                </BottomContainer>
            </div>
        );//                <button onClick={this.debugSelectCorrect} style={{position: "absolute", left: 20, top: 20, height: 100, width:200}}>Next</button>
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
