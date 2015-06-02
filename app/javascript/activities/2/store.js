const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/1");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-2"),
        activityStoreMixin(dictionary.roots)
    ],
    activityId: "2",
    listenables: require("./actions")
});
