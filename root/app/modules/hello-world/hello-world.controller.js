/*
 * Copyright (c) 2016 iTutorGroup
 */

define([],function () {

    //Add all the module dependencies in the array below.
    var moduleDependencies = [];

    //Add all the controller in the array below.
    var controllerDependencies = ["$scope", "$log"];

    //the controller function
    var controllerFunction = function ($scope, $log) {
        //region scope variables
        $scope.message = "The is hello-world module";
        //endregion


        //region private variables;
        //endregion

        //region scope functions
        //function called when controller is initialized
        $scope.initialize = function(){
            $log.info("Initializing Controller...");
        };
        //endregion


        //region private functions

        //endregion
    };

    /**
        This is auto generated code by grunt plugin.
        Please do not manually edit this code.
    */
    var moduleName = "hello-world";
    var controllerName = "HelloWorldController";
    var module = angular.module(moduleName,moduleDependencies);
    module.controller(controllerName, controllerDependencies.concat([controllerFunction]));
}()); //end of function
