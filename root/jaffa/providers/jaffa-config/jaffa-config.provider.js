/*
 * Copyright (c) 2016 iTutorGroup
 */

define([], function () {

    //Add all the module dependencies in the array below.
    var moduleDependencies = [];

    //Add all the controller in the array below.
    var providerDependencies = [];

    //the controller function
    var providerFunction = function () {

        var restApiVerstion = "v1";
        //CDN Servers
        var uploadServer = "http://imgsrv.liveh2h.com";
        var downloadServer = "https://upload.liveh2h.com";

        //Application Servers
        var localhostUrl = "http://localhost.liveh2h.com:9000";
        var devUrl = "http://h2hdev.liveh2h.com";
        var qaUrl = "https://h2hqa.liveh2h.com";
        var prodUrl = "https://app.liveh2h.com";

        this.LOCALHOST = "localhost";
        this.DEV = "dev";
        this.QA = "qa";
        this.PROD = "prod";


        var config = {
            "environment": this.DEV,
            "debug": "true"
        };

        var urlMapping = {};
        urlMapping[this.DEV] = {
            "apiServer": devUrl,
            "uploadServer": uploadServer,
            "downloadServer": downloadServer
        };
        urlMapping[this.QA] = {
            "apiServer": qaUrl,
            "uploadServer": uploadServer,
            "downloadServer": downloadServer
        };

        urlMapping[this.PROD] = {
            "apiServer": prodUrl,
            "uploadServer": uploadServer,
            "downloadServer": downloadServer
        };


        /**
         * The method returns current hosting environment of the app.
         * @returns {*}
         */
        this.getCurrentHostingEnv = function () {
            var url = window.location.origin;
            if (url == localhostUrl) {
                return this.LOCALHOST;
            }
            else if (url == devUrl) {
                return this.DEV;
            }
            else if (url == qaUrl) {
                return this.QA;
            }
            else if (url == prodUrl) {
                return this.PROD;
            }
        };

        /**
         * The method to determine which server is the app communicating with.
         * If the app is hosted on localhost method returns server based on config.
         * @returns {*}
         */
        this.getEnvironment = function () {
            var currentHostingEnv = this.getCurrentHostingEnv();
            if (currentHostingEnv === this.LOCALHOST) {
                return config.environment;
            }
            else {
                return currentHostingEnv;
            }
        };

        /**
         * This method sets the config environment for localhost.
         * @param env
         */
        this.setEnvironment = function (env) {
            var currentHostingEnv = this.getCurrentHostingEnv();
            if (currentHostingEnv === this.LOCALHOST) {
                config.environment = env;
            }
        };

        this.getApiServer = function () {
            var obj = urlMapping[this.getEnvironment()];
            return obj.apiServer;
        };

        this.getUploadUrl = function () {
            var obj = urlMapping[this.getEnvironment()];
            return obj.uploadServer;
        };

        this.getDownloadUrl = function () {
            var obj = urlMapping[this.getEnvironment()];
            return obj.downloadServer;
        };

        this.getApiVersion = function () {
            return restApiVerstion;
        };

        this.setApiVersion = function (version) {
            restApiVerstion = version;
        };

        this.$get = [function () {
            return this;
        }];
    };

    /**
     This is auto generated code by grunt plugin.
     Please do not manually edit this code.
     */
    var moduleName = "jaffa-config";
    var providerName = "jaffaConfig";
    var module = angular.module(moduleName, moduleDependencies);
    module.provider(providerName, providerDependencies.concat([providerFunction]));
}()); //end of function
