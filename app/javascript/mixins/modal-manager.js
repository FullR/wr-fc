module.exports = {
    getInitialState() {
        modal: null
    },

    openModal(modal, props) {
        this.state.modal = modal;
        this.setState(this.state);
    },

    closeModal() {
        this.state.modal = null;
        this.setState(this.state);
    },

    componentWillUnmount() {
        this.state.modal = null;
    },

    renderModal() {
        return this.state.modal;
    }
};
