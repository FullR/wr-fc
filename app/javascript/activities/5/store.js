const Reflux = require("reflux");
const storageMixin = require("mixins/storage");
const activityStoreMixin = require("mixins/activity-stores/2");
const dictionary = window.dictionary;

module.exports = Reflux.createStore({
    mixins: [
        storageMixin("activity-5"),
        activityStoreMixin(dictionary.roots)
    ],
    activityId: "5",
    listenables: require("./actions")
});
