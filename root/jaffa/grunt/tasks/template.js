/**
 * Created by gaurangdave on 8/25/16.
 */

module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var templateRoot = appData.jaffaRoot + "/grunt/templates/";


    return {
        "controller": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "controller": "<%= controller.name %>"
                }
            },
            "files": {
                "<%= controller.jsFileName %>": [templateRoot + "jaffa.controller.tmpl"],
                "<%= controller.specFileName %>": [templateRoot + "jaffa.controller.spec.tmpl"],
                "<%= controller.htmlFileName %>": [templateRoot + "jaffa.controller.view.tmpl"],
                "<%= controller.cssFileName %>": [templateRoot + "jaffa.scss.tmpl"]
            }
        },
        "append-controller": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "controller": "<%= controller.name %>"
                }
            },
            "files": {
                "<%= controller.jsFileName %>": [templateRoot + "jaffa.append.controller.tmpl"],
                "<%= controller.specFileName %>": [templateRoot + "jaffa.controller.spec.tmpl"],
                "<%= controller.htmlFileName %>": [templateRoot + "jaffa.controller.view.tmpl"],
                "<%= controller.cssFileName %>": [templateRoot + "jaffa.scss.tmpl"]
            }
        },
        "service": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "service": "<%= service.name %>"
                }
            },
            "files": {
                "<%= service.jsFileName %>": [templateRoot + "jaffa.service.tmpl"],
                "<%= service.specFileName %>": [templateRoot + "jaffa.service.spec.tmpl"]
            }
        },
        "append-service": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "service": "<%= service.name %>"
                }
            },
            "files": {
                "<%= service.jsFileName %>": [templateRoot + "jaffa.append.service.tmpl"],
                "<%= service.specFileName %>": [templateRoot + "jaffa.service.spec.tmpl"]
            }
        },
        "provider": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "provider": "<%= provider.name %>"
                }
            },
            "files": {
                "<%= provider.jsFileName %>": [templateRoot + "jaffa.provider.tmpl"],
                "<%= service.specFileName %>": [templateRoot + "jaffa.provider.spec.tmpl"]
            }
        },
        "append-provider": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "provider": "<%= provider.name %>"
                }
            },
            "files": {
                "<%= provider.jsFileName %>": [templateRoot + "jaffa.append.provider.tmpl"],
                "<%= service.specFileName %>": [templateRoot + "jaffa.provider.spec.tmpl"]
            }
        },
        "model": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "model": "<%= model.name %>"
                }
            },
            "files": {
                "<%= model.jsFileName %>": [templateRoot + "jaffa.model.tmpl"],
                "<%= model.specFileName %>": [templateRoot + "jaffa.model.spec.tmpl"]
            }
        },
        "append-model": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "model": "<%= model.name %>"
                }
            },
            "files": {
                "<%= model.jsFileName %>": [templateRoot + "jaffa.append.model.tmpl"],
                "<%= model.specFileName %>": [templateRoot + "jaffa.model.spec.tmpl"]
            }
        },
        "directive": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "directive": "<%= directive.name %>",
                    "controller": "<%= directive.controller %>",
                    "view": "<%= directive.htmlFileName %>"
                }
            },
            "files": {
                "<%= directive.jsFileName %>": [templateRoot + "jaffa.directive.tmpl"],
                "<%= directive.specFileName %>": [templateRoot + "jaffa.directive.spec.tmpl"],
                "<%= directive.htmlFileName %>": [templateRoot + "jaffa.directive.view.tmpl"],
                "<%= directive.cssFileName %>": [templateRoot + "jaffa.scss.tmpl"]
            }
        },
        "append-directive": {
            "options": {
                "data": {
                    "module": "<%= module.name %>",
                    "directive": "<%= directive.name %>",
                    "controller": "<%= directive.controller %>",
                    "view": "<%= directive.htmlFileName %>"
                }
            },
            "files": {
                "<%= directive.jsFileName %>": [templateRoot + "jaffa.append.directive.tmpl"],
                "<%= directive.specFileName %>": [templateRoot + "jaffa.directive.spec.tmpl"],
                "<%= directive.htmlFileName %>": [templateRoot + "jaffa.directive.view.tmpl"],
                "<%= directive.cssFileName %>": [templateRoot + "jaffa.scss.tmpl"]
            }
        },
        "app-config":{
            "options":{
                "data":{
                    "paths":"<%= rjs_config.paths %>",
                    "shim":"<%= rjs_config.shim %>",
                    "appName":"<%= rjs_config.appName %>",
                    "cssPath":"<%= rjs_config.cssPath %>"
                }
            },
            "files":{
                "<%= rjs_config.jsFileName %>":[templateRoot + "jaffa.config.tmpl"]
            }
        },
        "build-config":{
            "options":{
                "data":{
                    "paths":"<%= rjs_config.paths %>",
                    "shim":"<%= rjs_config.shim %>",
                    "appName":"<%= rjs_config.appName %>"
                }
            },
            "files":{
                "<%= rjs_config.jsFileName %>":[templateRoot + "jaffa.build.config.tmpl"]
            }
        }

    };
};

