/**
 * Created by gaurangdave on 8/27/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    grunt.registerTask("create", function (context) {


        /**
         * Check if context is present. If present the check if its valid. If not use "app" context.
         */

        if (utils.isNullOrUndefined(context) || context === utils.context.app) {
            grunt.config.set("context", utils.context.app);
        }
        else if (context === utils.context.core) {
            grunt.config.set("context", utils.context.core);
        }
        else {
            grunt.log.error("Cannot create controller for " + context);
            return;
        }


        /**
         *  Check if component is present and valid. If not prompt user what needs to be created.
         */

        var component = grunt.config("component");

        if (!utils.isValidComponent(component)) {
            //prompt user to choose component
            selectComponent(component, context, "create");
            return;
        }

        /**
         *  Tasks to run
         *  1. prompt:module - to get new module name.
         *  2. prompt:controller - to get new controller name.
         *  3. conventions:controller - to set file and component names as per naming conventions.
         *  4. mkdir:controller - to create directory for controller.
         *  5. template:controller - to create js,html,scss files for component.
         *  6. rjs:controller - to update main.json with new controller file location. module-name.controller-name
         *
         */

        grunt.task.run(["prompt:module", "prompt:" + component, "conventions", "template:" + component, "rjs:add"]);

    });

    function selectComponent(component, context, nextStep) {
        /**
         *  Tasks to run
         *  1. prompt:select_component - to prompt user to select component.
         *  2. create:component:context - to start the create component flow.
         */

        grunt.task.run(["prompt:select_component", nextStep + ":" + context]);
    }

    return {};
};
