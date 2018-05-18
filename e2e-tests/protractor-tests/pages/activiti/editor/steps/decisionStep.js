/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */


var Page = require("astrolabe").Page;
var createDecisionTableDialog = require("../components/decision_tables/createDecisionTableDialog.js");
var Util = require("../../../../util/util.js");

var stepSection = '//div[@ng-repeat="step in steps"]';
var mappingSection = stepSection + '//div[@ng-show="showVariableMapping()"]';

/**
 * Provides the Decision Step
 * @module pages
 * @submodule activiti
 * @submodule editor
 */
module.exports = Page.create({
    /**
     * Provides the create new form dialog
     *
     * @attribute createNewFormDialog
     * @type astrolabe.Page
     */
    createNewDecisionTableDialog: {
        get: function () {
            return createDecisionTableDialog;
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
     * Opens the Decision table tab
     *
     * @method openDecisionTableTab
     */
    openDecisionTableTab: {
        value: function (index) {
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//div[@ng-controller="DecisionStepController"]//li[2]/a[text()="Decision table"]')).click()
        }
    },

    /**
     * Fills the name for the index-th decision step
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
     * Opens the current decision table
     *
     * @param index
     * @method openForm
     */
    openDecisionTable: {
        value: function (index) {
            var openBtn = element(by.xpath('//div//div/button[@ng-click="showDecisionTable()"]'));
            Util.waitUntilElementIsVisible(openBtn);
            openBtn.click();
            Util.waitUntilElementIsStale(openBtn);
            var lastElem = element(by.xpath("//div[@class='ui-grid-cell-contents ui-grid-header-cell-primary-focus']//i[@class='ui-grid-icon-blank']"));
            Util.waitUntilElementIsVisible(lastElem);
        }
    },

    /**
     * Select decision table
     *
     * @param index
     * @method selectDecisionTable
     */
    selectDecisionTable: {
        value: function (index) {
            var txtCurrentTable = element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//div/button[@class="selection ng-isolate-scope decision-table-selection"]'));
            txtCurrentTable.click();
        }
    },

    /**
     * Select decision table by name
     *
     * @param index
     * @method selectDecisionTableByName
     */
    selectDecisionTableByName: {
        value: function (index, name) {
            this.openDecisionTableTab(index);

            this.selectDecisionTable(index);

            element(by.xpath("//li[@ng-repeat='decisionTable in popupModel.decisionTableResults' and contains(text(),'" + name + "')]")).click();
        }
    },

    /**
     * Creates a new decision table
     *
     * @param index
     * @param decision table name
     * @method createNewDecisionTable
     */
    createNewDecisionTable: {
        value: function (index, tableName) {
            this.openDecisionTableTab(index);

            this.selectDecisionTable(index);

            var buttonCurrentTable = element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//div/button[@ng-click="createDecisionTable()"]'));
            buttonCurrentTable.click();

            this.createNewDecisionTableDialog.fillName(tableName);
            this.createNewDecisionTableDialog.clickOk();
            var lastElem = element(by.xpath("//div[@class='ui-grid-cell-contents ui-grid-header-cell-primary-focus']//i[@class='ui-grid-icon-blank']"));
            Util.waitUntilElementIsVisible(lastElem);
        }
    },

    /**
     * Check Map Variables
     *
     * @method clickMapVariables
     */
    checkMapVariables: {
        value: function () {
            var mapVarCheck = element(by.xpath(stepSection + '//div[@ng-controller="DecisionTableVariableMappingController"]//input[@ng-model="model.hasVariableMapping"]'));

            Util.waitUntilElementIsVisible(mapVarCheck);
            mapVarCheck.click();
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
        value: function (fieldName) {
            var buttonDropDown = element(by.xpath(mappingSection + '//button[contains(@class,"selection form-control")]'));

            Util.waitUntilElementIsVisible(buttonDropDown);
            buttonDropDown.click();

            var fieldElem = element(by.xpath(mappingSection + '//ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + fieldName + '")]'));

            Util.waitUntilElementIsVisible(fieldElem);
            fieldElem.click();
        }
    },

    /**
     * Select decision table variable from drop down in variable mapping section
     *
     * @method selectOutDTVar
     * @param varName {String}
     */
    selectOutDTVar: {
        value: function (varName) {

            var buttonDropDown = element(by.xpath(mappingSection + '//*[@id="outputExpressionVariable"]/button[contains(@class,"selection form-control")]'));

            Util.waitUntilElementIsVisible(buttonDropDown);
            buttonDropDown.click();

            var fieldElem = element(by.xpath(mappingSection + '//*[@id="outputExpressionVariable"]/ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + varName + '")]'));

            Util.waitUntilElementIsVisible(fieldElem);
            fieldElem.click();
        }
    },

    /**
     * Select decision table variable from drop down in variable mapping section
     *
     * @method selectInDTVar
     * @param varName {String}
     */
    selectInDTVar: {
        value: function (varName) {
            var buttonDropDown = element(by.xpath(mappingSection + '//*[@id="inputExpressionVariable"]/button[contains(@class,"selection form-control")]'));

            Util.waitUntilElementIsVisible(buttonDropDown);
            buttonDropDown.click();

            var fieldElem = element(by.xpath(mappingSection + '//*[@id="inputExpressionVariable"]/ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + varName + '")]'));

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
        value: function (name) {
            var nameInput = element(by.xpath(mappingSection + '//*[@id="outputValueField"]'));

            nameInput.clear();
            nameInput.sendKeys(name);
        }
    },
});