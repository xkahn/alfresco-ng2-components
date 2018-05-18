/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

var Util = require('../../../util/util.js');
var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");

var WorkFlowNavBar = require("./components/workflowNavBar");
var EC = protractor.ExpectedConditions;

/**
 * Provides the Processes page within My tasks application.
 * @module pages
 * @submodule activiti
 * @submodule workflow
 * @class pages.activiti.workflow.ProcessesPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/workflow/#/tasks'
     */
    url: {value: TestConfig.main.webContextRoot + '/workflow/#/tasks'},

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return new WorkFlowNavBar();
        }
    },

    /**
     * Provides the start new process button.
     *
     * @property btnStartNewProcess
     * @type protractor.Element
     */
    btnStartNewProcess: {
        get: function () {
            return element(by.css('.navigation-action.ng-scope>a'));
        }
    },

    /**
     * Clicks the start new process button.
     *
     * @method clickStartNewProcess
     */
    clickStartNewProcess: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnStartNewProcess);
            this.btnStartNewProcess.click();
        }
    },
    
    /**
     * Clicks the start new start process button.
     *
     * @method clickStartNewProcessShare
     */
    clickStartNewProcessShare: {
        value: function () {
            var startProcShare = element(by.xpath("//div[contains(@ng-class,'model.processInstances')]//span[@class='ng-scope' and text()='Start process']"));

            Util.waitUntilElementIsVisible(startProcShare);
            startProcShare.click();
        }
    },

    /**
     * Clicks the start process button
     *
     * @method clickStartProcess
     */
    clickStartProcess: {
        value: function () {
            var startProcessButton = element(by.id("form_start_button"));

            Util.waitUntilElementIsVisible(startProcessButton);
            startProcessButton.click();
        }
    },

    /**
     * Provides the cancel process button
     *
     * @property btnCancelProcess
     */
    btnCancelProcess: {
        get: function () {
            return element(by.xpath("//button[@ng-click=\"cancelProcess()\"]"));
        }
    },

    /**
     * Provides the last name field. This property provides the field in the both possible states, editable or non-editable.
     * @property txtLastName
     * @type {object}
     */
    txtProcessInstanceName: {
        get: function () {
            return {
                //non_editable: element(by.css("edit-in-place[value='newProcessInstance.name']")),
                non_editable: element(by.css("h2>edit-in-place>span[ng-click='edit()']")),
                editable: element(by.css("h2>edit-in-place>input"))
            }
        }
    },

    /**
     * Fills in the process instance name input.
     *
     * @param {String} processInstanceName
     * @method fillProcessInstanceName
     */
    fillProcessInstanceName: {
        value: function (processInstanceName) {
            Util.waitUntilElementIsVisible(this.txtProcessInstanceName.non_editable);
            this.txtProcessInstanceName.non_editable.click();
            Util.waitUntilElementIsVisible(this.txtProcessInstanceName.editable);
            this.txtProcessInstanceName.editable.clear();
            this.txtProcessInstanceName.editable.sendKeys(processInstanceName);
            this.txtProcessInstanceName.editable.sendKeys(protractor.Key.ENTER);
        }
    },

    /**
     * Selects a process definition from the left panel based on it's name given as parameter.
     *
     * @param {String} processDefinition
     * @method selectProcessDefinition
     */
    selectProcessDefinition: {
        value: function (processDefinition) {
            Util.waitUntilElementIsVisible(element(By.cssContainingText('div>div>ul>li', processDefinition)));
            element(By.cssContainingText("div[class='title ng-binding']", processDefinition)).click();
        }
    },

    /**
     * On the callback this method provides access to the current instance definition.
     *
     * @param callback {Function}  Provides access to the current selected process definition.
     * @method getSelectedProcessDefinition
     */
    getSelectedProcessDefinition: {
        value: function (callback) {
            return element(by.css('div>div>div>h2')).getText().then(function (text) {
                callback(text);
            });
        }
    },

    /**
     * Clicks a form outcome button based on it's text
     *
     * @param buttonText {String}
     * @method clickOutcomeButton
     */
    clickOutcomeButton: {
        value: function (buttonText) {
            var outcome = element(by.xpath('.//div[@id="formsection"]//button[text()="' + buttonText + '"]'));

            Util.waitUntilElementIsVisible(outcome);
            outcome.click();
            Util.waitUntilElementIsStale(outcome);
        }
    },

    /**
     * Clicks "Start process" when the start event has no form
     * @method clickStartProcessWithoutForm
     */
    clickStartProcessWithoutForm: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css('button[ng-click="startProcessInstanceWithoutForm()"]')));
            element(by.css('button[ng-click="startProcessInstanceWithoutForm()"]')).click();
        }
    },

    /**
     * On the callback it provides whether or not the processDefinition is available
     *
     * @param processDefinition
     * @param callback
     * @method isProcessDefinitionAvailable
     */
    isProcessDefinitionAvailableStartWorkflow: {
        value: function (processDefinition, callback) {
            element(by.xpath("//ul[contains(@ng-show,'processDefinitions')]/li[@ng-click='selectProcessDefinition(definition)']//div[contains(text(),'" + processDefinition + "')]"))
                .isPresent().then(function (status) {
                callback(status);
            })
        }
    },

    /**
     * On the callback it provides whether or not the processDefinition is available
     *
     * @param processDefinition
     * @param callback
     * @method isProcessDefinitionAvailable
     */
    isProcessDefinitionAvailable: {
        value: function (processDefinition, callback) {
            element(by.cssContainingText("ul>li>div>div[class='title ng-binding']", processDefinition)).isPresent().then(function (status) {
                callback(status);
            })
        }
    },

    /**
     * Provides whether or not the form is displayed
     *
     * @param callback
     * @method isFormDisplayed
     */
    isFormDisplayed: {
        value: function (callback) {
            element(by.id("formsection")).isPresent().then(function (status) {
                callback(status);
            })
        }
    },

    /**
     * Provides the status of the outcome button specified by buttonText
     *
     * @param {string} buttonText
     * @param callback
     * @method isOutcomeButtonEnabled
     */
    isOutcomeButtonEnabled: {
        value: function (buttonText, callback) {
            element(by.xpath('.//div[@id="formsection"]//button[text()="' + buttonText + '"]')).isEnabled().then(function (status) {
                callback(status);
            })
        }
    },

    /**
     * Selects a process instance (by clicking it) from the left panel list based on the index parameter.
     *
     * @param index {int}
     * @method selectProcessInstance
     */
    selectProcessInstance: {
        value: function (index) {
            var myprocc = element(by.xpath("//div[@class='activiti-alfresco-page']"));
            Util.waitUntilElementIsVisible(myprocc);
            var processInstance = myprocc.element(by.xpath("//ul[contains(@ng-if,'model.processInstances')]/li[@class='ng-scope active'][" + index + "]"));

            Util.waitUntilElementIsVisible(processInstance);
            processInstance.click();
        }
    },

    /**
     * Clicks on active task
     *
     * @method selectActiveTask
     */
    selectActiveTask: {
        value: function () {
            element(by.xpath("//li[@ng-repeat='task in model.processTasks']//div[@class='ng-binding']")).click();
        }
    },

    /**
     * Clicks on Executed Decision Tables
     *
     * @param decisionStepName {String}
     * @method selectDecisionStep
     */
    selectDecisionStep: {
        value: function (decisionStepName) {
            element(by.xpath("//li[@ng-repeat='task in model.completedDecisionTasks']//span[contains(@class,'name') and contains(text(),'" + decisionStepName + "')]")).click();
        }
    },

    /**
     * Get output rule
     *
     * @param inputValue {String}
     * @param outputIndex {int}
     * @method selectDecisionStep
     */
    getRuleOutput: {
        value: function (inputValue, outputIndex) {
            var rule = '//div[contains(@class, "decision-table-display-cell-match")]';

            browser.wait(EC.visibilityOf(element(by.xpath(rule))), TestConfig.main.presence_timeout);
            var ruleElem = element(by.xpath('(' + rule + '//span[text()="' + inputValue + '"]/ancestor::*/following-sibling::*//span[contains(@class,"contents-value")])[' + outputIndex + ']'));

            return ruleElem.getText();
        }
    },

    /**
     * Clicks on Calculated Values
     *
     * @method clickCalculatedValues
     */
    clickCalculatedValues: {
        value: function () {
            element(by.xpath("//h3[@ng-click='model.outputListExpanded = !model.outputListExpanded']")).click();
        }
    },

    /**
     * Clicks on Input Values
     *
     * @method clickInputValues
     */
    clickInputValues: {
        value: function () {
            element(by.xpath("//h3[@ng-click='model.inputListExpanded = !model.inputListExpanded']")).click();
        }
    },

    /**
     * Get output values
     *
     * @param field
     * @method clickInputValues
     */
    getOutputValues: {
        value: function (field) {
            var outputList = "//div[@ng-show='model.outputListExpanded']";

            browser.wait(EC.visibilityOf(element(by.xpath(outputList))), TestConfig.main.presence_timeout);
            return element(by.xpath("(" + outputList + "//div[text()='" + field + "']/ancestor::*/following-sibling::*//span[contains(@class,'contents-value')])[1]"));
        }
    },

    /**
     * Get input values
     *
     * @param field
     * @method clickInputValues
     */
    getInputValues: {
        value: function (field) {
            var inputList = "//div[@ng-show='model.inputListExpanded']";
            browser.wait(EC.visibilityOf(element(by.xpath(inputList))), TestConfig.main.presence_timeout);
            return element(by.xpath("(" + inputList + "//div[text()='" + field + "']/ancestor::*/following-sibling::*//span[contains(@class,'contents-value')])[1]"));
        }
    },

    /**
     * Provides the status of the task given as parameter.
     *
     * @param taskName
     * @param callback
     * @method isTaskDisplayed
     */
    isTaskDisplayed: {
        value: function (taskName, callback) {
            var present = false;

            Util.waitUntilElementIsVisible(element(by.xpath("//h3[text()='Active tasks']")));
            element(by.xpath("//h3[text()='Active tasks']/following-sibling::*/li[@ng-click='openTask(task)']//div[@class='ng-binding']")).getText().then(function (text) {
                if (text.indexOf(taskName) > -1) {
                    present = true;
                }
            });

            return present;
        }
    },

    /**
     * Provides the status of the start form
     *
     * @param callback
     * @method isStartFormDisplayed
     */
    isStartFormDisplayed: {
        value: function (callback) {
            element(by.xpath("//h3[@id='startForm']/following-sibling::*//span[contains(text(),'Start form')]")).isDisplayed().then(function (status) {
                callback(status)
            })
        }
    },

    /**
     * Provides the status of the thumbnail for the content given as parameter
     *
     * @param content
     * @param callback
     * @method isThumbnailForContentDisplayed
     */
    isThumbnailForContentDisplayed: {
        value: function (content, callback) {
            element(by.css("ul[id='related-content-list']>li[title='" + content + "']")).isDisplayed().then(function (status) {
                callback(status);
            })
        }
    },

    /**
     * Opens the content specified content by parameter
     *
     * @param content
     * @method openContent
     */
    openContent: {
        value: function (content) {
            element(by.css("ul[id='related-content-list']>li[title='" + content + "']>document-preview>div")).click();
        }
    },

    /**
     * Get the content preview title
     *
     * @method contentPreviewTitle
     */
    contentPreviewTitle: {
        value: function () {
            var title = element(by.xpath(".//*[@id='Share']/div[@ng-controller='ContentDetailsController']//h3"));

            Util.waitUntilElementIsVisible(title);
            return title;
        }
    },

    /**
     * Close content preview
     *
     * @method closeContentPreview
     */
    closeContentPreview: {
        value: function () {
            element(by.xpath(".//*[@id='Share']//button[@ng-click='$hide()']")).click();
        }
    },

    /**
     * Provides the Show Button Diagram button
     *
     * @property btnShowDiagram
     * @type protractor.Element
     */
    btnShowDiagram: {
        get: function () {
            return element(by.id("processDiagramTrigger"));
        }
    },

    /**
     * Clicks the Show Diagram button
     *
     * @method clickShowDiagram
     */
    clickShowDiagram: {
        value: function () {
            this.btnShowDiagram.click();
        }
    },

    /**
     * Provides the close diagram button
     *
     * @property btnCloseDiagram
     * @type protractor.Element
     */
    btnCloseDiagram: {
        get: function () {
            return element(by.css("div[class='modal-footer'] button[ng-click='$hide()']"));
        }
    },

    /**
     * Closes the process diagram
     *
     * @method closeDiagram
     */
    closeDiagram: {
        value: function () {
            this.btnCloseDiagram.click();
        }
    },

    /**
     * Provides the status of the Process Diagram
     *
     * @method isProcessDiagramDisplayed
     */
    isProcessDiagramDisplayed: {
        value: function (callback) {
            element(by.css("div[ng-controller='ShowProcessDiagramCtrl']")).isDisplayed().then(function (status) {
                callback(status);
            });
        }
    },

    /**
     * Open filters in the left menu
     *
     * @param filterName {String}
     * @method openProcessFilters
     */
    openProcessFilters: {
        value: function (filterName) {
            element(by.xpath("//li[@ng-repeat='filter in model.filters']/div[text()='" + filterName + "']")).click();
        }
    },

    /**
     * Get processes instances
     *
     * @param processName {String}
     * @param index {String}
     * @method getProcessInFilterList
     */
    getProcessInFilterList: {
        value: function (processName, index) {
            var elem;
            if (index === undefined) {
                elem = element(by.xpath("//li[@ng-repeat='processInstance in model.processInstances']//div[contains(@class,'title') and contains(text(),'" + processName + "')]"));
            }
            else {
                elem = element(by.xpath("(//li[@ng-repeat='processInstance in model.processInstances']//div[contains(@class,'title') and contains(text(),'" + processName + "')])[" + index + "]"));
            }
            return elem;
        }
    },

    /**
     * Get process instance
     *
     * @param processName {String}
     * @param index {String}
     * @method clickProcessInFilterList
     */
    clickProcessInFilterList: {
        value: function (processName, index) {
            return this.getProcessInFilterList(processName, index).click();
        }
    },

    /**
     * Provides the id of the Form 1 Text Field
     *
     * @method form1TextField
     */
    form1TextField: {
        value: "activiti-text-field"
    },

    /**
     * Provides the id of the Form 1 Number Field
     *
     * @method form1NumberField
     */
    form1NumberField: {
        value: "activiti-number-field"
    },

    /**
     * Provides the id of the Form 1 Checkbox Field
     *
     * @method form1CheckboxField
     */
    form1CheckboxField: {
        value: "activiti-checkbox-field"
    },

    /**
     * Provides the id of the Form 1 Date Field
     *
     * @method form1DateField
     */
    form1DateField: {
        value: "activiti-date-field"
    },

    /**
     * Provides the id of the Form 1 DropDown Field
     *
     * @method form1DropDownField
     */
    form1DropDownField: {
        value: "activiti-dropddown-field"
    },

    /**
     * Provides the id of the Form 1 RadioButtons Field
     *
     * @method form1RadioButtonsField
     */
    form1RadioButtonsField: {
        value: "activiti-radiobuttons-field"
    },

    /**
     * Provides the id of the Form 1 Amount Field
     *
     * @method form1AmountField
     */
    form1AmountField: {
        value: "activiti-amount-field"
    },

    /**
     * Provides the tested field of the Form 1
     *
     * @property form1TestedField
     * @type protractor.Element
     */
    form1TestedField: {
        get: function () {
            return element(by.id("activiti-tested-field"));
        }
    },

    /**
     * Provides the id of the Form 2 Month DropDown
     *
     * @method form2AgeTextField
     */
    form2MonthDropDown: {
        value: "activiti-pickamonth"
    },

    /**
     * Provides the id of the Form 2 Season Typeahead
     *
     * @method form2SeasonTypeaheadField
     */
    form2SeasonTypeaheadField: {
        value: "activiti-pickaseason"
    },

    /**
     * Provides the header of the Form 2
     *
     * @property form2Header
     * @type protractor.Element
     */
    form2Header: {
        get: function () {
            return element(by.xpath(".//*[@id='fieldContainer_congratsheader']/form-element//h3"));
        }
    },

    /**
     * Expand Form 2 Header
     *
     * @method expandForm2Header
     */
    expandForm2Header: {
        value: function () {
            this.form2Header.click();
        }
    },

    /**
     * Provides the header of the Form 2
     *
     * @property form2Header
     * @type protractor.Element
     */
    form2HeaderSection: {
        get: function () {
            return element(by.xpath(".//*[@class='container-control row ng-hide']"));
        }
    },

    /**
     * Provides the Text id of the Form
     *
     * @method formMsgText
     */
    formMsgText: {
        value: "activiti-message"
    },

    /**
     * Provides the Text id of the Form 2
     *
     * @method form2Text
     */
    form2Text: {
        value: "activiti-congratstext"
    },

    /**
     * Provides the Text field of the Form 2
     *
     * @property form2TextField
     * @type protractor.Element
     */
    form2TextField: {
        get: function () {
            return element(by.id(this.form2Text));
        }
    },

    /**
     * Provides the Checkbox field id of the Form 2
     *
     * @method form2Checkbox
     */
    form2Checkbox: {
        value: "activiti-congratscheckbox"
    },

    /**
     * Provides the Checkbox field of the Form 2
     *
     * @property form2CheckboxField
     * @type protractor.Element
     */
    form2CheckboxField: {
        get: function () {
            return element(By.id(this.form2Checkbox));
        }
    },

    /**
     * Provides the Multiline field id of the Form 2
     *
     * @method form2MultiLine
     */
    form2MultiLine: {
        value: "activiti-congratsmultilinetext"
    },

    /**
     * Provides the Multiline field of the Form 2
     *
     * @property form2MultiLineField
     * @type protractor.Element
     */
    form2MultiLineField: {
        get: function () {
            return element(by.id(this.form2MultiLine));
        }
    },

    /**
     * Provides the Number field id of the Form 2
     *
     * @method form2Number
     */
    form2Number: {
        value: "activiti-congratsnumber"
    },
    /**
     * Provides the Number field of the Form 2
     *
     * @property form2NumberField
     * @type protractor.Element
     */
    form2NumberField: {
        get: function () {
            return element(by.id(this.form2Number));
        }
    },

    /**
     * Provides the Date field id of the Form 2
     *
     * @method form2Date
     */
    form2Date: {
        value: "activiti-congratsdate"
    },

    /**
     * Provides the Date field of the Form 2
     *
     * @property form2DateField
     * @type protractor.Element
     */
    form2DateField: {
        get: function () {
            return element(by.id(this.form2Date));
        }
    },

    /**
     * Provides the Radio id of the Form 2
     *
     * @method form2Radio
     */
    form2Radio: {
        value: "activiti-congratsradiobuttons"
    },

    /**
     * Provides the Radio buttons of the Form 2
     *
     * @property form2RadioButtons
     * @type protractor.Element
     */
    form2RadioButtons: {
        get: function () {
            return element(by.id(this.form2Radio));
        }
    },

    /**
     * Provides the Typeahead field id of the Form 2
     *
     * @method form2Typeahead
     */
    form2Typeahead: {
        value: "activiti-congratstypeahead"
    },

    /**
     * Provides the Typeahead field of the Form 2
     *
     * @property form2TypeaheadElem
     * @type protractor.Element
     */
    form2TypeaheadElem: {
        get: function () {
            return element(by.id(this.form2Typeahead));
        }
    },

    /**
     * Provides the Dropdown field id of the Form 2
     *
     * @method form2Dropdown
     */
    form2Dropdown: {
        value: "activiti-congratsdropdown"
    },

    /**
     * Provides the Dropdown field of the Form 2
     *
     * @property form2DropdownElem
     * @type protractor.Element
     */
    form2DropdownElem: {
        get: function () {
            return element(by.id(this.form2Dropdown));
        }
    },

    /**
     * Provides the Amount field id of the Form 2
     *
     * @method form2Amount
     */
    form2Amount: {
        value: "activiti-congratsamount"
    },

    /**
     * Provides the Amount field of the Form 2
     *
     * @property form2AmountElem
     * @type protractor.Element
     */
    form2AmountElem: {
        get: function () {
            return element(by.id(this.form2Amount));
        }
    },

    /**
     * Provides the People field id of the Form 2
     *
     * @method form2People
     */
    form2People: {
        value: "activiti-congratsperson"
    },

    /**
     * Provides the People field of the Form 2
     *
     * @property form2PeopleElem
     * @type protractor.Element
     */
    form2PeopleElem: {
        get: function () {
            return element(by.id(this.form2People));
        }
    },

    /**
     * Provides the Group field id of the Form 2
     *
     * @method form2Group
     */
    form2Group: {
        value: "activiti-congratsgroup"
    },

    /**
     * Provides the Group field of the Form 2
     *
     * @property form2GroupElem
     * @type protractor.Element
     */
    form2GroupElem: {
        get: function () {
            return element(by.id(this.form2Group));
        }
    },

    /**
     * Provides the Dynamic Table id of the Form 2
     *
     * @method form2DynamicTable
     */

    form2DynamicTable: {
        value: "fieldContainer_dinamictable"
    },

    /**
     * Provides the Dynamic Table of the Form 2
     *
     * @property form2DynamicTableElem
     * @type protractor.Element
     */

    form2DynamicTableElem: {
        get: function () {
            return element(by.xpath("//div[@id='fieldContainer_dinamictable']//div[contains(@class,'dynamicTableContainer')]"));
        }
    },

    /**
     * Provides the Hyperlink of the Form 2
     *
     * @property form2HyperlinkElem
     * @type protractor.Element
     */

    form2HyperlinkElem: {
        get: function () {
            return element(by.id("activiti-congratshyperlink"));
        }
    },


    /**
     * Provides the Attach field id of the Form 2
     *
     * @method form2Attach
     */

    form2Attach: {
        value: "activiti-congratsselenium"
    },
    /**
     * Provides the Attach field of the Form 2
     *
     * @property form2AttachElem
     * @type protractor.Element
     */

    form2AttachElem: {
        get: function () {
            return element(by.id(this.form2Attach));
        }
    },

    /**
     * Provides the Display Value of the Form 2
     *
     * @property form2DisplayValue
     * @type protractor.Element
     */

    form2DisplayValueElem: {
        get: function () {
            return element(by.xpath(".//*[@class='checkbox']"));
        }
    },

    /**
     * Provides the Display text of the Form 2
     *
     * @property form2DisplayText
     * @type protractor.Element
     */

    form2DisplayTextElem: {
        get: function () {
            return element(by.xpath(".//p[@ng-bind-html='field.value']"));
        }
    },

    /**
     * Provides the Display text of the Form 2
     *
     * @property form2DisplayValueLabel
     * @type protractor.Element
     */

    form2DisplayValueLabel: {
        get: function () {
            Util.waitUntilElementIsVisible(element(by.xpath(".//label[@class='checkbox ng-binding']")));
            return element(by.xpath(".//label[@class='checkbox ng-binding']"));
        }
    },

    /**
     * Provides the Checkbox for Boolean Var
     *
     * @method formBoolVar
     */
    formBoolVar: {
        value: "activiti-boolvarfield"
    },

    /**
     * Provides the Checkbox field
     *
     * @property formBoolVarElem
     * @type protractor.Element
     */
    formBoolVarElem: {
        get: function () {
            return element(by.id(this.formBoolVar));
        }
    },

    /**
     * Provides the TextBox for String Var
     *
     * @method formStringVar
     */
    formStringVar: {
        value: "activiti-stringvarfield"
    },

    /**
     * Provides the TextBox field
     *
     * @property formStringVarElem
     * @type protractor.Element
     */
    formStringVarElem: {
        get: function () {
            return element(by.id(this.formStringVar));
        }
    },

    /**
     * Provides the Number locator for Number Var
     *
     * @method formNumberVar
     */
    formNumberVar: {
        value: "activiti-numbervarfield"
    },

    /**
     * Provides the Number field
     *
     * @property formNumberVarElem
     * @type protractor.Element
     */
    formNumberVarElem: {
        get: function () {
            return element(by.id(this.formNumberVar));
        }
    },

    /**
     * Provides the Date locator for Date Var
     *
     * @method formDateVar
     */
    formDateVar: {
        value: "activiti-datevarfield"
    },

    /**
     * Provides the Date field
     *
     * @property formDateVarElem
     * @type protractor.Element
     */
    formDateVarElem: {
        get: function () {
            return element(by.id(this.formDateVar));
        }
    },

    /**
     * Provides the Process Name TextBox id
     *
     * @property formProcessName
     */
    formProcessName: {
        value: "activiti-name"
    },

    /**
     * Provides the Decision Checkbox id
     *
     * @property formDecision
     */
    formDecision: {
        value: "activiti-decision"
    },

    /**
     * Provides the Display Process Name field
     *
     * @property formDisplayProcessNameElem
     * @type protractor.Element
     */
    formDisplayProcessNameElem: {
        get: function () {
            return element(by.xpath('//div[@ng-show="field.isVisible"]//label[text()="processName"]//following-sibling::*/span'));
        }
    },

    /**
     * Provides the Display Decision Checkbox field of the Form 2
     *
     * @property formDisplayDecisionField
     * @type protractor.Element
     */
    formDisplayDecisionField: {
        get: function () {
            return element(By.xpath('//div[@ng-show="field.isVisible"]//label[contains(@class,"checkbox")]/input[@class="checkbox"]'));
        }
    },

    /**
     * Provides the Display Output Decision field of the Form 2
     *
     * @property formDisplayOutputDecisionField
     * @type protractor.Element
     */
    formDisplayOutputDecisionField: {
        get: function () {
            return element(by.xpath('//div[@ng-show="field.isVisible"]//label[text()="processOutputDecision"]//following-sibling::*/span'));
        }
    },


    /**
     * Get active process
     *
     * @param processName {String}
     * @method activeSubProcess
     * @return protractor.Element
     */
    activeSubProcess: {
        value: function (processName) {
            return element(by.xpath("//*/li[@ng-click='selectProcessDefinition(definition)' and @class='ng-scope active']//div[contains(text(),'" + processName + "')]"));
        }
    },

    /**
     * Active Tasks Locator
     * @method activeTaskName
     */
    activeTaskName: {
        get: function () {
            return element(by.binding("task.name && task.name"));
        }
    },

    /**
     * Get active task name
     * @method getActiveTaskName
     */
    getActiveTaskName: {
        value: function (callback) {
            Util.waitUntilElementIsVisible(this.activeTaskName);
            return this.activeTaskName.getText().then(function (taskName) {
                callback(taskName);
            });
        }
    },

    /**
     * Provides Active task assignee name locator
     * @method activeTaskAssigneeName
     */
    activeTaskAssigneeName: {
        get: function () {
            return element(by.css('span[translate="TASK.MESSAGE.ASSIGNEE"]'));
        }
    },

    /**
     * Get active task assignee name
     * @method getActiveAssigneeName
     * @return protractor.Element
     */
    getActiveAssigneeName: {
        value: function (callback) {
            Util.waitUntilElementIsVisible(this.activeTaskAssigneeName);
            return this.activeTaskAssigneeName.getText().then(function (assigneeName) {
                callback(assigneeName);
            })
        }
    }
});
