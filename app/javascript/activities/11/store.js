const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/3");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-11"),
        activityStoreMixin(dictionary.filterByPartCount(3))
    ],
    activityId: "11",
    listenables: require("./actions")
});
