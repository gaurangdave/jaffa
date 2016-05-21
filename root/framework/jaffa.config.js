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

require.config({

    map: {
        "*": {
            "css": "../node_modules/require-css/css.js"
        }
    },
    paths: {
        angular: "../node_modules/angular/angular",
        angular_touch: "../node_modules/angular-touch/angular-touch.min",
        angular_sanitize: "../node_modules/angular-sanitize/angular-sanitize.min",
        angular_route: "../node_modules/angular-route/angular-route.min",
        angular_animate: "../node_modules/angular-animate/angular-animate.min",
        angular_aria: "../node_modules/angular-aria/angular-aria.min",
        angular_messages:"../node_modules/angular-messages/angular-messages.min",
        angular_material: "../node_modules/angular-material/angular-material.min",
        angular_bootstrap: "../node_modules/angular-ui-bootstrap/dist/ui-bootstrap",
        angular_bootstrap_tpls: "../node_modules/angular-bootstrap/ui-bootstrap-tpls",
        bootstrap: "../node_modules/bootstrap/dist/js/bootstrap.min",
        blockUI:"../node_modules/angular-block-ui/dist/angular-block-ui.min",
        routeResolver: "jaffa.routeResolver",
        cloudEndPointApi: "https://apis.google.com/js/client.js?onload=googleIDELoaded",
        apiService: "../services/apiService",
        utils: "../services/utils",
        underscore: "../node_modules/underscore/underscore-min",
        app: "app",
        jquery: "../node_modules/jquery/dist/jquery.min",
        ui_grid:"../node_modules/angular-ui-grid/ui-grid.min",
        oc_lazyload:"../node_modules/oclazyload/dist/ocLazyLoad.min"
    },
    shim: {
        app: ["angular", "routeResolver","angular_route","oc_lazyload","jquery"],
        navigationModule: ["routeResolver"],
        init: ["angular"],
        utilityService: ["init"],
        displayService: ["init"],
        routeResolver: ["angular","oc_lazyload"],
        angular: ["css!/node_modules/angular/angular-csp"],
        angular_touch: ["angular"],
        angular_sanitize: ["angular"],
        angular_route: ["angular"],
        angular_animate: ["angular"],
        angular_aria: ["angular"],
        angular_material: ["angular", "angular_aria", "angular_animate", "css!/node_modules/angular-material/angular-material.min", "css!/node_modules/angular-material/layouts/angular-material.layouts.min","css!/node_modules/angular-material/layouts/angular-material.layout-attributes.min"],
        angular_bootstrap: ["angular", "angular_animate", "angular_bootstrap_tpls", "css!/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp"],
        angular_bootstrap_tpls: ["angular"],
        bootstrap: ["jquery", "css!/node_modules/bootstrap/dist/css/bootstrap-theme.min", "css!/node_modules/bootstrap/dist/css/bootstrap.min"],
        blockUI:["angular","css!/node_modules/angular-block-ui/dist/angular-block-ui.min"],
        cloudEndPointApi: ["angular"],
        apiService: ["angular", "app"],
        utils: ["angular", "app"],
        ui_grid:["angular","css!/node_modules/angular-ui-grid/ui-grid.min"],
        oc_lazyload:["angular"]
    }

});
    
require(["app"], function () {
    // angular.bootstrap(document, ["jaffaApp"]);
});
