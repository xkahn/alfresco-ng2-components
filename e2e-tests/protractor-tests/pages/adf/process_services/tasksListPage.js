/**
 * Created by Cristina Jalba on 06/03/2018.
 */

var Util = require("../../../util/util.js");

var TasksListPage = function () {

    var taskList = element(by.css("adf-tasklist"));
    var tableBody = element(by.css("adf-datatable div[class='adf-datatable-body']"));

    this.checkTaskIsDisplayedInTasksList = function(taskName) {
        var row = by.cssContainingText("span", taskName);
        Util.waitUntilElementIsVisible(taskList.element(row));
        return this;
    };

    this.selectTaskFromTasksList = function(taskName) {
        var row = by.cssContainingText("span", taskName);
        Util.waitUntilElementIsVisible(taskList.element(row));
        taskList.element(row).click();
        return this;
    };

    this.checkTaskIsNotDisplayedInTasksList = function(taskName) {
        var row = by.cssContainingText("span", taskName);
        Util.waitUntilElementIsNotOnPage(taskList.element(row));
        return this;
    };

    this.checkTaskListIsLoaded = function () {
        Util.waitUntilElementIsVisible(taskList);
        return this;
    };

    this.waitForTableBody = function (){
        Util.waitUntilElementIsVisible(tableBody);
    };

};

module.exports = TasksListPage;


