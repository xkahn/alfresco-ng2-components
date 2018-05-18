/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed July 12 2017
 */

var Util = require('../../../../../util/util.js');

/**
 * Edit date field dialog
 *
 */
var DateFieldEditDialog = function() {

    var dateFormatInput = element(by.name('dateFormat'));
    var dateDisplayed = element(by.css("span[ng-if*='currentDate']"));
    var closeBtn = element(by.css('button[ng-click="doneEditing()"]'));

    /**
     * Open specified tab
     *
     * @param tabName
     */
    this.openTab = function (tabName) {
        var tabElement = element(by.cssContainingText("li>a", tabName));
        Util.waitUntilElementIsVisible(tabElement);
        tabElement.click();
    };

    this.setDateFormat = function (dateFormat) {
        Util.waitUntilElementIsVisible(dateFormatInput);
        dateFormatInput.clear().sendKeys(dateFormat);
    };

    this.getDateDisplayed = function () {
        return dateDisplayed.getText();
    };
    /**
     * Closes the edit dialog
     *
     */
    this.close = function () {
        Util.waitUntilElementIsVisible(closeBtn);
        closeBtn.click();
        Util.waitUntilElementIsNotVisible(closeBtn);
    };
};
module.exports = DateFieldEditDialog;