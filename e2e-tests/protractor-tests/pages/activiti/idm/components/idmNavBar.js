/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mon July 10 2017
 */

var Util = require("../../../../util/util.js");
var loginPage = require("../../loginPage.js");

/**
 * Provides the top navigation bar for identity management
 */

var IdmNavBar = function () {

    var homeElement = element(by.xpath("//a[@ng-click='backToLanding()']"));
    var btnTenants = element(by.id('tenantMgmt'));
    var btnUsers = element(by.id('userMgmt'));
    var btnOrganization = element(by.id('functionalGroupMgmt'));
    var btnPersonal = element(by.id("profile"));
    var btnCapabilities = element(by.id('systemGroupMgmt'));

    var myTaskElem = element(by.xpath(".//*[@ng-click='backToLanding()']"));
    var btnProcesses = element(by.xpath("//*/div[@id='main-nav']//a[@class='ng-binding' and text()='Processes']"));
    var filter = element(by.xpath("//input[@ng-change='filterChanged()']"));
    var btnStartProcess = element(by.xpath(".//a[@ng-click='setMainPage(item)' and span[contains(text(),'Start')]]"));
    var btnUserMenu = element(by.css('button[class="btn btn-default dropdown-toggle user-menu"]'));
    var btnLogOut = element(by.css("a[ng-click='logout()']"));


    /**
     * Click "Back to landing" button
     */
    this.backToLandingPage = function () {
        Util.waitUntilElementIsVisible(homeElement);
        homeElement.click();
    };

    /**
     * Click "Tenants" tab
     */
    this.clickTenants = function () {
        Util.waitUntilElementIsVisible(btnTenants);
        btnTenants.click();
    };

    /**
     * Click "Users" tab
     */
    this.clickUsers = function () {
        Util.waitUntilElementIsVisible(btnUsers);
        btnUsers.click();
    };

    /**
     * Click "Capabilities" tab
     */
    this.clickCapabilities = function () {
        Util.waitUntilElementIsVisible(btnCapabilities);
        btnCapabilities.click();
    };

    /**
     * Click "Organization" tab
     */
    clickOrganization = function () {
        Util.waitUntilElementIsVisible(btnOrganization);
        btnOrganization.click();
    };

    /**
     * Click "Personal" tab
     */
    this.clickPersonal = function () {
        Util.waitUntilElementIsVisible(btnPersonal);
        btnPersonal.click();
    };
// need to update following function with nav bar page split
    /**
     * Logs the user out.
     *
     * @method clickLogout
     */
    clickLogout = function () {
        Util.waitUntilElementIsVisible(btnUserMenu);
        btnUserMenu.click(function () {
            Util.waitUntilElementIsVisible(btnLogOut);
            this.btnLogOut.click(function () {
                loginPage.isLoginPageDisplayed();
            });
        });
    }

};
module.exports = IdmNavBar;