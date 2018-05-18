/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue July 4 2017
 */

var TestConfig = require("../../../../test.config.js");
var Util = require("../../../../util/util.js");

/**
 * Page Object for all forms page within the "Kickstart"/"App Designer"
 */

var AllFormsPage = function () {

    var url = TestConfig.main.webContextRoot + '/editor/#/forms';
    var allformElements = element.all(by.css("[ng-repeat*='form in model.forms.data']"));
    var showFormDetailsBtn = element(by.css("button[ng-click*='showFormDetails']"));
    var editFromDetailsBtn = element(by.css("button[ng-click*='editFormDetails']"));
    var importBtn = element(by.css("[ng-click='importForm()']"));
    var createFormButton = element(by.id('list-header')).element(by.css('button[ng-click="createForm()"]'));
    var formRepeater = element.all(by.repeater('form in model.forms.data track by $index'));

    this.get = function () {
        browser.get(url);
    };

    /**
     * Get form element by name
     *
     * @param formName
     */
    this.getFormByName = function (formName) {
        Util.waitUntilElementIsVisible(element(by.xpath("//h3[contains(text(),'" + formName + "')]")));
        return element(by.xpath("//h3[contains(text(),'" + formName + "')]"));
    };

    /**
     * Verify if form is displayed
     * Form is searched by name
     *
     * @param formName
     */
    this.isFormDisplayedByName = function (formName) {
        return this.getFormByName(formName).isDisplayed();
    };

    /**
     * Select form by name
     *
     * @param formName
     */
    this.selectFormByName = function (formName) {
        this.getFormByName(formName).click();
    };

    /**
     * Select form by index
     *
     * @param index - starts from 1
     */
    this.selectFormByIndex = function (index) {
        var formElement = allformElements.get(index);
        Util.waitUntilElementIsVisible(formElement);
        formElement.click();
    };

    /**
     * Click show form details button by form name
     *
     * @param formName
     */
    this.clickShowFormDetailsButtonByName = function (formName) {
        browser.actions().mouseMove(this.getFormByName(formName)).perform();
        Util.waitUntilElementIsVisible(showFormDetailsBtn);
        showFormDetailsBtn.click();
    };

    /**
     * Click visual editor button by form name
     *
     * @param formName
     */
    this.clickFormEditorButtonByName = function (formName) {
        browser.actions().mouseMove(this.getFormByName(formName)).perform();
        Util.waitUntilElementIsVisible(editFromDetailsBtn);
        editFromDetailsBtn.click();
    };

    /**
     * Import a form
     */
    this.clickImportForm = function () {
        Util.waitUntilElementIsVisible(importBtn);
        importBtn.click();
    };

    /**
     * Create form button
     * @method clickCreateFormButton
     */
    this.clickCreateFormButton = function () {
        Util.waitUntilElementIsVisible(createFormButton);
        createFormButton.click();
    };

    /**
     * locator for sideFilter with filter name
     * @param filterName
     * @method sideFilterLocator
     */
    this.sideFilterLocator = function (filterName) {
        return element(by.cssContainingText('.ng-binding', filterName));

    };

    /**
     * click side filter by given filtername
     * @param filterName
     * @method clickSideFilterByName
     */
    this.clickSideFilterByName = function (filterName) {
        Util.waitUntilElementIsVisible(this.sideFilterLocator(filterName));
        this.sideFilterLocator(filterName).click();
    };

    /**
     * gives number of form available
     * @method getNumberOfForms
     */
    this.getNumberOfForms = function(){
        return formRepeater.count();
    }
};

module.exports = AllFormsPage;
