/**
 * Created by gaurangdave on 9/9/16.
 */

module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    return {
        "update": {
            "files": [{
                expand: true,
                cwd: utils.getTmpFolder() + "root/jaffa/",
                src: "**",
                dest: "./jaffa/<%= updateDir %>"
            }]
        },
        "lazyload": {
            "files": [{expand: true, cwd: "./app/", src: ["**/*.html","**/*.json"], dest: "<%= buildConfig.appFolder %>"},
                {
                    expand: true,
                    cwd: appData.jaffaRoot,
                    src: ["**/*.html","**/*.json"],
                    dest:"<%= buildConfig.jaffaFolder %>"
                },
                {expand: true, cwd: ".", src: ["*.html","config.js","libs.json"], dest: "<%= buildConfig.baseFolder %>"},
                {expand: true, cwd: utils.getTmpFolder() + "modules/node_modules", src: "**", dest: "<%= buildConfig.nmFolder %>" }]
        },
        "combined": {
            "files": [{expand: true, cwd: "./app/", src: ["**/*.html","**/*.json"], dest: "<%= buildConfig.appFolder %>"},
                {
                    expand: true,
                    cwd: appData.jaffaRoot,
                    src: ["**/*.html","**/*.json"],
                    dest:"<%= buildConfig.jaffaFolder %>"
                },
                {
                    expand:true,
                    cwd:"node_modules/",
                    src:["requirejs/**/*.*"],
                    dest:"<%= buildConfig.baseFolder %>"
                }
            ]
        },
        "create-core-version":{
            "files":[{ expand:true, cwd:appData.jaffaRoot, src:["**/*.*"], dest:'./jaffa/<%= core.version %>'}]
        }

    };
};
