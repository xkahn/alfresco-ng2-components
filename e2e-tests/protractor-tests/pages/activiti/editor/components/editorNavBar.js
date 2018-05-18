/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue July 4 2017
 */

var Util = require("../../../../util/util.js");


/**
 * Page Object for editor top navigation bar
 */

var EditorNavigationBar = function () {

    var processMenu = element(by.xpath("//div[@class='navbar-header']//a[text()='Processes']"));
    var formsMenu = element(by.xpath('//div[@class="navbar-header"]/ul/li[2]'));
    var decisionTablesMenu = element(by.xpath(".//*[@id='main-nav']//a[text()='Decision Tables']"));
    var dataModelsMenu = element(by.xpath(".//*[@id='main-nav']//a[text()='Data Models']"));
    var appsMenu = element(by.xpath(".//*[@id='main-nav']//a[text()='Apps']"));
    var stencilsMenu = element(by.xpath(".//*[@id='main-nav']//a[text()='Stencils']"));

    /**
     * Click "Processes" tab
     */
    this.clickProcessesMenu = function () {
        Util.waitUntilElementIsVisible(processMenu);
        processMenu.click();
    };

    /**
     * Click "Forms" tab
     */
    this.clickFormsMenu = function () {
        Util.waitUntilElementIsVisible(formsMenu);
        formsMenu.click();
    };

    /**
     * Click "Decision Tables" tab
     */
    this.clickDecisionTablesMenu = function () {
        Util.waitUntilElementIsVisible(decisionTablesMenu);
        decisionTablesMenu.click();
    };

    /**
     * Click "Data Models" tab
     */
    this.clickDataModelsMenu = function () {
        Util.waitUntilElementIsVisible(dataModelsMenu);
        dataModelsMenu.click();
    };

    /**
     * Click "Apps" tab
     */
    this.clickAppsMenu = function () {
        Util.waitUntilElementIsVisible(appsMenu);
        appsMenu.click();
    };

    /**
     * Clicks "Stencils" tab
     */
    this.clickStencilsMenu = function () {
        Util.waitUntilElementIsVisible(stencilsMenu);
        stencilsMenu.click();
    };

};

module.exports = EditorNavigationBar;