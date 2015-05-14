var Storage = require("putainde-localstorage");
var level = window.level;
var storage = Storage.create({namespace: "word-roots-fc-"+level.title});
var version = require("../../package").version;

var data = storage.get("application");

if(!data || data.version !== version) {
    console.log("Clearing invalid storage");
    data = {version: version};
    save();
}

function save() {
    storage.set("application", data);
}

module.exports = {
    set: function _set(key, value) {
        data[key] = value;
        save();
        return value;
    },

    get: function _get(key) {
        return data[key];
    }
};
