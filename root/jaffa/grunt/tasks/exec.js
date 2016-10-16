module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
//  var url = "jaffa." + appData.name + ".com:9000/" + appData.name;
    var url = "localhost.liveh2h.com:9000/" + appData.name;

    var chrome_insecure_incognito = 'open -a "Google Chrome" --args --disable-web-security --user-data-dir --incognito ' + url;
    var chrome_insecure = 'open -a "Google Chrome" --args --disable-web-security --user-data-dir ' + url;
    var chrome = 'open -a "Google Chrome" ' + url;
    var chrome_incognito = 'open -a "Google Chrome" --incognito' + url;


    return {
        chrome: {
            cmd: chrome_insecure
        },
        chrome_incognito: {
            cmd: chrome_incognito
        }
    };
};
