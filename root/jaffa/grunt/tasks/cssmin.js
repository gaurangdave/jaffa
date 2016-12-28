/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    return {
        "lazyload": {
            "files": "<%= cssMinConfig %>"
        },
        "combined":{
            "options":{
                "sourceMap":true
            },
            "files":"<%= cssMinConfig %>"
        }
    }
};
