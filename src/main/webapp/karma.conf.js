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
            require('karma-mocha-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        files: [
            './src/assets/jquery/jquery-1.11.2.min.js'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 60000,
        browsers: [
            'ChromeHeadless'
        ],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
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
        reporters: ['progress', 'junit', 'html', 'coverage-istanbul', 'mocha'],
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
            reports: ['html', 'json', 'clover'],
            fixWebpackSourcePaths: true
        },
        /** Console test report */
        mochaReporter: {
            output: 'minimal',
            ignoreSkipped: true,
            maxLogLines: -1
        }
    });
};
