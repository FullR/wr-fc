var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/1");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-2"),
        activityStoreMixin(dictionary.roots)
    ],
    activityId: "2",
    listenables: require("./actions")
});