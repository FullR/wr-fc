const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/2");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-6"),
        activityStoreMixin(dictionary.suffixes)
    ],
    activityId: "6",
    listenables: require("./actions")
});
