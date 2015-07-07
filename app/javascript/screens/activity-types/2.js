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
const Sound = require("components/utility/sound");
const Sounds = require("components/utility/sounds");

const ActivityType2 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener
    ],

    playWordSound: isMounted(function() {
        soundManager.stop();
        this.refs.wordSound.play();
    }),

    stopSounds: isMounted(function() {
        if(this.refs.sounds) {
            this.refs.sounds.stop();
        }
    }),

    onSoundPlay: isMounted(function() {
        this.state.soundPlaying = true;
        this.setState(this.state);
    }),

    onSoundEnd: isMounted(function() {
        this.state.soundPlaying = false;
        this.setState(this.state);
    }),

    renderTitle() {
        return (<span>{this.props.title}</span>);
    },

    renderInstructions() {
        return this.props.instructions;
    },

    renderActivity() {
        const revealed = this.state.isWaiting();
        const choices = this.state.getCurrentChoiceGroup();
        const correctPartSoundPath = this.state.getCorrectSound();
        const exampleWordSoundPath = this.state.getExampleSoundPath();
        const exampleWordId = this.state.data.currentAttempt.exampleWordId;
        const correctPartId = this.state.getCorrectChoice().partId;
        const actions = this.props.actions;
        const index = this.state.getIndex();
        let sounds;

        if(revealed) {
            sounds = (<Sounds ref="sounds" autoplay={true} key={correctPartSoundPath + "-sounds"} delay={250} paths={[
                correctPartSoundPath,
                "as-in",
                exampleWordSoundPath
            ]}/>);
        }

        return (
            <div>
                {sounds}
                <Sound 
                    ref="wordSound"
                    delay={250}
                    key={correctPartSoundPath} 
                    path={correctPartSoundPath}
                    onPlay={this.onSoundPlay}
                    onEnd={this.onSoundEnd}/>

                <Info>
                    {this.renderTitle()} {index}/{this.state.getCount()}
                </Info>

                <InstructionsBox>
                    <Instructions>{this.renderInstructions()}</Instructions>
                    <DefinitionDisplayBox 
                        partId={this.state.getCorrectChoice().partId}/>
                    <ExampleWord
                        key={index + exampleWordId}
                        wordId={exampleWordId} 
                        underlinedPartId={correctPartId}
                        hidden={!revealed}
                        playable={true}
                        onPlay={this.stopSounds}/>
                </InstructionsBox>

                <BottomContainer>
                    <ChoiceContainer choiceCount={3}>
                        {choices.map((choice) =>
                            <PartChoice 
                                onClick={actions.selectChoice.bind(null, choice)} 
                                key={`${index}-${choice.partId}`} 
                                revealed={revealed}
                                correct={choice.correct}
                                selected={choice.selected}
                                partId={choice.partId}
                                onRevealedClick={choice.correct ? this.playWordSound : null}
                                highlighted={choice.correct && this.state.soundPlaying}/>
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
