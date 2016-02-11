'use strict';

// Basic template description.
exports.description = 'Scaffolds a new project with based on JAFFA framework';

// Template-specific notes to be displayed after question prompts.
exports.after = "Run 'npm install' to download all dependencies";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {

    init.process({}, [
			// Prompt for these values.
    //			init.prompt('name'),
    //			init.prompt('title'),
    //			init.prompt('description'),
    //			init.prompt('version'),
		], function (err, props) {
        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // Empty folders won't be copied over so make them here so if required create folders
        //grunt.file.mkdir('modules');

        //create package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', {
            name: 'jaffa_libs',
            description: "dependencies for jaffa framework",
            version: "1.0.0",
            dependencies: {
                "angular": "~1.5.0",
                "angular-animate": "~1.5.0",
                "angular-aria": "~1.5.0",
                "angular-bootstrap": "~0.12.2",
                "angular-route": "~1.5.0",
                "angular-material": "~1.0.5",
                "angular-ui-bootstrap": "~1.1.2",
                "bootstrap": "~3.3.6",
                "angular-sanitize": "~1.5.0",
                "angular-touch": "~1.5.0",
                "underscore": "~1.8.3",
                "require-css": "~0.1.8",
                "requirejs": "~2.1.22",
                "curl": "~0.1.4",
                "grunt-contrib-concat": "~0.3.x",
                "grunt-contrib-uglify": "~0.2.x",
                "grunt-contrib-cssmin": "~0.6.x",
                "grunt-contrib-sass": "~0.4.x",
                "grunt-contrib-jshint": "~0.6.x",
                "grunt-contrib-watch": "~0.5.x",
                "jshint-stylish": "~0.1.4",
                "jquery": "~2.2.0"
            },
        });
        // All done!
        done();
    });
};
