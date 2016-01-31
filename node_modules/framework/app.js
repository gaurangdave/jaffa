/**
 * Created by gaurang on 11/15/15.
 */
define(['routeResolver','css!/static/node_modules/bootstrap/dist/css/bootstrap'],function(){
    'use strict';

    var app =  angular.module("app",['ngRoute','routeResolverServices']);


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
                'main':{'name':'main','js':['main'], 'css':['main']},
            };



            $routeProvider.
                when('/index', route.resolve(modules['main'])).
                otherwise({
                    redirectTo: '/index'
                });
        }]);


    app.directive('myClick', function() {

        return function(scope, element, attrs) {

            element.bind('touchstart click', function(event) {

                event.preventDefault();
                event.stopPropagation();

                //var functionCall = attrs['myclick'];
                scope.$apply(attrs['myclick']);
            });
        };
    });

    var MainAppController = function($scope,$location,$window){

        $scope.init=function(){
        };

        $scope.linkClicked = function(linkAddress){
            //alert(linkAddress);
            $location.path("/" + linkAddress);

        };

    };

    app.controller('AppController', ['$scope','$location','$window',MainAppController]);//end of controller

    //return app;

});
