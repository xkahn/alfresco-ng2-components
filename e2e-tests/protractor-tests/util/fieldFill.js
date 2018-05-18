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
 * @class util.FieldFill
 */
var exports = module.exports = {};

var Constants = require("./constants.js");
var Resources = require("./resources.js");
var Util = require("./util.js");
var TestConfig = require("../test.config.js");
var EC = protractor.ExpectedConditions;


/**
 * Fills a text input field.
 *
 * @param _elem {protractor.Element}
 * @param text {String}
 * @method typeText
 */
exports.typeText = function (_elem, text) {
    browser.wait(EC.visibilityOf(_elem), TestConfig.main.presence_timeout);
    _elem.clear();
    _elem.sendKeys(text);
    browser.wait(EC.textToBePresentInElementValue(_elem, text), TestConfig.main.presence_timeout);
};

/**
 * Fills a text input field.
 *
 * @param _elem {protractor.Element}
 * @param text {String}
 * @method typeText
 */
exports.typeTextEnter = function (_elem, text) {
    this.typeText(_elem, text);
    _elem.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
};


/**
 * Fills a single line text input field.
 *
 * @param _id {String}
 * @param text {String}
 * @method singleLineText
 */
exports.singleLineText = function (_id, text) {
    var elem = element(by.id(_id));

    this.typeText(elem, text);
};

/**
 * Fills a multi line text input field.
 *
 * @param _id {String}
 * @param text {String}
 * @method multiLineText
 */
exports.multiLineText = function (_id, text) {
    var elem = element(by.id(_id));

    this.typeText(elem, text);
};

/**
 * Fills an integer input field.
 *
 * @param _id {String}
 * @param number {String}
 * @method integer
 */
exports.integer = function (_id, number) {
    var elem = element(by.id(_id));

    this.typeText(elem, number);
};

/**
 * Fills a date field.
 *
 * @param _id {String}
 * @param date {String}
 * @method date
 */
exports.date = function (_id, date) {
    var date_field = element(by.id(_id));
    Util.waitUntilElementIsVisible(date_field);
    this.typeTextEnter(date_field, date);
};

/**
 * Fills a boolean field.
 *
 * @param _elem {protractor.Element}
 * @param bool {Boolean}
 * @method boolean
 */
exports.booleanElem = function (_elem, bool) {
    _elem.isSelected().then(function (selected) {
        if (selected != bool) {
            _elem.click();
        }
    });
};

/**
 * Fills a boolean field.
 *
 * @param _id {String}
 * @param bool {Boolean}
 * @method boolean
 */
exports.boolean = function (_id, bool) {
    var elem = element(by.id(_id));

    this.booleanElem(elem, bool);
};

/**
 * Fills a radioButton field.
 *
 * If the option is given as parameter the method will try to select the given file.
 * Otherwise, if option is undefined it will select a random value from the group.
 * TODO: (this should be refactored into different methods)
 *
 * @param _id {String}
 * @param options_no {int} The number of available options.
 * @param option The exact option that you want to select.
 * @method radioButtons
 */
exports.radioButtons = function (_id, options_no, option) {
    if (option === undefined) {
        option = Util.generateRandomInt(0, options_no);
    }
    Util.waitUntilElementIsVisible(element(by.id(_id + "_" + option)));
    element(by.id(_id + "_" + option)).click();
};

/**
 * Fills a dropdown field.
 *
 * If the option is given as parameter the method will try to select the given file.
 * Otherwise, if option is undefined it will select a random value from the dropdown.
 * TODO: (this should be refactored into different methods)
 *
 * @param _id  {String}
 * @param options_no {int} The number of available options.
 * @param option The exact option that you want to select.
 * @method dropdown
 */
exports.dropdown = function (_id, options_no, option) {
    if (option === undefined) {
        option = Util.generateRandomInt(0, options_no);
    }
    element(by.xpath("//select[@id='" + _id + "']/option[@value=" + option + "]")).click();
};

/**
 * Fills a typeahead field.
 *
 * @param _id  {String}
 * @param text  {String}
 * @method typeahead
 */
exports.typeahead = function (_id, text) {
    var typeaheadElement = element(by.id(_id));

    this.typeTextEnter(typeaheadElement, text);
};

/**  * Fills a typeahead field by selecting from suggestions list. 
 *
 * @param _id  {String} 
 * @param text  {String} 
 * @method typeahead Suggestion
 */
