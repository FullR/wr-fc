const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/1");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-1"),
        activityStoreMixin(dictionary.prefixes)
    ],
    activityId: "1",
    listenables: require("./actions")
});
