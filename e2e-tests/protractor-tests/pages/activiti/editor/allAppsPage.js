/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");
var importAnAppDialog = require("./components/importAnAppDialog.js");
var createAppDialog = require("./components/createAppDialog.js");

/**
 * Provides the all apps page within the "Kickstart" application.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.AllAppsPage
 */

var leftMenuElement = element(by.xpath("//*/a[@ng-click='activateFilter(filter)' and text()='My app definitions']"));

module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/apps'
     */
    url: {value: TestConfig.main.webContextRoot + '/editor/#/apps'},

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar;
        }
    },

    /**
     * Provide app header
     *
     * @property getAppsHeader
     */
    getAppsHeader: {
        get: function () {
            return element(by.xpath(".//*[@id='list-header']//h2[text()='App definitions']"));
        }
    },

    /**
     * Provide app by name
     *
     * @param appName
     * @method getAppByName
     */
    getAppByName: {
        value: function (appName) {
            element(by.xpath("//h3[contains(text(),'" + appName + "')]")).click();
        }
    },


    /**
     * Provides the create an app dialog
     *
     * @property createAppDialog
     * @type astrolabe.Page
     */
    createAppDialog: {
        get: function () {
            return createAppDialog;
        }
    },

    /**
     * Provides the dialog that shows when importing an application.
     *
     * @property importAnAppDialog
     * @type astrolabe.Page
     */
    importAnAppDialog: {
        get: function () {
            return importAnAppDialog;
        }
    },

    /**
     * Provides the import button.
     *
     * @property btnImportApp
     * @type protractor.Element
     */
    btnImportApp: {
        get: function () {
            return element(by.xpath("//div[@class='fixed-container']/div/button[@ng-click='importAppDefinition()']"));
        }
    },

    /**
     * Clicks the import app button
     *
     * @method clickImportApp
     */
    clickImportApp: {
        value: function () {
            this.btnImportApp.click();
        }
    },

    /**
     * Imports an app to the web application
     *
     * @param {String} pathToAppToUpload The path of the .zip archive which contains the app
     * @method uploadApp
     */
    uploadApp: {
        value: function (pathToAppToUpload) {
            Util.waitUntilElementIsVisible(this.btnImportApp);
            this.clickImportApp();
            Util.uploadFile(this.importAnAppDialog.fileInputField, this.importAnAppDialog.fileInputField, pathToAppToUpload);
        }
    },

    /**
     * Selects an app given its index in the list
     *
     * @param index
     * @method selectAppByIndex
     */
    selectAppByIndex: {
        value: function (index) {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-repeat='app in model.apps.data'][" + index + "]//a")));
            element(by.xpath("//div[@ng-repeat='app in model.apps.data'][" + index + "]//a")).click();
        }
    },

    /**
     * Clicks the create app button
     *
     * @method clickCreateApp
     */
    clickCreateApp: {
        value: function () {
            element(by.buttonText('Create App')).click();
        }
    },

    /**
     * Creates a new app with the given name
     *
     * @param appName
     * @method createNewApp
     */
    createNewApp: {
        value: function (appName) {
            this.clickCreateApp();
            this.createAppDialog.fillName(appName);
            this.createAppDialog.clickOk();
        }
    },

    sideFilterLocator: {
        value: function (filterName) {
            return element(by.cssContainingText('.ng-binding' , filterName));

        }
    },

    /**
     * select the filter with given filter name
     * @param filter
     * @method selectFilter
     */
    selectFilter: {
        value: function (filter) {
            Util.waitUntilElementIsVisible(this.sideFilterLocator(filter));
            this.sideFilterLocator(filter).click();
        }
    },

    /**
     * locate app by name
     * @param appName
     * @method getAppName
     */
    locateAppByName: {
        value: function (appName) {
            var selectedAppName =  element(by.repeater('app in model.apps.data')).element(by.cssContainingText('h3[class="ng-binding"]', appName)).getText();
            return selectedAppName;
        }
    },

    /**
     * Check app is not displayed
     * @param appName
     * @method verifyAppNotDisplayed
     */

    verifyAppNotDisplayed: {
       value: function (appName) {
          /* this.locateAppByName(appName).then(function (items) {
               expect(items.length).toBe(0);
           });*/
           expect(element(by.xpath("//h3[contains(text(),'" + appName + "')]")).isPresent()).toBe(false);
          //expect(browser.isElementPresent(this.locateAppByName(appName))).toBeFalsy();

       }
    },
    waitForAppsPageToLoad: {
        value: function () {
            Util.waitUntilElementIsVisible(leftMenuElement);
        }
    },

    allAppsRepeater:{
        get:function(){
            return element.all(by.repeater('app in model.apps.data'));
        }
    },
    getNumberOfAppsAvailable:{
        value:function(){
            return this.allAppsRepeater.count();
        }
    }

});