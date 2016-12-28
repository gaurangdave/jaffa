/**
 * Created by gaurangdave on 12/12/16.
 */

module.exports = function (grunt) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var optionsMapping = {
        "-open":"open",
        "-port":"port",
        "-build":"path"
    };

    //flags for server setup
    var openBrowser = true; //open browser after server starts.
    var debug = true; //flag to show debug messages
    var useAvailablePort = true; //use new port if 9000 is not available.
    var port = 9000; //default port for the server.

    var server = {
            port: port,
            debug: debug,
            open:openBrowser,
            useAvailablePort: useAvailablePort,
            path:".",
            env:"dev"
    };

    grunt.registerTask("server",function(environment) {
        var args = process.argv;
        if(!environment){
            environment = utils.environments.dev;
        }

        if(args.length > 3){
            setServerOptions(args);
        }

        console.log("Running server on " + environment + "...");
        server.env = environment;

        /**
         * if path is dev,qa, or prod user is requesting to serve files from build folder. so change the path accordingly.
         */
        if(server.path === utils.environments.dev || server.path === utils.environments.qa || server.path === utils.environments.prod){
            var buildConfig = utils.getBuildConfig(grunt,server.path);
            server.path = buildConfig.baseFolder;
        }

        grunt.config.set("server",server);
        grunt.task.run("connect:server");

        return {};
    });
    
    function setServerOptions(options) {
        for(var i=3;i<options.length;i++){
            var optionSplit = options[i].split("=");
            if(optionsMapping[optionSplit[0]]){
                var op = optionsMapping[optionSplit[0]];
                server[op] = optionSplit[1];
            }
            else{
                console.warn("Avoiding option " + optionSplit[0] );
            }
        }
    }


    return {}
};

