/**
 * Created by gaurangdave on 9/30/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");

    /**
     * Task to edit current app modules.
     *
     */
    grunt.registerTask("edit", function (context) {
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
            selectComponent(context, "edit");
            return;
        }

        /**
         * ToDo
         * 1. Prompt user to select the module to edit
         * 2. Ask user to select an action (add controller,add directive,add service).
         * 3. Get name for the same.
         * 4. Create file from template.
         * 5. Update RJS config and add parent module as dependency.
         */

        grunt.task.run(["prompt:" + component, "conventions:edit", "template:append-" + component, "rjs:add"]);

    });

    function selectComponent(context, nextStep) {
        /**
         *  Tasks to run
         *  1. prompt:select_component - to prompt user to select component.
         *  2. create:component:context - to start the create component flow.
         */

        grunt.task.run(["prompt:edit", "prompt:select_component", nextStep + ":" + context]);
    }


    return {};
};
