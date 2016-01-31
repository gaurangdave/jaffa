'use strict';

define(function () {

    var routeResolver = function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '/static/views/',
                controllersDirectory = '/static/js/controllers/',
                modulesDirectory = '/static/modules/',

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