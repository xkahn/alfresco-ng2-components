/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 6/1/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var EC = protractor.ExpectedConditions;
var addAppToLandingPageDialog = require("./components/addAppToLandingPageDialog.js");
var Util = require("../../util/util.js");
var navbar = require("./components/navbar.js");

/**
 * Provides the Landing Page
 * @module pages
 * @submodule activiti
 * @class pages.activiti.LandingPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/#'
     */
    url: {value: TestConfig.main.webContextRoot + '/#'},

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar
        }
    },

    /**
     * Provides the dialog for adding an app to the landing page.
     *
     * @property addAppToLandingPageDialog
     * @type astrolabe.Page
     */

    addAppToLandingPageDialog: {
        get: function () {
            return addAppToLandingPageDialog;
        }
    },

    /**
     * Provides the "Kickstart" application.
     *
     * @property kickstart
     * @type protractor.Element
     */

    kickstart: {
        get: function () {
            return element(by.xpath("//*/div[@id='kickstart']/*/a[contains(@href,'editor')]"))
        }
    },

    /**
     * Provides the "My Tasks" application.
     *
     * @property myTasks
     * @type protractor.Element
     */

    myTasks: {
        get: function () {
            Util.waitUntilElementIsVisible(element(by.css("a[href*='/activiti-app/workflow/']")));
            return element(by.css("a[href*='/activiti-app/workflow/']"));
        }
    },

    /**
     * Provides the "Identity management" application.
     *
     * @property management
     * @type protractor.Element
     */

    management: {
        get: function () {
            return element(by.xpath("//*/div[@id='identity']//a"));
        }
    },

    /**
     * Provides the "Analytics" application.
     *
     * @property analytics
     * @type protractor.Element
     */

    analytics: {
        get: function () {
            return element(by.xpath(".//div[@id='analytics']/div/a"));
        }
    },

    /**
     * Opens the "Kickstart" application.
     *
     * @method clickKickstartApp
     */

    clickKickstartApp: {
        value: function () {
            Util.waitUntilElementIsVisible(this.kickstart);
            this.kickstart.click();
            Util.waitUntilElementIsVisible(element(by.css("input[ng-change='filterDelayed()']")));
        }
    },

    /**
     * Opens "My Tasks" application.
     *
     * @method clickMyTaskApp
     */

    clickMyTasksApp: {
        value: function () {
            Util.waitUntilElementIsVisible(this.myTasks);
            this.myTasks.click();
            Util.waitUntilElementIsVisible(element(by.css("input[ng-change='filterChanged()']")));
        }
    },

    /**
     * Opens "Identity management" application.
     *
     * @method clickManagementApp
     */

    clickManagementApp: {
        value: function () {
            Util.waitUntilElementIsVisible(this.management);
            this.management.click();
            /*if (browser.browserName != "chrome") {
                browser.refresh();
            }*/
            Util.waitUntilElementIsVisible(element(by.id("profile")));
        }
    },

    /**
     * Opens "Analytics" application.
     *
     * @method clickAnalyticsApp
     */

    clickAnalyticsApp: {
        value: function () {
            this.analytics.click();
        }
    },

    /**
     * Provides the Add new app button
     *
     * @property btnAddNewApp
     * @type protractor.Element
     */

    btnAddNewApp: {
        get: function () {
            return element(by.xpath('//a[@ng-click="addAppDefinition()"]/div/h3'));
        }
    },

    /**
     * Clicks the Add new app button
     *
     * @method clickAddNewApp
     */

    clickAddNewApp: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnAddNewApp);
            this.btnAddNewApp.click();
        }
    },

    /**
     * Adds a new application to the landing page.
     *
     * @method addNewApp
     * @param {String} appTitle
     */

    addNewApp: {
        value: function (appTitle) {
            this.clickAddNewApp();
            this.addAppToLandingPageDialog.selectApp(appTitle);
            this.addAppToLandingPageDialog.clickDeploy();
        }
    },

    /**
     * Determines whether an app is deployed on the landing page.
     *
     * @method isAppDeployed
     * @param {String} appTitle
     * @return {Boolean} Whether or not the app is deployed.
     */

    isAppDeployed: {
        value: function (appTitle) {
            var appElem = element(by.xpath("//div[contains(@class,'actions')]/preceding-sibling::div[@class='app-content']/h3[contains(text(),'" + appTitle + "')]"));
            Util.waitUntilElementIsVisible(appElem);
            return appElem.isDisplayed();
        }
    },


    isKickstartPageLoaded: {
        value: function () {
            logger.debug("Check Filter List");
            var filterSelection = element(by.xpath("//*/ul[@class='filter-list']"));
            Util.waitUntilElementIsVisible(filterSelection);
            logger.debug("Filter List is visible?");
            var bodyFilter = element(By.id("list-items"));
            Util.waitUntilElementIsVisible(bodyFilter);
            logger.debug("Body Filter is visible?");
        }
    },

    isLandingPageLoaded: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@id='main-nav']")));
            var kickstartElement = element(by.id("kickstart"));
            Util.waitUntilElementIsVisible(kickstartElement);
            var identityElement = element(By.id("identity"));
            Util.waitUntilElementIsVisible(identityElement);
            Util.waitUntilElementIsVisible(navbar.btnUserMenu);
        }
    },

    /**
     * Opens an app from the landing page.
     *
     * @method openApp
     * @param {String} appTitle
     * @param {Function} callback The app id is available on callback.
     */

    openApp: {
        value: function (appTitle, callback) {

            var appTitle = element(by.cssContainingText("a[href*='activiti-app/workflow/#/apps']", appTitle));
            //var appTitle = element(by.cssContainingText("div[class='app-content'] > h3", appTitle));
            Util.waitUntilElementIsVisible(appTitle);
            expect((appTitle).isPresent()).toBeTruthy();
            logger.debug("Click on App Title");
            appTitle.click();

            //Vito?
            /*var app = element(by.xpath("//div/h3[contains(text(),'" + appTitle + "')]/../.."));
            var app= element(by.cssContainingText("a[href*='activiti-app/workflow/#/apps']", appTitle));
            logger.debug("This is the xpath:" + app);
            Util.waitUntilElementIsVisible(app);
            logger.debug("APP CREATED WITH ID : "+app.getAttribute('id'));
            app.getAttribute('id').then(function (id) {
                logger.debug("returned id :"+id);
                callback(id);
            });*/

            var tasksSearch = element(by.css("input[ng-model='model.filter.edit.filter.name']"));
            Util.waitUntilElementIsVisible(tasksSearch);
            logger.debug("app should be opened now");
            /*if (browser.browserName != "chrome") {
                browser.refresh();
                var appTitleElem = element(by.xpath("//span[@ng-if='activeAppDefinition.theme' and contains(text(),'" + appTitle + "')]"));
                browser.wait(EC.visibilityOf(appTitleElem), TestConfig.main.presence_timeout);
            };*/

        }
    }
});