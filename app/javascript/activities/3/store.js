var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/1");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-3"),
        activityStoreMixin(dictionary.suffixes)
    ],
    activityId: "3",
    listenables: require("./actions")
});