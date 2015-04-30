var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");
var level = window.level;

var MenuHeader = React.createClass({
    render: function() {
        var style = {
            position: "relative",
            top: bp({
                [medium]: "1rem",
                defaults: "2rem"
            }),
            fontSize: bp({
                [medium]: "2rem",
                defaults: "3rem"
            }),
            height: bp({
                [medium]: "6rem",
                defaults: "8rem"
            }),
            width: "100%",
            textAlign: "center"
        };

        var subHeaderStyle = {
            fontSize: bp({
                [medium]: "1.5rem",
                defaults: "2rem"
            })
        };
        return (
            <div style={style}>
                Word Roots {level.title} Flashcards&trade;
                <div style={subHeaderStyle}>
                    Touch a game to begin.
                </div>
            </div>
        );
    }
});

module.exports = MenuHeader;
