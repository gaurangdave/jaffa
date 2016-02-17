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
        "underscore",
        "/services/utils.js"
    ],
    function () {
        "use strict";

        var app = angular.module("jaffaApp", ["ngRoute", "routeResolverServices","ngMaterial","utils"]);


        app.config(["$routeProvider", "routeResolverProvider", "$controllerProvider",
        "$compileProvider", "$filterProvider", "$provide",
        function ($routeProvider, routeResolverProvider, $controllerProvider,$compileProvider, $filterProvider, $provide) {

                var route = routeResolverProvider.route;

                var jaffa = {};
                jaffa.routes = [];
                jaffa.routes = [
                  {
                    displayName:"First Application",
                    moduleName:"appone",
                    dir:"appone",
                    jsDependencies:["appone"],
                    cssDependencies:["appone"],
                    url:"/appone",
                    template:"appone.html",
                    isEnabledOnNavBar:true,
                    isDefault:true
                  },
                  {
                    displayName:"Second Application",
                    moduleName:"apptwo",
                    dir:"apptwo",
                    jsDependencies:["apptwo"],
                    cssDependencies:["apptwo"],
                    url:"/apptwo",
                    template:"apptwo.html",
                    isEnabledOnNavBar:true
                  },
                  {
                    displayName:"Third Application",
                    moduleName:"appthree",
                    dir:"appthree",
                    jsDependencies:["appthree"],
                    cssDependencies:["appthree"],
                    url:"/appthree",
                    template:"appthree.html",
                    isEnabledOnNavBar:true
                  }
                ];


                angular.forEach(jaffa.routes,function(routeModule){
                    $routeProvider.when(routeModule.url,route.resolve(routeModule));
                    if(routeModule.isDefault){
                        $routeProvider.otherwise({redirectTo:routeModule.url})
                    }
                });
        }]);


        app.directive("myClick", function () {

            return function (scope, element, attrs) {

                element.bind("touchstart click", function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    //var functionCall = attrs["myclick"];
                    scope.$apply(attrs["myclick"]);
                });
            };
        });

        var MainAppController = function ($scope, $location, $window,routeResolverProvider,StringUtil) {

            var currentUrl = $location.path();

            //get list of nav elements from route resolver
            $scope.navElements = routeResolverProvider.route.getNavigationViews();

            //default selected tab is first tab
            $scope.selectedTabIndex = 0;


            //updated default selected tab based on URL.
            if(!StringUtil.isNullOrEmpty(currentUrl) > 0){
              $scope.selectedTabIndex = _.indexOf($scope.navElements,_.findWhere($scope.navElements,{url:currentUrl}));
            }


            //function to trigger different view.
            $scope.linkClicked = function (linkAddress) {
                $location.path(linkAddress);
            };


        };

        app.controller("AppController", ["$scope", "$location", "$window","routeResolver","StringUtil", MainAppController]); //end of controller

        //return app;

    });
