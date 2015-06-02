const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/1");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-3"),
        activityStoreMixin(dictionary.suffixes)
    ],
    activityId: "3",
    listenables: require("./actions")
});
