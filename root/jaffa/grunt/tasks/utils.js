/**
 * Utility function to split titlize string
 * Returns an array of words
 * HelloWorld returns ["Hello","World"]
 *
 */

var context = {
    "core": "core",
    "app": "app",
    "build":"build"
};

var components = {
    "controller": "controller",
    "service": "service",
    "provider": "provider",
    "directive": "directive",
    "model": "model"
};

var componentFolders = {
    "controller": "modules",
    "service": "services",
    "provider": "providers",
    "directive": "directives",
    "model": "models"
};

var environments = {
    "dev": "dev",
    "qa": "qa",
    "prod": "prod"
};

var buildType = {
    "lazyload":"lazyload",
    "combined":"combined"
};


function splitTitleize(str) {
    var _s = require("underscore.string");
    return _s.words(str, /(?=[A-Z])/);
}

function splitController(str) {
    var _s = require("underscore.string");
    return _s.words(str, "Controller");
}

/**
 *  Utility function to camelize names according
 *  to naming conventions
 *
 * */
function camelize(str) {
    return str.replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    })
        .replace(/\s/g, "")
        .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });
}

/**
 *  Utility function to titlelize names according
 *  to naming conventions
 *
 * */
function titlelize(str) {
    return str.replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    })
        .replace(/\s/g, "")
        .replace(/^(.)/, function ($1) {
            return $1.toUpperCase();
        });

}

/**
 *  Utility function to get app data - version,root folder locations
 *
 * */
function getAppData(grunt) {
    var appData = grunt.file.readJSON("about.json");
    appData.jaffaRoot = "jaffa/" + appData.jaffa + "/";
    appData.appRoot = "app/";
    return appData;
}

/**
 *  Utility function to get core data - version,root folder locations
 *
 * */
function getCoreData(grunt) {
    var appData = getAppData(grunt);
    return grunt.file.readJSON(appData.jaffaRoot + "about.json");
}

/**
 *
 * @param grunt
 * @param buildType (dev,qa,prod)
 */
function getBuildConfig(grunt, buildType) {

    var appData = utils.getAppData(grunt);
    var buildLocation = "build/" + buildType + "/";
    var tmpFolder = buildLocation + "tmp/";
    var baseFolder = buildLocation + appData.name + "/";
    if(appData[buildType]){
        buildLocation = appData[buildType] + "/";
        baseFolder = buildLocation;
    }


    var appFolder = baseFolder + appData.appRoot;
    var jaffaFolder = baseFolder + appData.jaffaRoot;
    var nmFolder = baseFolder + "node_modules/";

    return {
        buildLocation: buildLocation,
        baseFolder: baseFolder,
        appFolder: appFolder,
        jaffaFolder: jaffaFolder,
        nmFolder: nmFolder,
        tmpFolder:tmpFolder
    }

}

function getAppModules(grunt) {
    return grunt.file.readJSON("app/main.json")
}

function getAppComponentFromModule(grunt, module) {
    var mainJson = getAppModules(grunt);
    var moduleDetails = mainJson[module];
    if (moduleDetails) {
        return moduleDetails.type;
    }

    return null;
}

function getCoreComponentFromModule(grunt, module) {
    var mainJson = getCoreModules(grunt);
    var moduleDetails = mainJson[module];
    if (moduleDetails) {
        return moduleDetails.type;
    }

    return null;
}

function getComponentFromModule(grunt, module, currContext) {
    if (currContext === context.app) {
        return getAppComponentFromModule(grunt, module);
    }
    else if (currContext === context.core) {
        return getCoreComponentFromModule(grunt, module);
    }
}

function getCoreModules(grunt) {
    var appData = getAppData(grunt);
    return grunt.file.readJSON(appData.jaffaRoot + "main.json");
}

function isValidComponent(component) {
    var _ = require("underscore");
    if (_.isNull(component) || _.isUndefined(component)) {
        return false;
    }
    return _.contains(_.values(components), component.toLowerCase());
}

function getFileNameWithoutExtension(fileName) {

    if (!fileName.includes(".")) {
        return fileName;
    }

    if (fileName.endsWith(".js")) {
        return removeExtension(fileName, "js");
    }
    else if (fileName.endsWith(".css")) {
        return removeExtension(fileName, "css");
    }
    else if (fileName.endsWith(".scss")) {
        return removeExtension(fileName, "scss");
    }
    else if (fileName.endsWith(".html")) {
        return removeExtension(fileName, "html");
    }

    return fileName;

}

function setFileExtension(fileName, extension) {
    console.log("File Name without extension " + getFileNameWithoutExtension(fileName));
    return getFileNameWithoutExtension(fileName) + "." + extension;
}

function removeExtension(fileName, extension) {
    return fileName.slice(0, fileName.length - extension.length - 1);
}


function isNullOrUndefined(str) {
    var _ = require("underscore");
    return _.isNull(str) || _.isUndefined(str) || str === "undefined";
}

function getServerData(grunt) {
    return grunt.file.readJSON("server.json");
}

function getApiUrls(grunt) {
    var server = grunt.config.get("server");
    var serverData = getServerData(grunt);
    if(serverData[serverData.env]){
        return serverData[serverData.env].apiEndPoints;
    }

    return [];
}

function isValidObject(obj) {
    var _ = require("underscore");
    return !_.isNull(obj) && !_.isUndefined(obj) && _.keys(obj).length > 0;
}

function getCurrentServer(grunt) {
    var serverData = getServerData(grunt);
    var env = grunt.config.get("server").env;
    if(serverData[env]){
        return serverData[env];
    }

    return null;
}

function getLibsJson(grunt) {
    return grunt.file.readJSON("libs.json");
}

function getTmpFolder(){
    return "jaffa/tmp/";
}
function incrementVersionNumber(currentVersion,incrtBy) {
    if(!incrtBy){
        incrtBy = 1;
    }
    var currentVersionSplit = currentVersion.split(".");
    if(parseInt(currentVersionSplit[2]) + incrtBy > 9){
        currentVersionSplit[2] = 0;
        if(parseInt(currentVersionSplit[1]) + 1 > 9){
            currentVersionSplit[1] = 0;
            currentVersionSplit[0] = parseInt(currentVersionSplit[0]) + 1;
        }
    }
    else{
        currentVersionSplit[2] = parseInt(currentVersionSplit[2]) + incrtBy;
    }

    return currentVersionSplit.join(".");
}

var utils = {
    splitTitleize: splitTitleize,
    splitController: splitController,
    camelize: camelize,
    titlelize: titlelize,
    getCoreData:getCoreData,
    getAppData: getAppData,
    getBuildConfig: getBuildConfig,
    getAppModules: getAppModules,
    getCoreModules: getCoreModules,
    getServerData:getServerData,
    getApiUrls:getApiUrls,
    getCurrentServer:getCurrentServer,
    getAppComponentFromModule: getAppComponentFromModule,
    getCoreComponentFromModule: getCoreComponentFromModule,
    getComponentFromModule: getComponentFromModule,
    isValidComponent: isValidComponent,
    isValidObject:isValidObject,
    isNullOrUndefined: isNullOrUndefined,
    getFileNameWithoutExtension: getFileNameWithoutExtension,
    setFileExtension: setFileExtension,
    getLibsJson:getLibsJson,
    getTmpFolder:getTmpFolder,
    incrementVersionNumber:incrementVersionNumber,
    context: context,
    components: components,
    componentFolders: componentFolders,
    environments: environments,
    buildType:buildType
};

module.exports = utils;
