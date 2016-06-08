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

//UPDATE THIS DIRECTIVE TO CHANGE NAVIGATION MENU FOR THE APP

define([
    "routeResolver",
    "angular_material"
],function(){

    var moduleName = "jaffaNavigationModule";
    var controllerName = "jaffaNavigationController";
    var directiveName = "jaffaNavigation";
    var templateUrl = "/directives/jaffa-navigation/" + "jaffa-navigation" + ".html";
    var restriction = "E"; //"AECM" - restricting to element by default
    var transclude = false;

    var module = angular.module(moduleName,["routeResolverServices","ngMaterial"]);

    var controllerDependencies = ["$scope", "$log","$location", "$window","routeResolver","StringUtil"];
    var controllerFunction = function($scope,$log,$location, $window,routeResolverProvider,StringUtil){
        $log.debug("this is controller function for " + directiveName);

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

    var linkFunction = function(scope,element,attrs,controllers){
        console.log("this is link function for " + directiveName,controllers,scope);
    };

    module.controller(controllerName,controllerDependencies.concat(controllerFunction));
    module.directive(directiveName,function(){

        return {
            restrict:restriction,
            templateUrl:templateUrl,
            scope:{},
            transclude:transclude,
            link:linkFunction,
            controller:controllerName
        }


    });

}());