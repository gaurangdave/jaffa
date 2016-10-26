/**
 * Created by gaurangdave on 9/9/16.
 */

module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var builds = utils.builds;
    var devBuildConfig = utils.getBuildConfig(grunt, builds.dev);
    var qaBuildConfig = utils.getBuildConfig(grunt, builds.qa);
    var prodBuildConfig = utils.getBuildConfig(grunt, builds.prod);


    return {
        "update": {
            "files": [{
                expand: true,
                cwd: "./jaffa/tmp/root/jaffa/",
                src: "**",
                dest: "./jaffa/<%= updateDir %>"
            }]
        },
        "dev": {
            "files": [{expand: true, cwd: "./app/", src: ["**/*.html", "**/*.json"], dest: devBuildConfig.appFolder},
                {
                    expand: true,
                    cwd: appData.jaffaRoot,
                    src: ["**/*.html", "**/*.json"],
                    dest: devBuildConfig.jaffaFolder
                },
                {expand: true, cwd: ".", src: ["*.html", "*.json"], dest: devBuildConfig.baseFolder},
                {expand: true, cwd: "./build/dev/tmp/modules/node_modules", src: "**", dest: devBuildConfig.nmFolder}]
        },
        "qa": {
            "files": [{expand: true, cwd: "./app/", src: ["**/*.html", "**/*.json"], dest: qaBuildConfig.appFolder},
                {
                    expand: true,
                    cwd: appData.jaffaRoot,
                    src: ["**/*.html", "**/*.json"],
                    dest: qaBuildConfig.jaffaFolder
                },
                {expand: true, cwd: ".", src: ["*.html", "*.json"], dest: qaBuildConfig.baseFolder},
                {expand: true, cwd: "./build/qa/tmp/modules/node_modules", src: "**", dest: qaBuildConfig.nmFolder}]
        },
        "prod": {
            "files": [{expand: true, cwd: "./app/", src: ["**/*.html", "**/*.json"], dest: prodBuildConfig.appFolder},
                {
                    expand: true,
                    cwd: appData.jaffaRoot,
                    src: ["**/*.html", "**/*.json"],
                    dest: prodBuildConfig.jaffaFolder
                },
                {expand: true, cwd: ".", src: ["*.html", "*.json"], dest: prodBuildConfig.baseFolder},
                {expand: true, cwd: "./build/prod/tmp/modules/node_modules", src: "**", dest: prodBuildConfig.nmFolder}]
        }


    };
};
