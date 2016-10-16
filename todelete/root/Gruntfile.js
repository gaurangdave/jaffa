
module.exports = function(grunt) {

    var camelize = function(str) {
        return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    };

    var titlelize = function(str) {
        return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function($1) { return $1.toUpperCase(); });

    };
    //noinspection JSUnresolvedFunction
    grunt.initConfig({

        'http-server': {

            'dev': {

                // the server root directory
                // root: < path > ,

                // the server port
                // can also be written as a function, e.g.
                // port: function() { return 8282; }
                port: 8282,

                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "0.0.0.0",

                // cache: < sec > ,
                showDir: true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: false,

                // specify a logger function. By default the requests are
                // sent to stdout.
                logFn: function(req, res, error) {},

                // Proxies all requests which can't be resolved locally to the given url
                // Note this this will disable 'showDir'
                // proxy: "http://someurl.com",

                /// Use 'https: true' for default module SSL configuration
                /// (default state is disabled)
                // https: {
                //     cert: "cert.pem",
                //     key: "key.pem"
                // },

                // Tell grunt task to open the browser
                openBrowser: true

                // customize url to serve specific pages
                // customPages: {
                //     "/readme": "README.md",
                //     "/readme.html": "README.html"
                // }

            }

        },
        'autoprefixer': {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: ['modules/**/*.css','directives/**/*.css']
            }
        },
        'cssmin': {
            'target': {
                'files': [
                    {
                    'expand': true,
                    'cwd': 'modules/',
                    'src': ['**/*.css', '!*.min.css'],
                    'dest': 'build/modules/',
                    'ext': '.css'
                    },
                    {
                        'expand': true,
                        'cwd': 'directives/',
                        'src': ['**/*.css', '!*.min.css'],
                        'dest': 'build/directives/',
                        'ext': '.css'
                    }
                ]
            }
        },
        'uglify': {
            'modules': {
                'files': [{
                    'expand': true,
                    'cwd': 'modules/',
                    'src': '**/*.js',
                    'dest': 'build/modules/',
                    'ext': '.js'
                }]
            },
            'framework': {
                'files': [{
                    'expand': true,
                    'cwd': 'framework/',
                    'src': '**/*.js',
                    'dest': 'build/framework'
                }]
            },
            'models': {
                'files': [{
                    'expand': true,
                    'cwd': 'models/',
                    'src': '**/*.js',
                    'dest': 'build/models',
                    'ext': '.js'
                }]
            },
            'services': {
                'files': [{
                    'expand': true,
                    'cwd': 'services/',
                    'src': '**/*.js',
                    'dest': 'build/services',
                    'ext': '.js'
                }]
            },
            'directives': {
                'files': [{
                    'expand': true,
                    'cwd': 'directives/',
                    'src': '**/*.js',
                    'dest': 'build/directives',
                    'ext': '.js'
                }]
            }
        },
        'imagemin': {
            'dynamic': { // Another target
                'files': [{
                    'expand': true, // Enable dynamic expansion
                    'cwd': 'modules/', // Src matches are relative to this path
                    'src': ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    'dest': 'build/modules/' // Destination path prefix
                }]
            }
        },
        'copy': {
            'module_view': {
                'expand': true,
                'src': 'modules/**/*.html',
                'dest': 'build/'
            },
            'directive_view': {
                'expand': true,
                'src': 'directives/**/*.html',
                'dest': 'build/'
            },
            'index': {
                'expand': true,
                'src': 'index.html',
                'dest': 'build/'
            },
            'grunt': {
                'expand': true,
                'src': 'Gruntfile.js',
                'dest': 'build/'
            },
            'configs': {
                'expand': true,
                'src': 'framework/*.json',
                'dest': 'build/'
            },
            'node_modules': {
                'expand': true,
                'src': 'node_modules/**/*.*',
                'dest': 'build/'
            }
        },
        'prompt': {
            'createModule': {
                'options': {
                    'questions': [{
                        'config': 'createModule.name', // arbitrary name or config for any other grunt task
                        'type': 'input', // list, checkbox, confirm, input, password
                        'message': 'What is the name of new module? (no spaces,lower case,use "-")', // Question to ask the user, function needs to return a string,
                        'default': 'my-new-module', // default value if nothing is entered
                        'validate': function(value) {
                            return true;
                        }, // return true if valid, error message if invalid. works only with type:input
                        'filter': function(value) {
                            return value;
                        }, // modify the answer
                        'when': function(answers) {
                            return 'Enter name for new module';
                        } // only ask this question when this function returns true;
                    }]
                }
            },
            'createService': {
                'options': {
                    'questions': [{
                        'config': 'createService.name', // arbitrary name or config for any other grunt task
                        'type': 'input', // list, checkbox, confirm, input, password
                        'message': 'What is the name of new service? (no spaces,lower case,use "-")', // Question to ask the user, function needs to return a string,
                        'default': 'my-new-service', // default value if nothing is entered
                        'validate': function(value) {
                            return true;
                        }, // return true if valid, error message if invalid. works only with type:input
                        'filter': function(value) {
                            return value;
                        }, // modify the answer
                        'when': function(answers) {
                            return 'Enter name for new module';
                        } // only ask this question when this function returns true;
                    }]
                }
            },
            'createDirective': {
                'options': {
                    'questions': [{
                        'config': 'createDirective.name', // arbitrary name or config for any other grunt task
                        'type': 'input', // list, checkbox, confirm, input, password
                        'message': 'What is the name of new directive? (no spaces,lower case,use "-")', // Question to ask the user, function needs to return a string,
                        'default': 'my-new-directive', // default value if nothing is entered
                        'validate': function(value) {
                            return true;
                        }, // return true if valid, error message if invalid. works only with type:input
                        'filter': function(value) {
                            return value;
                        }, // modify the answer
                        'when': function(answers) {
                            return 'Enter name for new module';
                        } // only ask this question when this function returns true;
                    }]
                }
            }
        },
        'mkdir': {
            'module': {
                'options': {
                    'create': ['modules/<%= createModule.name %>']
                }
            },
            'service': {
                'options': {
                    'create': ['services/<%= createService.name %>']
                }
            },
            'directive': {
                'options': {
                    'create': ['directives/<%= createDirective.name %>']
                }
            }

        },
        'template': {
            'create-module-template': {
                'options': {
                    'data': {
                        'moduleName': '<%= createModule.moduleName %>',
                        'controllerName': '<%= createModule.controllerName %>'
                    }
                },
                'files': {
                    'modules/<%= createModule.name %>/<%= createModule.name %>.html': ['framework/grunt-templates/module.html.tmpl'],
                    'modules/<%= createModule.name %>/<%= createModule.name %>.js': ['framework/grunt-templates/module.js.tmpl'],
                    'modules/<%= createModule.name %>/<%= createModule.name %>.css': ['framework/grunt-templates/module.css.tmpl']
                }
            },
            'create-service-template': {
                'options': {
                    'data': {
                        'moduleName': '<%= createService.moduleName %>',
                        'serviceName': '<%= createService.serviceName %>'
                    }
                },
                'files': {
                    'services/<%= createService.name %>/<%= createService.name %>.js': ['framework/grunt-templates/service.js.tmpl']
                }
            },
            'create-directive-template':{
                'options': {
                    'data': {
                        'moduleName': '<%= createDirective.moduleName %>',
                        'directiveName': '<%= createDirective.directiveName %>',
                        'controllerName':'<%= createDirective.controllerName %>',
                        'dirName':'<%= createDirective.name %>',
                        'fileName':'<%= createDirective.name %>'
                    }
                },
                'files': {
                    'directives/<%= createDirective.name %>/<%= createDirective.name %>.html': ['framework/grunt-templates/directive.html.tmpl'],
                    'directives/<%= createDirective.name %>/<%= createDirective.name %>.js': ['framework/grunt-templates/directive.js.tmpl'],
                    'directives/<%= createDirective.name %>/<%= createDirective.name %>.css': ['framework/grunt-templates/directive.css.tmpl']
                }
            }
        },
        'comments': {
            js: {
                options: {
                    singleline: true,
                    multiline: false
                },
                src: ['modules/**/*.js','services/**/*.js','directives/**/*.js'],
                dest:['']
            }
        }


    });

    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-stripcomments');


    grunt.registerTask('default', [
        'autoprefixer'
    ]);

    grunt.registerTask('build', ['fix-css','cssmin', 'uglify', 'imagemin', 'copy']);
    grunt.registerTask('fix-css',['autoprefixer']);
    grunt.registerTask('create-module', ['prompt:createModule','update-module-name','mkdir:module', 'template:create-module-template','update-module-config']);
    grunt.registerTask('create-service', ['prompt:createService','update-service-name','mkdir:service', 'template:create-service-template','update-service-config']);
    grunt.registerTask('create-directive', ['prompt:createDirective','update-directive-name','mkdir:directive', 'template:create-directive-template','update-directive-config']);
    grunt.registerTask('run-server',['http-server']);

    grunt.registerTask('update-service-name',function(){
        var createModuleObj = grunt.config('createService');

        //camel case naming convention for modules
        createModuleObj.moduleName = camelize(createModuleObj.name.split("-").join(" ").trim());

        //Title Case naming convention for controller name
        createModuleObj.serviceName = titlelize(createModuleObj.name.split("-").join(" ").trim());

        grunt.config('createService',createModuleObj);
    });

    grunt.registerTask('update-module-name',function(){
        var createModuleObj = grunt.config('createModule');

        //camel case naming convention for modules
        createModuleObj.moduleName = camelize(createModuleObj.name.split("-").join(" ").trim());

        //Title Case naming convention for controller name
        createModuleObj.controllerName = titlelize(createModuleObj.name.split("-").join(" ").trim()) + "Ctrl";

        grunt.config('createModule',createModuleObj);
    });

    grunt.registerTask('update-directive-name',function(){
        var createDirectiveObj = grunt.config('createDirective');

        //camel case naming convention for modules
        createDirectiveObj.moduleName = camelize(createDirectiveObj.name.split("-").join(" ").trim()) + "Module";

        //camel Case naming convention for directive name
        createDirectiveObj.directiveName = camelize(createDirectiveObj.name.split("-").join(" ").trim());
        createDirectiveObj.controllerName = titlelize(createDirectiveObj.name.split("-").join(" ").trim()) + "Ctrl";


        grunt.config('createDirective',createDirectiveObj);
    });

    grunt.registerTask('update-module-config',function(){
        var createModuleObj = grunt.config('createModule');
        var moduleName = createModuleObj.moduleName;
        var dirName = createModuleObj.name;
        var fileName = createModuleObj.name;
        var configFile = "./framework/app.config.json";
        if (!grunt.file.exists(configFile)) {
            grunt.log.error("file " + configFile + " is dir");
            return true;//return false to abort the execution
        }

        var newModule = {
            "displayName": moduleName,
            "moduleName": moduleName,
            "dir": dirName,
            "jsDependencies": [
                fileName
            ],
            "cssDependencies": [
                fileName
            ],
            "url": "/"+moduleName,
            "template": fileName+".html",
            "isEnabledOnNavBar": true,
            "isDefault": false
        };
        var currRoutes = grunt.file.readJSON(configFile);

        currRoutes.routes.push(newModule);
        grunt.file.write(configFile,JSON.stringify(currRoutes,null,2));

    });

    grunt.registerTask('update-service-config',function(){
        var createServiceObj = grunt.config('createService');
        var serviceModuleName = createServiceObj.name;
        var serviceModulePath = "/services/"+serviceModuleName + "/" + serviceModuleName;

        var configFile = "./framework/app.config.json";
        if (!grunt.file.exists(configFile)) {
            grunt.log.error("file " + configFile + " is dir");
            return true;//return false to abort the execution
        }

        var currConfig = grunt.file.readJSON(configFile);
        currConfig.requiredConfigs.paths[serviceModuleName] = serviceModulePath;
        grunt.file.write(configFile,JSON.stringify(currConfig,null,2));
    });

    grunt.registerTask('update-directive-config',function(){
        var createDirectiveObj = grunt.config('createDirective');
        var directiveModuleName = createDirectiveObj.name;
        var directiveModulePath = "/directives/"+directiveModuleName + "/" + directiveModuleName;
        var directiveCssPath = "css!/directives/" + directiveModuleName + "/" + directiveModuleName;
        var directiveShim = ["angular", directiveCssPath];

        var configFile = "./framework/app.config.json";
        if (!grunt.file.exists(configFile)) {
            grunt.log.error("file " + configFile + " is dir");
            return true;//return false to abort the execution
        }

        var currConfig = grunt.file.readJSON(configFile);
        currConfig.requiredConfigs.paths[directiveModuleName] = directiveModulePath;
        currConfig.requiredConfigs.shim[directiveModuleName] = directiveShim;
        grunt.file.write(configFile,JSON.stringify(currConfig,null,2));

    });
};
