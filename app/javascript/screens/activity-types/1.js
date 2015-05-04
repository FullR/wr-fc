var React = require("react");
var Reflux = require("reflux");
var activityMixin = require("mixins/activity");

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
var Sound = require("components/utility/sound");

var ActivityType1 = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        activityMixin
    ],

    playWordSound: function() {
        this.refs.wordSound.play();
    },

    onSoundPlay: function() {
        this.state.soundPlaying = true;
        this.setState(this.state);
    },

    onSoundEnd: function() {
        this.state.soundPlaying = false;
        this.setState(this.state);
    },

    renderTitle: function() {
        return (
            <span>{this.props.title}</span>
        );
    },

    renderInstructions: function() {
        return this.props.instructions;
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
                key={correctDefSoundPath}
                path={correctDefSoundPath}
                autoplay={true}/>
        ] : [
            <Sound
                ref="wordSound"
                key={correctPartSoundPath}
                path={correctPartSoundPath}
                autoplay={true}
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

                <ChoiceContainer>
                    {choices.map((choice) =>
                        <DefinitionChoice 
                            onClick={actions.selectChoice.bind(null, choice)} 
                            key={index + choice.partId} 
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