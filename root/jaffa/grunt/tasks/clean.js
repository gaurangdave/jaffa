/**
 * Created by gaurangdave on 9/8/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var tempFolderLocation = "./jaffa/tmp/**";
    var buildFolderLocation = "./build/";

    return {
        "tmp": tempFolderLocation,
        "build": buildFolderLocation,
        "dev": buildFolderLocation + "dev/**",
        "dev-tmp": buildFolderLocation + "dev/tmp",
        "qa": buildFolderLocation + "qa/**",
        "qa-tmp": buildFolderLocation + "qa/tmp",
        "prod": buildFolderLocation + "prod/**",
        "prod-tmp": buildFolderLocation + "prod/tmp"
    };

};
