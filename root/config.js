/**
    This file is auto generated by Grunt Tasks. Please DO NOT EDIT this file manually. The changes will be overwritten.
    To update the app config edit "main.json" in app folder.
*/


require.config({
  "urlArgs":"v=replaced_during_build",
  "map":{
    "*":{
      "css":"/node_modules/require-css/css.js"
    }
  },
  "paths":{
  "angular": "node_modules/angular/angular.min",
  "angular-resource": "node_modules/angular-resource/angular-resource.min",
  "angular-bootstrap": "node_modules/angular-bootstrap/ui-bootstrap.min",
  "angular-bootstrap-tpl": "node_modules/angular-bootstrap/ui-bootstrap-tpls.min",
  "bootstrap": "node_modules/bootstrap/dist/js/bootstrap.min",
  "angular-animate": "node_modules/angular-animate/angular-animate.min",
  "angular-aria": "node_modules/angular-aria/angular-aria.min",
  "angular-material": "node_modules/angular-material/angular-material.min",
  "angular-dragdrop": "node_modules/angular-dragdrop/src/angular-dragdrop.min",
  "angular-loading-bar": "node_modules/angular-loading-bar/build/loading-bar.min",
  "angular-ui-router": "node_modules/angular-ui-router/release/angular-ui-router.min",
  "angular-ui-select": "node_modules/angular-ui-select/select.min",
  "angular-route": "node_modules/angular-route/angular-route.min",
  "es5-shim": "node_modules/es5-shim/es5-shim.min",
  "es5-sham": "node_modules/es5-shim/es5-sham.min",
  "jquery": "node_modules/jquery/dist/jquery.min",
  "modernizr": "jaffa/0.2.6/libs/modernizr/modernizr-custom",
  "ng-file-upload": "node_modules/ng-file-upload/dist/ng-file-upload.min",
  "oclazyload": "node_modules/oclazyload/dist/ocLazyLoad.min",
  "requirejs": "node_modules/requirejs/require",
  "underscore": "node_modules/underscore/underscore-min",
  "jaffa-config": "jaffa/0.2.6/providers/jaffa-config/jaffa-config.provider",
  "jaffa-lazyload": "jaffa/0.2.6/providers/jaffa-lazyload/jaffa-lazyload.provider",
  "jaffa-rjs-confg": "jaffa/0.2.6/providers/jaffa-rjs-confg/rjs-config.provider",
  "boot": "jaffa/0.2.6/boot",
  "app": "app/app",
  "home": "app/modules/home/home.controller",
  "header": "app/modules/header/header.controller",
  "footer": "app/modules/footer/footer.controller",
  "hello-world": "app/modules/hello-world/hello-world.controller",
  "world2": "app/modules/world2/world.controller",
  "testing-config": "app/modules/testing-config/testing-config.controller"
},
  "shim":{
  "angular": [],
  "angular-resource": [
    "angular"
  ],
  "angular-bootstrap": [
    "angular",
    "angular-bootstrap-tpl"
  ],
  "angular-bootstrap-tpl": [
    "angular"
  ],
  "bootstrap": [
    "jquery",
    "css!/node_modules/bootstrap/dist/css/bootstrap.min"
  ],
  "angular-animate": [
    "angular"
  ],
  "angular-aria": [
    "angular"
  ],
  "angular-material": [
    "angular",
    "angular-animate",
    "angular-aria",
    "css!/node_modules/angular-material/angular-material.min"
  ],
  "angular-dragdrop": [
    "angular"
  ],
  "angular-loading-bar": [
    "angular",
    "css!/node_modules/angular-loading-bar/build/loading-bar.min"
  ],
  "angular-ui-router": [
    "angular"
  ],
  "angular-ui-select": [
    "angular"
  ],
  "angular-route": [
    "angular"
  ],
  "es5-shim": [
    "es5-sham"
  ],
  "es5-sham": [],
  "jquery": [],
  "modernizr": [],
  "ng-file-upload": [
    "angular",
    "node_modules/ng-file-upload/dist/ng-file-upload-all.min",
    "node_modules/ng-file-upload/dist/ng-file-upload-shim.min"
  ],
  "oclazyload": [
    "angular"
  ],
  "requirejs": [],
  "underscore": [],
  "jaffa-config": [
    "angular"
  ],
  "jaffa-lazyload": [
    "angular"
  ],
  "jaffa-rjs-confg": [
    "angular"
  ],
  "boot": [],
  "app": [
    "angular"
  ],
  "home": [
    "angular",
    "css!/app/modules/home/home.style"
  ],
  "header": [
    "angular",
    "css!/app/modules/header/header.style"
  ],
  "footer": [
    "angular",
    "css!/app/modules/footer/footer.style"
  ],
  "hello-world": [
    "css!/css!app/modules/hello-world/hello-world.style"
  ],
  "world2": [
    "css!/app/modules/world2/world.style"
  ],
  "testing-config": [
    "css!/app/modules/testing-config/testing-config.style"
  ]
}

});

require(["app"], function () {
  angular.bootstrap(document, ["{%= name %}"]);
});

