/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 01/11/2016.
 */

var Page = require("astrolabe").Page;
var dialog = "//div[@ng-controller='ValidateDecisionTableModelCtrl']";

/**
 * Provides the validation decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.validationDecisionTableDialog
 */
module.exports = Page.create({
    /**
     * Validation window header
     *
     * @method validationWinHeader
     */
    validationWinHeader: {
        get: function () {
            return element(by.xpath(dialog + "//h2[text()='Validation errors:']"));
        }
    },

    /**
     * Close validation window
     *
     * @method closeValidationWin
     */
    closeValidationWin: {
        value: function () {
            return element(by.xpath(dialog + "//button[@class='close']")).click();
        }
    },

    /**
     * Close validation window
     *
     * @method descriptionValidationWin
     */
    descriptionValidationWin: {
        value: function (index) {
            return element(by.xpath("(" + dialog + "//div[@class='ui-grid-canvas']//div[contains(@class,'ui-grid-cell-contents')])[" + index + "]")).getText();
        }
    }
});