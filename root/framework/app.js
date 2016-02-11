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

define(['routeResolver',
        'angular_material',
        'bootstrap'],
    function () {
        'use strict';

        var app = angular.module("app", ['ngRoute', 'routeResolverServices', 'ngMaterial']);


        app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider,
                $compileProvider, $filterProvider, $provide) {

                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };


                var route = routeResolverProvider.route;

                var modules = {
                    'appone': {
                        'name': 'appone',
                        'js': ['appone'],
                        'css': ['appone']
                    },
                    'apptwo': {
                        'name': 'apptwo',
                        'js': ['apptwo'],
                        'css': ['apptwo']
                    },
                    'appthree': {
                        'name': 'appthree',
                        'js': ['appthree'],
                        'css': ['appthree']
                    }
                };



                $routeProvider.
                when('/appone', route.resolve(modules['appone'])).
                when('/apptwo', route.resolve(modules['apptwo'])).
                when('/appthree', route.resolve(modules['appthree'])).
                otherwise({
                    redirectTo: '/appone'
                });
        }]);


        app.directive('myClick', function () {

            return function (scope, element, attrs) {

                element.bind('touchstart click', function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    //var functionCall = attrs['myclick'];
                    scope.$apply(attrs['myclick']);
                });
            };
        });

        var MainAppController = function ($scope, $location, $window) {

            $scope.init = function () {
                alert("controller init function called");
            };

            $scope.linkClicked = function (linkAddress) {
                $location.path("/" + linkAddress);
            };

        };

        app.controller('AppController', ['$scope', '$location', '$window', MainAppController]); //end of controller

        //return app;

    });
