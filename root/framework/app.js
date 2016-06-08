/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Gaurang Dave
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

//DO NOT EDIT THIS FILE.
define(
    [
        "routeResolver",
        "angular_material",
        "bootstrap",
        "underscore",
        "/services/utils.js",
        "/directives/jaffa-navigation/jaffa-navigation.js"
    ],
    function () {
        "use strict";

        var appName = "jaffaApp";
        var configFile = "/framework/app.config.json";
        var dataType = "json";
        var controllerName = "AppController";

        var app = angular.module(appName, ["ngRoute", "routeResolverServices","ngMaterial","utils","jaffaNavigationModule"]);

        angular.element(document).ready(function () {

            function successFunction(configData){

                require.config(configData.requiredConfigs);

                require(["app"], function () {
                    app.config(["$routeProvider", "routeResolverProvider",function  ($routeProvider, routeResolver) {

                        var route = routeResolver.route;

                        configData.routes.forEach(function(routeModule,index,array){
                            $routeProvider.when(routeModule.url,route.resolve(routeModule));
                            if(index === 0 || routeModule.isDefault === true){
                                $routeProvider.otherwise({redirectTo:routeModule.url});
                            }
                        });
                    }]);
                    angular.bootstrap(document, ["jaffaApp"]);
                });
            }


            var payload = {
                url:configFile,
                dataType:dataType,
                success:function (data) {
                    successFunction(data);
                }
            };

            $.ajax(payload);


        });


        app.directive("myClick", function () {
            return function (scope, element, attrs) {
                element.bind("touchstart click", function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    //var functionCall = attrs["myclick"];
                    scope.$apply(attrs.myclick);
                });
            };
        });

        var controllerDependencies = ["$scope", "$location", "$log"];
        var controllerFunction = function ($scope, $location, $log) {
            //app controller. No custom app code so go here. This file might change during framework upgrade
        };

        app.controller(controllerName,controllerDependencies.concat(controllerFunction)); //end of controller

    });
