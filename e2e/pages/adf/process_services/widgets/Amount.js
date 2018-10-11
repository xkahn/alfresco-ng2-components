/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var FormFields = require('../formFields');
var Util = require('../../../../util/util');

var Amount = function () {

    var formFields = new FormFields();
    var filedLocator = element(by.id('amount'));
    var errorMessage = element(by.css('amount-widget div[class*="adf-error-text"]'));

    this.getFieldLabel = function (fieldId) {
        return formFields.getFieldLabel(fieldId, labelLocator);
    };

    this.insertAmount = function(amount) {
        Util.waitUntilElementIsVisible(filedLocator);
        return filedLocator.clear().sendKeys(amount);
    }; 

    this.getAmountField = function(amount) {
        Util.waitUntilElementIsVisible(filedLocator);
        return filedLocator.getAttribute('value');
    }; 

    this.checkErrorMessageIsVisible = function() {
        return Util.waitUntilElementIsVisible(errorMessage);
    }

    this.checkErrorMessageIsNotVisible = function() {
        return Util.waitUntilElementIsNotVisible(errorMessage);
    }

    this.getErrorMessage = function() {
        Util.waitUntilElementIsVisible(errorMessage);
        return errorMessage.getText();
    }
};

module.exports = Amount;

