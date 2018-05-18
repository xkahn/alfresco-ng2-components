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

/**
 * Provides utility methods for the workflow pages
 */

var Util = require('../util/util.js');
var landingPage = require('../pages/activiti/landingPage.js');
var WorkflowNavBar = require('../pages/activiti/workflow/components/workflowNavBar.js');
var processesPage_workflow = require('../pages/activiti/workflow/processesPage.js');
var TaskDetailsPage = require('../pages/activiti/workflow/taskDetailsPage');

var WorkflowUtils = function () {

    var workflowNavBar = new WorkflowNavBar();
    var taskDetailsPage = new TaskDetailsPage();

    /**
     * Is a form field displayed or not during process execution
     *
     * @param appName
     * @param field
     */
    this.isFormFieldDisplayed = function (appName, field) {
        this.startProcess(appName);

        // Select task and check form field is displayed
        workflowNavBar.clickTasks();

        return taskDetailsPage.isFormFieldDisplayed(by.id, field);
    };

    this.retrieveDateFieldFormat = function (appName, dateField) {
        expect(this.isFormFieldDisplayed(appName, dateField)).toBe(true);

        // Get Date field label
        var fieldLabel = taskDetailsPage.getDateFieldFormat();

        taskDetailsPage.clickFormField(by.id, dateField);
        
        // Select Date Today
        taskDetailsPage.selectDateToday();

        // Get Date field value
        var fieldValue = taskDetailsPage.getFormFieldValue(by.id, dateField);

        return {label: fieldLabel, value: fieldValue};
    };
    
    this.startProcess = function (appName) {
        // Go to App
        landingPage.openApp(appName);

        // Start process
        processesPage_workflow.clickStartNewProcess();
        processesPage_workflow.clickStartProcess();
    };
};

module.exports = WorkflowUtils;