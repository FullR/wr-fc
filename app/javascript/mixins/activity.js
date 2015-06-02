const visitActivity = require("actions/visit-activity");

module.exports = {
    getInitialState() {
        return this.props.store.getInitialState();
    },

    componentDidMount() {
        visitActivity(this.props.id);
        this.listenTo(this.props.store, (data) => {
            this.setState(data);
        });
    }
};
