require.config({

    map: {
        '*':
        {
            'css':'/static/framework/requirecss/css.js'
        }
    },
    paths:{
        angular:'/static/node_modules/angular/angular',
        angular_touch:'/static/node_modules/angular-touch/angular-touch.min',
        angular_sanitize:'/static/node_modules/angular-sanitize/angular-sanitize.min',
        angular_route:'/static/node_modules/angular-route/angular-route.min',
        angular_animate:'/static/node_modules/angular-animate/angular-animate.min',
        angular_aria:'/static/node_modules/angular-aria/angular-aria.min',
        angular_material:'/static/node_modules/angular-material/angular-material.min',
        angular_bootstrap:'/static/node_modules/angular-bootstrap/ui-bootstrap',
        angular_bootstrap_tpls:'/static/node_modules/angular-bootstrap/ui-bootstrap-tpls',
        underscore:'/static/node_modules/underscore/underscore-min',
        routeResolver:'/static/framework/routeResolver',
        cloudEndPointApi:'https://apis.google.com/js/client.js?onload=googleIDELoaded',
        apiService:'/static/service/apiService',
        utils:'/static/service/Util',
        app:'/static/framework/app',
        bootstrap:'/static/node_modules/bootstrap/dist/js/bootstrap'

    },
    shim:{
        app:['angular','routeResolver','angular_bootstrap','angular_bootstrap_tpls','angular_route'],
        navigationModule:['routeResolver','angular_bootstrap','angular_bootstrap_tpls'],
        init:['angular','angular_touch','angular_sanitize','angular_route','angular_animate','angular_aria','angular_material','jquery','underscore','routeResolver','angular_bootstrap','angular_bootstrap_tpls'],
        bootstrap:['angular'],
        utilityService:['init'],
        displayService:['init'],
        routeResolver:['angular'],
        angular_touch:['angular'],
        angular_sanitize:['angular'],
        angular_route:['angular'],
        angular_animate:['angular'],
        angular_aria:['angular'],
        angular_material:['angular'],
        angular_bootstrap:['angular','angular_animate'],
        angular_bootstrap_tpls:['angular','angular_bootstrap','angular_animate'],
        cloudEndPointApi:['angular'],
        apiService:['angular','app'],
        utils:['angular','app']
    }

});

require(['app'], function(){
    angular.bootstrap(document,['app']);
});