exports.typeaheadSuggestion = function (_id, text) {
    var typeaheadElement = element(by.id(_id));
    var list = element(by.xpath(".//*[@id='" + _id + "']/following-sibling::ul/li/a"));
    this.typeText(typeaheadElement, text);
    browser.actions().sendKeys(protractor.Key.DOWN);
    browser.actions().sendKeys(protractor.Key.chord(protractor.Key.ENTER, protractor.Key.ESCAPE));
    browser.wait(EC.visibilityOf(list), TestConfig.main.presence_timeout);
    list.click();
    browser.actions().sendKeys(protractor.Key.ENTER);
};

/**
 * Fills an upload field.
 *
 * @param _id {String}
 * @param filePath {String}
 * @method upload
 */
exports.upload = function (_id, filePath) {
    var inputButton = element(by.xpath("//*[@id='" + _id + "']//button"));
    var inputField = element(by.xpath("//*[@id='" + _id + "']//input[@type='file']"));

    if (browser.browserName == "firefox") {
        element(by.xpath("//div[@class='dropzone selection ng-scope']")).isPresent().then(function (present) {
            var divElem = element(by.xpath("//*[@id='" + _id + "']//div[@class='dropzone selection ng-scope' and @ng-if='!folderSelect']"));
            browser.executeScript("$(arguments[0]).removeClass('dropzone')", divElem.getWebElement());
        });
    }
    Util.uploadFile(inputButton, inputField, filePath);
};

exports.readOnly = function () {
    console.log("Can't fill a read only field.");
};

exports.readOnlyText = function () {
    console.log("Can't fill a read only field.")
};

/**
 * Fills a people select field
 *
 * @param _id {String}
 * @param personName {String}
 * @method people
 */
exports.people = function (_id, personName) {
    var el = element(by.xpath("//*[@id='" + _id + "']//li[contains(@class,'toggle-people-select')]"));
    Util.waitUntilElementIsVisible(el);
    el.click();

    el = element(by.id("people-select-input"));
    Util.waitUntilElementIsVisible(el);
    this.typeText(el, personName);
    el.sendKeys(protractor.Key.chord(protractor.Key.DOWN));
    el.sendKeys(protractor.Key.chord(protractor.Key.ENTER, protractor.Key.ESCAPE));
};

/**
 * Selects the provided username as the required person.
 *
 * @param _id
 * @param personName
 * @method sharePersonSelect
 */
exports.sharePersonSelect = function (_id, personName) {
    var el = element(by.id(_id));
    Util.waitUntilElementIsVisible(el);
    el.click();

    var nameTextInput = element(by.xpath(".//div[contains(@id, 'wrapper-authority-cntrl-picker_c')]//*[contains(@id,'picker-searchText')]"));
    Util.waitUntilElementIsVisible(nameTextInput);
    this.typeTextEnter(nameTextInput, personName);

    nameTextInput.click();
    var foundUser = element(by.xpath("//table//td//h3[@class='item-name']"));
    Util.waitUntilElementIsVisible(foundUser);
    var addButtonForFoundUser = element(by.xpath("//table//td//h3[@class='item-name']/ancestor::td/following-sibling::*//a[contains(@class,'add-item')]"));
    addButtonForFoundUser.click();

    var okButton = element(by.xpath(".//*[contains(@id,'wrapper-authority-cntrl-ok-button')][1]"));
    okButton.click();

    Util.waitUntilElementIsVisible(element(by.xpath("//*[@id='activiti-assignee']//div[contains(@class,'people-link') and contains(text(),'" + personName + "')]")));
};

/**
 * Selects a document using the Share's document library.
 *
 * @param _id
 * @param pathToFile
 * @method shareContentSelect
 */
exports.shareContentSelect = function (_id, pathToFile) {
    var el = element(by.css("div[id=" + _id + "]>div>div>button"));
    var popup = "div[id$='association-cntrl-picker']";
    el.click();

    var pathDirs = pathToFile.split('/');
    var file = pathDirs[pathDirs.length - 1];

    // Navigating to parent folder
    for (var i = 0; i < pathDirs.length - 1; i++) {
        // Set the focus on the popup
        element(by.css(popup)).click();
        Util.waitUntilElementIsVisible(element(by.cssContainingText('td>div>h3>a', pathDirs[i])));

        // Click the link
        element(by.cssContainingText('td>div>h3>a', pathDirs[i])).click();
    }

    // Selecting the file
    element(by.css(popup)).click();
    el = element(by.cssContainingText("tr>td>div>h3", file));
    Util.waitUntilElementIsVisible(el);
    var addButton = el.element(by.xpath("./../../../td/div/a"));
    addButton.click();

    var okButton = element(by.xpath(".//*[contains(@id,'wrapper-association-cntrl-ok-button')]"));
    okButton.click();
};

