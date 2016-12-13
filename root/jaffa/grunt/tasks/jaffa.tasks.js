/**
 * Created by gaurangdave on 8/22/16.
 */
module.exports = function (grunt, options) {


    grunt.registerTask('task-list', function () {

        var tasks = [{
            name: 'run-app',
            desc: 'start local dev server and open URL in browser'
        }];

        grunt.log.writeln("JAFFA Web Tasks");
        grunt.log.writeln("-----------------------------");
        grunt.log.writeln("Below are list of supported tasks");

        tasks.forEach(function (task, index, array) {
            grunt.log.writeln(index + 1 + "." + task.name['yellow'] + ": " + task.desc['green']);
        });

    });

    grunt.registerTask('default-task', function () {

        grunt.task.run('task-list');
    });


    return {}
};
