/**
 * Created by gaurangdave on 11/17/16.
 */
module.exports = function(grunt) {

    grunt.registerTask("create-core-version",function() {

        grunt.task.run(["prompt:create-core-version","mkdir:create-core-version","copy:create-core-version","replace:files-core-version","replace:json-core-version"])
    });

    return {};
};
