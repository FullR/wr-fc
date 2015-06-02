const React = require("react");
const bp = require("utility/bp");
const {small, medium} = require("sizes");
const level = window.level;

const MenuHeader = React.createClass({
    render() {
        const style = {
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

        const subHeaderStyle = {
            fontSize: bp({
                [medium]: 15,
                defaults: 20
            })
        };

        return (
            <div style={style}>
                Word Roots {level.title} Flashcards&trade; {level.demo ? <span style={{color: "#F00"}}>Demo</span> : ""}
                <div style={subHeaderStyle}>
                    Touch a game to begin.
                </div>
            </div>
        );
    }
});

module.exports = MenuHeader;
