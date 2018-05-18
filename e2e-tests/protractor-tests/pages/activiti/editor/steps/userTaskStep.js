/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 05/06/2015.
 */

var Page = require("astrolabe").Page;
var createNewFormDialog = require("../components/createFormDialog.js");
var Util = require("../../../../util/util.js");

var stepSection = '//div[@ng-repeat="step in steps"]';
var mappingSection = stepSection + '//div[@ng-show="showVariableMapping()"]';

/**
 * Provides the User Task Step
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.steps.UserTaskStep
 */
module.exports = Page.create({
    /**
     * Provides the create new form dialog
     *
     * @attribute createNewFormDialog
     * @type astrolabe.Page
     */
    createNewFormDialog: {
        get: function () {
            return createNewFormDialog;
        }
    },

    /**
     * Opens the Details tab
     *
     * @method openDetailsTab
     */
    openDetailsTab: {
        value: function (index) {
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//li/a[text()="Details"]')).click()
        }

    },

    /**
     * Fills the name for the index-th rest call step
     *
     * @param index Index of the step
     * @param name Name for the step
     * @method fillName
     */
    fillName: {
        value: function (index, name) {
            this.openDetailsTab(index);
            var nameInput = element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//input[@ng-model="step[property.id]"]'));

            nameInput.clear();
            nameInput.sendKeys(name);
        }
    },

    /**
     * Opens the form tab
     *
     * @method openFormTab
     */
    openFormTab: {
        value: function (index) {
            Util.waitUntilElementIsVisible(element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//li/a[text()="Form"]')));
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//li/a[text()="Form"]')).click()
        }

    },

    /**
     * Opens the current form
     *
     * @param index
     * @method openForm
     */
    openForm: {
        value: function (index) {
            var buttonOpenForm = element(by.xpath('//*/button[@ng-click="showForm()"]'));
            Util.waitUntilElementIsVisible(buttonOpenForm);
            buttonOpenForm.click();

            var canvasSection = element(by.id("canvasSection"));
            Util.waitUntilElementIsVisible(canvasSection);
        }
    },

    /**
     * Creates a new form
     *
     * @param index
     * @param formName
     * @method createNewForm
     */
    createNewForm: {
        value: function (index, formName) {
            this.openFormTab(index);

            var txtCurrentForm = element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//div/button[@class="selection ng-isolate-scope form-selection"]'));
            txtCurrentForm.click();

            var btnCreateForm = element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//div/button[@ng-click="createForm()"]'));
            btnCreateForm.click();

            this.createNewFormDialog.fillName(formName);
            this.createNewFormDialog.clickOk();
        }
    },

    /**
     * Check Map Variables
     *
     * @method clickMapVariables
     */
    checkMapVariables: {
        value: function () {
            element(by.xpath(stepSection + '//div[@ng-controller="FormVariableMappingController"]//input[@ng-model="model.hasVariableMapping"]')).click();
        }
    },

    /**
     * Add variable mapping in variable mapping section
     *
     * @method addVariableMapping
     */
    addVariableMapping: {
        value: function () {
            var buttonAdd = element(by.xpath(mappingSection + '//a[@ng-click="addField()"]'));

            Util.waitUntilElementIsVisible(buttonAdd);
            buttonAdd.click();
        }
    },

    /**
     * Selects variable mapping type
     *
     * @method variableMappingType
     * @param type
     */
    variableMappingType: {
        value: function (type) {
            var mapTypeTab = element(by.xpath(mappingSection + '//button[@ng-model="currentVariableMapping.typeOfMapping" and text()="' + type + '"]'));

            Util.waitUntilElementIsVisible(mapTypeTab);
            mapTypeTab.click();
        }
    },

    /**
     * Selects out variable type
     *
     * @method outVariableType
     * @param type
     */
    outVariableType: {
        value: function (type) {
            var mapTypeTab = element(by.xpath(mappingSection + '//button[@ng-model="outVariableType" and text()="' + type + '"]'));

            Util.waitUntilElementIsVisible(mapTypeTab);
            mapTypeTab.click();
        }
    },

    /**
     * Select form field from drop down in variable mapping section
     *
     * @method selectFormField
     * @param fieldName {String}
     */
    selectFormField: {
        value: function (fieldName, index) {
            var buttonDropDown = element(by.xpath("("+ mappingSection + '//button[contains(@class,"selection form-control")]'+")[" + index + "]"));
            Util.waitUntilElementIsVisible(buttonDropDown);
            buttonDropDown.click();

            var fieldElem = element(by.xpath(mappingSection + '//ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + fieldName + '")]'));
            Util.waitUntilElementIsVisible(fieldElem);
            fieldElem.click();
        }
    },

    /**
     * Fill the name of target process variable in variable mapping section
     *
     * @param name Name of the variable
     * @method fillName
     */
    fillTargetProcVar: {
        value: function(name) {
            var nameInput = element(by.xpath(mappingSection + '//*[@id="outputValueField"]'));

            nameInput.clear();
            nameInput.sendKeys(name);
        }
    },

    defineVarMapping: {
        value: function(mappingType, fieldName, fieldNameColumn, targetProcVar){
            checkMapVariables();
            addVariableMapping();
            variableMappingType("Output mapping");
            selectFormField("Decision", 3);
            fillTargetProcVar("processDecision");
        }
    },

    /**
     * Provides assignmentDropDown button
     * @property assignmentDropDown
     * @type protractor.Element
     */
    assignmentDropDown:{
        get:function(){
            return element(by.model('assignmentOption'));
        }
    },

    /**
     * Provides assignmentDropDown Options
     * @property assignmentDropDownOptions
     * @type protractor.Element
     */
    assignmentDropDownOptions:{
        get:function(){
            return element.all(by.repeater('match in $matches'));
        }
    },

    /**
     * select a option from Assignment dropdown
     * @param option
     * @method selectOptionForAssignment
     */
    selectOptionForAssignment:{
        value:function(option){
            Util.waitUntilElementIsVisible(this.assignmentDropDown);
            this.assignmentDropDown.click();
            this.assignmentDropDownOptions.get(option).click();
        }
    },

    /**
     * Provides addGroup button
     * @property addGroupButton
     * @type protractor.Element
     */
    addGroupButton:{
        get:function(){
            return element(by.css('button[class="btn btn-xs ng-binding ng-isolate-scope group-selection"]'));
        }
    },

    /**
     * clicks the  add-group button
     * @method clickAddGroup
     */
    clickAddGroup:{
        value:function(){
            Util.waitUntilElementIsVisible(this.addGroupButton);
            this.addGroupButton.click();
        }
    },

    /**
     * Provides available organisation group
     * @property availableOrganisationGroup
     * @type protractor.Element
     */
    availableOrganisationGroup:{
        get:function(){
            return element(by.repeater('group in popupModel.groupResults'));
        }
    },

    /**
     * Select available Organisation Group
     * @method selectOrganisationGroup
     */
    selectOrganisationGroup:{
        value:function(){
            Util.waitUntilElementIsVisible(this.availableOrganisationGroup);
            this.availableOrganisationGroup.click();
        }
    }
});