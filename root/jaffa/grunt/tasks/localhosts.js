module.exports = function (grunt, options) {
    var utils = require("./utils");
    var hostname = "localhost.aarnamsoftwares.com";


    return {
        set: {
            options: {
                rules: [{
                    ip: '127.0.0.1',
                    hostname: hostname,
                    type: 'set'
                }]
            }
        }
    };
};
