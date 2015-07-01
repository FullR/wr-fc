const React = require("react");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const ChoiceContainer = React.createClass({
    render() {
        const width = bp({
            [small]: (125 * 5) + 50,
            [medium]: (175 * 5) + 50,
            "width < 1245": (175 * 5) + 50,
            defaults: (250 * 5) + 50
        });
        const style = {
            display: "inline-block",
            height: "100%",
            width: width,
            textAlign: "center",
            verticalAlign: "middle",
            transform: "translate3d(0,0,0)"
        };
        const children = [].concat(this.props.children);
        const revealedIndex = children.filter((choice) => choice.props.revealed && !choice.props.correct && !choice.props.selected)[0];
        if(revealedIndex) {
            children.forEach((child, index) => {
                if(index === revealedIndex) {
                    Object.assign(child.props, {
                        beforeHidden: false,
                        afterHidden: false,
                        hidden: true
                    });
                } else if(revealedIndex > index) {
                    Object.assign(child.props, {
                        beforeHidden: true,
                        afterHidden: false,
                        hidden: false
                    });
                } else if(revealedIndex < index) {
                    Object.assign(child.props, {
                        beforeHidden: false,
                        afterHidden: true,
                        hidden: false
                    });
                }
            });
        }
        console.log(React.cloneElement);

        return (
            <div style={style}>
                {children}
            </div>
        );
    }
});

module.exports = ChoiceContainer;
