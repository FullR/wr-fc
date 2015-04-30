var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var _ = require("lodash");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var animationSpeed = 0.5;

var Choice = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    onClick: function(event) {
        if(!this.props.revealed && this.props.onClick) {
            this.props.onClick(event);
        }
        else if(this.props.revealed && this.props.onRevealedClick) {
            this.props.onRevealedClick(event);
        }
    },

    render: function() {
        var width = this.props.choiceCount ? (((100/this.props.choiceCount) * 0.9) + "%") : bp({
            [small]: "12rem",
            [medium]: "18rem",
            defaults: "25rem"
        });
        var style = {
            position: "relative",
            boxSizing: "border-box",
            display: "inline-block",
            width: width,
            height: "100%",
            margin: "0 0.4rem 0 0.4rem",
            border: "0.3rem solid #DCDC94",
            borderRadius: "1rem",
            background: this.props.highlighted ? "#FFFD61" : "#F1F1D4",
            cursor: "pointer",

            states: [
                {hover: {
                    border: "0.3rem solid #000000",
                    background: this.props.onRevealedClick && this.props.revealed ? "#FFFD61" : "#F1F1D4"
                }},

                {active: {
                    border: "0.3rem solid #000000",
                    background: this.props.onRevealedClick && this.props.revealed ? "#FFFD61" : "#F1F1D4"
                }}
            ],

            modifiers: _.compact([
                {selected: {
                    cursor: "default",
                    border: "0.3rem solid #000000"
                }},

                {revealed: {
                    cursor: this.props.onRevealedClick ? "pointer" : "default",
                    border: "0.3rem solid #000000"
                }}
            ])
        };

        var incorrectIconStyle = {
            position: "absolute",
            width: "80%",
            height: "100%",
            left: "10%",
            top: 0,
            backgroundImage: "url('assets/images/x.png')",
            backgroundSize: "100% 100%",
            opacity: 0.5
        };

        var correctIconStyle = {
            position: "absolute",
            width: "80%",
            height: "3.5rem",
            bottom: "-4rem",
            left: "10%",
            backgroundImage: "url('assets/images/stars.png')",
            backgroundSize: "100% 100%"
        };

        var stateEvents = this.getBrowserStateEvents();

        stateEvents.onTouchStart = stateEvents.onMouseEnter;
        stateEvents.onTouchCancel = stateEvents.onMouseLeave;

        if(this.props.revealed && !this.props.correct && !this.props.selected) {
            _.extend(style, {
                visibility: "hidden",
                transition: `width ${animationSpeed}s, border ${animationSpeed}s, margin ${animationSpeed}s`,
                width: 0,
                margin: 0,
                border: "0px solid #DCDC94"
            });
        }
        
        if(this.props.style) {
            _.extend(style, this.props.style);
        }

        return (
            <div {...this.props}
                 {...stateEvents}
                 style={this.buildStyles(style)}
                 onMouseUp={this.onClick}
                 onTouchEnd={(event) => {
                    stateEvents.onMouseLeave(event);
                    this.onClick(event);
                 }}
            >
                {this.props.children}

                {this.props.revealed ? 
                    <div style={this.props.correct ? correctIconStyle : incorrectIconStyle}></div> :
                    null
                }
            </div>
        );
    }
});

module.exports = Choice;