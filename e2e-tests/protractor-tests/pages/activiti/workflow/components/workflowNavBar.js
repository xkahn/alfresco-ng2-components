/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue Jun 27 2017
 */

var Util = require("../../../../util/util.js");

/**
 * Provides the top navigation bar for workflow
 */

var WorkflowNavBar = function () {

    var btnTasks = element(by.xpath("//div[@class='navbar-header']//a[text()='Tasks']"));
    var myTaskElem = element(by.xpath(".//*[@ng-click='backToLanding()']"));
    var btnProcesses = element(by.xpath("//*/div[@id='main-nav']//a[@class='ng-binding' and text()='Processes']"));
    var filter = element(by.model('model.filter.edit.filter.name'));

    /**
     * Click "MyTasks" button - go back to landing page
     */
    this.clickMyTasks = function () {
        Util.waitUntilElementIsVisible(myTaskElem);
        myTaskElem.click();
    };

    /**
     * Click "Tasks" button.
     */
    this.clickTasks = function () {
        Util.waitUntilElementIsVisible(btnTasks);
        btnTasks.click();
    };

    /**
     * Click "Processes" tab button.
     */
    this.clickProcesses = function () {
        Util.waitUntilElementIsVisible(btnProcesses);
        btnProcesses.click();
        Util.waitUntilElementIsVisible(filter);
    };
};

module.exports = WorkflowNavBar;