/**
 * Fills a functional group select field
 *
 * @param _id {String}
 * @param groupName {String}
 * @method functionalGroup
 */
exports.functionalGroup = function (_id, groupName) {
    var el = element(by.xpath("//*[@id='" + _id + "']//li[contains(@class,'toggle-functional-group-select')]"));
    el.click();
    el = element(by.id("people-select-input"));
    this.typeText(el, groupName);
    el.sendKeys(protractor.Key.chord(protractor.Key.DOWN));
    el.sendKeys(protractor.Key.chord(protractor.Key.ENTER, protractor.Key.ESCAPE));
};

/**
 * Adds a row to the dynamic table
 *
 * @param _id
 * @param rowData
 */
exports.dynamicTableAddRow = function (_id, rowData) {
    var addButton = element(by.id(_id)).element(by.css('a[ng-click="addDynamicTableRow(field)"]'));
    Util.waitUntilElementIsVisible(addButton);
    addButton.click();

    for (var i = 0; i < rowData.length; i++) {
        var cellId = rowData[i]["id"];
        var cellType = rowData[i]["type"];
        var cellValue = rowData[i]["value"];

        switch (cellType) {
            case Constants.DYNAMIC_TABLE_CELL_TYPES.STRING:
                exports.singleLineText(cellId, cellValue);
                break;
            case Constants.DYNAMIC_TABLE_CELL_TYPES.AMOUNT:
                exports.integer(cellId, cellValue);
                break;
            case Constants.DYNAMIC_TABLE_CELL_TYPES.NUMBER:
                exports.integer(cellId, cellValue);
                break;
            case Constants.DYNAMIC_TABLE_CELL_TYPES.DROPDOWN:
                exports.dropdown(cellId, undefined, cellValue);
                break;
            case Constants.DYNAMIC_TABLE_CELL_TYPES.BOOLEAN:
                exports.boolean(cellId, cellValue);
        }
    }

    var completeButton = element(by.id("table_form_complete_button"));
    var cancelButton = element(by.xpath('//button[@ng-click="cancelForm(tableRowEditModal)"]'));

    completeButton.isEnabled().then(function (isEnabled) {
        if (isEnabled) {
            Util.waitUntilElementIsVisible(completeButton);
            completeButton.click();
        } else {
            Util.waitUntilElementIsVisible(cancelButton);
            cancelButton.click();
            return false;
        }
    })
};

/**
 * Deletes the rowIndex-th row
 *
 * @param _id
 * @param rowIndex
 */
exports.dynamicTableRemoveRow = function (_id, rowIndex) {
    var rowElement = element(by.css('div[id=' + _id + ']>form-element>div[class=ng-scope]>div>div>div[class=ui-grid-contents-wrapper]>div[class~=ui-grid-render-container-body]>div[class~=ui-grid-viewport]>div[class=ui-grid-canvas]>div:nth-child(' + rowIndex + ')>div'));
    rowElement.click();

    var deleteElement = element(by.css("div[id='" + _id + "'] a[ng-click='removeDynamicTableRow(field)']"));
    deleteElement.click();
};

/**
 * Fills in the field passed as parameter.
 * @param field
 * @param tenantID
 * @method randomFieldFill
 */
exports.randomFieldFill = function (field, tenantID, value) {
    var fieldId = field['id'];
    var fieldType = field['type'];
    var readOnly = field['readOnly'];
    var options = field['options'];
    exports.randomFill(fieldId, fieldType, readOnly, options, tenantID, value)
};


/**
 * Fills in any type of field specified by the parameters.
 *
 * @param fieldId {String}
 * @param fieldType {String}
 * @param isReadOnly {Boolean}
 * @param possibleOptons {Array} List of options for radio boxes and dropdowns
 * @param tenantId {String} This is required for people or group fields.
 * @method randomFill
 */
