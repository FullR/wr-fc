const Storage = require("putainde-localstorage");
const level = window.level;
const storage = Storage.create({namespace: `word-roots-fc-${level.title}${level.demo ? "-demo" : ""}`});
const version = require("../../package").version;

let data = storage.get("application");

if(!data || data.version !== version) {
    console.log("Clearing invalid storage");
    data = {version: version};
    save();
}

function save() {
    storage.set("application", data);
}

module.exports = {
    set(key, value) {
        data[key] = value;
        save();
        return value;
    },

    get(key) {
        return data[key];
    }
};
