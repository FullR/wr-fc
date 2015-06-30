const Reflux = require("reflux");
const _ = require("lodash");
const storageMixin = require("mixins/storage");
const visitActivity = require("actions/visit-activity");
const setUsername = require("actions/set-username");
const completeActivity = require("actions/complete-activity");

const activityStores = {
    "1":  require("activities/1/store"),
    "2":  require("activities/2/store"),
    "3":  require("activities/3/store"),
    "4":  require("activities/4/store"),
    "5":  require("activities/5/store"),
    "6":  require("activities/6/store"),
    "7":  require("activities/7/store"),
    "8":  require("activities/8/store"),
    "9":  require("activities/9/store"),
    "10": require("activities/10/store"),
    "11": require("activities/11/store"),
    "12": require("activities/12/store")
};

const beginningActs = ["1", "2", "3", "4", "5", "6", "7", "8", "10", "11"];

const AppStore = Reflux.createStore({
    mixins: [storageMixin("app")],

    init() {
        this.listenTo(visitActivity, "onVisitActivity");
        this.listenTo(setUsername, "onSetUsername");
        this.listenTo(completeActivity, "onCompleteActivity");
    },

    getInitialStorage() {
        return {
            username: "",
            lastActivityId: null,
            completedActivities: {
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
                "6": false,
                "7": false,
                "8": false,
                "9": false,
                "10": false,
                "11": false,
                "12": false
            },

            startedActivities: {
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
                "6": false,
                "7": false,
                "8": false,
                "9": false,
                "10": false,
                "11": false,
                "12": false
            }
        };
    },

    getUsername() {
        return this.data.username;
    },

    isLastActivity(activityId) {
        return this.data.lastActivityId === activityId;
    },

    getHighscore(activityId) {
        return activityStores[activityId].getHighscore();
    },

    isStarted(activityId) {
        return this.data.startedActivities[activityId];
    },

    isCompleted(activityId) {
        return this.data.completedActivities[activityId];
    },

    areAllCompleted() {
        const completedActivities = window.level.levelId === "beginning" ? 
            _.filter(this.data.completedActivities, (value, id) => { // only check activities that are playable in beginning level
                return beginningActs.indexOf(id) !== -1;
            }) : 
            this.data.completedActivities;

        return _.every(completedActivities, (isCompleted) => isCompleted);
    },

    getInitialState() {
        return this;
    },

    onVisitActivity(activityId) {
        this.data.lastActivityId = activityId;
        this.data.startedActivities[activityId] = true;
        this.trigger(this.data);
    },

    onCompleteActivity(activityId) {
        this.data.completedActivities[activityId] = true;
        this.trigger(this.data);
    },

    onSetUsername(username) {
        this.data.username = username;
        this.trigger(this.data);
    }
});

module.exports = AppStore;
