/**
 * Created by gaurangdave on 8/17/16.
 */

require.config({
    urlArgs: "v=replaced_during_build",
    map: {
        "*": {
            "css": "/node_modules/require-css/css.js"
        }
    },
    paths: {
        "angular": "/node_modules/angular/angular.min",
        "angular-resource": "/node_modules/angular-resource/angular-resource.min",
        "angular-bootstrap": "/node_modules/angular-bootstrap/ui-bootstrap.min",
        "angular-bootstrap-tpl": "/node_modules/angular-bootstrap/ui-bootstrap-tpls.min",
        "angular-dragdrop": "/node_modules/angular-dragdrop/src/angular-dragdrop.min",
        "angular-dynamic-locale": "/node_modules/angular-dynamic-locale/tmhDynamicLocale.min",
        "angular-loading-bar": "/node_modules/angular-loading-bar/build/loading-bar.min",
        "angular-shims-placeholder": "/node_modules/angular-shims-placeholder/dist/angular-shims-placeholder.min",
        "angular-strap": "/node_modules/angular-strap/dist/angular-strap.min",
        "angular-strap-tpl": "/node_modules/angular-strap/dist/angular-strap.tpl.min",
        "angular-strap-compat": "/node_modules/angular-strap/dist/angular-strap.compat.min",
        "angular-ui-router": "/node_modules/angular-ui-router/release/angular-ui-router.min",
        "angular-ui-select": "/node_modules/angular-ui-select/select.min",
        "angular-route": "/node_modules/angular-route/angular-route.min",
        "autobahn": "/node_modules/autobahn/index",
        "es5-shim": "/node_modules/es5-shim/es5-shim.min",
        "es5-sham": "/node_modules/es5-shim/es5-sham.min",
        "flowplayer": "/node_modules/flowplayer/dist/flowplayer.min",
        "greensock": "",//gsap
        "html5shiv": "/node_modules/html5shiv/dist/html5shiv.min",
        "html5shiv-printshiv": "/node_modules/html5shiv/dist/html5shiv-printshiv.min",
        "intl-tel-input": "/node_modules/intl-tel-input/build/js/intlTelInput.min",
        "jquery.bxslider": "",
        "jquery.fullscreen-popup": "",
        "jquery.ui.touch-punch": "",
        "jquery-ui": "/node_modules/jquery-ui/build/release",
        "jquery": "/node_modules/jquery/dist/jquery.min",
        "jquery-slim": "/node_modules/jquery/dist/jquery.slim.min",
        "json3": "/node_modules/json3/lib/json3.min",
        "modernizr": "",
        "moment": "/node_modules/moment/min/moment.min",
        "moment-timezone": "/node_modules/moment-timezone/builds/moment-timezone-with-data.min",
        "ng-file-upload": "/node_modules/ng-file-upload/dist/ng-file-upload.min",
        "obsolete": "/node_modules/obsolete/obsolete",
        "oclazyload": "/node_modules/oclazyload/dist/ocLazyLoad.min",
        "raphael": "/node_modules/raphael/raphael.min",
        "requirejs": "/node_modules/requirejs/require",
        "requirejs-domready": "/node_modules/requirejs-domready/domReady",
        "respond": "",
        "underscore": "/node_modules/underscore/underscore-min",
        "json": '/node_modules/requirejs-plugins/src/json',
        "boot": "boot",
        "app": "/app/app"
    },
    shim: {
        "app": ["angular"],
        "angular-resource": ["angular"],
        "angular-strap": ["angular"],
        "angular-strap-tpl": ["angular"],
        "angular-strap-compat": ["angular"],
        "angular-loading-bar": ["angular", "css!/node_modules/angular-loading-bar/build/loading-bar.min"],
        "angular-bootstrap": ["angular", "angular-bootstrap-tpl"],
        "angular-bootstrap-tpl": ["angular"],
        "angular-route": ["angular"],
        "angular-ui-router": ["angular"],
        "es5-shim": ["es5-sham"],
        "html5shiv": ["html5shiv-printshiv"],
        "intl-tel-input": ["/node_modules/intl-tel-input/build/js/utils", "css!/node_modules/intl-tel-input/build/css/demo", "css!/node_modules/intl-tel-input/build/css/intlTelInput"],
        "moment": ["/node_modules/moment/min/locales.min"],
        "ng-file-upload": ["/node_modules/ng-file-upload/dist/ng-file-upload-all.min", "/node_modules/ng-file-upload/dist/ng-file-upload-shim.min"],
        "raphael": ["/node_modules/raphael/raphael.no-deps.min"]
    }


});

require(["boot"], function () {
    console.log("Booting jaffa...");
});