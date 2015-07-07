const visitActivity = require("actions/visit-activity");

module.exports = {
    getInitialState() {
        return this.props.store.getInitialState();
    },

    componentDidMount() {
        this.addKeyListeners();
        visitActivity(this.props.id);
        this.listenTo(this.props.store, (data) => {
            this.setState(data);
        });
    },

    addKeyListeners() {
        this.on("keydown", ({keyCode}) => {
            const canSelect = !this.state.isShowingFeedback() && !this.state.isWaiting();
            if(keyCode === 32 && !canSelect) {
                this.props.actions.continueActivity();
            } else if(keyCode === 192) { // TODO: Remove/restrict before releasing
                this.debugSelectCorrect();
            }
        });
    },

    debugSelectCorrect() {
        const canSelect = !this.state.isShowingFeedback() && !this.state.isWaiting();
        if(canSelect) {
            this.state.getCorrectChoices().forEach((choice) => this.props.actions.selectChoice(choice));
            this.props.actions.continueActivity();
        }
    }
};
