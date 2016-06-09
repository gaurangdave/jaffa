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

define(
    [
        "routeResolver",
        "angular_material",
        "bootstrap",
        "oc_lazyload"
    ],
    function() {
        "use strict";

        var appName = "jaffaApp";
        var configFile = "/framework/app.config.json";
        var dataType = "json";


        //manually loading dependencies after user config is setup.
        //this is a temp hack - need to figure out a cleaner way to do this.
        var appDependencies = ["css!../modules/common/style/common.css", "jaffa-navigation"];


        angular.element(document).ready(function() {

            function successFunction(configData) {

                //dynamically configure all user requirejs configs.
                require.config(configData.requiredConfigs);
                require(appDependencies, function() {

                    var app = angular.module(appName, ["ngRoute", "routeResolverServices", "ngMaterial", "utils", "jaffaNavigationModule"]);
                    app.config(["$routeProvider", "routeResolverProvider", function($routeProvider, routeResolver) {

                        var route = routeResolver.route;

                        configData.routes.forEach(function(routeModule, index, array) {
                            $routeProvider.when(routeModule.url, route.resolve(routeModule));
                            if (index === 0 || routeModule.isDefault === true) {
                                $routeProvider.otherwise({
                                    redirectTo: routeModule.url
                                });
                            }
                        });
                    }]);

                    angular.bootstrap(document, ["jaffaApp"]);
                });
            }


            var payload = {
                url: configFile,
                dataType: dataType,
                success: function(data) {
                    successFunction(data);
                }
            };

            $.ajax(payload);
        });
    });
