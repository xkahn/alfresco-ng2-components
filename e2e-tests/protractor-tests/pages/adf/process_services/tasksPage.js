/*
 * Created by Cristina jalba on 26/01/2018.
 */

var Util = require("../../../util/util.js");
var StartTaskDialog = require("./dialog/startTaskDialog.js");
var FormFields = require("./formFields.js");
var TaskDetails = require("./taskDetailsPage.js");
var FiltersPage = require("./filtersPage.js");
var ChecklistDialog = require("./dialog/createChecklistDialog.js");
var TasksListPage = require("./tasksListPage.js");

var TasksPage = function () {

    var createButton = element(by.css("button[data-automation-id='create-button']"));
    var newTaskButton = element(by.css("button[data-automation-id='btn-start-task']"));
    var addChecklistButton = element(by.css("button[class*='adf-add-to-checklist-button']"));
    var rowByRowName = by.xpath("ancestor::mat-chip");
    var checklistContainer = by.css("div[class*='checklist-menu']");
    var taskTitle = "h2[class='activiti-task-details__header'] span";
    var rows = by.css("div[class*='adf-datatable-body'] div[class*='adf-datatable-row'] div[class*='adf-data-table-cell']");

    this.createNewTask = function () {
        this.createButtonIsDisplayed();
        this.clickOnCreateButton();
        this.newTaskButtonIsDisplayed();
        newTaskButton.click();
        return new StartTaskDialog();
    };

    this.createButtonIsDisplayed = function() {
        Util.waitUntilElementIsVisible(createButton);
        return this;
    };

    this.newTaskButtonIsDisplayed = function() {
        Util.waitUntilElementIsVisible(newTaskButton);
        return this;
    };

    this.clickOnCreateButton = function() {
        Util.waitUntilElementIsClickable(createButton);
        createButton.click();
        return this;
    };

    this.usingFormFields = function () {
      return new FormFields();
    };

    this.usingTaskDetails = function () {
        return new TaskDetails();
    };

    this.usingFiltersPage = function () {
        return new FiltersPage();
    };

    this.usingTasksListPage = function () {
        return new TasksListPage();
    };

    this.clickOnAddChecklistButton = function () {
        Util.waitUntilElementIsClickable(addChecklistButton);
        addChecklistButton.click();
        return new ChecklistDialog();
    };

    this.getRowsName = function (name) {
        var row = element(checklistContainer).element(by.cssContainingText("span", name));
        Util.waitUntilElementIsVisible(row);
        return row;
    };

    this.getChecklistByName = function (checklist) {
        var row = this.getRowsName(checklist).element(rowByRowName);
        Util.waitUntilElementIsVisible(row);
        return row;
    };

    this.checkChecklistIsDisplayed = function (checklist) {
        Util.waitUntilElementIsVisible(this.getChecklistByName(checklist));
        return this;
    };

    this.checkTaskTitle = function(taskName) {
        Util.waitUntilElementIsVisible(element(by.css(taskTitle)));
        var title = element(by.cssContainingText(taskTitle, taskName));
        Util.waitUntilElementIsVisible(title);
        return this;
    };

    this.getAllDisplayedRows= function(){
        return element.all(rows).count();
    };

};

module.exports = TasksPage;
