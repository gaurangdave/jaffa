/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var builds = utils.environments;
    var devBuildConfig = utils.getBuildConfig(grunt, builds.dev);
    var qaBuildConfig = utils.getBuildConfig(grunt, builds.qa);
    var prodBuildConfig = utils.getBuildConfig(grunt, builds.prod);
    var srcFileArray = ["**/*.css", "!*.min.css"];

    return {
        "dev": {
            "files": [{
                "expand": true,
                "sourceMap": true,
                "cwd": "app/",
                "src": srcFileArray,
                "dest": devBuildConfig.appFolder
            },
                {
                    "expand": true,
                    "sourceMap": true,
                    "cwd": appData.jaffaRoot,
                    "src": srcFileArray,
                    "dest": devBuildConfig.jaffaFolder
                }]
        },
        "qa": {
            "files": [{
                "expand": true,
                "sourceMap": true,
                "cwd": "app/",
                "src": srcFileArray,
                "dest": qaBuildConfig.appFolder
            },
                {
                    "expand": true,
                    "sourceMap": true,
                    "cwd": appData.jaffaRoot,
                    "src": srcFileArray,
                    "dest": qaBuildConfig.jaffaFolder
                }]
        },
        "prod": {
            "files": [{
                "expand": true,
                "sourceMap": false,
                "cwd": "app/",
                "src": srcFileArray,
                "dest": prodBuildConfig.appFolder
            },
                {
                    "expand": true,
                    "sourceMap": false,
                    "cwd": appData.jaffaRoot,
                    "src": srcFileArray,
                    "dest": prodBuildConfig.jaffaFolder
                }]
        }
    }
};
