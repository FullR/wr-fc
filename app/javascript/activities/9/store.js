const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/3");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-9"),
        activityStoreMixin(dictionary.filterByPartCount(4))
    ],
    activityId: "9",
    listenables: require("./actions")
});
