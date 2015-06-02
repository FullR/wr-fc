const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/3");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-8"),
        activityStoreMixin(dictionary.filterByPartCount(3))
    ],
    activityId: "8",
    listenables: require("./actions")
});
