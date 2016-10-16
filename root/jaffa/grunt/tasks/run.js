/**
 * Created by gaurangdave on 8/24/16.
 */
module.exports = function (grunt) {

    grunt.registerTask('run-app', ['exec:chrome', 'localhosts', 'connect:server']);
    grunt.registerTask('run-dev', ['exec:chrome', 'localhosts', 'connect:dev']);
    grunt.registerTask('run-qa', ['exec:chrome', 'localhosts', 'connect:qa']);
    grunt.registerTask('run-prod', ['exec:chrome', 'localhosts', 'connect:prod']);

    return {}
};
