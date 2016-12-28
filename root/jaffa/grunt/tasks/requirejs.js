/**
 * Created by gaurangdave on 12/16/16.
 */
module.exports = function (grunt) {

    var utils = require("./utils");
    return {
        "combined": {
            "options": {
                "baseUrl":".",
                "mainConfigFile": utils.getTmpFolder() + "config.js",
                optimized:"uglify",
                removeCombined: true,
                generateSourceMaps: true,
                out: "<%= requirejsConfig %>", //out is set dynamically during build.
                name: utils.getTmpFolder() + "config.js"
            }
        }
    };
};
