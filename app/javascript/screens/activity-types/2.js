var React = require("react");
var Reflux = require("reflux");
var activityMixin = require("mixins/activity");
var windowListener = require("mixins/window-listener");
var soundManager = require("sound/sound-manager");
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
var ExampleWord = require("components/activity/example-word");
var Sound = require("components/utility/sound");
var Sounds = require("components/utility/sounds");

var ActivityType2 = React.createClass({
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
        var choices = this.state.getCurrentChoiceGroup();
        var correctPartSoundPath = this.state.getCorrectSound();
        var exampleWordSoundPath = this.state.getExampleSoundPath();
        var exampleWordId = this.state.data.currentAttempt.exampleWordId;
        var correctPartId = this.state.getCorrectChoice().partId;
        var actions = this.props.actions;
        var index = this.state.getIndex();
        var sounds;

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
                                key={index + choice.partId} 
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

module.exports = ActivityType2;
