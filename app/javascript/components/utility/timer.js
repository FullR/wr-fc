var React = require("react");

var Timer = React.createClass({
    mixins: [require("mixins/class-names")],

    getInitialState: function() {
        return {
            remaining: this.props.seconds
        };
    },

    startTimer: function() {
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

    stopTimer: function() {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    componentDidMount: function() {
        this.startTimer();
    },

    componentWillUnmount: function() {
        this.stopTimer();
    },

    render: function() {
        return (
            <span {...this.props} className={this.classNames("timer")}>{this.state.remaining}</span>
        );
    }
});

module.exports = Timer;
