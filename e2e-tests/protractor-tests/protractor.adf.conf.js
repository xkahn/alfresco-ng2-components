/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Hussain Ashraf on 22/11/2016.
 */

/**
 * @module config
 */

var HtmlReporter = require('protractor-jasmine2-html-reporter');
var path = require('path');
var sanitize = require("sanitize-filename");
var TestConfig = require("./test.config.js");
var log4js = require('log4js'); // include log4js
var fs = require('fs');
var rimraf = require('rimraf');


//var protractorFlake = require('protractor-flake');

/**
 * Contains the settings required by Protractor
 * This config file should be used when testing ACTIVITI E2E.
 * @class config.protractor.activiti.conf
 */
exports.config = {

    /*params: {
        conn_env: {
            protocol: '',
            host: '',
            port: ''
        }
    },*/


    capabilities: {
        browserName: TestConfig.browser,
        shardTestFiles: true,
        maxInstances: 1
    },


    specs: [
        './adf_suites/*_tests.js',
        './adf_suites/*/*_tests.js'
    ],


    beforeLaunch: function () {
        var htmlReporterScreenshotsFolder = './results/reportscreenshot';

        fs.exists(htmlReporterScreenshotsFolder, function(exists, error) {
            if (exists) {
                rimraf(htmlReporterScreenshotsFolder, function(err) {
                    console.log('[ERROR] rimraf: ', err);
                });
            }

            if(error) {
                console.log('[ERROR] fs', error);
            }
        });
    },
    
    /**
     * This method is automatically ran before a suite starts.
     * @config
     */
    onPrepare: function () {

        /*Assign external environment parameters if present*/
        /*
        if (browser.params.conn_env) {
            if (browser.params.conn_env.protocol && browser.params.conn_env.protocol !== '') {
                console.log("ADDED PROTOCOL : " + browser.params.conn_env.protocol);
                TestConfig.main.protocol = browser.params.conn_env.protocol;
            }
            if (browser.params.conn_env.host && browser.params.conn_env.host !== '') {
                console.log("ADDED HOST : " + browser.params.conn_env.host);
                TestConfig.main.host = browser.params.conn_env.host;
            }
            if (browser.params.conn_env.port && browser.params.conn_env.port !== '') {
                console.log("ADDED PORT : " + browser.params.conn_env.port);
                TestConfig.main.port = browser.params.conn_env.port;
            }
        }
*/
        var jasmineReporters = require("jasmine-reporters");

        browser.ignoreSynchronization = true;

        // Disable animations so e2e tests run more quickly - START
        var disableNgAnimate = function () {
            angular.module('disableNgAnimate', []).run(['$animate', function ($animate) {
                $animate.enabled(false);
            }]);
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        // Disable animations so e2e tests run more quickly - END

        /*
         * Forces the browser window to resize to the given parameters.
         */
        browser.manage().window().setSize(TestConfig.main.browser_width, TestConfig.main.browser_height);

        /*
         * Get browser name and version
         * Usage: browser.browserName, browser.version
         */
        browser.getCapabilities().then(function (cap) {
            browser.browserName = cap.get('browserName');
            browser.version = cap.get('version');
        }).then(function (cap) {
            var prePendStr = browser.browserName + "-" + browser.version + "-";
            var generatedSuiteName = Math.random().toString(36).substr(2, 5);
            var junitReporter = new jasmineReporters.JUnitXmlReporter(
                {
                    consolidateAll: true,
                    savePath: 'testResults',
                    // this will produce distinct xml files for each capability
                    filePrefix: 'JUNITxmloutput-' + generatedSuiteName,
                });
            jasmine.getEnv().addReporter(junitReporter);
        });


        /*
         * Adds the logger: log4js
         *
         * Installation: npm install -g log4js
         *
         * Can access global variable logger
         * Example: logger.info("test")
         */
        var mkdirSync = function (path) {
            try {
                fs.mkdirSync(path);
            } catch (e) {
                if (e.code != 'EEXIST') throw e;
            }
        };
        mkdirSync(path.join('logs'));
        var cDate = new Date();
        var fileName = cDate.getDate() + "_" + (cDate.getMonth() + 1) + "_" + (cDate.getYear() + 1900) + "_";
        fileName = fileName + cDate.getHours() + "_" + cDate.getMinutes() + "_" + cDate.getSeconds();

        log4js.configure({
            appenders: [
                {
                    "type": "console"
                },
                {
                    "type": "file",
                    "filename": "./logs/" + fileName + "-log_file.log",
                    "maxLogSize": 20480,
                    "backups": 3
                }
            ]
        });
        global.logger = log4js.getLogger();

        /*
         * Adds the html-screenshot reporter.
         */
        jasmine.getEnv().addReporter(new HtmlReporter({
                // [Mandatory] Folder for results.
                savePath: "./results/report",
                //savePath: "results",
                screenshotsFolder: "screenshot",

                // [Optional] Screenshot for only failed tests
                takeScreenshotsOnlyOnFailures: true,
                // [Optional] Report for tests.
                takeScreenshots: true,
                // [Optional] Html report document name. Default is report.html.
                filePrefix: 'index',
                fixedScreenshotName: true,

                // [Optional] The function passed as second argument to the constructor is used to build up
                // paths for screenshot files. If you omit the path builder, a GUID is used by default instead.
                pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {

                    var test = sanitize(descriptions[1]);
                    var step = sanitize(descriptions[0]);

                    var currentDate = new Date();

                    var result_folder = capabilities.get('browserName') + "_" + currentDate.getDate() + '-'
                        + (currentDate.getMonth() + 1) + '-' + (currentDate.getYear() + 1900);

                    var result_file = currentDate.getHours() + '-' + currentDate.getMinutes() + '-' + currentDate.getSeconds()
                        + '_' + test + '_' + step;

                    return path.join(result_folder, result_file);
                }
            })
        );
        var failedSpec = 0;
        var myReporter = {

            jasmineStarted: function (suiteInfo) {
                logger.info('Running suite with ' + suiteInfo.totalSpecsDefined + " specs");
                failedSpec = 0;
            },

            suiteStarted: function (result) {
                logger.info('Suite started: ' + result.description);
            },

            specStarted: function (result) {
                logger.info("Spec started: " + result.description);
            },

            specDone: function (result) {
                logger.info('Spec: \"' + result.description + '\" was ' + result.status);
                for (var i = 0; i < result.failedExpectations.length; i++) {
                    logger.error("Failure " + result.failedExpectations[i].message);
                    logger.error(result.failedExpectations[i].stack);

                }
                if (result.failedExpectations.length > 0) {
                    failedSpec++;
                }
            },

            suiteDone: function (result) {
                logger.info('Suite: \"' + result.description + '\" was ' + result.status);

                if (failedSpec > 0) {
                    logger.error('Suite: \"' + result.description + '\" is ' + 'FAILED');
                    logger.error('Failed: ' + failedSpec + " specs");
                } else {
                    logger.info('Suite: \"' + result.description + '\" is ' + 'PASSED');
                }
            },

            jasmineDone: function () {
                logger.info('Finished suite');
            }
        };

        jasmine.getEnv().addReporter(myReporter);

        browser.getProcessedConfig().then(function(config) {
            browser.downloadDir = config.capabilities.chromeOptions.prefs.download.default_directory;
            logger.info('Create default directory for export feature.', browser.downloadDir);
            mkdirSync(browser.downloadDir);
        });

        return browser.getCapabilities();

    },

    /*
     * TODO: This is a workaround for Document Preview in file upload tests. For non-previewable
     * file types rendering often takes in excess of 30 (default) seconds and causes serious test
     * failures. This option increases it to 45 sec.
     */
    jasmineNodeOpts: {showColors: true, defaultTimeoutInterval: 600000},

    //Needs to be added for beforeAll and afterAll keywords
    framework: 'jasmine2',

    /**
     * The address of a running selenium server (must be manually start before running the tests). If this is specified seleniumServerJar and seleniumPort will be ignored.
     * @config {String} seleniumAddress
     */
    seleniumAddress: 'http://localhost:4444/wd/hub',

    /**
     * A base URL for your application under test. Calls to protractor.get() with relative paths will be prepended with this.
     * @config {String} baseUrl
     */
    catalogBaseUrl: "https://devproducts.alfresco.com/",

    /**
     * The suites definition
     * @config {String} suites
     */
    suites: {
        marouan: './adf_suites/marouan_test.js',

        adf_catalog: './adf_suites/catalog//*.js',
        adf: './adf_suites//*.js',

        card_view: './adf_suites/card_view_smoke_tests.js',
        data_table: [
            './adf_suites/data_table_component.js',
            './adf_suites/data_table_component_selection.js'
        ],
        document_list: './adf_suites/document_list_component.js',
        pagination: [
            './adf_suites/document_list_pagination.js',
            './adf_suites/trashcan_pagination.js',
            './adf_suites/pagination_empty_current_page.js',
            './adf_suites/processlist_pagination.js',
            './adf_suites/pagination_processlist_addingProcesses.js',
            './adf_suites/task_list_pagination.js',
            './adf_suites/sort_tasklist_pagination.js',
            './adf_suites/processlist_pagination.js',
            './adf_suite/pagination_tasklist_addingTasks.js'
        ],
        form_widgets: './adf_suites/form_widgets_component.js',
        login: './adf_suites/login_component.js',
        search: [
            './adf_suites/search_component.js',
            './adf_suites/search_page_component.js'
        ],
        tag: './adf_suites/tag_component.js',
        theming: './adf_suites/theming_component.js',
        uploader: './adf_suites/uploader_component.js',
        user_info: './adf_suites/user_info_component.js',
        viewer: './adf_suites/viewer_content_services_component.js',
        start_task: [
            './adf_suites/start_task_task_app.js',
            './adf_suites/start_task_custom_app.js'
        ],
        analytics: './adf_suites/analytics_component.js',
        start_process: './adf_suites/start_process_component.js',
        infinite_scroll: './adf_suites/infinite_scrolling.js',
        process_filters: './adf_suites/process_filters_component.js'
    },

    /**
     * Root element where 'ng-app' attribute should be specified in order for Protractor to sync with the page.
     * @config {String} rootElement
     */
    rootElement: 'body',

    /**
     * Max timeout for scripts.
     * @config {String} allScriptsTimeout
     */
    allScriptsTimeout: 600000,
    getPageTimeout: 60000
};
