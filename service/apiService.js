/**
 * Created by gaurang on 11/21/15.
 */
define(["utils"], function () {

    var apiServiceModule = angular.module('app');

    apiServiceModule.register.service('apiService', ['$rootScope', '$q', '$log', '$window', 'StringUtil', function ($rootScope, $q, $log, $window, StringUtil) {


        $window.googleIDELoaded = function () {
            //initApi();
        };

        var apisLoaded = false;
        var CLIENT_ID = '';
        var SCOPES = 'https://www.googleapis.com/auth/userinfo.email';
        var apiUrl = '//' + window.location.host + '/_ah/api';

        var apisToLoad = [
            {
                name: "helloworld",
                version: "v1"
            },
            {
                name: "addressBookApi",
                version: "v1"
            }
        ];

        var initApi = function () {

            var callback = function () {
                if (--totalApis == 0) {
                    apisLoaded = true;
                    $rootScope.$broadcast("google-apis-loaded", {});
                }
            };

            var totalApis = apisToLoad.length; // must match number of calls to gapi.client.load()

            angular.forEach(apisToLoad, function (api) {
                gapi.client.load(api.name, api.version, callback, apiUrl);
            });
        };

        var isApisLoaded = function () {
            return apisLoaded;
        };


        var addTestData = function (count) {};

        var getAllContacts = function () {
            var deferObj = $q.defer();
            gapi.client.addressBookApi.getAllContacts({
                'id': 0
            }).execute(function (data) {
                deferObj.resolve(data);
            });

            return deferObj.promise;
        };

        var saveContact = function (contact) {
            var deferObj = $q.defer();

            if (StringUtil.isNullOrEmpty(contact.id)) {
                gapi.client.addressBookApi.createNewContact(contact).execute(function (data) {
                    deferObj.resolve(data);
                });
            } else {
                gapi.client.addressBookApi.updateCurrentContact(contact).execute(function (data) {
                    deferObj.resolve(data);
                });
            }

            return deferObj.promise;
        };

        var addressBookAPI = {
            isApisLoaded: isApisLoaded,
            addTestData: addTestData,
            getAllContacts: getAllContacts,
            saveContact: saveContact
        };

        require(["cloudEndPointApi"], function () {
            $log.debug("Client API Loaded");
        });

        return {
            init: initApi,
            isApisLoaded: isApisLoaded,
            addressBookAPI: addressBookAPI
        };


    }]); //end of controller

}()); //end of function
