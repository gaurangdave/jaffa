/*
 * Copyright (c) 2016 iTutorGroup
 */

define([], function () {

    //Add all the module dependencies in the array below.
    var moduleDependencies = [];

    //Add all the controller in the array below.
    var providerDependencies = ["$qProvider"];

    //the controller function
    var providerFunction = function ($qProvider) {

        this.isInitialized = false;

        /**
         * Initialize function loads the main.json for app and core into the memory.
         */
        this.initialize = function () {

            if (this.isInitialized) {
                return;
            }

            getAppConfigFile();

        };

        this.$get = [function () {
            return this;
        }];


        //region helper functions

        function getAppConfigFile() {
            var payload = {
                url: "/app/main.json",
                dataType: "json",
                success: function (data) {
                    console.log("rjs-config-data", data);
                }
            };

            $.ajax(payload);
        }

        //endregion


    };

    /**
     This is auto generated code by grunt plugin.
     Please do not manually edit this code.
     */
    var moduleName = "jaffa-rjs-confg";
    var providerName = "rjsConfig";
    var module = angular.module(moduleName, moduleDependencies);
    module.provider(providerName, providerDependencies.concat([providerFunction]));
}()); //end of function
