/**
 * Created by gaurangdave on 9/8/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var tempFolderLocation = utils.getTmpFolder() + "**";
    var buildFolderLocation = ["./build/"];

    if(appData.dev){
        buildFolderLocation.push(appData.dev);
    }

    if(appData.qa){
        buildFolderLocation.push(appData.qa);
    }

    if(appData.prod){
        buildFolderLocation.push(appData.prod);
    }


    return {
        "tmp": tempFolderLocation,
        "all-builds": buildFolderLocation,
        "build": "<%= buildConfig.baseFolder %>",
        "build-tmp": "<%= buildConfig.tmpFolder %>"
    };

};
