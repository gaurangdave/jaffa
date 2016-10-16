/**
 * Created by gaurangdave on 9/14/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);

    return {

        app: {
            files: [{
                expand: true,
                compass: true,
                noCache: true,
                trace: true,
                cwd: 'app',
                src: ['**/*.scss'],
                dest: 'app/',
                ext: '.style.css'
            }]
        },
        core: {
            files: [{
                expand: true,
                compass: true,
                noCache: true,
                trace: true,
                cwd: appData.jaffaRoot,
                src: ['**/*.scss'],
                dest: appData.jaffaRoot,
                ext: '.style.css'
            }]
        }
    };
};
