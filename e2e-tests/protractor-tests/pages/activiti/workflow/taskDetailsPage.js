/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue July 25 2017
 */

/**
 * Provides Task Details Page
 */

var Util = require("../../../util/util.js");
var GenericInputField = require('../../../pages/activiti/components/genericInputField.js');

var TasksDetailsPage = function () {

    var selectToday = element(by.css('[ng-click*=selectToday]'));
    var dateFieldFormat = element(by.css('[ng-if="field.acceptedFormat"]'));
    var noPeoplelInvolvedLink = element(by.css('[ng-show*="model.contentSummary"]'));
    var tasksActions = element(by.css('div[class="help-text ng-scope'));
    var involveSomeoneLink = element(by.xpath(".//span[contains(@title, 'Involve people')]"));
    var peopleSelect = element(by.id("people-select-input"));
    var involvedPeople = element(by.css("span[user-name='person']"));
    var btnsSave = element.all(by.css("[ng-click='saveForm()']"));
    var btnsComplete = element.all(by.css('#form_complete_button'));

    var genericInputField = new GenericInputField();

    this.setFormField = function (By, field, value) {
        genericInputField.setFieldValue(By, field, value);
        return this;
    };

    this.isFormFieldDisplayed = function (By, field) {
        return genericInputField.getField(By, field).isDisplayed();
    };

    this.clickFormField = function (By, field) {
        genericInputField.clickField(By, field);
    };

    this.selectDateToday = function () {
        Util.waitUntilElementIsVisible(selectToday);
        selectToday.click();
    };

    this.getFormFieldValue = function (By, field) {
        return genericInputField.getFieldValue(By, field);
    };

    this.getFormFieldText = function (By, field) {
        return genericInputField.getFieldText(By, field);
    };

    this.getDateFieldFormat = function () {
        return dateFieldFormat.getText();
    };

    /**
     * Click on 'No people involved' link
     *
     * @returns {TasksDetailsPage}
     */
    this.clickNoPeopleInvolved = function () {
        Util.waitUntilElementIsVisible(noPeoplelInvolvedLink);
        noPeoplelInvolvedLink.click();
        Util.waitUntilElementIsVisible(tasksActions);
        return this;
    };

    /**
     * Opens the people selector whether or not the task has added content or not
     *
     * @method openPeopleSelector
     */
    this.openPeopleSelector = function () {
        tasksActions.isPresent().then(function (isPresent) {
            if (isPresent) {
                // workaround for invisible element that otherwise gets clicked by default
                $$('span[on-people-selected="involvePerson(user)"]').get(1).click();
            }
            else {
                element(by.css('h3[on-people-selected="involvePerson(user)"]')).click();
            }
        });
    };

    /**
     * Involve a person in the task
     *
     * @param personName
     * @returns {TasksDetailsPage}
     */
    this.involvePerson = function (personName) {
        this.openPeopleSelector();
        peopleSelect.sendKeys(personName);
        peopleSelect.sendKeys(protractor.Key.DOWN);
        peopleSelect.sendKeys(protractor.Key.ENTER, protractor.Key.ESCAPE);
        return this;
    };

    /**
     * Checks to see whether or not an involved person is displayed within the task.
     *
     * @param {String} personFullName
     * @return {Boolean}
     */
    this.isInvolvedPersonDisplayed = function (personFullName) {
        var deferred = protractor.promise.defer();
        Util.waitUntilElementIsVisible(involvedPeople);
        var isPersonDisplayed;
        involvedPeople.getText().then(function (involvedPeopleTitle) {
            if(involvedPeopleTitle === personFullName) {
                logger.info("'"+involvedPeopleTitle + "'compared to: '" + personFullName+"'");
                isPersonDisplayed = true;
            } else {
                isPersonDisplayed = false;
            }
            deferred.fulfill(isPersonDisplayed);
        });
        return deferred.promise;
    };

    /**
     * Retrieve 'Complete' buttons state enabled/disabled - there are 2 buttons on the page
     *
     * @returns boolean value
     */
    this.areCompleteBtnsEnabled = function () {
        return btnsComplete.filter(function (btn, index) {
            return btn.isEnabled();
        });
    };

    /**
     * Retrieve 'Save' buttons state (displayed or not) - there are 2 buttons on the page
     *
     * @returns boolean value
     */
    this.areSaveBtnsDisplayed = function () {
        return btnsSave.filter(function (btn, index) {
            return btn.isDisplayed();
        });
    };

    /**
     * Click on Save button
     *
     * @param saveBtnIndex - index of 'Save' button (there are 2 Save buttons)
     */
    this.clickSave = function (saveBtnIndex) {
        btnsSave.get(saveBtnIndex).click();
    };

    /**
     * Click on Complete button
     *
     * @param completeBtnIndex - index of 'Complete' button (there are 2 'Complete' buttons)
     */
    this.clickComplete = function (completeBtnIndex) {
        btnsComplete.get(completeBtnIndex).click();
    };
};

module.exports = TasksDetailsPage;
