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
var referenceDialog = "//div[@ng-controller='ActivitiDecisionTableReferencePopupCtrl']";

/**
 * Provides the process decision table reference dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.formRefBPMNProcessDialog
 */
module.exports = Page.create({
    /**
     * Clicks New decision table button
     *
     * @method newDecisionTable
     */
    newDecisionTable: {
        value: function () {
            element(by.xpath(referenceDialog + '//button[@ng-click="newDecisionTable()"]')).click();
        }
    },

    /**
     * Selects existent decision table
     *
     * @method selectDecisionTable
     */
    selectDecisionTable: {
        value: function (dtName) {
            element(by.xpath(referenceDialog + "//h4[contains(text(),'" + dtName + "')]/preceding-sibling::*/input[@type='checkbox']"))
                .click();
        }
    },

    /**
     * Clicks Open button
     *
     * @method newDecisionTable
     */
    openDecisionTable: {
        value: function () {
            element(by.xpath(referenceDialog + '//button[@ng-click="open()"]')).click();
        }
    }
});