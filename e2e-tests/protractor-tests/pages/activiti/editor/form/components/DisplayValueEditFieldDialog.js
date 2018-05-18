/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 18/06/2015.
 */

var Util = require('../../../../../util/util.js');
var Page = require("astrolabe").Page;

/**
 * Provides the edit field dialog for a display value field
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.DisplayValueEditFieldDialog
 */
module.exports = Page.create({
    /**
     * Closes the edit dialog
     *
     * @method closeDialog
     */
    close: {
        value: function () {
            var closeButton = element(by.css('button[ng-click="doneEditing()"]'));
            Util.waitUntilElementIsVisible(closeButton);
            closeButton.click();
        }
    },

    /**
     * Opens the specified tab
     *
     * @param tabName
     * @method openTab
     */
    openTab: {
        value: function (tabName) {
            Util.waitUntilElementIsVisible(element(by.cssContainingText("li>a", tabName)));
            element(by.cssContainingText("li>a", tabName)).click();
        }
    },

    /**
     * Selects response variable button
     *
     * @method clickResponseVariableButton
     */
    clickResponseVariableButton: {
        value: function () {
            element(by.css('button[ng-click="setUrlFieldType(\'restResponse\')"]')).click();
        }
    },

    /**
     * Selects Form field button
     *
     * @method clickFormFieldButton
     */
    clickFormFieldButton: {
        value: function () {
            element(by.css('button[ng-click="setUrlFieldType(\'formField\')"]')).click();
        }
    },


    /**
     * Selects the response variable
     *
     * @param variable
     * @method selectResponseVariable
     */
    selectResponseVariable: {
        value: function (variable) {
            var varTabElem = element(by.css('div[select-title="\'FORM-BUILDER.MESSAGE.READONLY-TEXT-SELECT-RESPONSE-VARIABLE\'"]>button'));
            Util.waitUntilElementIsVisible(varTabElem);
            varTabElem.click();

            element(by.cssContainingText('ul[ng-click="refreshFields()"]>li[ng-repeat="field in formFields"]>a[ng-click="selectField(field)"]>span', variable)).click();
        }
    },

    /**
     * Selects the field name
     *
     * @param fieldName
     * @method selectFormField
     */
    selectFormField: {
        value: function (fieldName) {
            var divSelection = '//div[@select-title="\'FORM-BUILDER.MESSAGE.READONLY-TEXT-SELECT-FIELD\'"]';

            Util.waitUntilElementIsVisible(element(by.xpath(divSelection)));
            element(by.xpath(divSelection + '/button')).click();
            element(by.xpath(divSelection + '//ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + fieldName + '")]')).click();
        }
    },

    /**
     * Update field label
     *
     * @param text
     * @method updateFieldName
     */
    updateFieldName: {
        value: function (text) {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@class='modal-dialog modal-wide']//input[@ng-model='formElement.name']")));
            label = element(by.xpath("//div[@class='modal-dialog modal-wide']//input[@ng-model='formElement.name']"));
            label.clear();
            label.sendKeys(text);
        }
    },

    /**
     * Update field label
     *
     * @param text
     * @method updateFieldId
     */
    updateFieldId: {
        value: function (text) {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@class='modal-dialog modal-wide']//input[@ng-model='formElement.id']")));
            label = element(by.xpath("//div[@class='modal-dialog modal-wide']//input[@ng-model='formElement.id']"));
            label.clear();
            label.sendKeys(text);
        }
    },


    /**
     * click add new visibility condition
     *
     */
    clickAddVisibilityCondidion: {
        value: function () {
            var addNewVisibilityRule = element(by.css("a[ng-click='addNewCondition()']"));
            Util.waitUntilElementIsVisible(addNewVisibilityRule);
            addNewVisibilityRule.click();
        }
    },

    /**
     * select dropDown for form-field/variable dropdown
     *
     * @method selectFormField_variable_dropDown
     */
    selectFormField_variable_dropDown: {
        value: function () {
            var formField_variable_dropDown = element(by.id('leftVariableField'));
            Util.waitUntilElementIsVisible(formField_variable_dropDown);
            formField_variable_dropDown.click();
        }
    }

});