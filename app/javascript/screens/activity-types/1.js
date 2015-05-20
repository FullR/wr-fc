var React = require("react");
var Reflux = require("reflux");
var activityMixin = require("mixins/activity");
var windowListener = require("mixins/window-listener");
var isMounted = require("utility/mounted-only");

var Feedback = require("screens/feedback");
var FeedbackTitle = require("components/feedback/title");

var ChoiceContainer = require("components/activity/choice-container");
var DefinitionChoice = require("components/activity/definition-choice");
var WordPart = require("components/activity/word-part");
var Word = require("components/activity/word");
var ContinueButton = require("components/activity/continue-button");
var Info = require("components/activity/info");
var InstructionsBox = require("components/activity/instructions-box");
var Instructions = require("components/activity/instructions");
var PartDisplayBox = require("components/activity/part-display-box");
var ExampleWord = require("components/activity/example-word");
var BottomContainer = require("components/activity/bottom-container");
var Sound = require("components/utility/sound");
var dictionary = window.dictionary;

var ActivityType1 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin,
        windowListener
    ],

    getSounds: function() {
        var correctPart = dictionary.get(this.state.getCorrectChoice().partId);
        
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
        var correctDefSoundPath = this.state.getCorrectDefinitionSound();
        var exampleWordId = this.state.data.currentAttempt.exampleWordId;
        var correctPartId = this.state.getCorrectChoice().partId;
        var actions = this.props.actions;
        var index = this.state.getIndex();

        var sounds = revealed ? [
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
                                key={index + choice.partId} 
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

module.exports = ActivityType1;
