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

define(["underscore"],function(){

    var utilServicesModule = angular.module("utils",[]);

    var dependencies = ["$rootScope","$q","$log"];
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


    utilServicesModule.service("StringUtil", dependencies.concat([StringUtil]));

}());//end of function
