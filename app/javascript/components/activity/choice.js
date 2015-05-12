var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var _ = require("lodash");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

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
        var width;

        switch(this.props.choiceCount) {
            case 5: width = bp({
                [micro]: 85,
                [small]: 110,
                [medium]: 160,
                defaults: 235
            }); break;
            case 4: width = bp({
                [micro]: 1.2 * 100,
                [small]: 1.2 * 125,
                [medium]: 1.2 * 165,
                defaults: 1.2 * 250
            }); break;
            default: width = bp({
                [micro]: 1.5 * 100,
                [small]: 1.5 * 125,
                [medium]: 1.5 * 175,
                defaults: 1.5 * 250
            })
        }

        var correctIconWidth = bp({
            [small]: 100,
            [medium]: 125,
            defaults: 150
        });
        var correctIconHeight = bp({
            [small]: (2/3)*30,
            [medium]: (5/6)*30,
            defaults: 30
        });

        var incorrectIconWidth = bp({
            [small]: 75,
            [medium]: 100,
            defaults: 150
        }) * 0.9;
        var incorrectIconHeight = bp({
            [small]: 75,
            [medium]: 100,
            defaults: 150
        }) * 0.9;

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
            width: incorrectIconWidth,
            height: incorrectIconHeight,
            top: "50%",
            left: "50%",
            marginLeft: -(incorrectIconWidth/2),
            marginTop: -(incorrectIconHeight/2),
            backgroundImage: "url('assets/images/x.png')",
            backgroundSize: "100% 100%",
            opacity: 0.5
        };

        var correctIconStyle = {
            position: "absolute",
            width: correctIconWidth,
            height: correctIconHeight,
            bottom: -(correctIconHeight + 3),
            left: "50%",
            marginLeft: -(correctIconWidth/2),
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
