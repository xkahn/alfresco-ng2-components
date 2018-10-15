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
import FormFields = require('../formFields');
import Util = require('../../../../util/util');
import { element, by } from 'protractor';

export class Amount {

    formFields = new FormFields();
    filedLocator = element(by.id('amount'));
    errorMessage = element(by.css('amount-widget div[class*="adf-error-text"]'));

    getFieldLabel(fieldId) {
        this.formFields.getFieldLabel(fieldId, this.filedLocator);
        return this;
    }

    insertAmount(amount) {
        Util.waitUntilElementIsVisible(this.filedLocator);
        this.filedLocator.clear();
        this.filedLocator.sendKeys(amount);
        return this;
    }

    getAmountField() {
        Util.waitUntilElementIsVisible(this.filedLocator);
        return this.filedLocator.getAttribute('value');
    }

    checkErrorMessageIsVisible() {
        Util.waitUntilElementIsVisible(this.errorMessage);
        return this;
    }

    checkErrorMessageIsNotVisible() {
        Util.waitUntilElementIsNotVisible(this.errorMessage);
        return this;
    }

    getErrorMessage() {
        Util.waitUntilElementIsVisible(this.errorMessage);
        return this.errorMessage.getText();
    }
}
