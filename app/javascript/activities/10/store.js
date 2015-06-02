const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/3");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-10"),
        activityStoreMixin(dictionary.filterByPartCount(2))
    ],
    activityId: "10",
    listenables: require("./actions")
});
