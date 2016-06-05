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
exports.template = function(grunt, init, done) {

    init.process({}, [

    ], function(err, props) {
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
            version: "2.0.0",
            "dependencies": {
                "angular": "^1.5.5",
                "angular-animate": "^1.5.5",
                "angular-aria": "^1.5.5",
                "angular-block-ui": "^0.2.0",
                "angular-bootstrap": "^0.12.2",
                "angular-material": "^1.0.6",
                "angular-messages": "^1.5.5",
                "angular-route": "^1.5.5",
                "angular-sanitize": "^1.5.5",
                "angular-touch": "^1.5.5",
                "angular-ui-bootstrap": "^1.1.2",
                "angular-ui-grid": "^3.1.1",
                "bootstrap": "^3.3.6",
                "curl": "^0.1.4",
                "grunt": "^1.0.1",
                "grunt-cli": "1.2.0",
                "jquery": "^2.2.0",
                "jshint-stylish": "^0.1.4",
                "oclazyload": "1.0",
                "require-css": "^0.1.8",
                "requirejs": "^2.1.22",
                "underscore": "^1.8.3"
            },
            "devDependencies": {
                "autoprefixer": "^6.3.6",
                "cssnano": "^3.6.2",
                "grunt-autoprefixer": "^3.0.4",
                "grunt-contrib-concat": "^0.3.0",
                "grunt-contrib-copy": "^1.0.0",
                "grunt-contrib-cssmin": "^0.6.2",
                "grunt-contrib-imagemin": "^1.0.0",
                "grunt-contrib-jshint": "^0.6.x",
                "grunt-contrib-sass": "^0.4.x",
                "grunt-contrib-uglify": "^0.2.x",
                "grunt-contrib-watch": "^0.5.x",
                "grunt-http-server": "^1.16.0",
                "grunt-mkdir": "^1.0.0",
                "grunt-postcss": "^0.8.0",
                "grunt-prompt": "^1.3.3",
                "grunt-stripcomments": "^0.5.0",
                "grunt-template": "^0.2.3",
                "http-server": "^0.9.0",
                "pixrem": "^3.0.1"
            }
        });
        // All done!
        done();
    });
};
