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

"use strict";

define([],function () {

    var servicesApp = angular.module("routeResolverServices",[]);

    var dependencies = ["$controllerProvider","$compileProvider","$filterProvider","$provide","$injector","$routeProvider"];
    var routeResolver = function ($controllerProvider, $compileProvider, $filterProvider, $provide, $injector, $routeProvider) {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
                var modulesDirectory = "/modules/",

                setModuleDirectory = function (modDir) {
                  modulesDirectory = modDir;
                },

                getModuleDirectory = function(){
                    return modulesDirectory;
                };

            return {
                setModuleDirectory:setModuleDirectory,
                getModuleDirectory:getModuleDirectory
            };
        }();

        this.route = function (routeConfig) {

            var navigationViews =[];
            var getNavigationViews = function(){
                return navigationViews;
            }
          //Begin Module Loading code
          //ToDo Move this to a separate sevice;
            var providers = {
                 $compileProvider: $compileProvider,
                 $controllerProvider: $controllerProvider,
                 $filterProvider: $filterProvider,
                 $provide: $provide
             };

            var registerModule = function (moduleToLoad) {
                  var moduleName = moduleToLoad.moduleName || moduleToLoad;
                  var module = angular.module(moduleName);

                  if (module.requires) {
                      for (var i = 0; i < module.requires.length; i++) {
                          registerModule(module.requires[i]);
                      }
                  }

                  angular.forEach(module._invokeQueue, function(invokeArgs) {
                      var provider = providers[invokeArgs[0]];
                      provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                  });

                  angular.forEach(module._configBlocks, function (fn) {
                      $injector.invoke(fn);
                  });

                  angular.forEach(module._runBlocks, function (fn) {
                      $injector.invoke(fn);
                  });

                  if (moduleToLoad.requirejsConfig) {
                        require.config(viewConfig.requirejsConfig);
                  }

              };

              var toTitleCase = function (str){
                  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
              };

            //end module loading code
            var resolve = function (moduleToLoad, path, controllerAs, secure) {
                    if (!path) path = "";

                    var routeDef = {};

                    var baseFolderName = routeConfig.getModuleDirectory() + moduleToLoad.dir + "/";

                    if (controllerAs) routeDef.controllerAs = controllerAs;
                    routeDef.templateUrl = baseFolderName + moduleToLoad.template;

                    var combinedDependencies = [];

                    for(var i = 0;i < moduleToLoad.jsDependencies.length;i++){
                        moduleToLoad.jsDependencies[i] = baseFolderName + moduleToLoad.jsDependencies[i] + ".js";
                    }

                    for(var i = 0;i < moduleToLoad.cssDependencies.length;i++){
                        moduleToLoad.cssDependencies[i] = "css!" + baseFolderName + moduleToLoad.cssDependencies[i];
                    }

                    if(moduleToLoad.isEnabledOnNavBar){
                        navigationViews.push({name:moduleToLoad.displayName,url:moduleToLoad.url})
                    }

                    routeDef.secure = (secure) ? secure : false;
                    routeDef.resolve = {
                        load: ["$q", "$rootScope", function ($q, $rootScope) {

                            return resolveDependencies($q, $rootScope, moduleToLoad);
                        }]
                    };

                    return routeDef;
                },

                resolveDependencies = function ($q, $rootScope, moduleToLoad) {
                    var defer = $q.defer();
                    var requiredModule = moduleToLoad;

                    require(requiredModule.jsDependencies.concat(requiredModule.cssDependencies), function () {
                        registerModule(moduleToLoad);
                        defer.resolve();
                        $rootScope.$apply()
                    });

                    return defer.promise;
                };

            return {
                resolve: resolve,
                getNavigationViews:getNavigationViews
            }
        }(this.routeConfig);

    };

    //Must be a provider since it will be injected into module.config()
    servicesApp.provider("routeResolver", dependencies.concat([routeResolver]));

});
