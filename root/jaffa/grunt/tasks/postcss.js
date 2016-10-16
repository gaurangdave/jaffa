/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);


    return {
        app: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 5 versions', 'not ie <= 9', '> 5% in CN']})
                ]
            },
            src: ['app/**/*.css']
        },
        core: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 5 versions', 'not ie <= 9', '> 5% in CN']})
                ]
            },
            src: [appData.jaffaRoot + '**/*.css']
        }
    };
};
