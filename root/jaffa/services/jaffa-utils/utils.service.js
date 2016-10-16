/*
 * Copyright (c) 2016 iTutorGroup
 */

define(["underscore"], function () {

    //Add all the module dependencies in the array below.
    var moduleDependencies = [];

    //Add all the service in the array below.
    var serviceDependencies = ["$rootScope", "$log"];

    //the service function
    var serviceFunction = function ($rootScope, $log) {

        //region private variables;
        //endregion

        //region private functions
        //endregion

        //region service variables
        //endregion

        //region service functions
        /**
         * Utility function to determine if param is null or undefined.
         * @param str
         */
        this.isValidString = function (str) {
            return _.isUndefined(str) || _.isNull(str);
        };

        /**
         * Utility function to determine if passed object is valid object with attributes
         * @param obj
         */
        this.isValidObject = function (obj) {
            if (_.isUndefined(obj) || _.isNull(obj)) {
                return false;
            }

            return _.keys(obj).length !== 0;

        };
        //endregion

    };

    /**
     This is auto generated code by grunt plugin.
     Please do not manually edit this code.
     */

    var moduleName = "jaffa-utils";
    var serviceName = "utils";
    var module = angular.module(moduleName, moduleDependencies);
    module.service(serviceName, serviceDependencies.concat([serviceFunction]));

}()); //end of function
