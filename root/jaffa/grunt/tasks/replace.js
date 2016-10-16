/**
 * Created by gaurangdave on 9/12/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);


    return {
        "update": {
            src: ["index.html"],
            overwrite: true,
            replacements: [
                {
                    from: /jaffa\/.*?\/config.js\?v=replaced_during_build/g,
                    to: "jaffa/<%= updateDir%>/config.js?v=replaced_during_build"
                }
            ]
        },
        "core-json": {
            src: ["jaffa/<%= updateDir%>/main.json"],
            overwrite: true,
            replacements: [
                {
                    from: /jaffa\/.*?\//g,
                    to: "jaffa/<%= updateDir%>/"
                }
            ]
        },
        "build-version": {
            src: ["about.json"],
            overwrite: true,
            replacements: [{
                from: new RegExp(appData.version, "g"),
                to: "<%= build.version %>"
            }]
        },
        "build-dev": {
            src: ["./build/dev/*"],
            overwrite: true,
            replacements: [
                {
                    from: /replaced_during_build/g,
                    to: "<%= build.version %>"
                }
            ]
        },
        "build-qa": {
            src: ["./build/qa/*"],
            overwrite: true,
            replacements: [
                {
                    from: /replaced_during_build/g,
                    to: "<%= build.version %>"
                }
            ]
        },
        "build-prod": {
            src: ["./build/prod/*"],
            overwrite: true,
            replacements: [
                {
                    from: /replaced_during_build/g,
                    to: "<%= build.version %>"
                }
            ]
        }
    }
};
