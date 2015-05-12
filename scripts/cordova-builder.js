var Q = require("q");
var _ = require("lodash");
var exec = Q.nfbind(require("child_process").exec);
var mkdirp = Q.nfbind(require("mkdirp"));
var writeFile = Q.nfbind(require("fs").writeFile);

/*
    Creates a cordova project

    Options:
        name:String - Cordova project name
        dest:String - Desination folder
        id:String - Project reverse-domain identifier (ex. com.foo.bar)
        (src:String) - Application code directory to be copied into the project
        (merge:String) - Merge directory to copy into the project
        (platforms:[String]) - Platforms to install
        (plugins:[String]) - Plugins to install
        (entryPoint:[String]) - Name of application entry point file (default: "index.html")
        (preferences:[String]) - Raw preference strings to be added to config.xml
        (version:String)
        (description:String)
        (author:Object):
            (name:String)
            (email:String)
            (href:String)
*/
function build(options) {
    var projectDir = options.dest;
    var platforms = options.platforms || [];
    var plugins = options.plugins || [];

    var src = options.src;
    var name = options.name;
    var id = options.id;
    var merge = options.merge;

    if(!projectDir) {
        throw new Error("Missing required option: dest (destination directory)");
    }
    if(!name) {
        throw new Error("Missing required option: name");
    }
    if(!id) {
        throw new Error("Missing required option: id");
    }

    return exec("rm -rf " + projectDir)
        .then(function() {
            log("Creating project " + name);
            return createProject(projectDir, id, name);
        })
        .then(function() {
            if(typeof merge === "string") {
                log("Adding merge directory");
                return addMergeDirectory(projectDir, merge);
            }
        })
        .then(function() {
            log("Adding source files");
            return addProjectFiles(projectDir, src);
        })
        .then(function() {
            log("Generating config.xml");
            return buildConfigXML(options);
        })
        .then(function() {
            return platforms.reduce(function(promise, platform) {
                log("Adding platform: " + platform);
                return promise.then(addPlatform.bind(null, projectDir, platform));
            }, Q.resolve());
        })
        .then(function() {
            return plugins.reduce(function(promise, plugin) {
                log("Adding plugin: " + plugin);
                return promise.then(addPlugin.bind(null, projectDir, plugin));
            }, Q.resolve());
        });

    function log() {
        if(options.verbose) {
            console.log.apply(console, arguments);
        }
    }
}

function createProject(path, id, name) {
    return exec("cordova create '" + path + "' " + (id || "") + " '" + name + "'");
}

function addPlatform(projectDir, platform) {
    return exec("cordova platform add " + platform, {cwd: projectDir});
}

function addPlugin(projectDir, pluginName) {
    return exec("cordova plugin add " + pluginName, {cwd: projectDir});
}

function addMergeDirectory(projectDir, mergeDir) {
    return mkdirp(projectDir + "/merges")
        .then(function() {
            return exec("cp -R " + mergeDir + "/* " + projectDir + "/merges");
        });
}

function addProjectFiles(projectDir, projectFileDir) {
    return exec("rm -rf " + projectDir + "/www")
        .then(function() {
            //return exec("cp -R " + projectFileDir + "/* " + projectDir + "/www");
            return exec("ln -s " + projectFileDir + " " + projectDir + "/www");
        });
}

function buildPlatform(projectDir, platform) {
    return exec("cordova build " + platform, {cwd: projectDir});
}

function runPlatform(projectDir, platform) {
    return exec("cordova run " + platform, {cwd: projectDir});
}

function buildConfigXML(options) {
    var author = options.author;
    var preferences = options.preferences || [];
    var content = _.flatten([
        "<?xml version='1.0' encoding='utf-8'?>",
            tab(1) + '<widget id="'+options.id+'" version="'+(options.version||"0.0.1")+'" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">',
            tab(1) + '<name>'+options.name+'</name>',
            tab(1) + '<description>',
            tab(2) +     (options.description || ""),
            tab(1) + '</description>',
            author ? [
                tab(1) + '<author email="'+(author.email || "")+'" href="'+(author.href || "")+'">',
                tab(2) +     (author.name || ""),
                tab(1) + '</author>',
            ] : [],
            tab(1) + '<content src="'+(options.entryPoint || "index.html")+'" />',
            tab(1) + '<access origin="*" />',
            preferences.map(function(pref) { return tab(1) + pref; }).join("\n"),
        '</widget>'
    ]).join("\n");

    function tab(count) {
        return Array.apply(null, {length: count * 4}).map(function() { return " "; }).join("");
    }

    return writeFile(options.dest + "/config.xml", content);
}

module.exports = build;
