module.exports = function (grunt, options) {

    var rewrite = require('connect-modrewrite');
    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var hostname = "localhost." + appData.domain;
    var devBuildConfig = utils.getBuildConfig(grunt, utils.builds.dev);
    var qaBuildConfig = utils.getBuildConfig(grunt, utils.builds.qa);
    var prodBuildConfig = utils.getBuildConfig(grunt, utils.builds.prod);

    // var middlewareFunction = function (connect, options, middleware) {
    //
    //
    //     var fileRedirect = '/*/(.*) /' + appData.name + '/$1';
    //     var indexRedirect = '/' + appData.name + '/index.html';
    //
    //     // the rules that shape our mod-rewrite behavior
    //     var rules = [
    //         fileRedirect,
    //         '!\\.html|\\.js|\\.map|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ ' + indexRedirect
    //     ];
    //
    //     // add rewrite as first item in the chain of middlewares
    //     middleware.unshift(rewrite(rules));
    //
    //     return middleware;
    // };

    var middlewareFunction = function (connect, options, middleware) {


        var fileRedirect = '/*/(.*) /$1';
        var indexRedirect = '/index.html';

        // the rules that shape our mod-rewrite behavior
        var rules = [
            fileRedirect,
            '!\\.html|\\.js|\\.map|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ ' + indexRedirect
        ];

        // add rewrite as first item in the chain of middlewares
        middleware.unshift(rewrite(rules));

        return middleware;
    };


    return {
        server: {
            options: {
                port: 9000,
                keepalive: true,
                debug: true,
                hostname: hostname,
                useAvailablePort: true,
                base: {
                    path: '.',
                    options: {
                        maxAge: 1000
                    }
                },
                middleware: middlewareFunction
            }
        },
        dev: {
            options: {
                port: 9000,
                keepalive: true,
                debug: true,
                hostname: hostname,
                useAvailablePort: true,
                base: {
                    path: devBuildConfig.buildLocation,
                    options: {
                        maxAge: 1000
                    }
                },
                middleware: middlewareFunction
            }
        },
        qa: {
            options: {
                port: 9000,
                keepalive: true,
                debug: true,
                hostname: hostname,
                useAvailablePort: true,
                base: {
                    path: qaBuildConfig.buildLocation,
                    options: {
                        maxAge: 1000
                    }
                },
                middleware: middlewareFunction
            }
        },
        prod: {
            options: {
                port: 9000,
                keepalive: true,
                debug: true,
                hostname: hostname,
                useAvailablePort: true,
                base: {
                    path: prodBuildConfig.buildLocation,
                    options: {
                        maxAge: 1000
                    }
                },
                middleware: middlewareFunction
            }
        }
    };

};
