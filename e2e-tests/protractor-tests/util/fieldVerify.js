/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 06/02/2015.
 */

/**
 * @module util
 */

/**
 * Provides method to fill all types of fields inside a form.
 *
 * @class util.fieldVerify
 */
var exports = module.exports = {};

var Constants = require("./constants.js");
var Resources = require("./resources.js");
var Util = require("./util.js");
var TestConfig = require("../test.config.js");

/**
 * Asserts the Text field recognized by _id has the text value.
 *
 * @param _id
 * @param text
 * @method singleLineText
 */
exports.singleLineText = function(_id, text) {
    expect(element(by.id(_id)).getAttribute('value')).toEqual(text);
};

/**
 * Asserts the Multi Line Text field recognized by _id has the text value.
 *
 * @param _id
 * @param text
 * @method multiLineText
 */
exports.multiLineText = function(_id, text) {
    expect(element(by.id(_id)).getAttribute('value')).toEqual(text);
};

/**
 * Asserts the Number field field recognized by _id has the number value.
 *
 * @param _id
 * @param number
 * @method integer
 */
exports.integer = function(_id, number) {
    expect(element(by.id(_id)).getAttribute('value')).toEqual(number);
};

/**
 * Asserts the Date field field recognized by _id has the date value.
 *
 * @param _id
 * @param date
 * @method date
 */
exports.date = function(_id, date) {
    element(by.id(_id)).getAttribute('value').then(function(actualDate) {
        var dateFields = actualDate.split("-");

        for (var i = 0; i < 2; i++) {
           var dateField = dateFields[i];
            if (dateField.length < 2) {
                dateField = "0" + dateField;
            }
            dateFields[i] = dateField;
        }
        actualDate = dateFields.join("-");
 
        expect(actualDate).toEqual(date);
    });
};

/**
 * Asserts the Dropdown field recognized by _id has selected the option value.
 *
 * @param _id
 * @param option
 * @method dropdown
 */
exports.dropdown = function(_id, option) {
    expect(element(by.xpath("//select[@id='" + _id + "']/option[@value=" + option + "]")).getAttribute("selected")).toBeTruthy();
};

/**
 * Asserts the typeahead field recognized by _id has the correct text
 *
 * @param _id
 * @param text
 */
exports.typeahead = function(_id, text) {
    expect(element(by.id(_id)).getAttribute('value')).toEqual(text);
};

/**
 * Asserts the Radio Buttons field recognized by _id has the option value.
 *
 * @param _id
 * @param option
 * @method radioButtons
 */
exports.radioButtons = function(_id, option) {
    expect(element(by.id(_id + "_" + option)).isSelected()).toBeTruthy();
};

/**
 * Asserts the Checkbox field recognized by _id has the bool value.
 *
 * @param _id
 * @param bool
 * @method boolean
 */
exports.boolean = function(_id, bool) {
    expect(element(by.id(_id)).isSelected()).toEqual(bool);
};

/**
 * Asserts the People selector field recognized by _id has the personName value.
 *
 * @param _id
 * @param personName
 * @method people
 */
exports.people = function(_id, personName) {
    expect(element(by.cssContainingText("div[id=" + _id + "] div", personName)).isDisplayed()).toBeTruthy();
};

/**
 * Asserts the Functional group field recognized by _id has groupName value
 *
 * @param _id
 * @param groupName
 * @method functionalGroup
 */
exports.functionalGroup = function(_id, groupName) {
    expect(element(by.cssContainingText("div[id=" + _id + "] div", groupName)).isDisplayed()).toBeTruthy();
};

/**
 * Asserts the Dynamic Table Field recognized by _id contains the correct values on row[rowIndex]
 *
 * @param _id
 * @param rowIndex
 * @param rowData
 */
exports.dynamicTableRow = function(_id, rowIndex, rowData) {
    for (let fieldIndex = 0; fieldIndex < rowData.length; fieldIndex++) {
        let cellElement = element(by.id(_id)).
                        element(by.className('dynamicTable')).
                        element(by.className('ui-grid-viewport')).
                        element(by.className('ui-grid-canvas')).
                        all(by.className('ui-grid-row')).get(rowIndex-1).
                        all(by.className('ui-grid-cell-contents')).get(fieldIndex);

        let expectedValue = rowData[fieldIndex]["expectedValue"];
        expect(cellElement.getText()).toEqual(expectedValue);
    }
};

/**
 * Asserts the Display Value displaying a dynamic table field recognized by _id contains the correct values on row[rowIndex]
 *
 * @param _id
 * @param rowIndex
 * @param rowData
 */
exports.displayValueDynamicTableRow = function(_id, rowIndex, rowData) {
    var i;

    for (i = 0; i < rowData.length; i++) {
    	var cellSelector = by.css("div[id='" + _id + "']>form-element>div[class=ng-scope]>div>div>div>div[class~=dynamicTable]>div[class~=ui-grid-contents-wrapper]>div[class~=ui-grid-render-container-body]>div[class~=ui-grid-viewport]>div[class=ui-grid-canvas]>div:nth-child(" + rowIndex + ")>div>div:nth-child(" + (i + 1) + ")>div");
        var cellElement = element(cellSelector);

        var expectedValue = rowData[i]["expectedValue"];
        expect(cellElement.getText()).toEqual(expectedValue);
    }
};