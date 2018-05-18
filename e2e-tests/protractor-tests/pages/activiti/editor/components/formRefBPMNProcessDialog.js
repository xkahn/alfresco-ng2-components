/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 01/29/2015.
 */

var Page = require("astrolabe").Page;
var referenceDialog = "//div[@ng-controller='KisBpmFormReferencePopupCrtl']";

/**
 * Provides the process form reference dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.formRefBPMNProcessDialog
 */
module.exports = Page.create({
    /**
     * Clicks New form button
     *
     * @method newForm
     */
    newForm: {
        value: function () {
            element(by.xpath(referenceDialog + '//button[@ng-click="newForm()"]')).click();
        }
    },

    /**
     * Clicks Save form button
     *
     * @method saveForm
     */
    saveForm: {
        value: function () {
            element(by.xpath(referenceDialog + '//button[@ng-click="save()"]')).click();
        }
    },

    /**
     * Clicks New form button
     *
     * @param formName
     * @method newForm
     */
    selectForm: {
        value: function (formName) {
            element(by.xpath(referenceDialog + '//h4[text()="' + formName + '"]')).click();
        }
    }
});