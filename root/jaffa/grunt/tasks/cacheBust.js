/**
 * Created by gaurangdave on 9/28/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var builds = utils.builds;
    var appData = utils.getAppData(grunt);
    var devBuildConfig = utils.getBuildConfig(grunt, builds.dev);
    var qaBuildConfig = utils.getBuildConfig(grunt, builds.qa);
    var prodBuildConfig = utils.getBuildConfig(grunt, builds.prod);
    var assets = ["app/**/*.js", "app/**/*.css", appData.jaffaRoot + "**/*.js", appData.jaffaRoot + "**/*.css", "!" + appData.jaffaRoot + "boot.js"];
    var source = ["app/**/*.js", "app/**/*.json", "app/**/*.html", appData.jaffaRoot + "**/*.js", appData.jaffaRoot + "**/*.json", appData.jaffaRoot + "**/*.html", "index.html"];

    return {
        "dev": {
            "options": {
                "baseDir": devBuildConfig.baseFolder,
                "assets": assets,
                "jsonOutput": true,
                "deleteOriginals": true
            },
            "expand": true,
            "cwd": devBuildConfig.baseFolder,
            "src": source
        },
        "qa": {
            "options": {
                "baseDir": qaBuildConfig.baseFolder,
                "assets": assets,
                "jsonOutput": true,
                "deleteOriginals": true
            },
            "expand": true,
            "cwd": qaBuildConfig.baseFolder,
            "src": source
        },
        "prod": {
            "options": {
                "baseDir": prodBuildConfig.baseFolder,
                "assets": assets,
                "jsonOutput": true,
                "deleteOriginals": true
            },
            "expand": true,
            "cwd": prodBuildConfig.baseFolder,
            "src": source
        }

    };
};

