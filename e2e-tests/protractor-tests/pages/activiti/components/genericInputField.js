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
 * Provides utility methods for input WebElements
 * 
 * These methods should be used in any Page Object that has input fields
 */

var Util = require('../../../util/util.js');

var GenericInputField = function () {

    var fieldElem;

    this.getField = function (By, field) {
        return element(By(field));
    };

    this.setFieldValue = function (By, field, value) {
        fieldElem =  this.getField(By, field);
        Util.waitUntilElementIsVisible(fieldElem);
        fieldElem.clear().sendKeys(value);
        return this;
    };

    this.isFieldDisplayed = function (By, field) {
        return this.getField(By, field).isDisplayed();
    };

    this.clickField = function (By, field) {
        fieldElem =  this.getField(By, field);
        Util.waitUntilElementIsVisible(fieldElem);
        fieldElem.click();
    };

    this.getFieldValue = function (By, field) {
        return this.getField(By, field).getAttribute('value');
    };

    this.getFieldText = function (By, field) {
        return this.getField(By, field).getText();
    };
};

module.exports = GenericInputField;
