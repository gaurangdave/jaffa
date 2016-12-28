module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var versionIncrement = 0.1;

    return {
        "select_component": {
            "options": {
                "questions": [{
                    "config": "component",
                    "type": "list",
                    "message": "Please select component to create:",
                    "choices": function (answers) {
                        return Object.keys(utils.components);
                    },
                    "default": "controller",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "module": {
            "options": {
                "questions": [{
                    "config": "module.name",
                    "type": "input",
                    "message": "Enter the name for new module (no spaces,lower case,use ' - ')",
                    "default": "hello-world",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "controller": {
            "options": {
                "questions": [{
                    "config": "controller.name",
                    "type": "input",
                    "message": "Enter the name for new controller (e.g. HelloWorldController)",
                    "default": "HelloWorldController",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "service": {
            "options": {
                "questions": [{
                    "config": "service.name",
                    "type": "input",
                    "message": "Enter the name for new service (e.g. helloWorld)",
                    "default": "helloWorldService",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "directive": {
            "options": {
                "questions": [{
                    "config": "directive.name",
                    "type": "input",
                    "message": "Enter the name for new directive (no spaces,lower case,use ' - ',e.g. my-test-directive)",
                    "default": "my-test-directive",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "provider": {
            "options": {
                "questions": [{
                    "config": "provider.name",
                    "type": "input",
                    "message": "Enter the name for new provider (e.g. helloWorld)",
                    "default": "helloWorld",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "model": {
            "options": {
                "questions": [{
                    "config": "model.name",
                    "type": "input",
                    "message": "Enter the name for new model (e.g. User)",
                    "default": "DemoModel",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "edit": {
            "options": {
                "questions": [{
                    "config": "module.name",
                    "type": "list",
                    "message": "Please select module to edit",
                    "choices": function (answers) {
                        var _ = require("underscore");
                        var choices = [];
                        var context = grunt.config("context");

                        if (context === utils.context.app) {
                            choices = _.filter(Object.keys(utils.getAppModules(grunt)), function (key) {
                                return !key.includes(".");
                            });
                        }
                        else if (context === utils.context.core) {
                            choices = _.filter(Object.keys(utils.getCoreModules(grunt)), function (key) {
                                return !key.includes(".");
                            });
                        }

                        return choices;
                    },
                    "default": "my-new-provider",
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }]
            }
        },
        "build_version": {
            "options": {
                "questions": [{
                    "config": "build.version",
                    "type": "input",
                    "message": "Do you want to change the version number?",
                    "default": appData.version,
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }
                ]
            }
        },
        "build_optimization": {
            "options": {
                "questions": [{
                    "config": "build.optimization",
                    "type": "list",
                    "message": "Please select optimization type for the build.",
                    "default": utils.buildType.lazyload,
                    "choices":function (answer) {
                        var _ = require("underscore");
                        return _.values(utils.buildType);
                    },
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }
                ]
            }
        },
        "build_type": {
            "options": {
                "questions": [{
                    "config": "build.type",
                    "type": "list",
                    "message": "Please select build environment",
                    "default": utils.environments.dev,
                    "choices":function (answer) {
                        var _ = require("underscore");
                        return _.values(utils.environments);
                    },
                    "validate": function (value) {
                        return true;
                    },
                    "filter": function (value) {
                        return value;
                    }
                }
                ]
            }
        },
        "create-core-version":{
            "options":{
                "questions":[{
                    "config":"core.version",
                    "type":"input",
                    "message":"Please enter the new version number:",
                    "default":utils.incrementVersionNumber(appData.jaffa),//appData.jaffa,
                    "validate":function(value) {
                        return true;
                    },
                    "filter":function(value) {
                        return value;
                    }
                }
                ]
            }
        }
    };

};
