const React = require("react");

const Timer = React.createClass({
    mixins: [require("mixins/class-names")],

    getInitialState() {
        return {
            remaining: this.props.seconds
        };
    },

    startTimer() {
        this.interval = setInterval(() => {
            if(this.state.remaining <= 1) {
                if(this.props.onComplete) {
                    this.props.onComplete();
                }
                this.stopTimer();
            }
            else {
                this.setState({
                    remaining: this.state.remaining - 1
                });
            }
        }, 1000);
    },

    stopTimer() {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    componentDidMount() {
        this.startTimer();
    },

    componentWillUnmount() {
        this.stopTimer();
    },

    render() {
        return (
            <span {...this.props} className={this.classNames("timer")}>{this.state.remaining}</span>
        );
    }
});

module.exports = Timer;
