const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/2");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-4"),
        activityStoreMixin(dictionary.prefixes)
    ],
    activityId: "4",
    listenables: require("./actions")
});
