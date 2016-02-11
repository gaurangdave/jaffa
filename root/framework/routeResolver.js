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

'use strict';

define(function () {

    var routeResolver = function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '/views/',
                controllersDirectory = '/js/controllers/',
                modulesDirectory = '/modules/',

                setBaseDirectories = function (viewsDir, controllersDir) {
                    viewsDirectory = viewsDir;
                    controllersDirectory = controllersDir;
                },

                getViewsDirectory = function () {
                    return viewsDirectory;
                },

                getControllersDirectory = function () {
                    return controllersDirectory;
                },

                getModulesDirectory = function(){
                    return modulesDirectory;
                };


            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory,
                getModulesDirectory:getModulesDirectory
            };
        }();

        this.route = function (routeConfig) {

            var resolve = function (baseName, path, controllerAs, secure) {
                    if (!path) path = '';

                    var routeDef = {};
                    //var baseFileName = baseName.charAt(0).toLowerCase() + baseName.substr(1);

                    var baseFolderName = routeConfig.getModulesDirectory() + baseName.name + '/';
                    var baseFileName = baseName.name;


                    //routeDef.controller = baseName + 'Controller';
                    if (controllerAs) routeDef.controllerAs = controllerAs;
                    //routeDef.templateUrl = routeConfig.getViewsDirectory() + path + baseFileName + '.html';
                    routeDef.templateUrl = baseFolderName + baseFileName + '.html';

                    var combinedDependencies = [];

                    baseName.js.forEach(function(jsFileName) {
                        combinedDependencies.push(baseFolderName + jsFileName + '.js')
                    });

                    baseName.css.forEach(function(cssFileName)
                    {
                        combinedDependencies.push('css!' + baseFolderName + cssFileName)
                    });

                    console.log(combinedDependencies);


                    routeDef.secure = (secure) ? secure : false;
                    routeDef.resolve = {
                        load: ['$q', '$rootScope', function ($q, $rootScope) {
                            //var dependencies = [routeConfig.getControllersDirectory() + path + baseFileName + '.js',
                            //                    'css!/static/css/tictactoe'];

                            //var dependencies = combinedDependencies;
                            return resolveDependencies($q, $rootScope, combinedDependencies);
                        }]
                    };

                    return routeDef;
                },

                resolveDependencies = function ($q, $rootScope, dependencies) {
                    var defer = $q.defer();
                    require(dependencies, function () {
                        defer.resolve();
                        $rootScope.$apply()
                    });

                    return defer.promise;
                };

            return {
                resolve: resolve
            }
        }(this.routeConfig);

    };

    var servicesApp = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('routeResolver', routeResolver);
});