/**
 * Created by gaurangdave on 8/27/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    /**
     * Tasks to create AngularJS Components.
     */
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
         *  7. Update config.js
         *
         */

        grunt.task.run(["prompt:module", "prompt:" + component, "conventions", "template:" + component, "rjs:add","create-config"]);

    });
    function selectComponent(component, context, nextStep) {
        /**
         *  Tasks to run
         *  1. prompt:select_component - to prompt user to select component.
         *  2. create:component:context - to start the create component flow.
         */

        grunt.task.run(["prompt:select_component", nextStep + ":" + context]);
    }

    /**
     *  Tasks to create config for the app.
     */
    grunt.registerTask("create-config", function (context) {

        if (!context) {
            context = utils.context.app;
        }

        if (context === utils.context.app) {
            /**
             * Steps
             * 1. Create app config object.
             * 2. Create config file from app-config-template.
             */

            grunt.task.run(["create-app-config-obj", "template:app-config"]);
        }
        else if (context === utils.context.build) {
            /**
             * Steps
             * 1. Create build config object. Without CSS. Add all app modules as dependencies.
             * 2. Create config file from build-config-template.
             */
            grunt.task.run(["create-build-config-obj", "template:app-config"])
        }

    });

    /**
     * Parses libs.json, app/main.json & jaffa/main.json and creates a config object with paths and shim.
     * Removes CSS dependencies in config.
     * Adds all modules as dependency for the app .
     * This config can be used to create optimzed build for PROD.
     */
    grunt.registerTask("create-build-config-obj", function () {

        var build = grunt.config.get("build");

        if(!build || build["optimization"] ===  utils.buildType.combined){
            //no build is set run build config for lazy loading.
            createConfigObjectForCombinedBuild()
        }
        else if(build["optimization"] === utils.buildType.lazyload){
            createConfigObjectForLazyLoadBuild()
        }


    });


    function createConfigObjectForLazyLoadBuild(){
        /**
         * Steps:
         * 1. Read libs.json, app/main.json, jaffa/main.json from build.
         * 2. Get cache busted config.js file name.
         * 3. Create config JSON object.
         * 4. Create config object of template.
         */
        var buildConfig = grunt.config.get("buildConfig");
        var libsJsonPath = buildConfig.baseFolder + "libs.json";
        var cacheBustMappingPath = buildConfig.baseFolder + "cacheBustMapping.json";
        var coreJsonPath = buildConfig.jaffaFolder + "main.json";
        var appJsonPath = buildConfig.appFolder + "main.json";
        var _ = require("underscore");
        var libsJson = grunt.file.readJSON(libsJsonPath);
        var coreJson = grunt.file.readJSON(coreJsonPath);
        var appJson = grunt.file.readJSON(appJsonPath);
        var cacheBustMapping = grunt.file.readJSON(cacheBustMappingPath);
        var configObj = {
            "paths": {},
            "shim": {}
        };

        createConfigFromJson(configObj, libsJson, true);
        createConfigFromJson(configObj, coreJson, true);
        createConfigFromJson(configObj, appJson, true);


        var templateObj = {
            "jsFileName":buildConfig.baseFolder + cacheBustMapping["config.js"], //TODO make build location dynamic.
            "paths":JSON.stringify(configObj.paths, null, 2),
            "shim":JSON.stringify(configObj.shim, null, 2),
            "cssPath":"/node_modules/require-css/css.js",
            "appName":appData.name
        };
        grunt.config.set("rjs_config", templateObj);
    }

    function createConfigObjectForCombinedBuild(){
        var _ = require("underscore");
        var libsJson = grunt.file.readJSON("libs.json");
        var coreJson = grunt.file.readJSON(appData.jaffaRoot + "main.json");
        var appJson = grunt.file.readJSON(appData.appRoot + "main.json");
        var appModules = _.keys(appJson);
        var configObj = {
            "paths": {},
            "shim": {}
        };

        createConfigFromJson(configObj, libsJson, true);
        createConfigFromJson(configObj, coreJson, true);
        createConfigFromJson(configObj, appJson, true);

        configObj.shim["app"] = configObj.shim["app"].concat(appModules);

        var templateObj = {
            "jsFileName":utils.getTmpFolder() + "config.js", //TODO make build location dynamic.
            "paths":JSON.stringify(configObj.paths, null, 2),
            "shim":JSON.stringify(configObj.shim, null, 2),
            "cssPath":"node_modules/require-css/css.js",
            "appName":appData.name
        };
        grunt.config.set("rjs_config", templateObj);
    }

    /**
     * Parses libs.json, app/main.json & jaffa/main.json and creates a config object with paths and shim.
     * Also includes CSS dependencies in config.
     */
    grunt.registerTask("create-app-config-obj", function () {

        var libsJson = grunt.file.readJSON("libs.json");
        var coreJson = grunt.file.readJSON(appData.jaffaRoot + "main.json");
        var appJson = grunt.file.readJSON(appData.appRoot + "main.json");
        var configObj = {
            "paths": {},
            "shim": {}
        };

        createConfigFromJson(configObj, libsJson, true);
        createConfigFromJson(configObj, coreJson, true);
        createConfigFromJson(configObj, appJson, true);

        var templateObj = {
            "jsFileName":"config.js",
            "paths":JSON.stringify(configObj.paths, null, 2),
            "shim":JSON.stringify(configObj.shim, null, 2),
            "cssPath":"/node_modules/require-css/css.js",
            "appName":appData.name
        };
        grunt.config.set("rjs_config", templateObj);
    });

    /**
     * Function to create in-memory config object for RequireJS.
     * @param configObj - variable holding config object for the caller
     * @param jsonObj - json object with config details - js file location, dependencies, module name, etc.
     * @param allowCss - flag to determine whether RequireCss is used or not.
     */
    function createConfigFromJson(configObj, jsonObj, allowCss) {

        var _str = require("underscore.string");
        var _ = require("underscore");

        _.forEach(jsonObj, function (value, key, list) {
            configObj.paths[key] = utils.getFileNameWithoutExtension(value.js);

            if (!configObj.shim[key]) {
                configObj.shim[key] = [];
            }

            _.forEach(value.dependencies, function (element, index, array) {

                if (allowCss) {
                    if (_str.endsWith(element, ".css")) {
                        element = "css!/" + element;
                    }
                    configObj.shim[key].push(utils.getFileNameWithoutExtension(element));
                }
                else {
                    if (!_str.endsWith(element, ".css")) {
                        configObj.shim[key].push(utils.getFileNameWithoutExtension(element));
                    }
                }
            });

        })
    }

    return {};
};
