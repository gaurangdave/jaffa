###Just Another Framework For AngularJS. (J.A.F.F.A)

#### J.A.F.F.A is AngularJS based framework intended to following and more,

1.  Static Web Project scaffolding - auto-create project structure to support and modularize app modules,libs,services.
2.  RequireJS, RequireCSS support to dynamically load module java-script and css files as well as AngularJS Modules.
3.  Enabling grunt tasks to automate following,
    1. Minify JS and CSS.
    2. Optimize Images.
    3. Auto create distribution folder with minified files. 
    4. Auto create controller and AngularJS services.
4.  Support for writing and running unit tests.


#### Getting Started
Follow the steps to download and use the template:

1. Install npm, grunt, grunt-cli and grunt-init.
2. Download/clone the template locally.
3. Run the command `grunt-init path to downloaded template`.
4. Run `npm install` to install all the node_modules. 
5. Run `grunt run-server` to run local dev server. After the server is started the default app automatically opens in browser.

#### Current and Upcoming Features (unordered)
- [X] Create a default project structure. (see <b>Getting Started</b>).
- [X] Dynamically load JS, CSS files.
- [X] Dynamically load AngularJS Modules.
- [X] Bundled local dev server. (run `grunt run-server` to run local dev server and load the app).
- [X] Create new app with Controller (run `create-controller` and provide app name to create a skeleton).
- [X] Create new service module (run `create-service` and provide app name for the service a skeleton).
- [X] Create distribution build (run `grunt build` to minify files and add it to new build folder).
- [X] Auto create URL and routing support for new views/controllers.
- [X] Auto crate RequireJS config for new AngularJS services.
- [ ] Support for writing unit tests.
- [ ] Support for end to end testing using Protractor.
- [ ] Ability to add other user libs. 
- [ ] Feature to upgrade the J.A.F.F.A framework for current running projects.


### Please suggest any improvements for documentation or the framework. Any one who wants to contribute is welcomed. :)

