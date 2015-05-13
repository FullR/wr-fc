/*
    Uploads compiled code to the test server for internal
    testing
*/
function upload(level) {
    var Q = require("q");
    var exec = Q.nfbind(require("child_process").exec);
    var source = __dirname + "/../dist/"+(level ? level + "/" : "")+"*";
    var dest = "/home/james/server/apps/word-roots-fc" + (level ? "/" + level : "");

    return exec('sshpass -p "ctADl0g1n" scp -r '+ source +' james@12.0.0.70:' + dest);
}

module.exports = upload;
