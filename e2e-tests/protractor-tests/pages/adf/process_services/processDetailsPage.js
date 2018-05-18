/**
 * Created by jdosti on 12/01/2018.
 */

var Util = require("../../../util/util.js");
var TestConfig = require("../../../test.config.js");
var path = require('path');



var ProcessDetailsPage = function () {

    //Process Details
    var processTitle = element(by.css("mat-card-title[class='mat-card-title']"));
    var processStatusField = element(by.css("span[data-automation-id='card-textitem-value-status']"));
    var processEndDateField = element(by.css("span[data-automation-id='card-dateitem-ended']"));
    var processCategoryField = element(by.css("span[data-automation-id='card-textitem-value-category']"));
    var processBusinessKeyField = element(by.css("span[data-automation-id='card-textitem-value-businessKey']"));
    var processCreatedByField = element(by.css("span[data-automation-id='card-textitem-value-assignee']"));
    var processCreatedField = element(by.css("span[data-automation-id='card-dateitem-created']"));
    var processIdField = element(by.css("span[data-automation-id='card-textitem-value-id']"));
    var processDescription = element(by.css("span[data-automation-id='card-textitem-value-description']"));
    var showDiagramButtonDisabled = element(by.css('button[id="show-diagram-button"][disabled]'));
    var propertiesList = element(by.css("div[class='adf-property-list']"));
    //Show Diagram
    var showDiagramButton = element(by.id('show-diagram-button'));
    var diagramCanvas = element(by.css('svg[xmlns="http://www.w3.org/2000/svg"]'));
    var backButton = element(by.css("app-show-diagram button[class='mat-mini-fab mat-accent']"));
    //Comments
    var commentInput = element(by.id('comment-input'));
    //Audit Log
    var auditLogButton = element(by.css("button[adf-process-audit]"));
    //Attach File
    var attachFileButton = element(by.css("input[type='file']"));
    //Cancel Process button
    var cancelProcessButton = element(by.css('div[data-automation-id="header-status"] > button'));
    //Tasks
    var activeTask = element(by.css('div[data-automation-id="active-tasks"]'));
    var taskTitle = element(by.css("h2[class='activiti-task-details__header']"));



    this.checkProcessTitleIsDisplayed = function () {
        Util.waitUntilElementIsVisible(processTitle);
        return processTitle.getText();
    };

    this.getProcessStatus = function () {
        Util.waitUntilElementIsVisible(processStatusField);
        return processStatusField.getText();
    };

    this.getEndDate = function () {
        Util.waitUntilElementIsVisible(processEndDateField);
        return processEndDateField.getText();
    };

    this.getProcessCategory = function () {
        Util.waitUntilElementIsVisible(processCategoryField);
        return processCategoryField.getText();
    };

    this.getBusinessKey = function () {
        Util.waitUntilElementIsVisible(processBusinessKeyField);
        return processBusinessKeyField.getText();
    };

    this.getCreatedBy = function () {
        Util.waitUntilElementIsVisible(processCreatedByField);
        return processCreatedByField.getText();
    };

    this.getCreated = function () {
        Util.waitUntilElementIsVisible(processCreatedField);
        return processCreatedField.getText();
    };

    this.getId = function () {
        Util.waitUntilElementIsVisible(processIdField);
        return processIdField.getText();
    };

    this.getProcessDescription = function () {
        Util.waitUntilElementIsVisible(processDescription);
        return processDescription.getText();
    };

    //Show Diagram
    this.clickShowDiagram = function () {
        Util.waitUntilElementIsVisible(showDiagramButton);
        Util.waitUntilElementIsClickable(showDiagramButton);
        showDiagramButton.click();
        Util.waitUntilElementIsVisible(diagramCanvas);
        Util.waitUntilElementIsVisible(backButton);
        Util.waitUntilElementIsClickable(backButton);
        backButton.click();
    };

    this.checkShowDiagramIsDisabled = function () {
        Util.waitUntilElementIsVisible(showDiagramButtonDisabled);
    };

    //Add comment
    this.addComment = function (comment) {
        Util.waitUntilElementIsVisible(commentInput);
        commentInput.sendKeys(comment);
        commentInput.sendKeys(protractor.Key.ENTER);
        return this;
    };

    this.checkCommentIsDisplayed = function (comment) {
        var commentInserted = element(by.cssContainingText("div[id='comment-message']", comment));
        Util.waitUntilElementIsVisible(commentInserted);
        return this;
    };

    // Click Audit log
    this.clickAuditLogButton = function () {
        Util.waitUntilElementIsVisible(auditLogButton);
        auditLogButton.click();
    };

    //Attach file
    this.clickAttachFileButton = function (fileLocation) {
        Util.waitUntilElementIsVisible(attachFileButton);
        attachFileButton.sendKeys(path.resolve(path.join(TestConfig.adf.rootPath, fileLocation)));
    };

    this.checkFileIsAttached = function (name) {
        var fileAttached = element(by.css('div[filename="'+name+'"]'));
        Util.waitUntilElementIsVisible(fileAttached);

    };

    this.checkAttachFileButtonIsNotDisplayed = function () {
        Util.waitUntilElementIsNotVisible(attachFileButton);
    };

    this.clickCancelProcessButton = function () {
        Util.waitUntilElementIsVisible(cancelProcessButton);
        Util.waitUntilElementIsClickable(cancelProcessButton);
        cancelProcessButton.click();
    };

    this.clickOnActiveTask = function () {
        Util.waitUntilElementIsVisible(activeTask);
        activeTask.click();
    };

    this.checkActiveTaskTitleIsDisplayed = function () {
        Util.waitUntilElementIsVisible(taskTitle);
    };

    this.checkProcessDetailsCard = function () {
        Util.waitUntilElementIsVisible(propertiesList);
    };
};

module.exports = ProcessDetailsPage;