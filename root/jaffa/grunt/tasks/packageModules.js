/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    return {
        "lazyload": {
            "src": "package.json",
            "dest": utils.getTmpFolder() + "modules/"
        },
        "update":{
            "src": "package.json",
            "dest": "."
        }
    }
};
