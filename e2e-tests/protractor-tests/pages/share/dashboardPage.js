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
var activitiDashlet = require("./dashlets/activitiDashlet.js");
var navbar = require("./components/navbar.js");

/**
 * Provides the Login Page.
 * @module pages
 * @submodule share
 * @class pages.share.DashboardPage
 */

module.exports = Page.create({

    /**
     * Waits untill the page is fully rendered
     * @method render
     */
    render: {
        value: function () {
            shareUtil.waitForPage();
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@class='welcome-info']//p[@class='welcome-info-text']")));
        }
    },

    /**
     * Provides the Alfresco Share navbar
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar;
        }
    },

    activitiDashlet: {
        get: function () {
            return activitiDashlet;
        }
    },

    /**
     * Provides the customize user dashboard button
     * @property btnCustomizeDashboard
     * @type protractor.Element
     */
    btnCustomizeDashboard: {
        get: function () {
            return element(by.id("HEADER_CUSTOMIZE_USER_DASHBOARD"));
        }
    },

    /**
     * Clicks the cusotmize user dashboard button
     * @method clickCustomizeDashboard
     */
    clickCustomizeDashboard: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnCustomizeDashboard);
            this.btnCustomizeDashboard.click()
        }
    },

    /**
     * Provides the status of the status of the activiti dashlet on the dashboard
     * @param callback
     * @method isActivitiDashletPresent
     */
    isActivitiDashletPresent: {
        value: function (callback) {
            Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='HEADER_TITLE']/span")));
            element(by.xpath("//div[contains(@class,'activiti-my-tasks')]")).isPresent().then(function(status) {
                callback(status);
            });
        }
    }
});