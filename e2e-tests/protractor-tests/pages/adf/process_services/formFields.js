/*
 * Created by Cristina jalba on 10/02/2018.
 */

var Util = require("../../../util/util.js");

var FormFields = function () {

    var formContent = element(by.css("adf-form"));
    var refreshButton = element(by.css("div[class*='form-reload-button'] mat-icon"));
    var saveButton = element(by.cssContainingText("mat-card-actions[class*='adf-form'] span", "SAVE"));
    var valueLocator = by.css("input");
    var labelLocator = by.css("label");

    this.setFieldValue = function (By, field, value) {
        var fieldElement =  element(By(field));
        Util.waitUntilElementIsVisible(fieldElement);
        fieldElement.clear().sendKeys(value);
        return this;
    };

    this.getWidget = function (fieldId) {
        var widget = element(by.css("form-field div[id='field-" + fieldId + "-container']"));
        Util.waitUntilElementIsVisible(widget);
        return widget;
    };

    this.getFieldValue = function (fieldId, valueLocatorParam) {
        var value = this.getWidget(fieldId).element(valueLocatorParam || valueLocator);
        Util.waitUntilElementIsVisible(value);
        return value.getAttribute('value');
    };

    this.getFieldLabel = function (fieldId, labelLocatorParam) {
        return this.getFieldText(fieldId, labelLocatorParam);
    };

    this.getFieldText = function (fieldId, labelLocatorParam) {
        var label = this.getWidget(fieldId).element(labelLocatorParam || labelLocator);
        Util.waitUntilElementIsVisible(label);
        return label.getText();
    };

    this.checkFieldValue = function (By, field, val) {
        Util.waitUntilElementHasValue(element(By(field)), val);
        return this;
    };

    this.refreshForm = function () {
        Util.waitUntilElementIsVisible(refreshButton);
        refreshButton.click();
        return this;
    };

    this.saveForm = function () {
        Util.waitUntilElementIsVisible(saveButton);
        Util.waitUntilElementIsClickable(saveButton);
        saveButton.click();
        return this;
    };

    this.noFormIsDisplayed = function () {
        Util.waitUntilElementIsNotOnPage(formContent);
        return this;
    };

    this.checkFormIsDisplayed = function () {
        Util.waitUntilElementIsVisible(formContent);
        return this;
    };

};

module.exports = FormFields;
