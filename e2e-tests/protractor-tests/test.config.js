/**
 * @module config
 */

/**
 * Contains the default app deployment settings
 * @class config.test.config
 */

module.exports = {
    main: {
        /**
         * The protocol where the app runs.
         * @config main.protocol {String}
         */
        protocol: "http",

        /**
         * The host where the app runs.
         * @config main.host {String}
         */
        host: "apsautomation.envalfresco.com",

        /**
         * The selenium host
         * @config main.seleniumAdress {String}
         */
        seleniumAdress: 'http://localhost:4444/wd/hub',

        /**
         * The port where the app runs.
         * @config main.port {String}
         */
        port: "",

        /**
         * The web context for all the application pages.
         * @config main.webContextRoot {String}
         */
        webContextRoot: "/activiti-app",


        /**
         * The API context required for calls
         * @config main.apiContextRoot {String}
         */
        apiContextRoot: "/activiti-app",


        /**
         * The default admin email address.
         * @config main.adminEmail {String}
         */
        adminEmail: "admin@app.activiti.com",

        /**
         * The default admin password.
         * @config main.adminPassword {String}
         */
        adminPassword: "Password99",

        /**
         * The default full name for the administrator.
         * @config main.adminFullName {String}
         */
        adminFullName: "Administrator",

        /**
         * Generates the authorization string for http based on the user and password parameters that are given
         * @method basic_authorization
         * @param user {string}
         * @param password {string}
         * @returns {string} The basic http authorization string.
         */
        basic_authorization: function (user, password) {
            return 'Basic ' + Buffer(user + ':' + password).toString('base64');
        },

        rejectUnauthorized: false,

        /**
         * The JDBC URL
         * @config main.datasourceUrl {String}
         */
        datasourceUrl: "jdbc:mysql://127.0.0.1:3306/modeler?characterEncoding=UTF-8",

        /**
         * The Driver Class
         * @config main.datasourceDriver {String}
         */
        datasourceDriver: "com.mysql.jdbc.Driver",

        /**
         * The Data Source Username
         * @config main.datasourceUsername {String}
         */
        datasourceUsername: "alfresco",

        /**
         * The Data Source Password
         * @config main.datasourcePassword {String}
         */
        datasourcePassword: "alfresco",

        /**
         * Default size for browser width. (required as a workaround for Chrome issues)
         * @config {String} browser_width
         */
        browser_width: 1600,

        /**
         * Default size for browser width. (required as a workaround for Chrome issues)
         * @config {String} browser_height
         */
        browser_height: 900,

        /**
         * Timeout for element presence checks (required as a workaround for elements
         * being created while the page is loading)
         */
        presence_timeout: 60000,
        /**
         * Browser location where all exported models are saved
         * e.g.: "./browser_downloads_test_config"
         * Can be left empty and a default value is configured through Grunt task
         */
        download_default_directory: "",

        /**
         * APS version
         */
        aps_version: "1.8.1",

        rootPath: __dirname
    },

    admin: {
        /**
         * The protocol where the app runs.
         * @config main.protocol {String}
         */
        protocol: "http",

        /**
         * The host where the app runs.
         * @config main.host {String}
         */
        host: "localhost",

        /**
         * The port where the app runs.
         * @config main.port {String}
         */
        port: "9999",

        /**
         * The web context for all the application pages.
         * @config main.webContextRoot {String}
         */
        webContextRoot: "/activiti-admin",


        /**
         * The API context required for calls
         * @config main.apiContextRoot {String}
         */
        apiContextRoot: "",


        /**
         * The default admin email address.
         * @config main.adminEmail {String}
         */
        adminEmail: "admin",

        /**
         * The default admin password.
         * @config main.adminPassword {String}
         */
        adminPassword: "admin",

        /**
         * The default full name for the administrator.
         * @config main.adminFullName {String}
         */
        adminFullName: "admin"
    },

    share: {
        /**
         * The protocol where the app runs.
         * @config main.protocol {String}
         */
        protocol: "http://",

        /**
         * The host where the app runs.
         * @config main.host {String}
         */
        host: "localhost",

        /**
         * The port where the app runs.
         * @config main.port {String}
         */
        port: "9999",

        /**
         * The web context for all the application pages.
         * @config main.webContextRoot {String}
         */
        webContextRoot: "/share",


        /**
         * The API context required for calls
         * @config main.apiContextRoot {String}
         */
        apiContextRoot: null,


        /**
         * The default admin email address.
         * @config main.adminEmail {String}
         */
        adminEmail: "admin",

        /**
         * The default admin password.
         * @config main.adminPassword {String}
         */
        adminPassword: "password",

        /**
         * The default full name for the administrator.
         * @config main.adminFullName {String}
         */
        adminFullName: "Administrator user"
    },

    testRail: {
        /**
         * The host where TestRail runs.
         * @config testRail.host {String}
         */
        host: "alfresco.testrail.net",

        /**
         * The API context required for calls
         * @config main.apiContextRoot {String}
         */
        apiContextRoot: "/index.php?/api/v2/",

        /**
         * The API user email address.
         * @config testRail.apiEmail {String}
         */
        apiEmail: "activiti.qa.test@gmail.com",

        /**
         * The API user password.
         * @config testRail.apiPassword {String}
         */
        apiPassword: "123iopjkl",

        /**
         * TestRail test run id.
         * @config testRail.testRun {String}
         */
        testRun: "65"
    },

    google: {
        // https://support.google.com/accounts/answer/6010255

        /**
         * The gmail email address.
         * @config google.gmailEmail {String}
         */
        gmailEmail: "activiti.qa.test@gmail.com",

        /**
         * The gmail password.
         * @config google.gmailPassword {String}
         */
        gmailPassword: "123iopjkl",

        /**
         * The gmail protocol.
         * @config google.protocol {String}
         */
        protocol: "imaps",

        /**
         * The gmail imap (Internet Mail Access Protocol).
         * @config google.imap {String}
         */
        imap: 'imap.gmail.com',

        /**
         * The gmail imap port.
         * @config google.imapPort {Number}
         */
        imapPort: 993,

        /**
         * The tls (Transport Layer Security) email encryption settings.
         * @config google.tls {Boolean}
         */
        tls: true,

        /**
         * The gmail smtp (Simple Mail Transfer Protocol).
         * @config google.smtp {String}
         */
        smtp: "smtp.gmail.com",

        /**
         * The gmail smtp port.
         * @config google.smtpPort {Number}
         */
        smtpPort: 587,

        /**
         * How many times to check the inbox for new email
         * @config google.loopTime {Number}
         */
        loopTime: 60
    },

    box: {
        /**
         * The box email address.
         * @config box.boxEmail {String}
         */
        boxEmail: "activiti.qa.test@gmail.com",

        /**
         * The box password.
         * @config box.boxPassword {String}
         */
        boxPassword: "123iopjkl"
    },

    browserStack: {
        /**
         * The BrowserStack account email address.
         * @config browserStack.email {String}
         */
        email: "activiti.qa.test@gmail.com",

        /**
         * The BrowserStack account password.
         * @config browserStack.password {String}
         */
        password: "k1ngk0ng",

        /**
         * The BrowserStack username.
         * @config browserStack.user {String}
         */
        user: "qatest267",

        /**
         * The BrowserStack key.
         * @config browserStack.key {String}
         */
        key: "CDW6GpSxQ8PQzRzfYYsE",

        /**
         * The BrowserStack selenium address.
         * @config browserStack.seleniumAddress {String}
         */
        seleniumAddress: "http://hub-cloud.browserstack.com/wd/hub",

        /**
         * The BrowserStack local.
         * @config browserStack.local {String}
         */
        local: 'true',

        /**
         * The BrowserStack browser version.
         * @config browserStack.browser_version {String}
         */
        browser_version: '50.0',

        /**
         * The BrowserStack operating system.
         * Operating Systems example: {'Windows','OS X'}
         * @config browserStack.os {String}
         */
        os: 'OS X',

        /**
         * The BrowserStack operating system version.
         * @config browserStack.os_version {String}
         */
        os_version: 'Yosemite',

        /**
         * The BrowserStack screen resolution.
         * @config browserStack.resolution {String}
         */
        resolution: '1024x768',

        /**
         * Mobile
         */
        /**
         * The BrowserStack mobile platform.
         * Operating Systems example: {'MAC','ANDROID'}
         * @config browserStack.os {String}
         */
        //platform: 'MAC'

        /** The BrowserStack mobile platform.
         * Operating Systems example: {'MAC','ANDROID'}
         * @config browserStack.os {String}
         */
        //device: 'iPhone 5'
        },

        adf_catalog: {
            /**
             * URL of site
             */
            url: "https://devproducts.alfresco.com/"

        },

        adf: {
            /**
             * base
             */
            base: "http://adfauto.envalfresco.com",
            //base: "http://adfdev.lab.alfresco.me",
            //base: "http://localhost:",

            /**
             * adf port
             */
            adf_port: "",

            /**
             * adf login
             */
            adf_login: "/login",


            /**
             * activiti port
             */
            //activiti_port: "9999",

            /**
             * share port
             */
            //share_port: "8081",

            /**
             * activiti url
             */
            activiti_app: "/activiti-app/",

            /**
             * main admin username
             */
            mainAdminEmail: "admin",

            /**
             * main admin password
             */
            mainAdminPassword: "admin",

            /**
             * admin username
             */
            adminEmail: "admin@app.activiti.com",

            /**
             * admin password
             */
            adminPassword: "admin",

            /**
             * admin firstname
             */
            adminFirstName: "admin",

            /**
             * admin lastname
             */
            adminLastName: "admin",

            /**
             * APS admin email
             */
            apsAdminEmail: "admin",

            /**
             * APS admin full name
             */
            apsAdminFullName: "admin user",

            /**
             * APS job title
             */
            apsTenant: "test tenant",

            rootPath: __dirname,
        },

        adf_acs: { 
            /** 
             * The protocol where the app runs. 
             * @config main.protocol {String} 
             */ 
            protocol: "http",  

            /** 
             * The host where the app runs. 
             * @config main.host {String} 
             */ 
            host: "adfauto.envalfresco.com",
            //host: "adfdev.lab.alfresco.me",  
            //host: "localhost:3000",

            /** 
             * * The port where the app runs. 
             * * @config main.port {String} 
             * */ 
            port: "",

            /**
             * admin username
             */
            adminUser: "admin",

            /**
             * admin password
             */
            adminPassword: "admin",

            /**  
             * The ECM API context required for calls  
             * @config adf.ACSAPIContextRoot {String}  
             */ 
            apiContextRoot: "/alfresco/api/-default-/public",  

            /** 
             * share url 
             */ 
            share_app: "/share/page/",  

            /** 
             * ACS admin email 
             */ 
            acsAdminEmail: "admin@alfresco.com",  

            /** 
             * ACS admin full name 
             */ 
            acsAdminFullName: "admin admin",  

            /** 
             * ACS job title 
             */ 
            acsJobTitle: "N/A" 
        },

        adf_aps: {
            /** 
            * The protocol where the app runs. 
            * @config main.protocol {String} 
             */
            protocol: "http",

            /** 
            * The host where the app runs. 
            * @config main.host {String} 
            */
            host: "adfauto.envalfresco.com",
            //host: "adfdev.lab.alfresco.me",

            /** 
            * * The port where the app runs. 
            * * @config main.port {String} 
            * */
            port: "",

            /**
            * aps admin email
            */
            apsAdminEmail: "admin@app.activiti.com",

            /**
            * aps admin password
            */
            apsAdminPassword: "admin",

            /** 
             * APS admin full name 
             */
            apsAdminFullName: "Administrator",

            /** 
             * APS tenant
             */
            apsTenant: "test",

            /**  
            * The BPM API context required for calls  
            * @config adf.APSAPIContextRoot {String}  
            */
            apiContextRoot: "/activiti-app"
    },

        run: {
            /**
             * List of the suites that are ran by the default grunt tasks.
             * @config suites {array}
             */
            //APS suites
            //regression suites
            all_suites: ['admin_app', 'idm', 'kickstart', 'landing_page', 'rest_api', 'all_workflow'],
            smoke_suite: ['smoke'],

            admin_app_suite: ['admin_app'],
            idm_suite: ['idm'],
            kickstart_suite: ['kickstart'],
            landing_page_suite: ['landing_page'],
            rest_api_suite: ['rest_api'],
            share_integration_suite: ['share_integration'],
            all_workflow_suite: ['all_workflow'],

            //individual suites
            kickstart_data_models_suite: ['data_models'],
            rest_idm_suite: ['rest_idm'],
            rest_kickstart_decision_table_suite: ['rest_kickstart_decision_table'],
            rest_kickstart_suite: ['rest_kickstart'],
            rest_tasks_suite: ['rest_tasks'],
            rest_workflow_suite: ['rest_workflow'],
            workflow_suite: ['workflow'],
            workflow_decision_tables_suite: ['workflow_decision_tables'],
            workflow_form_rendering_suite: ['workflow_form_rendering'],
            workflow_fr_condition_operator_suite: ['workflow_fr_condition_operator'],
            workflow_fr_field_mandatory_suite: ['workflow_fr_field_mandatory'],
            workflow_fr_field_visibility_suite: ['workflow_fr_field_visibility'],
            workflow_stencils_suite: ['workflow_stencils'],
            workflow_tasks_suite: ['workflow_tasks'],

            //ADF suites
            adf_catalog_suites: ['adf_catalog'],
            adf_suites: ['adf']
        }
};
