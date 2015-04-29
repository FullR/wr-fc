var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/3");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-8"),
        activityStoreMixin(dictionary.filterByPartCount(3))
    ],
    activityId: "8",
    listenables: require("./actions")
});