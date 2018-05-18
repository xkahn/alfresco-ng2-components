/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 9/1/2015.
 */

var TestConfig = require("./test.config.js");
var availableBrowsers = ['chrome', 'firefox', 'internet explorer', 'Edge', 'safari', 'Opera', 'iPhone', 'iPad', 'android'];
var defaultBrowser = "chrome";
var defaultBaseUrl = TestConfig.main.protocol + '://' + TestConfig.main.host + ':' + TestConfig.main.port;
var shareDefaultBaseUrl = TestConfig.share.protocol + '://' + TestConfig.share.host + ':' + TestConfig.share.port;
var adminDefaultBaseUrl = TestConfig.admin.protocol + '://' + TestConfig.admin.host + ':' + TestConfig.admin.port;
var finalReportFileName = "aggregateReport.html";
var lintReportFileName = "eslintReport.html";
var defaultDownloadDir = (TestConfig.main.download_default_directory == "" || TestConfig.main.download_default_directory == undefined) ?
                                "./browser_downloads_default" : TestConfig.main.download_default_directory;
var path = require('path');

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            options: {
                stdout: true
            },

            selenium_standalone_start: {
                command: "java -jar selenium-server-standalone-3.0.1.jar -port 4444"
            },

            protractor_update: {
                command: 'webdriver-manager update'
            },

            selenium_server_start: {
                command: 'webdriver-manager start',
                options: {
                    async: true
                }
            },

            generate_report: {
                command: './node_modules/junit-viewer/bin/junit-viewer --results=testResults --save=' + finalReportFileName
            },

            build_doc: {
                command: 'yuidoc .'
            }

        },

        clean: {
            folder: ["results/*.*", "testResults/*.*", "logs/*.*", "aggregateReport.html"]
        },
        
        protractor: {
            options: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js"
            },

            custom_task: {
                keepAlive: true,
                options: {
                    args: {
                        capabilities: {
                            'browserName': grunt.option("browserName")
                        },
                        suite: grunt.option("suite")
                    }
                }
            },

            aps_regression: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            },
                            app: 'main'
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'loggingPrefs' : {"browser": "ALL"},
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        suite: TestConfig.run.all_suites,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_smoke: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port,
                                'testRailRunId': grunt.option("testRun") ? grunt.option("testRun") : TestConfig.testRail.testRun
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'loggingPrefs' : {"browser": "ALL"},
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        suite: TestConfig.run.smoke_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_admin_app: {
                keepAlive: true,
                configFile: "protractor.admin.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.admin.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.admin.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.admin.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.admin_app_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? adminDefaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_idm: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.idm_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_kickstart: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.kickstart_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_landing_page: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.landing_page_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_rest_api: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            },
                            app: 'main'
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.rest_api_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_share_integration: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.share_integration_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_all_workflow: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.all_workflow_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_kickstart_data_models: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.kickstart_data_models_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_rest_idm: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.rest_idm_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_rest_kickstart_decision_table: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.rest_kickstart_decision_table_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_rest_kickstart: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.rest_kickstart_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_rest_tasks: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.rest_tasks_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_rest_workflow: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.rest_workflow_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.workflow_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_decision_tables: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.workflow_decision_tables_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_form_rendering: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'loggingPrefs' : {"browser": "ALL"},
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        suite: TestConfig.run.workflow_form_rendering_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_fr_condition_operator: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.workflow_fr_condition_operator_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_fr_field_mandatory: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {

                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.workflow_fr_field_mandatory_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_fr_field_visibility: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.workflow_fr_field_visibility_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_stencils: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.workflow_stencils_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_workflow_tasks: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'loggingPrefs' : {"browser": "ALL"},
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        suite: TestConfig.run.workflow_tasks_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            aps_test: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                                
                            },
                            app: 'main'
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'loggingPrefs' : {"browser": "ALL"},
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        specs: [grunt.option("testName")],
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },
            // Runs in headless browser - could be used by Back-end tests only
            // Configuration cannot be used due to chromedriver issue: #4050
            aps_rest_test: {
                keepAlive: true,
                configFile: "protractor.activiti.conf.js",
                options: {
                    args: {
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'chromeOptions': {
                                args: [ '--headless', '--disable-gpu'
                                ]
                            }
                        },
                        specs: [grunt.option("testName")]
                    }
                }
            },

            aps_ie: {
                keepAlive: true,
                configFile: "protractor.ie.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': 'internet explorer'
                        },
                        suite: TestConfig.run.smoke_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl")
                    }
                }
            },

            stack: {
                keepAlive: true,
                configFile: "protractor.stack.conf.js",
                options: {
                    args: {
                        params: {
                            conn_env: {
                                'host': grunt.option("host") ? grunt.option("host") : TestConfig.main.host,
                                'protocol': grunt.option("protocol") ? grunt.option("protocol") : TestConfig.main.protocol,
                                'port': grunt.option("port") ? grunt.option("port") : TestConfig.main.port
                            }
                        },
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'browserstack.local': grunt.option("local") ? grunt.option("local") : TestConfig.browserStack.local,
                            browser_version: grunt.option("browserVersion") ? grunt.option("browserVersion") : TestConfig.browserStack.browser_version,
                            os: grunt.option("os") ? grunt.option("os") : TestConfig.browserStack.os,
                            os_version: grunt.option("osVersion") ? grunt.option("osVersion") : TestConfig.browserStack.os_version,
                            resolution: grunt.option("resolution") ? grunt.option("resolution") : TestConfig.browserStack.resolution
                        },
                        suite: TestConfig.run.smoke_suite,
                        baseUrl: (grunt.option("baseUrl") == undefined || grunt.option("baseUrl") == "") ? defaultBaseUrl : grunt.option("baseUrl"),

                    }
                }
            },

            adf_catalog: {
                keepAlive: true,
                configFile: "protractor.adf.conf.js",
                options: {
                    args: {
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser
                        },
                        suite: TestConfig.run.adf_catalog_suites,
                        baseUrl: (grunt.option("catalogBaseUrl") == undefined || grunt.option("catalogBaseUrl") == "") ? shareDefaultBaseUrl : grunt.option("catalogBaseUrl")
                    }
                }
            },

            adf_test: {
                keepAlive: true,
                configFile: "protractor.adf.conf.js",
                options: {
                    args: {
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        specs: [grunt.option("testName")],
                        baseUrl: (grunt.option("catalogBaseUrl") == undefined || grunt.option("catalogBaseUrl") == "") ? shareDefaultBaseUrl : grunt.option("catalogBaseUrl")
                    }
                }
            },

            adf_all: {
                keepAlive: true,
                configFile: "protractor.adf.conf.js",
                options: {
                    args: {
                        capabilities: {
                            'browserName': (availableBrowsers.indexOf(grunt.option("browserName")) > 0) ? grunt.option("browserName") : defaultBrowser,
                            'chromeOptions': {
                                prefs: {
                                    // Set download options
                                    download: {
                                        'prompt_for_download': false,
                                        'default_directory': grunt.option("download_dir") ? path.join(__dirname, grunt.option("download_dir")) : path.join(__dirname, defaultDownloadDir)
                                    }
                                }
                            }
                        },
                        suite: grunt.option("suiteName"),
                        baseUrl: (grunt.option("catalogBaseUrl") == undefined || grunt.option("catalogBaseUrl") == "") ? shareDefaultBaseUrl : grunt.option("catalogBaseUrl")
                    }
                }
            }
        },

        // eslint configuration
        eslint: {
            options: {
                format: require('eslint-html-reporter'),
                outputFile: lintReportFileName
            },
            target: [
                '**/*.js',
                '**/*/*.js'
            ]
        }
    });

    // Utility tasks
    grunt.registerTask('deploy', ['shell:protractor_update', 'shell:selenium_server_start']);
    grunt.registerTask('ie_deploy', ['shell:selenium_standalone_start']);
    grunt.registerTask('build_doc', ['shell:build_doc']);

    // Helper tasks
    grunt.registerTask('test:run', ['protractor:custom_task']);



    // APS tasks
    //regression suites
    grunt.registerTask('test:aps_regression', ['clean:folder', 'protractor:aps_regression']);

    grunt.registerTask('test:aps_admin_app', ['clean:folder', 'protractor:admin_app', 'shell:generate_report']);
    grunt.registerTask('test:aps_idm', ['clean:folder', 'protractor:aps_idm', 'shell:generate_report']);
    grunt.registerTask('test:aps_kickstart', ['clean:folder', 'protractor:aps_kickstart', 'shell:generate_report']);
    grunt.registerTask('test:aps_landing_page', ['clean:folder', 'protractor:aps_landing_page', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_api', ['clean:folder', 'protractor:aps_rest_api', 'shell:generate_report']);
    grunt.registerTask('test:aps_share_integration', ['clean:folder', 'protractor:aps_share_integration', 'shell:generate_report']);
    grunt.registerTask('test:aps_all_workflow', ['clean:folder', 'protractor:aps_all_workflow', 'shell:generate_report']);

    //Smoke
    grunt.registerTask('test:aps_smoke', ['clean:folder', 'protractor:aps_smoke', 'shell:generate_report']);

    //individual suites
    grunt.registerTask('test:aps_kickstart_data_models', ['clean:folder', 'protractor:aps_kickstart_data_models', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_idm', ['clean:folder', 'protractor:aps_rest_idm', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_kickstart_decision_table', ['clean:folder', 'protractor:aps_rest_kickstart_decision_table', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_kickstart', ['clean:folder', 'protractor:aps_rest_kickstart', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_tasks', ['clean:folder', 'protractor:aps_rest_tasks', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_workflow', ['clean:folder', 'protractor:aps_rest_workflow', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow', ['clean:folder', 'protractor:aps_workflow', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_decision_tables', ['clean:folder', 'protractor:aps_workflow_decision_tables', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_form_rendering', ['clean:folder', 'protractor:aps_workflow_form_rendering', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_fr_condition_operator', ['clean:folder', 'protractor:aps_workflow_fr_condition_operator', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_fr_field_mandatory', ['clean:folder', 'protractor:aps_workflow_fr_field_mandatory', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_fr_field_visibility', ['clean:folder', 'protractor:aps_workflow_fr_field_visibility', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_stencils', ['clean:folder', 'protractor:aps_workflow_stencils', 'shell:generate_report']);
    grunt.registerTask('test:aps_workflow_tasks', ['clean:folder', 'protractor:aps_workflow_tasks', 'shell:generate_report']);

    //individual spec file
    grunt.registerTask('test:aps_test', ['clean:folder', 'protractor:aps_test', 'shell:generate_report']);
    grunt.registerTask('test:aps_rest_test', ['clean:folder', 'protractor:aps_rest_test', 'shell:generate_report']);

    //ie
    grunt.registerTask('test:activiti_ie', ['clean:folder', 'protractor:activiti_ie', 'shell:generate_report']);

    // BrowserStack
    grunt.registerTask('test:stack', ['clean:folder', 'protractor:stack', 'shell:generate_report']);

    //adf_catalog tasks
    grunt.registerTask('test:adf_catalog', ['clean:folder', 'protractor:adf_catalog', 'shell:generate_report']);

    //adf
    grunt.registerTask('test:adf_all', ['clean:folder', 'protractor:adf_all', 'shell:generate_report']);

    //Register eslint task
    grunt.registerTask('lint', ['eslint']);
};