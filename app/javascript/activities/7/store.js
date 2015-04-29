var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/3");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-7"),
        activityStoreMixin(dictionary.filterByPartCount(2))
    ],
    activityId: "7",
    listenables: require("./actions")
});