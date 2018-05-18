/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 01/04/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");
var dialog = "//div[@ng-controller='DecisionTableConclusionEditorCtlr']";

/**
 * Provides the edit output decision table dialog
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

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
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

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
            Util.waitUntilElementIsVisible(labelElem);
            labelElem.clear().sendKeys(label);
        }
    },

    /**
     * Clicks the createNewTab Field tab
     *
     * @method createNewTab
     */
    createNewTab: {
        value: function () {
            var createElem =  element(by.xpath(dialog + '//button[@ng-click="popup.selectedExpressionNewVariable = true"]'));

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
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
            var idElem = element(by.xpath(dialog + '//input[@ng-model="popup.selectedExpressionNewVariableId"]'));

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
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
            var typeElem = element(by.xpath(dialog + '//select[@ng-model="popup.selectedExpressionNewVariableType"]/option[text()="' + label + '"]'));

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
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
            var fieldTabElem = element(by.xpath(dialog + '//*[contains(@ng-click,"popup.selectedExpressionVariableType = \'formfield\'")]'));

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
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
            var fieldListElem = element(by.xpath(dialog + '//div[@field-select="popup.selectedExpressionVariable"]/button'));

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
            Util.waitUntilElementIsVisible(fieldListElem);
            fieldListElem.click();
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

            Util.waitUntilElementIsVisible(element(by.xpath(dialog)));
            Util.waitUntilElementIsVisible(fieldListOptElem);
            fieldListOptElem.click();
        }
    }
});