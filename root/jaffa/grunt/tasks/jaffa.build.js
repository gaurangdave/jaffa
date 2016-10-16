/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {

    grunt.registerTask("build", function (type) {

        switch (type) {

            case "dev":
                createDevBuild();
                break;

            case "qa":
                createQABuild();
                break;

            case "prod":
                createProdBuild();
                break;
        }

    });

    function createDevBuild() {
        grunt.task.run(["prompt:build", "replace:build-version", "sass:app", "sass:core", "clean:dev", "cssmin:dev", "uglify:dev", "packageModules:dev", "copy:dev", "cache-bust:dev", "cacheBust:dev", "clean:dev-tmp"]);
    }

    function createQABuild() {
        grunt.task.run(["prompt:build", "replace:build-version", "sass:app", "sass:core", "clean:qa", "cssmin:qa", "uglify:qa", "packageModules:qa", "copy:qa", "cache-bust:qa", "cacheBust:qa", "clean:qa-tmp"]);
    }

    function createProdBuild() {
        grunt.task.run(["prompt:build", "replace:build-version", "sass:app", "sass:core", "clean:prod", "cssmin:prod", "uglify:prod", "packageModules:prod", "copy:prod", "cache-bust:prod", "cacheBust:prod", "clean:prod-tmp"]);
    }

    return {};
};
