/**
 * Created by gaurangdave on 8/19/16.
 */
module.exports = function (grunt, options) {


    grunt.registerTask('get-app-data', function () {


        if (!grunt.file.exists(options.appConfigSrc)) {
            grunt.log.error("Error accessing app config...");
            return false;//return false to abort the execution
        }

        var currentApp = grunt.file.readJSON(options.appConfigSrc);
        grunt.config.set("currentApp", currentApp);
    });


    return {
        'get-app-data': {}
    }
};
