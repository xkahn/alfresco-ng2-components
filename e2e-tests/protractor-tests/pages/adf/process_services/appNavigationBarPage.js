/**
 * Created by jdosti on 11/01/2018.
 */

var Util = require("../../../util/util.js");
var TasksPage = require("./tasksPage.js");

var AppNavigationBarPage = function () {
    
    var tasksButton = element(by.cssContainingText("div[class*='mat-tab-label']", "Tasks"));
    var processButton = element.all(by.css('div[id*="mat-tab-label"]'));
    var reportsButton = element(by.id('mat-tab-label-1-2'));
    var reportsButtonSelected = element(by.css("div[id='mat-tab-label-1-2'][aria-selected='true']"))

    this.clickTasksButton = function () {
        Util.waitUntilElementIsVisible(tasksButton);
        tasksButton.click();
        return new TasksPage();
    };

    this.clickProcessButton = function () {
        processButton.get(1).click();
    };

    this.clickReportsButton = function () {
        Util.waitUntilElementIsVisible(reportsButton);
        reportsButton.click();
        Util.waitUntilElementIsVisible(reportsButtonSelected);
    };


};

module.exports = AppNavigationBarPage;