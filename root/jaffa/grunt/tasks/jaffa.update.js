/**
 * Created by gaurangdave on 8/31/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    grunt.registerTask("update", function (type) {

        /**
         *  Step 1: Git clone latest into tmp folder (based on tags).
         *  Step 2: Create version folder from jaffa.
         *  Step 3: Copy content from tmp folder to jaffa version folder.
         * */

        if (!type)
            type = "";

        grunt.task.run(["create-clone-config:" + type, "gitclone", "get-dir-name", "mkdir:update", "copy:update", "replace:update", "update-about-json", "update-package-json", "clean:tmp", "replace:core-json"]);

    });

    grunt.registerTask("create-clone-config", function (type) {
        var tempCloneFolder = "./jaffa/tmp";
        var remote = "git@github.com:gaurangdave/jaffa.git";
        var utils = require("./utils");
        var appData = utils.getAppData(grunt);

        //default to current version
        var branch = appData["jaffa"];

        if (type != undefined && type != null) {
            branch = type;
            if (type === 'latest') {
                branch = "master";
            }
        }

        var cloneConfig = {
            repository: remote,
            directory: tempCloneFolder,
            branch: branch
        };

        grunt.config.set("cloneConfig", cloneConfig);
    });

    grunt.registerTask("get-dir-name", function () {

        var newFilePath = "./jaffa/tmp/root/jaffa/about.json";
        var currentFilePath = "about.json";
        var newAboutData = grunt.file.readJSON(newFilePath);
        var currentAboutData = grunt.file.readJSON(currentFilePath);
        grunt.config.set("updateDir", newAboutData.version);
        grunt.config.set("currentDir", currentAboutData.jaffa);

    });

    grunt.registerTask("update-about-json", function () {
        var newFilePath = "./jaffa/tmp/root/jaffa/about.json";
        var currentFilePath = "about.json";


        var newAboutData = grunt.file.readJSON(newFilePath);

        var currentAboutData = grunt.file.readJSON(currentFilePath);

        currentAboutData.jaffa = newAboutData.version;
        grunt.file.write(currentFilePath, JSON.stringify(currentAboutData, null, 2));

    });

    grunt.registerTask("update-package-json", function () {

        var _ = require("underscore");
        var newPackageFile = "./jaffa/tmp/root/package.json";
        var newPackageJson = grunt.file.readJSON(newPackageFile);

        var currentPackageFile = "package.json";
        var currentPackageJson = grunt.file.readJSON(currentPackageFile);

        _.each(newPackageJson.dependencies, function (value, key, list) {
            currentPackageJson.dependencies[key] = value;
        });

        _.each(newPackageJson.devDependencies, function (value, key, list) {
            currentPackageJson.devDependencies[key] = value;
        });

        grunt.file.write(currentPackageFile, JSON.stringify(currentPackageJson, null, 2));
        console.log("Updating package.json...");
    });

    return {};
};
