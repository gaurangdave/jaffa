#Just Another Framework For AngularJS. (JAFFA)

#### JAFFA is AngularJS based framework intended to following and more,

1.  Static Web Project scaffolding - autocreate project structure to support and modularize app modules,libs,services.
2.  RequireJS, RequireCSS support to dynamically load module java-script and css files as well as AngularJS Modules.
3.  Enabling grunt tasks to automate following,
    1. Minify JS and CSS
    2. Optimize Images
    3. Auto create distribution folder with minified files. 
    4. Auto create controller and angularjs services. 
4.  Support for writing and running unit tests.


#### Getting Started
Follow the steps to download and use the template:

1. Install npm, grunt, grunt-cli and grunt-init.
2. Download/clone the template locally.
3. Run the command `grunt-init path to downloaded template`.
4. Run `npm install` to install all the node_modules. 
5. Run `grunt run-server` to run local dev server. After the server is started the default app automatically opens in browser.

#### Current and Upcoming Features
- [X] Create a default project structure. (see <b>Getting Started</b>).
- [X] Dynamically load JS, CSS files.
- [X] Dynamically load AngularJS Modules.
- [X] Bundled local dev server. (run `grunt run-server` to run local dev server and load the app).
- [X] Create new app with Controller (run `create-controller-module` and provide app name to create a skeleton).
- [X] Create new service module (run `create-service-module` and provide app name for the service a skeleton).

