/**
 * Created by gaurangdave on 8/27/16.
 */

module.exports = function (grunt, options) {

    grunt.registerTask("jaffa.getName", function (objType) {

        if (!objType) {
            //TODO Review Error Handling
            grunt.log.error("Cannot Update Name:Missing Object Type");
            return;
        }

        switch (objType.toLowerCase()) {

            case "module":
                updateModuleName();
                break;

            case "service":
                updateServiceName();
                break;

            case "directive":
                updateDirectiveName();
                break;

            case "provider":
                updateProviderName();
                break;

            default:
                handleDefaultCase();
                break;

        }

    });

    function updateModuleName() {
        var createModuleObj = grunt.config('createModule');
        var utils = require("./utils");

        //camel case naming convention for modules
        createModuleObj.moduleName = utils.camelize(createModuleObj.name.split("-").join("-").trim());

        //camel Case naming convention for directive name
        createModuleObj.controllerName = utils.titlelize(createModuleObj.name.split("-").join(" ").trim()) + "Ctrl";

        //file names
        createModuleObj.viewFileName = createModuleObj.name.toLowerCase().split("-").join("-").trim() + ".view";
        createModuleObj.jsFileName = createModuleObj.name.toLowerCase().split("-").join("-").trim() + ".controller";
        createModuleObj.cssFileName = createModuleObj.name.toLowerCase().split("-").join("-").trim() + ".style";

        grunt.config('createModule', createModuleObj);
    }

    function updateServiceName() {
        var createModuleObj = grunt.config('createService');
        var utils = require("./utils");

        //camel case naming convention for modules
        createModuleObj.moduleName = utils.camelize(createModuleObj.name.split("-").join("-").trim());
        createModuleObj.fileName = utils.camelize(createModuleObj.name.split("-").join(".").trim());

        //camel Case naming convention for directive name
        createModuleObj.serviceName = utils.camelize(createModuleObj.name.split("-").join(" ").trim());

        //file names
        createModuleObj.jsFileName = createModuleObj.name.toLowerCase().split("-").join("-").trim() + ".service";

        grunt.config('createService', createModuleObj);
    }

    function updateDirectiveName() {
        var createDirectiveObj = grunt.config('createDirective');
        var utils = require("./utils");

        //camel case naming convention for modules
        createDirectiveObj.moduleName = utils.camelize(createDirectiveObj.name.split("-").join("-").trim());

        //camel Case naming convention for directive name
        createDirectiveObj.directiveName = utils.camelize(createDirectiveObj.name.split("-").join(" ").trim());
        createDirectiveObj.controllerName = utils.titlelize(createDirectiveObj.name.split("-").join(" ").trim()) + "Ctrl";

        //file names
        createDirectiveObj.viewFileName = createDirectiveObj.name.toLowerCase().split("-").join("-").trim() + ".view";
        createDirectiveObj.jsFileName = createDirectiveObj.name.toLowerCase().split("-").join("-").trim() + ".directive";
        createDirectiveObj.cssFileName = createDirectiveObj.name.toLowerCase().split("-").join("-").trim() + ".style";


        grunt.config('createDirective', createDirectiveObj);
    }

    function updateProviderName() {
        var createProviderObj = grunt.config('createProvider');
        var utils = require("./utils");

        //camel case naming convention for modules
        createProviderObj.moduleName = utils.camelize(createProviderObj.name.split("-").join("-").trim());

        //camel Case naming convention for directive name
        createProviderObj.providerName = utils.camelize(createProviderObj.name.split("-").join(" ").trim());

        //file names
        createProviderObj.jsFileName = createProviderObj.name.toLowerCase().split("-").join("-").trim() + ".provider";


        grunt.config('createProvider', createProviderObj);
    }

    function handleDefaultCase() {
        grunt.log.error("Unknown Request");
    }


    return {};

};
