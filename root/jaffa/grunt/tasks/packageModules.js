/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {


    return {
        "dev": {
            "src": "package.json",
            "dest": "./build/dev/tmp/modules/"
        },
        "qa": {
            "src": "package.json",
            "dest": "./build/qa/tmp/modules/"
        },
        "prod": {
            "src": "package.json",
            "dest": "./build/prod/tmp/modules/"
        }
    }
};
