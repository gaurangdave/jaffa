/**
 * Created by gaurangdave on 8/28/16.
 */


define([
    "angular-route",
    "angular-ui-router",
    "jaffa-config",
    "jaffa-lazyload"
], function () {


    var moduleDependencies = ["ngRoute", "ui.router", "jaffa-config", "jaffa-lazyload"];
    var controllerDependencies = ["$scope", "$log"];
    var configDependencies = ["$routeProvider", "$stateProvider", "$urlRouterProvider", "$httpProvider", "$locationProvider", "jaffaConfigProvider", "jaffaLazyloadProvider"];


    var configFunction = function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, jaffaConfigProvider, jaffaLazyloadProvider) {

        /**
         * Config and Environment settings for jaffa framework
         */
        jaffaConfigProvider.setEnvironment(jaffaConfigProvider.DEV);

        /**
         * Route Provider
         */
        $stateProvider
            .state("app", {
                url: "/",
                views: {
                    'header': {
                        templateUrl: '/app/modules/header/header.view.html',
                        controller: "HeaderController",
                        resolve: jaffaLazyloadProvider.resolve("header", "header")
                    },
                    'content': {
                        templateUrl: '/app/modules/home/home.view.html',
                        controller: "Home",
                        resolve: jaffaLazyloadProvider.resolve("home", "home")
                    },
                    'footer': {
                        templateUrl: '/app/modules/footer/footer.view.html'
                    }
                }

            });


        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

    };

    var controllerFunction = function ($scope, $log) {
        //scope variables
        $scope.message = "This is module " + moduleName;

        //private variables;
        var initMessage = "Initializing " + controllerName + " controller";

        //scope functions
        //function called when controller is initialized
        $scope.initialize = function () {
            $log.info(initMessage);
        };

        //private functions
    };

    var moduleName = "{%= name %}";
    var controllerName = "AppController";
    var module = angular.module(moduleName, moduleDependencies);

    module.config(configDependencies.concat([configFunction]));

    module.controller(controllerName, controllerDependencies.concat([controllerFunction]));


});
