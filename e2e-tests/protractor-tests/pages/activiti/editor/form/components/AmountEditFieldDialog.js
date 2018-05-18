/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 13/09/2016.
 */

var Util = require('../../../../../util/util.js');
var Page = require("astrolabe").Page;

/**
 * Provides the edit field dialog for a amount field
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.AmountEditFieldDialog
 */
module.exports = Page.create({
    /**
     * Closes the edit dialog
     *
     * @method closeDialog
     */
    close: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css('button[ng-click="doneEditing()"]')));
            element(by.css('button[ng-click="doneEditing()"]')).click();
            Util.waitUntilElementIsNotVisible(element(by.css('button[ng-click="doneEditing()"]')));
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
     * Check required
     *
     * @param check
     * @method updateFieldId
     */
    checkRequired: {
        value: function (check) {
            var formAttributeLabelName = element(by.model("formElement.required"));
            Util.waitUntilElementIsVisible(formAttributeLabelName);
            if (check)
                formAttributeLabelName.click();
        }
    }

});