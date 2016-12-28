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
        "core-files": {
            src: ["jaffa/<%= updateDir%>/**/*.*", "!jaffa/<%= updateDir%>/grunt/**/*.*"],
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
        "lazyload": {
            src: ["<%= buildConfig.baseFolder %>"],
            overwrite: true,
            replacements: [
                {
                    from: /replaced_during_build/g,
                    to: "<%= build.version %>"
                }
            ]
        },
        "combined": {
            src: ["<%= buildConfig.baseFolder %>"],
            overwrite: true,
            replacements: [
                {
                    from: /replaced_during_build/g,
                    to: "<%= build.version %>"
                }
            ]
        },
        "files-core-version":{
            src:["./jaffa/<%= core.version %>/**/*.*","!./jaffa/<%= core.version %>/grunt/**/*.*","index.html","config.js","libs.json"],
            overwrite:true,
            replacements:[
                {
                    from:new RegExp("jaffa/" + appData.jaffa,"g"),
                    to:"jaffa/<%= core.version %>"
                },
                {
                    from:new RegExp("/jaffa/" + appData.jaffa,"g"),
                    to:"/jaffa/<%= core.version %>"
                }
            ]
        },
        "json-core-version":{
            src:["./jaffa/<%= core.version %>/about.json","about.json"],
            overwrite:true,
            replacements:[
                {
                    from:new RegExp(appData.jaffa,"g"),
                    to:"<%= core.version %>"
                }
            ]
        }
    }
};
