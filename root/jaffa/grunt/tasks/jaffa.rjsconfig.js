/**
 * Created by gaurangdave on 8/28/16.
 */

module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    grunt.registerTask("rjs", function (action) {

        var component = grunt.config("component");
        var context = grunt.config("context");

        if (!context) {
            //TODO Review Error Handling
            grunt.log.error("Cannot Update Name:Missing Params - type");
            return;
        }


        switch (component) {

            case "controller":
                updateRJSConfigForController();
                break;

            case "service":
                updateRJSConfigForService();
                break;

            case "directive":
                updateRJSConfigForDirective();
                break;

            case "provider":
                updateRJSConfigForProvider();
                break;

            case "model":
                updateRJSConfigForModel();
                break;

            default:
                handleDefaultCase(component, context);
                break;
        }

    });

    function getConfigFilePath() {

        var context = grunt.config("context");

        if (context === 'core') {
            return appData.jaffaRoot + "main.json";
        }
        else if (context === "app") {
            return appData.appRoot + "main.json";
        }
        else {
            //error
            return null;
        }

    }

    function updateRJSConfigForController() {

        var controller = grunt.config('controller');
        var module = grunt.config("module");
        var configFilePath = getConfigFilePath();

        var configData = grunt.file.readJSON(configFilePath);

        console.log("updateRJSConfigForController:" + controller.rjsKey);
        configData[controller.rjsKey] = {
            "js": controller.jsFileName,
            "dependencies": controller.dependencies,
            "module": module.name,
            "view": controller.htmlFileName,
            "controller": controller.name,
            "type": "controller"
        };

        grunt.file.write(configFilePath, JSON.stringify(configData, null, 2));
    }

    function updateRJSConfigForService() {
        var module = grunt.config("module");
        var service = grunt.config('service');
        var configFilePath = getConfigFilePath();

        var configData = grunt.file.readJSON(configFilePath);

        configData[service.rjsKey] = {
            "js": service.jsFileName,
            "dependencies": service.dependencies,
            "module": module.name,
            "service": service.name,
            "type": "service"

        };

        grunt.file.write(configFilePath, JSON.stringify(configData, null, 2));
    }

    function updateRJSConfigForProvider() {
        var module = grunt.config("module");
        var provider = grunt.config('provider');
        var configFilePath = getConfigFilePath();


        var configData = grunt.file.readJSON(configFilePath);

        configData[provider.rjsKey] = {
            "js": provider.jsFileName,
            "dependencies": provider.dependencies,
            "module": module.name,
            "service": provider.name,
            "type": "provider"
        };

        grunt.file.write(configFilePath, JSON.stringify(configData, null, 2));
    }

    function updateRJSConfigForModel() {
        var module = grunt.config("module");
        var model = grunt.config('model');
        var configFilePath = getConfigFilePath();


        var configData = grunt.file.readJSON(configFilePath);

        configData[model.rjsKey] = {
            "js": model.jsFileName,
            "dependencies": model.dependencies,
            "module": module.name,
            "model": model.name,
            "type": "model"
        };

        grunt.file.write(configFilePath, JSON.stringify(configData, null, 2));
    }


    function updateRJSConfigForDirective() {

        var directive = grunt.config('directive');
        var module = grunt.config("module");
        var configFilePath = getConfigFilePath();
        var configData = grunt.file.readJSON(configFilePath);


        configData[directive.rjsKey] = {
            "js": directive.jsFileName,
            "dependencies": directive.dependencies,
            "module": module.name,
            "directive": directive.name,
            "controller": directive.controller,
            "view": directive.htmlFileName,
            "type": "directive"
        };

        grunt.file.write(configFilePath, JSON.stringify(configData, null, 2));

    }


    function handleDefaultCase(type, context) {
        grunt.log.error("Cannot create component - unknown params", type, context);
    }

    return {};
};
