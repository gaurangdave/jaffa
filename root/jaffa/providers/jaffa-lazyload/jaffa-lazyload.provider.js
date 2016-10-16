/*
 * Copyright (c) 2016 iTutorGroup
 */

define(["oclazyload"], function () {

    //Add all the module dependencies in the array below.
    var moduleDependencies = ["oc.lazyLoad"];

    //Add all the controller in the array below.
    var providerDependencies = [];

    //the controller function
    var providerFunction = function () {


        this.resolve = function (rjsKey, module) {
            return {
                load: ["$ocLazyLoad", "$q", function ($ocLazyLoad, $q) {
                    return resolveDependencies($ocLazyLoad, $q, rjsKey, module);
                }]
            };

        };

        function resolveDependencies($ocLazyLoad, $q, rjsKey, module) {
            var deferObj = $q.defer();
            require([rjsKey], function () {
                $ocLazyLoad.inject(module).then(
                    function () {
                        deferObj.resolve();
                    },
                    function () {
                        deferObj.reject();
                        console.error("Error loading module:" + module)
                    }
                );
            });

            return deferObj.promise;
        }

        this.$get = [function () {
            return this;
        }];
    };

    /**
     This is auto generated code by grunt plugin.
     Please do not manually edit this code.
     */
    var moduleName = "jaffa-lazyload";
    var providerName = "jaffaLazyload";
    var module = angular.module(moduleName, moduleDependencies);
    module.provider(providerName, providerDependencies.concat([providerFunction]));
}()); //end of function
