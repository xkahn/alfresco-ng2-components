/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue July 4 2017
 */

var Util = require("../../../../util/util.js");

/**
 * Page Object for delete app definition dialog
 */

var DeleteAppDefinitionDialog = function () {

    var currentVersionRadioBtn = element(by.xpath(".//div[@class='radio']//child::*[contains(text(), 'delete all previous versions of this app definition')]//preceding-sibling::input"));
    var cancelBtn = element(by.css("button[ng-click='cancel()']"));
    var deleteAppDefBtn = element(by.xpath(".//span[text()='Delete app definition']//parent::button"));

    /**
     * Select all previous versions of the app for deletion
     */
    this.selectAllVersions = function () {
        currentVersionRadioBtn.click();
    };

    /**
     * Click cancel button.
     */
    this.clickCancel = function () {
        cancelBtn.click();
    };

    /**
     * Click delete app definition button.
     */
    this.clickDeleteAppDefinition = function () {
        Util.waitUntilElementIsVisible(deleteAppDefBtn);
        deleteAppDefBtn.click();
    };

}

module.exports = DeleteAppDefinitionDialog;
