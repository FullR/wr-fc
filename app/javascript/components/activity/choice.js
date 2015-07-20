const React = require("react");
const {StyleResolverMixin, BrowserStateMixin} = require("radium");
const _ = require("lodash");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const animationSpeed = 0.5;

const Choice = React.createClass({
    mixins: [require("mixins/style")],

    onClick(event) {
        if(!this.props.revealed && this.props.onClick) {
            this.props.onClick(event);
        }
        else if(this.props.revealed && this.props.onRevealedClick) {
            this.props.onRevealedClick(event);
        }
    },

    render() {
        let width;
        const {choiceCount, onRevealedClick, highlighted, revealed} = this.props;

        switch(choiceCount) {
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

        const correctIconWidth = bp({
            [small]: 100,
            [medium]: 125,
            defaults: 150
        });

        const correctIconHeight = bp({
            [small]: (2/3)*30,
            [medium]: (5/6)*30,
            defaults: 30
        });

        const incorrectIconWidth = bp({
            [small]: 75,
            [medium]: 100,
            defaults: 150
        }) * 0.9;
        const incorrectIconHeight = bp({
            [small]: 75,
            [medium]: 100,
            defaults: 150
        }) * 0.9;

        const style = {
            position: "relative",
            boxSizing: "border-box",
            display: "inline-block",
            width: width,
            height: "100%",
            margin: "0 5px 0 5px",
            border: "3px solid #DCDC94",
            borderRadius: 10,
            background: highlighted ? "#FFFD61" : "#F1F1D4",
            cursor: "pointer",
            transform: "translate3d(0,0,0)",

            states: [
                {hover: {
                    border: "3px solid #000000",
                    background: highlighted || (onRevealedClick && revealed) ? "#FFFD61" : "#F1F1D4"
                }},

                {active: {
                    border: "3px solid #000000",
                    background: highlighted || (onRevealedClick && revealed) ? "#FFFD61" : "#F1F1D4"
                }}
            ],

            modifiers: _.compact([
                {selected: {
                    cursor: "default",
                    border: "3px solid #000000"
                }},

                {revealed: {
                    cursor: onRevealedClick ? "pointer" : "default",
                    border: "3px solid #000000"
                }}
            ])
        };

        const incorrectIconStyle = {
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

        const correctIconStyle = {
            position: "absolute",
            width: correctIconWidth,
            height: correctIconHeight,
            bottom: -(correctIconHeight + 3),
            left: "50%",
            marginLeft: -(correctIconWidth/2),
            backgroundImage: "url('assets/images/stars.png')",
            backgroundSize: "100% 100%"
        };

        let className = "choice";

        if(this.props.revealed && !this.props.correct && !this.props.selected) {
            _.extend(style, {
                visibility: "hidden",
                transition: `width ${animationSpeed}s, border-width ${animationSpeed}s, margin ${animationSpeed}s`,
                width: 0,
                margin: 0,
                //padding: 0,
                border: "0px solid #DCDC94",
                borderWidth: 0
            });
        }

        if(this.props.style) {
            _.extend(style, this.props.style);
        }

        return (
            <div {...this.props}
                 {...this.getStyle(style)}
                 onMouseDown={this.onClick}
                 onTouchStart={this.onClick}
                 className={className}
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
