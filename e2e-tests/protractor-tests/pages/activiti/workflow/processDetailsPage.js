/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Oct 11 2017
 */

/**
 * Provides utility methods for the process details page, under workflow
 */

var Util = require('../../../util/util.js');
var GenericInputField = require('../../../pages/activiti/components/genericInputField.js');

var ProcessDetailsPage = function () {

    var closeDatePickerButton = element(by.css("[ng-click*='closeDatePopup']"));
    var startProcessBtn = element(by.id('form_complete_button'));

    var genericInputField = new GenericInputField();

    this.setFormField = function (By, field, value) {
        genericInputField.setFieldValue(By, field, value);
        return this;
    };

    this.dismissDatePickerPopup = function () {
        Util.waitUntilElementIsVisible(closeDatePickerButton);
        closeDatePickerButton.click();
        return this;
    };

    this.startProcess = function () {
        Util.waitUntilElementIsVisible(startProcessBtn);
        startProcessBtn.click();
        return this;
    };
};

module.exports = ProcessDetailsPage;