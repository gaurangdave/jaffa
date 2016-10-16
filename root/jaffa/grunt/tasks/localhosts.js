module.exports = function (grunt, options) {
    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var hostname = "localhost." + appData.domain;


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
