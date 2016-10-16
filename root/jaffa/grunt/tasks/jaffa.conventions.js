/**
 * Created by gaurangdave on 10/2/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    grunt.registerTask("conventions", function (flow) {

        /**
         * TODO implement flow (create,edit) - currently defaulting to create
         */
        var component = grunt.config("component");

        /**
         * Check if component is undefined or invalid.
         */
        if (utils.isNullOrUndefined(component) || !utils.isValidComponent(component)) {
            grunt.console.error("Cannot follow naming conventions for " + component);
            return;
        }

        switch (component) {
            case utils.components.controller:
                nameFilesForController(flow);
                break;

            case utils.components.service:
                nameFilesForService(flow);
                break;

            case utils.components.provider:
                nameFilesForProvider(flow);
                break;

            case utils.components.directive:
                nameFilesForDirective(flow);
                break;

            case utils.components.model:
                nameFilesForModels(flow);
                break;
        }

    });


    function getPathForFiles(flow) {
        var component = grunt.config("component");
        var moduleObj = grunt.config("module");
        var contextObj = grunt.config("context");

        /**
         * TODO - Remove this if we need to add module services into separate folders.
         */
        if (flow === "edit") {
            component = utils.getComponentFromModule(grunt, moduleObj.name, contextObj);
        }

        var modulePath = utils.componentFolders[component] + "/" + moduleObj.name + "/";
        var path = "app/" + modulePath;

        if (contextObj === utils.context.core) {
            path = appData.jaffaRoot + modulePath;
            console.log("Context Path is " + path)
        }

        return path;
    }

    /**
     * Creates configs for file names for controller.
     * Function will create config for js,html and scss files.
     */
    function nameFilesForController(flow) {
        var controllerObj = grunt.config("controller");
        var module = grunt.config("module");
        var path = getPathForFiles(flow);
        var nameArray = utils.splitTitleize(controllerObj.name);

        if (controllerObj.name.toLowerCase().includes(utils.components.controller)) {
            nameArray.splice(nameArray.length - 1, 1);
        }

        controllerObj.rjsKey = module.name;
        controllerObj.jsFileName = path + nameArray.join("-").toLowerCase() + ".controller.js";
        controllerObj.specFileName = path + "tests/" + nameArray.join("-").toLowerCase() + ".controller.spec.js";
        controllerObj.htmlFileName = path + nameArray.join("-").toLowerCase() + ".view.html";
        controllerObj.cssFileName = path + nameArray.join("-").toLowerCase() + ".style.scss";
        controllerObj.dependencies = ["css!/" + utils.setFileExtension(controllerObj.cssFileName, "css")];

        if (flow === "edit") {
            controllerObj.rjsKey = module.name + "." + controllerObj.name;
            controllerObj.dependencies.push(module.name);
        }

        grunt.config("controller", controllerObj);
    }

    function nameFilesForService(flow) {
        var serviceObj = grunt.config("service");
        var module = grunt.config("module");
        var path = getPathForFiles(flow);

        var nameArray = utils.splitTitleize(serviceObj.name);

        if (serviceObj.name.toLowerCase().includes(utils.components.service)) {
            nameArray.splice(nameArray.length - 1, 1);
        }

        serviceObj.rjsKey = module.name;
        serviceObj.jsFileName = path + nameArray.join("-").toLowerCase() + ".service.js";
        serviceObj.specFileName = path + "tests/" + nameArray.join("-").toLowerCase() + ".service.spec.js";
        serviceObj.dependencies = [];

        if (flow === "edit") {
            serviceObj.rjsKey = module.name + "." + serviceObj.name;
            serviceObj.dependencies.push(module.name);
        }

        grunt.config("service", serviceObj);
    }

    function nameFilesForProvider(flow) {
        var serviceObj = grunt.config("provider");
        var module = grunt.config("module");
        var path = getPathForFiles(flow);

        var nameArray = utils.splitTitleize(serviceObj.name);

        if (serviceObj.name.toLowerCase().includes(utils.components.provider)) {
            nameArray.splice(nameArray.length - 1, 1);
        }

        serviceObj.rjsKey = module.name;
        serviceObj.jsFileName = path + nameArray.join("-").toLowerCase() + ".provider.js";
        serviceObj.specFileName = path + "tests/" + nameArray.join("-").toLowerCase() + ".provider.spec.js";
        serviceObj.dependencies = [];

        if (flow === "edit") {
            serviceObj.rjsKey = module.name + "." + serviceObj.name;
            serviceObj.dependencies.push(module.name);
        }

        grunt.config("provider", serviceObj);
    }

    function nameFilesForDirective(flow) {
        var directiveObj = grunt.config("directive");
        var module = grunt.config("module");
        var path = getPathForFiles(flow);

        var nameArray = directiveObj.name.split("-");

        if (directiveObj.name.toLowerCase().includes(utils.components.directive)) {
            nameArray.splice(nameArray.length - 1, 1);
        }

        directiveObj.controller = utils.titlelize(nameArray.join("")) + "Controller";

        directiveObj.rjsKey = module.name;
        directiveObj.jsFileName = path + nameArray.join("-").toLowerCase() + ".directive.js";
        directiveObj.specFileName = path + "tests/" + nameArray.join("-").toLowerCase() + ".directive.spec.js";
        directiveObj.htmlFileName = path + nameArray.join("-").toLowerCase() + ".view.html";
        directiveObj.cssFileName = path + nameArray.join("-").toLowerCase() + ".style.scss";
        directiveObj.dependencies = ["css!/" + utils.setFileExtension(directiveObj.cssFileName, "css")];

        if (flow === "edit") {
            directiveObj.rjsKey = module.name + "." + directiveObj.name;
            directiveObj.dependencies.push(module.name);
        }

        grunt.config("directive", directiveObj);
    }

    function nameFilesForModels(flow) {
        var modelObj = grunt.config("model");
        var module = grunt.config("module");
        var path = getPathForFiles(flow);


        modelObj.name = utils.titlelize(modelObj.name);

        modelObj.rjsKey = module.name;
        modelObj.jsFileName = path + modelObj.name.toLowerCase() + ".model.js";
        modelObj.specFileName = path + "tests/" + modelObj.name.toLowerCase() + ".model.spec.js";
        modelObj.dependencies = [];

        if (flow === "edit") {
            modelObj.rjsKey = module.name + "." + modelObj.name;
            modelObj.dependencies.push(module.name);
        }

        grunt.config("model", modelObj);
    }


    return {};
};
