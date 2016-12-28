/**
 * Created by gaurangdave on 8/31/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var coreData = utils.getCoreData(grunt);

    /**
     *  Grunt task to update jaffa version.
     *  Steps:
     *  1. Git clone latest into tmp folder (based on tags).
     *  2. Create version folder from jaffa.
     *  3. Copy content from tmp folder to jaffa version folder.
     *  4. Update version number at all places.
     *  5. Update package.json with new version.
     *  6. Update libs.json with new version.
     *  7. Run npm install to install new dependencies.
     *  8. Clean tmp.
     * */

    grunt.registerTask("update", function (type) {

        if (!type)
            type = "";

        grunt.task.run(["create-clone-config:" + type, "gitclone", "get-dir-name", "mkdir:update", "copy:update", "replace:update","replace:core-files","update-about-json", "update-package-json","update-libs-json", "replace:core-json","create-config:app","packageModules:update","clean:tmp"]);

    });

    grunt.registerTask("create-clone-config", function (type) {
        var tempCloneFolder = utils.getTmpFolder();
        var remote = coreData.git;
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

        var newFilePath = utils.getTmpFolder() + "root/jaffa/about.json";
        var currentFilePath = "about.json";
        var newAboutData = grunt.file.readJSON(newFilePath);
        var currentAboutData = grunt.file.readJSON(currentFilePath);
        grunt.config.set("updateDir", newAboutData.version);
        grunt.config.set("currentDir", currentAboutData.jaffa);

    });

    grunt.registerTask("update-about-json", function () {
        var newFilePath = utils.getTmpFolder() + "root/jaffa/about.json";
        var currentFilePath = "about.json";


        var newAboutData = grunt.file.readJSON(newFilePath);

        var currentAboutData = grunt.file.readJSON(currentFilePath);

        currentAboutData.jaffa = newAboutData.version;
        grunt.file.write(currentFilePath, JSON.stringify(currentAboutData, null, 2));

    });

    /**
     * Grunt task to update package.json with new version.
     */
    grunt.registerTask("update-package-json", function () {

        var _ = require("underscore");
        var newPackageFile = utils.getTmpFolder() + "root/package.json";
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

    /**
     * Grunt task to update libs.json with new version. The task makes sure any libs added by users are not over written.
     * Steps:
     * 1. Loop through new libs.json
     * 2. Check if key from new libs.json exists in current libs.json. If yes update JS and merge dependencies. If not add new value.
     * 3. Write new JSON object back to the file.
     */
    grunt.registerTask("update-libs-json",function () {
        var _ = require("underscore");
        var libsJsonFile = utils.getTmpFolder() + "root/libs.json";
        var currentLibsJsonFile = "libs.json";


        var newLibsJson = grunt.file.readJSON(libsJsonFile);
        var currentLibsJson = grunt.file.readJSON(currentLibsJsonFile);
        
        _.each(newLibsJson,function (value,key,object) {
            if(currentLibsJson[key]){
                currentLibsJson[key].js = value.js;
                currentLibsJson[key].dependencies = _.union(currentLibsJson[key].dependencies,value.dependencies);
            }
            else{
                currentLibsJson[key] = value;
            }
        });

        grunt.file.write(currentLibsJsonFile,JSON.stringify(currentLibsJson,null,2))
    });

    return {};
};
