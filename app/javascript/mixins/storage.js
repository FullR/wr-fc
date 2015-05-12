var storage = require("storage");
var reset = require("actions/reset");

module.exports = function storageMixin(namespace) {
    return {
        init: function() {
            this.data = storage.get(namespace);
            if(!this.data) {
                this.reset();
            }

            this.listen(this.save);
            this.listenTo(reset, this.reset);
        },

        reset: function() {
            if(typeof this.getInitialStorage === "function") {
                this.data = this.getInitialStorage();
            }
            else {
                this.data = {};
            }
            this.save();
        },

        save: function() {
            storage.set(namespace, this.data);
        }
    };
};
