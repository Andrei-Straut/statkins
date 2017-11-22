// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-junit-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-htmlfile-reporter'),
            require('karma-spec-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222'
                ]
            }
        },
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['progress', 'junit', 'html', 'coverage-istanbul', 'spec'],
        /** HTML Test Report */
        htmlReporter: {
            outputFile: 'dist/test-results/test-report.html',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },
        /** jUnit-style XML Test Report */
        junitReporter: {
            outputDir: 'dist/test-results', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'test-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
        },
        /** HTML Coverage Report */
        coverageIstanbulReporter: {
            dir: 'dist/test-results/coverage',
            reports: ['html', 'json'],
            fixWebpackSourcePaths: true
        },
        /** Console test report */
        specReporter: {
            maxLogLines: 5, // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false, // do not print information about failed tests
            suppressPassed: false, // do not print information about passed tests
            suppressSkipped: true, // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        }
    });
};
