/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 27/3/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");
var shareUtil = require("../../util/shareUtil.js");

/**
 * Provides the Login Page.
 * @module pages
 * @submodule share
 * @class pages.share.CustomizeUserDashboardPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/#/login'
     */
    url: {value: TestConfig.share.webContextRoot + '/page/customise-user-dashboard'},

    /**
     * Waits untill the page is fully rendered
     * @method render
     */
    render: {
        value: function () {
            shareUtil.waitForPage();
        }
    },

    /**
     * Provides the add dashlets button
     * @property btnAddDashlets
     * @type protractor.Element
     */
    btnAddDashlets: {
        get: function () {
            return element(by.xpath('//button[contains(@id,"addDashlets-button-button")]'));
        }
    },

    /**
     * Clicks the add dashlets buttons
     * @method clickAddDashlets
     */
    clickAddDashlets: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnAddDashlets);
            this.btnAddDashlets.click();
        }
    },

    /**
     * Adds the dashlet specified by dashletName parameter to column 1
     * @method addDashlet
     * @param {string} dashletName
     */
    addDashlet: {
        value: function (dashletName) {
            var target = element(by.xpath("//div[contains(@id,'customise-dashlets')]//ul[contains(@id,'default-column-ul-1')]"));
            Util.waitUntilElementIsVisible(target);
            var dashlet = element(by.xpath("//div[contains(@id,'customise-dashlets')]//div[@class='dnd-draggable' and contains(@title,'" + dashletName + "')]/ancestor::li"));
            Util.waitUntilElementIsVisible(dashlet);
            browser.actions().dragAndDrop(dashlet, target).perform();
        }
    },

    /**
     * Provides the Ok button
     * @property btnOk
     * @type protractor.Element
     */
    btnOk: {
        get: function () {
            return element(by.xpath("//button[contains(@id,'save-button-button')]"));
        }
    },

    /**
     * Clicks the ok button
     * @method clickOk
     */
    clickOk: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnOk);
            this.btnOk.click();
            Util.waitUntilElementIsStale(this.btnOk);
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@class='welcome-info']//p[@class='welcome-info-text']")));
        }
    }

});