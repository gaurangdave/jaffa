/**
 * Created by gaurangdave on 9/20/16.
 */
module.exports = function (grunt, options) {

    grunt.registerTask("cache-bust", function (type, env) {

        if (type === "rename") {
            bustCacheUsingFileRename(env)
        }
        else if (type === "url") {
            bustCacheUsingUrlParams(env);
        }
        else {
            //TODO assuming if no type is passed first param is environment
            bustCacheUsingUrlParams(type);
        }

    });

    function bustCacheUsingFileRename(env) {
    }

    function bustCacheUsingUrlParams(env) {

        switch (env) {
            case "dev":
                grunt.task.run(["replace:build-dev"]);
                break;

            case "qa":
                grunt.task.run(["replace:build-qa"]);
                break;

            case "prod":
                grunt.task.run(["replace:build-prod"]);
                break;
        }
    }

    return {};
};
