var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/2");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-6"),
        activityStoreMixin(dictionary.suffixes)
    ],
    activityId: "6",
    listenables: require("./actions")
});
