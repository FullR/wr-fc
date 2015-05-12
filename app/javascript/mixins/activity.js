var visitActivity = require("actions/visit-activity");

module.exports = {
    getInitialState: function() {
        return this.props.store.getInitialState();
    },

    componentDidMount: function() {
        visitActivity(this.props.id);
        this.listenTo(this.props.store, (data) => {
            this.setState(data);
        });
    }
};
