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

define([],function () {

    var moduleName = "googleApi";
    var serviceName = "GoogleApi";

    var module = angular.module(moduleName,[]);


    var serviceFunction = function ($scope, $location) {

        var apisLoaded = false; //flag to check if all google apis are loaded or not.
        var CLIENT_ID = "";//only need this to test prod api from local host;
        var SCOPES = "";//only need this to test prod api from local host;
        var apiUrl = "//" + window.location.host + "/_ah/api";
        var loadApiDeferObj = null;

        //define apis to load here.
        var apisToLoad = [
            {name:"helloworld",version:"v1"},
            {name:"addressBookApi",version:"v1"}
        ];


        $window.googleIDELoaded = function(){
            initApi();
        };

        this.setClientId = function(clientID){
            CLIENT_ID = clientID;
        };

        this.getClientId = function(){
            return CLIENT_ID;
        };

        this.setScopes = function(scopes){
            SCOPES = scopes;
        };

        this.getScopes = function(){
            return SCOPES;
        };

        this.setApis = function(apiArray){
            apisToLoad = apiArray;
        };

        this.initApi = function(){

            var callback = function() {
                if (--totalApis === 0) {
                    apisLoaded=true;
                    $rootScope.$broadcast("google-apis-loaded",{});
                    loadApiDeferObj.resolve();
                }
            };

            var totalApis = apisToLoad.length; // must match number of calls to gapi.client.load()

            angular.forEach(apisToLoad,function(api){
                gapi.client.load(api.name, api.version, callback, apiUrl);
            });
        };

        this.isApisLoaded = function(){
            return apisLoaded;
        };

        this.loadApis = function(){
            loadApiDeferObj = $q.defer();

            if(isApisLoaded()){
                loadApiDeferObj.resolve();
            }
            else{
                require(["cloudEndPointApi"],function(){$log.debug("Client API Loaded");});
            }
            return loadApiDeferObj.promise;
        };


        //address book API function
        function addTestData(count){}

        function getAllContacts(){
            var deferObj = $q.defer();
            gapi.client.addressBookApi.getAllContacts({"id":0}).execute(function(data){
                deferObj.resolve(data);
            });

            return deferObj.promise;
        }

        function saveContact(contact){
            var deferObj = $q.defer();

            if(StringUtil.isNullOrEmpty(contact.id)){
                gapi.client.addressBookApi.createNewContact(contact).execute(function(data){
                    deferObj.resolve(data);
                });
            }
            else{
                gapi.client.addressBookApi.updateCurrentContact(contact).execute(function(data){
                    deferObj.resolve(data);
                });
            }

            return deferObj.promise;
        }

        this.addressBookAPI = {
            addTestData:addTestData,
            getAllContacts:getAllContacts,
            saveContact:saveContact
        };

    };

    var dependencies = ["$rootScope","$q","$log","$window","StringUtil"];
    module.service(serviceName, dependencies.concat([serviceFunction]));

}()); //end of function
