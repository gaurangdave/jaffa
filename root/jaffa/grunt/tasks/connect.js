module.exports = function (grunt, options) {

    var rewrite = require('connect-modrewrite');
    var utils = require("./utils");
    var _ = require("underscore");
    var appData = utils.getAppData(grunt);
    var hostname = appData.domain;
    var devBuildConfig = utils.getBuildConfig(grunt, utils.environments.dev);
    var qaBuildConfig = utils.getBuildConfig(grunt, utils.environments.qa);
    var prodBuildConfig = utils.getBuildConfig(grunt, utils.environments.prod);
    var serverData = utils.getServerData(grunt);

    //flags for server setup
    var keepAlive = true; //should always be true to run localhost.

    var request = require('request');

    //array to hold supported methods.
    var supportedMethods = [];

    //array hold API Urls from server.
    var apiEndPoints = [];

    function isApiUrl(currUrl) {

        for (var i = 0; i < apiEndPoints.length; i++) {
            if (currUrl.includes(apiEndPoints[i])) {
                return true;
            }
        }

        return false;
    }

    function isValidServerConfig(configObj) {

        return utils.isValidObject(configObj)
            && configObj.url
            && configObj.url.trim().length > 0
            && configObj["apiEndPoints"]
            && _.isArray(configObj["apiEndPoints"])
            && configObj["apiEndPoints"].length > 0;
    }

    //enableAPI function to pipe API calls from localhost to api servers.
    function enableApi(req, res, next) {

        var currentServer = utils.getCurrentServer(grunt);
        //if no server data is defined just return.
        //case where its a pure static web app.
        if(!isValidServerConfig(currentServer)){
            console.log("Not piping request...");
            return next();
        }

        apiEndPoints = currentServer["apiEndPoints"];
        supportedMethods = currentServer["supportedMethods"];

        var requestData = null;

        var server = currentServer.url;

        req.setEncoding('utf8');
        req.on("data", function(data) {
            requestData = data;
            console.log("DATA ====> ", requestData);
        });


        if (supportedMethods.indexOf(req.method) != -1 || isApiUrl(req.url)) {
            var url = server + req.url;
            console.log(req.method + " ====> ", url);
            if (requestData) {
                console.log("DATA ====> ", requestData);
            }

            if (req.method === "POST") {
                req.pipe(request.post(url)).pipe(res);
            }
            else if (req.method === "PUT") {
                req.pipe(request.put(url)).pipe(res);
            }
            else if (req.method === "DELETE") {
                req.pipe(request.delete(url)).pipe(res);
            } else {
                req.pipe(request(url)).pipe(res);
            }

        }
        else {
            return next();
        }
    }

    //middlewareFunction to redirect users and to pipe api requests to remote servers.
    function middlewareFunction (connect, options, middleware) {
        var fileRedirect = '/*/(.*) /$1';
        var indexRedirect = '/index.html';

        // the rules that shape our mod-rewrite behavior
        var rules = [
            fileRedirect,
            '!\\.html|\\.js|\\.map|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ ' + indexRedirect
        ];

        // add rewrite as first item in the chain of middlewares
        middleware.unshift(rewrite(rules));
        middleware.unshift(enableApi);
        return middleware;
    }


    return {
        server: {
            options: {
                port: "<%= server.port %>",
                keepalive: keepAlive,
                debug: "<%= server.debug %>",
                hostname: "<%= server.hostname %>",
                open:"<%= server.openBrowser %>",
                useAvailablePort: "<%= server.userAvailablePort %>",
                base: {
                    path: '.',
                    options: {
                        maxAge: 1000
                    }
                },
                middleware: middlewareFunction
            }
        }
    };

};
