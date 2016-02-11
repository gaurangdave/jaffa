require.config({

    map: {
        '*': {
            'css': '../node_modules/require-css/css.js'
        }
    },
    paths: {
        angular: '/node_modules/angular/angular.min',
        angular_touch: '/node_modules/angular-touch/angular-touch.min',
        angular_sanitize: '/node_modules/angular-sanitize/angular-sanitize.min',
        angular_route: '/node_modules/angular-route/angular-route.min',
        angular_animate: '/node_modules/angular-animate/angular-animate.min',
        angular_aria: '/node_modules/angular-aria/angular-aria.min',
        angular_material: '/node_modules/angular-material/angular-material.min',
        angular_bootstrap: '/node_modules/angular-ui-bootstrap/dist/ui-bootstrap',
        angular_bootstrap_tpls: '/node_modules/angular-bootstrap/ui-bootstrap-tpls',
        bootstrap: '/node_modules/bootstrap/dist/js/bootstrap.min',
        underscore: '/node_modules/underscore/underscore-min',
        routeResolver: 'routeResolver',
        cloudEndPointApi: 'https://apis.google.com/js/client.js?onload=googleIDELoaded',
        apiService: '/services/apiService',
        utils: '/services/util',
        underscore: '/node_modules/underscore/underscore-min',
        app: 'app',
        jquery: '/node_modules/jquery/dist/jquery.min'
    },
    shim: {
        app: ['angular', 'routeResolver', 'angular_route'],
        navigationModule: ['routeResolver'],
        init: ['angular'],
        bootstrap: ['angular'],
        utilityService: ['init'],
        displayService: ['init'],
        routeResolver: ['angular'],
        angular: ['css!/node_modules/angular/angular-csp'],
        angular_touch: ['angular'],
        angular_sanitize: ['angular'],
        angular_route: ['angular'],
        angular_animate: ['angular'],
        angular_aria: ['angular'],
        angular_material: ['angular', 'angular_aria', 'angular_animate', 'css!/node_modules/angular-material/angular-material.min', 'css!/node_modules/angular-material/angular-material.layouts.min'],
        angular_bootstrap: ['angular', 'angular_animate', 'angular_bootstrap_tpls', 'css!/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp'],
        angular_bootstrap_tpls: ['angular'],
        bootstrap: ['jquery', 'css!/node_modules/bootstrap/dist/css/bootstrap-theme.min', 'css!/node_modules/bootstrap/dist/css/bootstrap.min'],
        cloudEndPointApi: ['angular'],
        apiService: ['angular', 'app'],
        utils: ['angular', 'app']
    }

});

require(['app'], function () {
    angular.bootstrap(document, ['app']);
});
