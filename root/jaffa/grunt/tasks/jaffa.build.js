/**
 * Created by gaurangdave on 9/15/16.
 */
module.exports = function (grunt, options) {

    var utils = require("./utils");
    var appData = utils.getAppData(grunt);
    var cssMinLazyLoad = {};
    cssMinLazyLoad[utils.context.app] = {};
    cssMinLazyLoad[utils.context.core] = {};

    grunt.registerTask("build", function (type) {
        /**
         *  Steps:
         *  1. Prompt for build type. (dev,qa,prod)
         *  2. Prompt for build optimization. (lazyload, combined file)
         *  3. Prompt for build version.
         */
        grunt.task.run(["prompt:build_type","prompt:build_optimization","prompt:build_version","run-build"]);
    });

    grunt.registerTask("run-build",function () {
        var build = grunt.config.get("build");

        if(build["optimization"] === utils.buildType.lazyload){
            runLazyLoadBuild();
        }
        else if(build["optimization"] === utils.buildType.combined){
            runCombinedFileBuild();
        }
    });
    
    function runCombinedFileBuild() {
        var build = grunt.config.get("build");

        //create build config object.
        createBuildConfigObj(build.type);

        //create config object for css min.
        createCombinedCssMinObj(build.type);

        //create config object for processhtml.
        createCombinedProcessHTMLConfig(build.type);

        //create config object for RequireJS.
        createCombinedRequireJSConfig(build.type);

        //run build tasks
        createCombinedFileBuild();

    }
    
    function createCombinedFileBuild() {
        /**
         * Steps:
         * 1. Update version for dev build.
         * 2. Run SASS for app,core.
         * 3. Combine CSS file into single build file.
         * 4. Create build config.js into tmp folder.
         * 5. Run RequireJS optimizer to combine files.
         * 6. Process index.html.
         * 7. Copy rest of views/files/folders.
         * 8. Run cache-busting tasks.
         * 9. Clean tmp.
         */

        grunt.task.run(["replace:build-version", "sass:app", "sass:core", "clean:build", "cssmin:combined","create-config:build","requirejs:combined","processhtml:combined","copy:combined","replace:combined","cacheBust:combined","clean:tmp"]);

    }
    

    function runLazyLoadBuild() {
        var build = grunt.config.get("build");
        //create config object for cssmin task.
        createLazyLoadCssMinObj(build.type);

        //create config object for uglify task.
        createLazyLoadUglifyObj(build.type);

        //create config object for copy task
        createBuildConfigObj(build.type);

        //run build tasks
        createLazyLoadBuild();
    }

    function createLazyLoadBuild() {
        grunt.task.run(["replace:build-version", "sass:app", "sass:core", "clean:build", "cssmin:lazyload", "uglify:lazyload", "packageModules:lazyload", "copy:lazyload", "replace:lazyload", "cacheBust:lazyload","create-config:build" ,"clean:build-tmp"]);
    }

    function LazyLoadCssMinObj(){
        this.expand = "true";
        this.sourceMap = "true";
        this.cwd = "";
        this.src = ["**/*.css", "!*.min.css"];
        this.dest = "";
    }


    function LazyLoadUglifyObj(){
        this.expand = "true";
        this.sourceMap = "true";
        this.preserveComments = "false";
        this.cwd = "";
        this.src = ["**/*.js", "!**/*.min.js", "!**/*.spec.js", "!**/grunt/tasks/*.js"];
        this.dest = "";
    }

    function createCombinedCssMinObj(buildType){
        var cssMinConfig = [];
        var buildConfig = utils.getBuildConfig(grunt,buildType);
        var _ = require("underscore");
        var _str = require("underscore.string");

        //combine libs css files into libs.css
        var libsJson = utils.getLibsJson(grunt);
        var libConfig = {};
        var libSourceArray = [];
        _.forEach(libsJson,function (value,key,list) {
            _.forEach(value.dependencies,function (element,index,array) {
                if(_str.endsWith(element,".css")){
                    libSourceArray.push(element);
                }
            })
        });

        libConfig[buildConfig.baseFolder + "libs.css"] = libSourceArray;
        cssMinConfig.push(libConfig);

        //combine jaffa css files into jaffa.css
        var jaffaObj = {};
        jaffaObj[buildConfig.baseFolder + "jaffa.css"] = [appData.jaffaRoot + "**/*.css","!*.min.css"];
        cssMinConfig.push(jaffaObj);

        //combine app css files into app.css
        var appObj = {};
        appObj[buildConfig.baseFolder + "app.css"] = [appData.appRoot + "**/*.css","!*.min.css"];
        cssMinConfig.push(appObj);


        grunt.config.set("cssMinConfig",cssMinConfig);
    }

    function createLazyLoadUglifyObj(buildType){
        var uglifyConfig = [];
        var buildConfig = utils.getBuildConfig(grunt,buildType);

        //create css min config for app
        var appObj = new LazyLoadUglifyObj();
        appObj.cwd = appData.appRoot;
        appObj.dest = buildConfig.appFolder;
        uglifyConfig.push(appObj);

        //create css min config for jaffa
        var jaffaObj = new LazyLoadUglifyObj();
        jaffaObj.cwd = appData.jaffaRoot;
        jaffaObj.dest = buildConfig.jaffaFolder;
        uglifyConfig.push(jaffaObj);

        grunt.config.set("uglifyConfig",uglifyConfig)
    }

    function createLazyLoadCssMinObj(buildType){
        var cssMinConfig = [];
        var buildConfig = utils.getBuildConfig(grunt,buildType);

        //create css min config for app
        var appObj = new LazyLoadCssMinObj();
        appObj.cwd = appData.appRoot;
        appObj.dest = buildConfig.appFolder;
        cssMinConfig.push(appObj);
        //create css min config for jaffa
        var jaffaObj = new LazyLoadCssMinObj();
        jaffaObj.cwd = appData.jaffaRoot;
        jaffaObj.dest = buildConfig.jaffaFolder;
        cssMinConfig.push(jaffaObj);

        grunt.config.set("cssMinConfig",cssMinConfig);
    }

    function createBuildConfigObj(buildType){
        var buildConfig = utils.getBuildConfig(grunt,buildType);
        grunt.config.set("buildConfig",buildConfig);
    }

    function createCombinedProcessHTMLConfig(buildType){
        var processHTMLConfig = [];
        var buildConfig = utils.getBuildConfig(grunt,buildType);

        var config = {};
        config[buildConfig.baseFolder + "index.html"] = "index.html";

        processHTMLConfig.push(config);
        grunt.config.set("processHTMLConfig",processHTMLConfig);
    }
    
    function createCombinedRequireJSConfig(buildType) {
        var buildConfig = utils.getBuildConfig(grunt,buildType);
        var rjsConfig = buildConfig.baseFolder + "app.js";
        grunt.config.set("requirejsConfig",rjsConfig);
    }


    return {};
};
