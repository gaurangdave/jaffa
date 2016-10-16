/**
 * Created by gaurangdave on 9/30/16.
 */
module.exports = function (grunt, options) {

    grunt.registerTask("add-component", function (context) {
        var createProviderObj = grunt.config('editModule');

        switch (createProviderObj.action) {

            case "Controller":
                addControllerToModule(context);
                break;

            case "Service":
                addServiceToModule(context);
                break;

            case "Directive":
                addDirectiveToModule(context);
                break;

            default:
                defaultFunction();
                break
        }

    });


    function addControllerToModule(context) {
        /**
         *  1. Get new controller name
         *  2. Create new controller,view template for current module.
         *  3. Update RJS Config for new controller. (RJS config key module.controller-name
         */

        var createProviderObj = grunt.config('editModule');
        console.log("Adding controller for " + createProviderObj.moduleName);

    }

    function addServiceToModule(context) {
        var createProviderObj = grunt.config('editModule');

        console.log("Adding service for " + createProviderObj.moduleName);
    }

    function addDirectiveToModule(context) {
        var createProviderObj = grunt.config('editModule');

        console.log("Adding directive for " + createProviderObj.moduleName);
    }

    function defaultFunction() {
        console.error("Please select valid component.");
    }

    return {};
};
