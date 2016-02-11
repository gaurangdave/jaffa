/**
 * Created by gaurang on 11/21/15.
 */
define(["utils"],function(){

    var apiServiceModule = angular.module('app');

    apiServiceModule.register.service('apiService', ['$rootScope','$q','$log','$window','StringUtil',function($rootScope,$q,$log,$window,StringUtil){


        $window.googleIDELoaded = function(){
            initApi();
        };

        var apisLoaded = false; //flag to check if all google apis are loaded or not.
        var CLIENT_ID = "";//only need this to test prod api from local host;
        var SCOPES = "";//only need this to test prod api from local host;
        var apiUrl = '//' + window.location.host + '/_ah/api';
        var loadApiDeferObj = null;


        //define apis to load here.
        var apisToLoad = [
            {name:"helloworld",version:"v1"},
            {name:"addressBookApi",version:"v1"}
        ];

        function setClientId(clientID){
            CLIENT_ID = clientID;
        }

        function getClientId(){
            return CLIENT_ID;
        }

        function setScopes(scopes){
            SCOPES = scopes;
        }

        function getScopes(){
            return SCOPES;
        }

        function setApis(apiArray){
            apisToLoad = apiArray;
        }

        function initApi(){

            var callback = function() {
                if (--totalApis == 0) {
                    apisLoaded=true;
                    $rootScope.$broadcast("google-apis-loaded",{});
                    loadApiDeferObj.resolve();
                }
            };

            var totalApis = apisToLoad.length; // must match number of calls to gapi.client.load()

            angular.forEach(apisToLoad,function(api){
                gapi.client.load(api.name, api.version, callback, apiUrl);
            });
        }

        function isApisLoaded(){
            return apisLoaded;
        }


        function addTestData(count){}

        function getAllContacts(){
            var deferObj = $q.defer();
            gapi.client.addressBookApi.getAllContacts({'id':0}).execute(function(data){
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

        function loadApis(){
            loadApiDeferObj = $q.defer();

            if(isApisLoaded()){
                loadApiDeferObj.resolve();
            }
            else{
                require(["cloudEndPointApi"],function(){$log.debug("Client API Loaded");});
            }
            return loadApiDeferObj.promise;
        }


        var addressBookAPI = {
            isApisLoaded:isApisLoaded,
            addTestData:addTestData,
            getAllContacts:getAllContacts,
            saveContact:saveContact
        };


        return {
            init:initApi,
            isApisLoaded:isApisLoaded,
            addressBookAPI:addressBookAPI,
            setClientId:setClientId,
            getClientId:getClientId,
            setScopes:setScopes,
            getScopes:getScopes,
            loadApis:loadApis
        };


    }]);//end of controller

}());//end of function