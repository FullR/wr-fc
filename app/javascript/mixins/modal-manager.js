module.exports = {
    getInitialState: function() {
        modal: null
    },

    openModal: function(modal, props) {
        this.state.modal = modal;
        this.setState(this.state);
    },

    closeModal: function() {
        this.state.modal = null;
        this.setState(this.state);
    },

    componentWillUnmount: function() {
        this.state.modal = null;
    },

    renderModal: function() {
        return this.state.modal;
    }
};
