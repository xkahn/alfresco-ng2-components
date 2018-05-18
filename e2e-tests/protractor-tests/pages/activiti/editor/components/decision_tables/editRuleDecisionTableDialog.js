/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 12/15/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");
var dialog = "//div[@ng-controller='DecisionTableRuleExpressionEditorCtlr']";

/**
 * Provides the edit rule decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.editRuleDecisionTableDialog
 */
module.exports = Page.create({
    /**
     * Clicks the OK button
     *
     * @method saveOk
     */
    saveOk: {
        value: function () {
            var saveBtn = element(by.xpath(dialog + '//button[@ng-click="save()"]'));

            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
        }
    },

    /**
     * Select operator label name
     *
     * @param label {String}
     * @method selectOperator
     */
    selectOperator: {
        value: function (label) {
            element(by.xpath(dialog + '//select[@ng-model="popup.selectedOperator"]/option[text()="' + label + '"]"'));
        }
    },

    /**
     * Clicks the Number tab
     *
     * @method formNumberTab
     */
    formNumberTab: {
        value: function () {
            var numberTabElem  =  element(by.xpath(dialog + '//*[contains(@ng-click,"popup.selectedExpressionVariableType = \'value\'")]'));

            Util.waitUntilElementIsVisible(numberTabElem);
           numberTabElem.click();
        }
    },

    /**
     * Type a string
     *
     * @param value {String}
     * @method typeString
     */
    typeString: {
        value: function (value) {
            var stringElem = element(by.xpath(dialog + '//input[@name="string"]'));

            Util.waitUntilElementIsVisible(stringElem);
            stringElem.clear().sendKeys(value);
        }
    },

    /**
     * Type a number
     *
     * @param value {String}
     * @method typeNumber
     */
    typeNumber: {
        value: function (value) {
            var numberElem = element(by.xpath(dialog + '//input[@name="number"]'));

            Util.waitUntilElementIsVisible(numberElem);
            numberElem.clear().sendKeys(value);
        }
    },

    /**
     * Select boolean
     *
     * @param value {String}
     * @method selectBool
     */
    selectBool: {
        value: function (value) {
            var boolSelectElem = element(by.xpath(dialog + '//input[@name="boolean"]/following-sibling::*/button'));
            Util.waitUntilElementIsVisible(boolSelectElem);
            boolSelectElem.click();

            var boolElem = element(by.xpath(dialog +  '//input[@name="boolean"]/following-sibling::*/ul//a[text()="'+ value +'"]'));
            Util.waitUntilElementIsVisible(boolElem);
            boolElem.click();
        }
    },

    /**
     * Type a date
     *
     * @param value {String}
     * @method typeDate
     */
    typeDate: {
        value: function (value) {
            var dateElem = element(by.xpath(dialog + '//input[@id="date"]'));

            Util.waitUntilElementIsVisible(dateElem);
            dateElem.clear().sendKeys(value);
        }
    },

    /**
     * Clicks the Form Field tab
     *
     * @method formFieldTab
     */
    formFieldTab: {
        value: function () {
            var fieldTabElem = element(by.xpath(dialog + '//*[contains(@ng-click,"popup.selectedExpressionVariableType = \'formfield\'")]'));

            Util.waitUntilElementIsVisible(fieldTabElem);
            fieldTabElem.click();
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
     * Clicks the Form Field list option
     *
     * @param field {String}
     * @method formFieldListOption
     */
    formFieldListOption: {
        value: function (field) {
            var fieldListOptElem = element(by.xpath(dialog + "//div[@field-select='popup.selectedExpressionVariable']/ul/li/a[contains(text(),'" + field + "')]"));

            Util.waitUntilElementIsVisible(fieldListOptElem);
            fieldListOptElem.click();
        }
    }
});