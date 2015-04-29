var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/2");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-5"),
        activityStoreMixin(dictionary.roots)
    ],
    activityId: "5",
    listenables: require("./actions")
});