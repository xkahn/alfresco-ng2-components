/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Thu Jun 29 2017
 */

/**
 * Page object for Script Tasks configurations - Script editor dialog
 *
 */

var Util = require('../../../../util/util.js');
var CONSTANTS = require('../../../../util/constants.js');

var ScriptTaskScriptEditorDialog = function () {

    var scriptEditDialogXPath = ".//div[contains(@class, 'modal-dialog')]";

    var scriptEditDialog = element(by.xpath(scriptEditDialogXPath));
    var scriptTextArea = element(by.xpath(scriptEditDialogXPath + "//child::div[contains(@class, 'ace_content')]"));
    var saveButton = element(by.xpath(scriptEditDialogXPath + "//child::button[text()='Save']"));
    var cancelButton = element(by.xpath(scriptEditDialogXPath + "//child::button[text()='Cancel']"));

    /**
     * Wait until Script dialog is loaded
     */
    this.waitUntilScriptModalIsLoaded = function () {
        Util.waitUntilElementIsVisible(scriptEditDialog);
    };

    /**
     * Change Script attribute value for a Script Task
     */
    this.setScriptValueInScriptTask = function (scriptValue) {
        this.waitUntilScriptModalIsLoaded();
        Util.waitUntilElementIsVisible(scriptTextArea);

        // clear current value
        browser.actions().sendKeys(Util.getSelectAllKeys()).sendKeys(protractor.Key.DELETE).perform();

        // send new value
        browser.actions().sendKeys(scriptValue).perform();
    };

    /**
     * Save changes in edit script attribute popup
     */
    this.save = function () {
        logger.info("Perform save on edit script attribute popup");
        this.waitUntilScriptModalIsLoaded();
        saveButton.click();
        Util.waitUntilElementIsNotVisible(scriptEditDialog);
    };

    /**
     * Dismiss changes in edit script attribute popup
     */
    this.cancel = function () {
        this.waitUntilScriptModalIsLoaded();
        cancelButton.click();
        Util.waitUntilElementIsNotVisible(scriptEditDialog);
    }
};

module.exports = ScriptTaskScriptEditorDialog;
