/**
 * Created by gaurang on 11/15/15.
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
