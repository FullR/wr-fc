var React = require("react");
var _ = require("lodash");
var Score = require("components/feedback/score");
var colors = require("colors");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var ScoreTable = React.createClass({
    render: function() {
        var scores = this.props.scores;
        var highscore = scores.reduce((highscore, score) => {
            return !score.isReview && score.correct > highscore.correct ? score : highscore;
        });

        var height =  bp({
            [small]: 200,
            [medium]: 320,
            defaults: 440
        });

        var style = {
            border: "1px solid #000",
            width: "100%",
            height: "100%",
            background: colors.HIGHSCORE_BG
        };

        var tableStyle = {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: bp({
                [micro]: 30,
                [small]: 40,
                [medium]: 50,
                defaults: 60
            }),
            overflow: "auto",
            width: "100%",
            background: "#FFFFFF",
            borderBottom: "1px solid black"
        };

        var highscoreStyle = {
            position: "absolute",
            bottom: 0,
            width: "auto",
            left: 0,
            right: 0
        };

        return (
            <div style={_.extend({}, style, this.props.style)}>
                <div style={{ // a relative position div to allow for absolute positioning
                    position: "relative",
                    width: "100%",
                    height: "100%"
                }}>
                    <div style={tableStyle}>
                        {this.props.scores.map((score, index) =>
                            <tr key={index}>
                                <Score correct={score.correct} max={score.max}>
                                    {score.isReview ? "Replay Incorrect Score" : "Game Score"}
                                </Score>
                            </tr>
                        )}
                    </div>
                    <Score correct={highscore.correct} max={highscore.max} style={highscoreStyle}>
                        High Score
                    </Score>
                </div>
            </div>
        );
    }
});

module.exports = ScoreTable;
