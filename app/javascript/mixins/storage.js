const storage = require("storage");
const reset = require("actions/reset");

module.exports = function storageMixin(namespace) {
    return {
        init() {
            this.data = storage.get(namespace);
            if(!this.data) {
                this.reset();
            }

            this.listen(this.save);
            this.listenTo(reset, this.reset);
        },

        reset() {
            if(typeof this.getInitialStorage === "function") {
                this.data = this.getInitialStorage();
            }
            else {
                this.data = {};
            }
            this.save();
        },

        save() {
            storage.set(namespace, this.data);
        }
    };
};
