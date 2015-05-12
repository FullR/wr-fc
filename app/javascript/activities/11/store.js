var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/3");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-11"),
        activityStoreMixin(dictionary.filterByPartCount(3))
    ],
    activityId: "11",
    listenables: require("./actions")
});
