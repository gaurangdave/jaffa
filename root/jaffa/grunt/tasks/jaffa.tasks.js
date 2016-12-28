/**
 * Created by gaurangdave on 8/22/16.
 */
module.exports = function (grunt, options) {


    grunt.registerTask("task-list", function () {

        var tasks = [
            {
                name: "create (options: core,app)",
                desc: "Create new AngularJS components (controllers,services,directives etc)."
            },
            {
                name: "server (args: -open,-port,-build)",
                desc: "Run local dev server. Run with options (dev,qa,prod) to pipe requests to server."
            },
            {
                name: "build",
                desc: "Create release builds with different optimization options."
            },
            {
                name: "create-config",
                desc: "Auto create config.js after adding new library or dependency to libs.json."
            }
            ,
            {
                name: "update (options: v#.#.# version number)",
                desc: "Update JAFFA to latest or specified number."
            }];

        grunt.log.writeln("JAFFA Web Tasks");
        grunt.log.writeln("-----------------------------");
        grunt.log.writeln("Below are list of supported tasks");

        tasks.forEach(function (task, index, array) {
            grunt.log.writeln(index + 1 + "." + task.name["yellow"] + ": " + task.desc["green"]);
        });

    });

    grunt.registerTask("default-task", function () {

        grunt.task.run("task-list");
    });


    return {}
};
