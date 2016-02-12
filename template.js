/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Gaurang Dave
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
                "jquery": "~2.2.0",
		"angular-block-ui": "~0.2.0"
            },
        });
        // All done!
        done();
    });
};