exports.randomFill = function (fieldId, fieldType, isReadOnly, possibleOptons, tenantId, typeaheadValues) {
    fieldId = 'activiti-' + fieldId;

    if (!isReadOnly) {
        switch (fieldType) {
            case Constants.FORM_FIELD_TYPES.SINGLE_LINE_TEXT:
                exports.singleLineText(fieldId, Util.generateRandomString());
                break;
            case Constants.FORM_FIELD_TYPES.MULTI_LINE_TEXT:
                exports.multiLineText(fieldId, Util.generateRandomString());
                break;
            case Constants.FORM_FIELD_TYPES.INTEGER:
                exports.integer(fieldId, Util.generateRandomNumber());
                break;
            case Constants.FORM_FIELD_TYPES.DATE:
                exports.date(fieldId, Util.generateRandomDate());
                break;
            case Constants.FORM_FIELD_TYPES.BOOLEAN:
                exports.boolean(fieldId, Util.generateRandomBool());
                break;
            case Constants.FORM_FIELD_TYPES.RADIO_BUTTONS:
                var optionsRadio = possibleOptons.length;
                exports.radioButtons(fieldId, optionsRadio);
                break;
            case Constants.FORM_FIELD_TYPES.DROPDOWN:
                var optionsDropDown = possibleOptons.length;
                exports.dropdown(fieldId, optionsDropDown);
                break;
            case Constants.FORM_FIELD_TYPES.TYPEAHEAD:
                exports.typeahead(fieldId, typeaheadValues[Util.generateRandomInt(0, typeaheadValues.length - 1)]);
                break;
            case Constants.FORM_FIELD_TYPES.UPLOAD:
                exports.upload(fieldId, Resources.Files.Documents.PDF.file_location);
                break;
            case Constants.FORM_FIELD_TYPES.READONLY:
                exports.readOnly();
                break;
            case Constants.FORM_FIELD_TYPES.READONLY_TEXT:
                exports.readOnlyText();
                break;
            case Constants.FORM_FIELD_TYPES.PEOPLE:
                var user = {
                    email: Util.generateRandomEmail(),
                    firstName: Util.generateRandomString(),
                    lastName: Util.generateRandomString(),
                    password: Util.generateRandomString()
                };
                Util.createUserViaAPI(user.email, user.firstName, user.lastName, user.password, tenantId);
                exports.people(fieldId, user.firstName + " " + user.lastName);
                break;
            case Constants.FORM_FIELD_TYPES.FUNCTIONAL_GROUP:
                var group = {
                    name: Util.generateRandomString(),
                    type: 1,
                    parentGroupId: null
                };
                Util.createGroupViaAPI(group.name, tenantId, group.type, group.parentGroupId);
                exports.functionalGroup(fieldId, group.name);
                break;
            case Constants.FORM_FIELD_TYPES.DYNAMIC_TABLE:
                //exports.dynamicTableAddRow();
                break;
            default:
                break;
        }
    }
};

/**
 * Get text input field.
 *
 * @param _id {String}
 * @method valueInput
 */
exports.valueInput = function (_id) {
    var elem = element(by.id(_id));

    return elem.getAttribute('value');
};

/**
 * Get text any field.
 *
 * @param elem {WebElement}
 * @method getTextElem
 */
exports.getTextElem = function (elem) {

    return elem.getText();
};

/**
 * Get text any field.
 *
 * @param _id {String}
 * @method textElem
 */
exports.textElem = function (_id) {
    var elem = element(by.id(_id));

    return elem.getText();
};

/**
 * Get selected option text in a dropdown field.
 *
 * @param _id {String}
 * @method selectedOption
 */
exports.selectedOption = function (_id) {
    var elem = element(by.id(_id));

    return elem.$('[selected]').getText();
};

/**
 * Tick a checkbox
 *
 * @param _id {String}
 * @method checkedItemCheckbox
 */
exports.tickCheckbox = function (_id) {
    var elem = element(by.id(_id));

    return elem.click();
};

/**
 * Get checked item in a checkbox field.
 *
 * @param _id {String}
 * @method checkedItemCheckbox
 */
exports.checkedItemCheckbox = function (_id) {
    var elem = element(by.id(_id));

    return elem.prop('checked');
};

/**
 * Item is checked in a radio/checkbox field
 *
 * @param elem {WebElement}
 * @method isChecked
 */
exports.isElemChecked = function (elem) {
    return elem.isSelected();
};

/**
 * Item is checked in a radio/checkbox field
 *
 * @param _id {String}
 * @param optionId {String}
 * @method isChecked
 */
exports.isChecked = function (_id, optionId) {
    var elem;

    if (optionId === undefined) {
        elem = element(by.id(_id));
    }
    else {
        optionId = optionId.toString();
        elem = element(by.id(_id + "_" + optionId))
    }

    return this.isElemChecked(elem);
};

/**
 * Get people or group
 *
 * @param _id {String}
 * @method textPeopleGroup
 */
exports.textPeopleGroup = function (_id) {
    var el = element(by.xpath("//*[@id='" + _id + "']//div[contains(@class,'ng-binding')]"));

    return el.getText();
};

/**
 * Get dinamic table row
 *
 * @param _id {String}
 * @method getRowTable
 */
exports.getRowTable = function (_id, index) {
    var el = element(by.xpath("(.//div[@id='" + _id + "']//*[contains(@id,'cell')]/div[@class='ui-grid-cell-contents ng-binding ng-scope'])[" + index + "]"));

    return el.getText();
};




