/**
 * Created by gaurangdave on 9/28/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var lazyLoadAssets = ["app/**/*.js", "app/**/*.css", appData.jaffaRoot + "**/*.js", appData.jaffaRoot + "**/*.css", "!" + appData.jaffaRoot + "boot.js","config.js"];
    var lazyLoadSource = ["app/**/*.js", "app/**/*.json", "app/**/*.html", appData.jaffaRoot + "**/*.js", appData.jaffaRoot + "**/*.json", appData.jaffaRoot + "**/*.html", "index.html","config.js"];
    var combinedAssets = ["*.js","*.css"];
    var combinedSource = ["index.html"];

    return {
        "lazyload": {
            "options": {
                "baseDir": "<%= buildConfig.baseFolder %>",
                "assets": lazyLoadAssets,
                "jsonOutput": true,
                "deleteOriginals": true,
                "jsonOutputFilename":"cacheBustMapping.json"

            },
            "expand": true,
            "cwd": "<%= buildConfig.baseFolder %>",
            "src": lazyLoadSource
        },
        "combined": {
            "options": {
                "baseDir": "<%= buildConfig.baseFolder %>",
                "assets": combinedAssets,
                "jsonOutput": true,
                "deleteOriginals": true,
                "jsonOutputFilename":"cacheBustMapping.json"

            },
            "expand": true,
            "cwd": "<%= buildConfig.baseFolder %>",
            "src": combinedSource
        }
    };
};

