/**
 * Created by gaurangdave on 8/31/16.
 */

module.exports = function (grunt, options) {

    return {
        "git-clone": {
            "options": {
                repository: '<%= cloneConfig.repository %>',
                directory: '<%= cloneConfig.directory %>',
                branch: '<%= cloneConfig.branch %>'
            }
        }
    };
};
