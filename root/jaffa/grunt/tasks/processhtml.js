/**
 * Created by gaurangdave on 12/22/16.
 */
module.exports = function (grunt) {

    //TODO add config for build details in index.html
    return {
        "combined":{
            "options":{},
            "files":"<%= processHTMLConfig %>"
        }
    };
};
