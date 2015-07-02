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
        let children = [].concat(this.props.children);
        const revealedIndex = children.filter((choice) => choice.props.revealed && !choice.props.correct && !choice.props.selected)[0];
        if(revealedIndex) {
            children = children.map((child, index) => {
                if(index === revealedIndex) {
                    return React.cloneElement(child, {
                        hidden: true
                    });
                } else if(revealedIndex > index) {
                    return React.cloneElement(child, {
                        beforeHidden: true
                    });
                } else if(revealedIndex < index) {
                    return React.cloneElement(child, {
                        afterHidden: true
                    });
                } else {
                    return child;
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
