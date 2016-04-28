module.exports = function(grunt) {

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
                openBrowser: true,

                // customize url to serve specific pages
                // customPages: {
                //     "/readme": "README.md",
                //     "/readme.html": "README.html"
                // }

            }

        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'modules/',
                    src: ['**/*.css', '!*.min.css'],
                    dest: 'build/modules/',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            my_modules: {
                files: [{
                    expand: true,
                    cwd: 'modules/',
                    src: '**/*.js',
                    dest: 'build/modules/',
                    ext: '.js'
                }]
            },
            my_framework: {
                files: [{
                    expand: true,
                    cwd: 'framework/',
                    src: '**/*.js',
                    dest: 'build/framework',
                    ext: '.js'
                }]
            },
            my_models: {
                files: [{
                    expand: true,
                    cwd: 'models/',
                    src: '**/*.js',
                    dest: 'build/models',
                    ext: '.js'
                }]
            },
            my_services: {
                files: [{
                    expand: true,
                    cwd: 'services/',
                    src: '**/*.js',
                    dest: 'build/services',
                    ext: '.js'
                }]
            }
        },
        imagemin: {
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'modules/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: 'build/modules/' // Destination path prefix
                }]
            }
        },
        copy: {
            node_modules: {
                expand: true,
                src: 'node_modules/**/*.*',
                dest: 'build/',
            },
            view: {
                expand: true,
                src: 'modules/**/*.html',
                dest: 'build/',
            },
            index: {
                expand: true,
                src: 'index.html',
                dest: 'build/',
            },

        },
        prompt: {
            createModule: {
                options: {
                    questions: [{
                        config: 'createModule.name', // arbitrary name or config for any other grunt task
                        type: 'input', // list, checkbox, confirm, input, password
                        message: 'What is the name of new module?', // Question to ask the user, function needs to return a string,
                        default: 'NewModule', // default value if nothing is entered
                        validate: function(value) {
                            return true;
                        }, // return true if valid, error message if invalid. works only with type:input
                        filter: function(value) {
                            return value;
                        }, // modify the answer
                        when: function(answers) {
                            return 'Enter name for new module';
                        } // only ask this question when this function returns true;
                    }]
                }
            },
            createService: {
                options: {
                    questions: [{
                        config: 'createService.name', // arbitrary name or config for any other grunt task
                        type: 'input', // list, checkbox, confirm, input, password
                        message: 'What is the name of new service?', // Question to ask the user, function needs to return a string,
                        default: 'NewService', // default value if nothing is entered
                        validate: function(value) {
                            return true;
                        }, // return true if valid, error message if invalid. works only with type:input
                        filter: function(value) {
                            return value;
                        }, // modify the answer
                        when: function(answers) {
                            return 'Enter name for new module';
                        } // only ask this question when this function returns true;
                    }]
                }
            },
        },
        mkdir: {
            module: {
                options: {
                    create: ['modules/<%= createModule.name %>']
                },
            },
            service: {
                options: {
                    create: ['services/<%= createService.name %>']
                },
            },

        },
        'template': {
            'create-module-template': {
                'options': {
                    'data': {
                        'moduleName': '<%= createModule.name %>',
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
                        'serviceName': '<%= createService.name %>',
                    }
                },
                'files': {
                    'services/<%= createService.name %>/<%= createService.name %>.js': ['framework/grunt-templates/service.js.tmpl'],
                }
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


    grunt.registerTask('default', [
        'cssmin', 'uglify', 'copy'
    ]);

    grunt.registerTask('build', ['cssmin', 'uglify', 'imagemin', 'copy']);
    grunt.registerTask('create-controller-module', ['prompt:createModule', 'mkdir:module', 'template:create-module-template']);
    grunt.registerTask('create-service-module', ['prompt:createService', 'mkdir:service', 'template:create-service-template']);
    grunt.registerTask('run-server',['http-server']);
};
