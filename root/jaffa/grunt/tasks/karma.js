/**
 * Created by gaurangdave on 10/8/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var requiredFiles = [
        "node_modules/angular/angular.js",
        "node_modules/angular-mocks/angular-mocks.js",
        "app/**/*.spec.js"
    ];
    var reporters = ["mocha", "html"];

    return {
        "chrome": {
            "options": {
                frameworks: ["jasmine"],
                singleRun: true,
                browsers: ["Chrome"],
                files: requiredFiles,
                reporters: reporters,
                keepAlive: true,

                htmlReporter: {
                    outputFile: "tests/units.chrome.html",

                    // Optional
                    pageTitle: appData.name + "(v" + appData.version + ")",
                    subPageTitle: "Unit Test results for Chrome",
                    groupSuites: false,
                    useCompactStyle: false,
                    useLegacyStyle: true
                },

                // reporter options
                mochaReporter: {
                    output: 'minimal'
                }
            }
        },
        "safari": {
            "options": {
                frameworks: ["jasmine"],
                singleRun: true,
                browsers: ["Safari"],
                files: requiredFiles,
                reporters: reporters,

                htmlReporter: {
                    outputFile: "tests/units.safari.html",

                    // Optional
                    pageTitle: appData.name + "(v" + appData.version + ")",
                    subPageTitle: "Unit Test results for Safari",
                    groupSuites: true,
                    useCompactStyle: true,
                    useLegacyStyle: true
                }
            }
        },
        "firefox": {
            "options": {
                frameworks: ["jasmine"],
                singleRun: true,
                browsers: ["Firefox"],
                files: requiredFiles,
                reporters: reporters,

                htmlReporter: {
                    outputFile: "tests/units.firefox.html",

                    // Optional
                    pageTitle: appData.name + "(v" + appData.version + ")",
                    subPageTitle: "Unit Test results for Firefox",
                    groupSuites: true,
                    useCompactStyle: true,
                    useLegacyStyle: true
                }
            }
        },
        "ie": {
            "options": {
                frameworks: ["jasmine"],
                singleRun: true,
                browsers: ["IE"],
                files: requiredFiles,
                reporters: reporters,

                htmlReporter: {
                    outputFile: "tests/units.ie.html",

                    // Optional
                    pageTitle: appData.name + "(v" + appData.version + ")",
                    subPageTitle: "Unit Test results for IE",
                    groupSuites: true,
                    useCompactStyle: true,
                    useLegacyStyle: true
                }
            }
        }
    };
};
