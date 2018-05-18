/**
 * Created by jdosti on 08/01/2018.
 */

var Util = require("../../../util/util.js");

var StartProcessPage = function () {

    var defaultProcessName = element(by.css("input[id='processName']"));
    var processNameInput = element(by.id('processName'));
    var selectProcessDropdownArrow = element(by.css("div[class='mat-select-arrow-wrapper'] div"));
    var cancelProcessButton = element(by.id('cancle_process'));
    var formStartProcessButton = element(by.css('button[data-automation-id="adf-form-start process"]'));
    var startProcessButton = element(by.css("button[data-automation-id='btn-start']"));
    var noProcess = element(by.id('no-process-message'));

    this.checkNoProcessMessage = function () {
        Util.waitUntilElementIsVisible(noProcess);
    }

    this.getDefaultName = function () {
        Util.waitUntilElementIsVisible(defaultProcessName);
        return defaultProcessName.getAttribute("value");
    };

    this.deleteDefaultName = function (value) {
        Util.waitUntilElementIsVisible(processNameInput);
        processNameInput.getAttribute('value').then(function (value){
            for (var i = value.length; i >= 0; i--) {
                processNameInput.sendKeys(protractor.Key.BACK_SPACE);
            }
        });
    };

    this.enterProcessName = function (name) {
        Util.waitUntilElementIsVisible(processNameInput);
        processNameInput.clear();
        processNameInput.sendKeys(name);
    };

    this.selectFromProcessDropdown = function (name) {
        Util.waitUntilElementIsVisible(selectProcessDropdownArrow);
        Util.waitUntilElementIsClickable(selectProcessDropdownArrow)
        selectProcessDropdownArrow.click();
        var selectProcessDropdown = element(by.cssContainingText('.mat-option-text', name));
        Util.waitUntilElementIsVisible(selectProcessDropdown);
        Util.waitUntilElementIsClickable(selectProcessDropdown);
        selectProcessDropdown.click();
    };

    this.clickCancelProcessButton = function () {
        Util.waitUntilElementIsVisible(cancelProcessButton);
        cancelProcessButton.click();
    };

    this.clickFormStartProcessButton = function () {
        Util.waitUntilElementIsVisible(formStartProcessButton);
        Util.waitUntilElementIsClickable(formStartProcessButton);
        return formStartProcessButton.click();
    };

    this.checkStartProcessButtonIsEnabled = function () {
        expect(startProcessButton.isEnabled()).toBe(true);
    };

    this.checkStartProcessButtonIsDisabled = function () {
        expect(startProcessButton.isEnabled()).toBe(false);
    };

};

module.exports = StartProcessPage;