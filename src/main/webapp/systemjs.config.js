/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'angular2-notifications': 'npm:angular2-notifications',
      'angular2-logger': 'npm:angular2-logger',
      'vis': 'npm:vis',
      'moment': 'npm:moment',
      'moment-duration-format': 'npm:moment-duration-format',
      'jenkins-api-ts-typings': 'npm:jenkins-api-ts-typings'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-notifications': { 
          main: './dist/index.js', 
          defaultExtension: 'js' 
      },
      'angular2-logger': { 
          defaultExtension: 'js'
      },
      'moment': {
          main: './moment.js',
          defaultExtension: 'js'
      },
      'moment-duration-format': {
          main: './lib/moment-duration-format.js',
          defaultExtension: 'js'
      },
      'vis': {
          main: './dist/vis.js', 
          defaultExtension: 'js'
      },
      'jenkins-api-ts-typings': {
          main: './dist/jenkins-api-ts-typings.umd.js', 
          defaultExtension: 'js'
      }
    }
  });
})(this);
