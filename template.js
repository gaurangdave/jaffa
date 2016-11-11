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
//exports.warnOn = '*';
// The actual init template.
exports.template = function (grunt, init, done) {

    init.process({}, [
        init.prompt('name'),
        init.prompt('domain'),
        init.prompt('description'),
        init.prompt('author'),
        init.prompt('version')
    ], function (err, props) {
        // Files to copy (and process).

        grunt.file.mkdir(props.name);

        //ToDo - Always update this before a release with version change
        props.jaffaVersion = "0.1.8";

        var files = init.filesToCopy(props);

        // Re-path the files correctly
        for (var file in files) {
            var path = files[file];
            var newFile = props.name + "/" + file;
            newFile = newFile.replace("jaffa/", "jaffa/" + props.jaffaVersion + "/");
            files[newFile] = path;
            delete files[file];
        }

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // Empty folders won't be copied over so make them here so if required create folders
        //grunt.file.mkdir('modules');

        //create package.json file, used by npm and grunt.
        var pkgJson = grunt.file.readJSON(props.name + '/package.json');
        pkgJson.name = props.name;
        pkgJson.description = props.description;
        pkgJson.version = props.version;
        pkgJson.repository = {};

        grunt.file.write(props.name + '/package.json', JSON.stringify(pkgJson, null, 2));


        //write app about.json
        var aboutApp = {
            name: props.name,
            domain:props.domain,
            description: props.description,
            author: props.author,
            version: props.version,
            jaffa: props.jaffaVersion
        };

        var aboutFile = props.name + "/about.json";

        grunt.file.write(aboutFile, JSON.stringify(aboutApp, null, 2));
        // All done!
        done();
    });
};
