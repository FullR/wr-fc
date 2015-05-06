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
        var width = bp({
            [small]: 125,
            [medium]: 175,
            "width < 1245": 175,
            defaults: 250
        });//this.props.width;

        var style = {
            position: "relative",
            boxSizing: "border-box",
            display: "inline-block",
            width: width,
            height: "100%",
            margin: "0 5px 0 5px",
            border: "3px solid #DCDC94",
            borderRadius: 10,
            background: this.props.highlighted ? "#FFFD61" : "#F1F1D4",
            cursor: "pointer",

            states: [
                {hover: {
                    border: "3px solid #000000",
                    background: this.props.onRevealedClick && this.props.revealed ? "#FFFD61" : "#F1F1D4"
                }},

                {active: {
                    border: "3px solid #000000",
                    background: this.props.onRevealedClick && this.props.revealed ? "#FFFD61" : "#F1F1D4"
                }}
            ],

            modifiers: _.compact([
                {selected: {
                    cursor: "default",
                    border: "3px solid #000000"
                }},

                {revealed: {
                    cursor: this.props.onRevealedClick ? "pointer" : "default",
                    border: "3px solid #000000"
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
            height: "30%",
            bottom: "-34%",
            left: "10%",
            backgroundImage: "url('assets/images/stars.png')",
            backgroundSize: "100% 100%"
        };

        var stateEvents = this.getBrowserStateEvents();

        stateEvents.onTouchStart = stateEvents.onMouseEnter;
        stateEvents.onTouchCancel = stateEvents.onTouchEnd = stateEvents.onMouseLeave;

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