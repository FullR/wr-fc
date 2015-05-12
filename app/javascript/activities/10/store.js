var Reflux = require("reflux");
var storageMixin = require("mixins/storage");
var activityStoreMixin = require("mixins/activity-stores/3");
var dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-10"),
        activityStoreMixin(dictionary.filterByPartCount(2))
    ],
    activityId: "10",
    listenables: require("./actions")
});
