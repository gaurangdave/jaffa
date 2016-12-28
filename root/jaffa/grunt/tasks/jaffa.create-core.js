/**
 * Created by gaurangdave on 11/17/16.
 */
module.exports = function(grunt) {

    /**
     * Task to create new version folder to Jaffa.
     * Steps:
     * 1. Prompt for new version number.
     * 2. Create directory for new version.
     * 3. Copy files from current folder to new folder.
     * 4. Replace version number in all files.
     */
    grunt.registerTask("create-core-version",function() {

        grunt.task.run(["prompt:create-core-version","mkdir:create-core-version","copy:create-core-version","replace:files-core-version","replace:json-core-version"])
    });

    return {};
};
