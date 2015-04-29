var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/3");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-9"),
        activityStoreMixin(dictionary.filterByPartCount(4))
    ],
    activityId: "9",
    listenables: require("./actions")
});