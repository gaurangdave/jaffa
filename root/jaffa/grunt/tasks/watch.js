/**
 * Created by gaurangdave on 9/14/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);


    return {

        app: {
            files: ['app/**/*.scss'],
            tasks: ['sass:app', 'postcss:app'],
            options: {
                spawn: false
            }
        },
        core: {
            files: [appData.jaffaRoot + '**/*.scss'],
            tasks: ['sass:core', 'postcss:core'],
            options: {
                spawn: false
            }
        },
        all: {
            files: ['app/**/*.scss', appData.jaffaRoot + '**/*.scss'],
            tasks: ['sass:app', 'postcss:app', 'sass:core', 'postcss:core'],
            options: {
                spawn: false
            }
        }
    };
};
