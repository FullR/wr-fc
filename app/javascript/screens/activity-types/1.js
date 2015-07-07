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
const Sound = require("components/utility/sound");
const dictionary = window.dictionary;

const ActivityType1 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener
    ],

    getSounds() {
        const correctPart = dictionary.get(this.state.getCorrectChoice().partId);

        return {
            correctWord: correctPart.soundFile,
            correctDefinition: correctPart.definitionSoundFile
        };
    },

    playWordSound: isMounted(function() {
        if(this.refs.definitionSound) {
            this.refs.definitionSound.stop();
        }
        this.refs.wordSound.play();
    }),

    playDefinitionSound: isMounted(function() {
        if(this.refs.wordSound) {
            this.refs.wordSound.stop();
        }
        this.refs.definitionSound.play();
    }),

    onSoundPlay: isMounted(function() {
        this.state.soundPlaying = true;
        this.setState(this.state);
    }),

    onSoundEnd: isMounted(function() {
        this.state.soundPlaying = false;
        this.setState(this.state);
    }),

    onDefinitionPlay: isMounted(function() {
        this.state.defintionPlaying = true;
        this.setState(this.state);
    }),

    onDefinitionEnd: isMounted(function() {
        this.state.defintionPlaying = false;
        this.setState(this.state);
    }),

    renderTitle() {
        return (
            <span>{this.props.title}</span>
        );
    },

    renderInstructions() {
        return this.props.instructions;
    },

    componentDidMount() {
        this.on("keydown", (event) => {
            switch(event.keyCode) {
                case 32: if(!this.state.isShowingFeedback() && this.state.isWaiting()) {
                    this.props.actions.continueActivity();
                    break;
                }
            }
        });
    },

    renderActivity() {
        const revealed = this.state.isWaiting();
        const choices = this.state.getCurrentChoiceGroup();
        const correctPartSoundPath = this.state.getCorrectSound();
        const correctDefSoundPath = this.state.getCorrectDefinitionSound();
        const exampleWordId = this.state.data.currentAttempt.exampleWordId;
        const correctPartId = this.state.getCorrectChoice().partId;
        const actions = this.props.actions;
        const index = this.state.getIndex();

        const sounds = revealed ? [
            <Sound 
                ref="wordSound"
                key={correctPartSoundPath + "-after"} 
                path={correctPartSoundPath}
                onPlay={this.onSoundPlay}
                onEnd={this.onSoundEnd}/>,
            <Sound
                ref="definitionSound"
                key={correctDefSoundPath}
                path={correctDefSoundPath}
                autoplay={true}
                delay={250}
                onPlay={this.onDefinitionPlay}
                onEnd={this.onDefinitionEnd}/>
        ] : [
            <Sound
                ref="wordSound"
                key={correctPartSoundPath}
                path={correctPartSoundPath}
                autoplay={true}
                delay={250}
                onPlay={this.onSoundPlay}
                onEnd={this.onSoundEnd}/>
        ];

        return (
            <div>
                {sounds}
                <Info>
                    {this.renderTitle()} {index}/{this.state.getCount()}
                </Info>

                <InstructionsBox>
                    <Instructions>{this.renderInstructions()}</Instructions>
                    <PartDisplayBox 
                        partId={this.state.getCorrectChoice().partId} 
                        onClick={this.playWordSound}
                        highlighted={this.state.soundPlaying}/>
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
                                onClick={actions.selectChoice.bind(null, choice)}
                                onRevealedClick={(revealed && choice.correct) ? this.playDefinitionSound : null}
                                key={`${index}-${choice.partId}`} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}
                                highlighted={(revealed && choice.correct) && this.state.defintionPlaying}/>
                        )}
                    </ChoiceContainer>
                </BottomContainer>

                {revealed ?
                    <ContinueButton onClick={actions.continueActivity}/> :
                    null 
                }
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
        }
        else {
            return this.renderActivity();
        }
    }
});

module.exports = ActivityType1;
