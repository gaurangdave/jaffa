/**
 * Created by gaurangdave on 8/24/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);


    return {
        'module': {
            'options': {
                'create': [appData.appRoot + 'modules/<%= createModule.name %>']
            }
        },
        'core-module': {
            'options': {
                'create': [appData.jaffaRoot + 'modules/<%= createModule.name %>']
            }
        },
        'app-service': {
            'options': {
                'create': [appData.appRoot + 'services/<%= createService.name %>']
            }
        },
        'core-service': {
            'options': {
                'create': [appData.jaffaRoot + 'services/<%= createService.name %>']
            }
        },
        'app-directive': {
            'options': {
                'create': [appData.appRoot + 'directives/<%= createDirective.name %>']
            }
        },
        'core-directive': {
            'options': {
                'create': [appData.jaffaRoot + 'directives/<%= createDirective.name %>']
            }
        },
        'app-provider': {
            'options': {
                'create': [appData.appRoot + 'providers/<%= createProvider.name %>']
            }
        },
        'core-provider': {
            'options': {
                'create': [appData.jaffaRoot + 'providers/<%= createProvider.name %>']
            }
        },
        'tmp': {
            'options': {
                'create': [appData.jaffaRoot + 'directives/<%= createDirective.name %>']
            }
        },
        'update': {
            'options': {
                'create': ['./jaffa/<%= updateDir %>']
            }
        },
        'create-core-version':{
            'options':{
                'create':['./jaffa/<%= core.version %>']
            }
        }
    };
};
