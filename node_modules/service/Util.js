/**
 * Created by gaurang on 11/27/15.
 */

define(["underscore"],function(){

    var utilServicesModule = angular.module('app');

    var StringUtil = function($rootScope,$q,$log){

        var isNullOrEmpty = function(str){
            return _.isUndefined(str) || _.isNull(str) || str.length==0 || str.trim().length == 0;
        };

        var isString = function(str){};

        var isNullOrUndefined = function(str){};


        return {
            isString:isString,
            isNullOrEmpty:isNullOrEmpty,
            isNullOrUndefined:isNullOrUndefined
        };

    };


    utilServicesModule.register.service('StringUtil', ['$rootScope','$q','$log',StringUtil]);



}());//end of function