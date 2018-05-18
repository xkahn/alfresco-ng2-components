/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 12/14/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");
var dialog = "//div[@ng-controller='DecisionTableInputConditionEditorCtlr']";

/**
 * Provides the edit input decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.editInputDecisionTableDialog
 */
module.exports = Page.create({
    /**
     * Clicks the Save button
     *
     * @method saveBtn
     */
    saveBtn: {
        value: function () {
            var saveElem = element(by.xpath(dialog + '//button[@ng-click="save()"]'));

            Util.waitUntilElementIsVisible(saveElem);
            saveElem.click();
        }
    },

    /**
     * Enter input label name
     *
     * @param label {String}
     * @method fillLabel
     */
    fillLabel: {
        value: function (label) {
            var labelElem = element(by.xpath(dialog + '//input[@ng-model="popup.selectedExpressionLabel"]'));

            Util.waitUntilElementIsVisible(labelElem);
            labelElem.clear().sendKeys(label);
        }
    },

    /**
     * Clicks the Existing Tab
     *
     * @method existingTab
     */
    existingTab: {
        value: function () {
            var existingElem =  element(by.xpath(dialog + '//button[@ng-click="setNewVariable(false)"]'));

            Util.waitUntilElementIsVisible(existingElem);
            existingElem.click();
        }
    },

    /**
     * Clicks the Create New tab
     *
     * @method createNewTab
     */
    createNewTab: {
        value: function () {
            var createElem =  element(by.xpath(dialog + '//button[@ng-click="setNewVariable(true)"]'));

            Util.waitUntilElementIsVisible(createElem);
            createElem.click();
        }
    },

    /**
     * Enters variable id
     *
     * @param label {String}
     * @method fillVariableId
     */
    fillVariableId: {
        value: function (label) {
            var idElem = element(by.xpath(dialog + '//input[@ng-model="popup.selectedExpressionVariable.id"]'));

            Util.waitUntilElementIsVisible(idElem);
            idElem.sendKeys(label);
        }
    },

    /**
     * Select variable type
     *
     * @param label {String}
     * @method selectVariableType
     */
    selectVariableType: {
        value: function (label) {
            var typeElem = element(by.xpath(dialog + '//select[@ng-model="popup.selectedExpressionVariable.type"]/option[text()="' + label + '"]'));

            Util.waitUntilElementIsVisible(typeElem);
            typeElem.click();
        }
    },

    /**
     * Clicks the Form Field tab
     *
     * @method formFieldTab
     */
    formFieldTab: {
        value: function () {
            var formTabElem = element(by.xpath(dialog + "//*[contains(@ng-click,'formfield')]"));

            Util.waitUntilElementIsVisible(formTabElem);
            formTabElem.click();
        }
    },

    /**
     * Clicks the Form Field tab in reusable DT
     *
     * @method formFieldTabReusableDT
     */
    formFieldTabReusableDT: {
        value: function () {
            var formTabElem = element(by.xpath(dialog + "//*[@ng-show='!isEmbeddedTable()']//*[contains(@ng-click,'formfield')]"));

            Util.waitUntilElementIsVisible(formTabElem);
            formTabElem.click();
        }
    },

    /**
     * Clicks the Form Field list
     *
     * @method formFieldList
     */
    formFieldList: {
        value: function () {
            var formListElem = element(by.xpath(dialog + '//div[@field-select="popup.selectedExpressionVariable"]/button'));

            Util.waitUntilElementIsVisible(formListElem);
            formListElem.click();
        }
    },

    /**
     * Clicks the Form Field list
     *
     * @method formFieldList
     */
    formFieldListReusableDT: {
        value: function () {
            var formListElem = element(by.xpath(dialog + '//*[@ng-show="!isEmbeddedTable()"]//div[@field-select="popup.selectedExpressionVariable"]/button'));

            Util.waitUntilElementIsVisible(formListElem);
            formListElem.click();
        }
    },

    /**
     * Clicks the Form Field list option
     *
     * @param field {String}
     * @method formFieldListOption
     */
    formFieldListOption: {
        value: function (field) {
            var formListOpt = element(by.xpath(dialog + "//div[@field-select='popup.selectedExpressionVariable']/ul/li/a[contains(text(),'" + field + "')]"));

            Util.waitUntilElementIsVisible(formListOpt);
            formListOpt.click();
        }
    },

    /**
     * Clicks the Form Field list option
     *
     * @param field {String}
     * @method formFieldListOption
     */
    formFieldListOptionReusableDT: {
        value: function (field) {
            var formListOpt = element(by.xpath(dialog + "//*[@ng-show='!isEmbeddedTable()']//div[@field-select='popup.selectedExpressionVariable']/ul/li/a[contains(text(),'" + field + "')]"));

            Util.waitUntilElementIsVisible(formListOpt);
            formListOpt.click();
        }
    }
});