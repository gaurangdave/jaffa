module.exports = function (grunt) {

    var config_src = 'about.json';
    var aboutApp = grunt.file.readJSON(config_src);
    var grunt_task_dir = "jaffa/" + aboutApp.jaffa + "/grunt/tasks/*.js";


    var tasks = {scope: ['devDependencies', 'dependencies']};

    var options = {
        config: {
            src: grunt_task_dir
        },
        appConfigSrc: config_src
    };

    var configs = require('load-grunt-configs')(grunt, options);
    require('load-grunt-tasks')(grunt, tasks);

    grunt.initConfig(configs);

    grunt.registerTask('default', ['default-task']);

};
