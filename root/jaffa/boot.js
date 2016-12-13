/**
 * Created by gaurangdave on 8/28/16.
 */

define(["jquery", "underscore"], function () {

    var aboutAppFile = "/about.json";
    var appConfigFile = "/app/main.json";
    var coreConfigFile = "";
    var appConfigData = null;
    var gotAppConfigData = false;
    var gotCoreConfigData = false;
    var coreConfigData = null;
    var dataType = "json";
    var appData = {};

    function getAboutApp(data) {
        appData = data;
        console.log("starting " + appData.name + " version " + appData.version + "...");

        //get requirejs config for core framework
        getCoreConfigFile();


    }

    function gotAppConfig(appConfig) {
        appConfigData = appConfig;
        if (appConfigData && coreConfigData) {
            updateRequireJSConfig();
        }
    }

    function gotCoreConfig(coreConfig) {
        coreConfigData = coreConfig;
        //get requirejs config for the app
        getAppConfigFile();
    }

    function updateRequireJSConfig() {
        var config = {
            "paths": {},
            "shim": {}
        };


        createConfigFromData(config, coreConfigData);
        createConfigFromData(config, appConfigData);

        require.config(config);
        require(["app"], function () {
            angular.bootstrap(document, [appData.name]);
        });

    }

    /**
     *
     * @param config - config object to pass into require.config
     * @param configData - JSON object to create config from.
     * @description
     * The function parses JSON object and adds paths, shim and dependencies to config object.
     */
    function createConfigFromData(config, configData) {
        _.each(configData, function (value, key, array) {
            config.paths[key] = removeJSFileExtension(value.js);
            if (value.dependencies)
                config.shim[key] = value.dependencies;
        });

    }

    /**
     *
     * @param fileName
     * @returns {*}
     * @description
     * The function accepts a file name or file path and returns the same path without file extension.
     */
    function removeJSFileExtension(fileName) {
        return fileName.slice(0, fileName.length - 3);
    }


    function getAppConfigFile() {
        var payload = {
            url: appConfigFile,
            dataType: dataType,
            success: function (data) {
                gotAppConfig(data);
            }
        };

        $.ajax(payload);
    }

    function getCoreConfigFile() {
        coreConfigData = "/jaffa/" + appData.jaffa + "/main.json";
        var payload = {
            url: coreConfigData,
            dataType: dataType,
            success: function (data) {
                gotCoreConfig(data);
            }
        };

        $.ajax(payload);
    }


    var payload = {
        url: aboutAppFile,
        dataType: dataType,
        success: function (data) {
            getAboutApp(data);
        }
    };

    $.ajax(payload);

    //test
    var payload2 = {
        url: "/testApi",
        dataType: dataType,
        success: function (data) {
            getAboutApp(data);
        }
    };

    $.ajax(payload2);


});
