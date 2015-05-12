var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");
var level = window.level;

var MenuHeader = React.createClass({
    render: function() {
        var style = {
            position: "relative",
            top: bp({
                [medium]: 10,
                defaults: 20
            }),
            fontSize: bp({
                [medium]: 20,
                defaults: 30
            }),
            height: bp({
                [medium]: 60,
                defaults: 80
            }),
            width: "100%",
            textAlign: "center"
        };

        var subHeaderStyle = {
            fontSize: bp({
                [medium]: 15,
                defaults: 20
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
