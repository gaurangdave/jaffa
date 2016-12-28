/**
 * Created by gaurangdave on 12/12/16.
 */

module.exports = function (grunt) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var optionsMapping = {
        "-open":"open",
        "-port":"port"
    };

    //flags for server setup
    var openBrowser = false; //open browser after server starts.
    var debug = true; //flag to show debug messages
    var useAvailablePort = true; //use new port if 9000 is not available.
    var port = 9000; //default port for the server.
    var hostname = appData.domain || "localhost"; //default hostname

    var server = {
            port: port,
            debug: debug,
            hostname: hostname,
            open:openBrowser,
            useAvailablePort: useAvailablePort,
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
        grunt.config.set("server",server);
        grunt.task.run("localhosts",'connect:server');

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

