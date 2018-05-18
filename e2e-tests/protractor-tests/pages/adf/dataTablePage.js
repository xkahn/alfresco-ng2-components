/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Cristina Jalba on 05/09/2017.
 */

var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");


var DataTablePage = function () {

    var dataTableURL = TestConfig.adf.base + TestConfig.adf.adf_port + "/datatable";
    var multiSelect = element(by.css("div[data-automation-id='multiselect'] label > div[class='mat-checkbox-inner-container']"));
    var selectionButton = element(by.css("div[class='mat-select-arrow']"));
    var selectionDropDown = element(by.css("div[class*='ng-trigger-transformPanel']"));
    var allSelectedRows = element.all(by.css("div[class*='is-selected']"));
    var selectedRowNumber = element(by.css("div[class*='is-selected'] div[data-automation-id*='text_']"));
    var selectAll = element(by.css("div[class*='header'] label"));
    var list = element.all(by.css("div[class*=adf-datatable-row]"));
    var addRow = element(by.xpath("//span[contains(text(),'Add row')]/.."));
    var replaceRows = element(by.xpath("//span[contains(text(),'Replace rows')]/.."));
    var replaceColumns = element(by.xpath("//span[contains(text(),'Replace columns')]/.."));
    var loadNode = element(by.xpath("//span[contains(text(),'Load Node')]/.."));
    var nameColumn = element(by.css("div[data-automation-id='auto_id_name']"));
    var createdOnColumn = element(by.css("div[data-automation-id='auto_id_createdOn']"));
    var pageLoaded = element(by.css("div[data-automation-id='auto_id_id']"));

    this.goToDatatable = function () {
        browser.driver.get(dataTableURL);
        Util.waitUntilElementIsVisible(pageLoaded);
    };

    /**
     * Retrieve row by row number
     *
     * @param rowNumber
     */
    this.getRowByRowNumber = function (rowNumber) {
        Util.waitUntilElementIsVisible(element(by.css("div[data-automation-id='text_" + rowNumber +"']")));
        return element(by.css("div[data-automation-id='text_" + rowNumber +"']"));
    };

    /**
     * Retrieve the checkbox of the row
     *
     * @param rowNumber
     */
    this.getRowCheckbox = function (rowNumber) {
        return this.getRowByRowNumber(rowNumber).element(by.xpath("ancestor::div/div/mat-checkbox[contains(@class, 'mat-checkbox-checked')]"));
    };

    /**
    * Click multiselect option
    * @property clickMultiSelect
    * */
    this.clickMultiSelect = function () {
        Util.waitUntilElementIsVisible(multiSelect);
        multiSelect.click();
    };

    /**
    * Click specific checkbox in row
    * @method clickCheckbox
    * @param {String} row number
    */
    this.clickCheckbox = function (rowNumber) {
        var checkbox = this.getRowByRowNumber(rowNumber).element(by.xpath("ancestor::div[contains(@class, 'adf-datatable-row')]//mat-checkbox/label"));
        Util.waitUntilElementIsVisible(checkbox);
        checkbox.click();
    };

    /**
    * Select a specific row
    * @method selectRow
    * @param {String} row number
    */
    this.selectRow = function (rowNumber) {
        return this.getRowByRowNumber(rowNumber).click();
    };

    /**
    * Select a specific row using command key
    * @method selectRow
    * @param {String} row number
    */
    this.selectRowWithKeyboard = function (rowNumber) {
        var row = this.getRowByRowNumber(rowNumber);
        browser.actions().keyDown(protractor.Key.COMMAND).click(row).perform();
    };

    /**
    * Select a specific selection mode
    * @method selectSelectionMode
    * @param {String} selection mode
    */
    this.selectSelectionMode = function (selectionMode) {
        var selectMode = element(by.cssContainingText("span[class='mat-option-text']", selectionMode));
        selectionButton.click();
        Util.waitUntilElementIsVisible(selectionDropDown);
        selectMode.click();
    };

    /**
    * Check if a specific row is selected
    * @method checkRowIsSelected
    * @param {String} row number
    */
    this.checkRowIsSelected = function (rowNumber) {
        var isRowSelected = this.getRowByRowNumber(rowNumber).element(by.xpath("ancestor::div[contains(@class, 'is-selected')]"));
        Util.waitUntilElementIsVisible(isRowSelected);
    };

    /**
    * Check if a specific row is not selected
    * @method checkRowIsNotSelected
    * @param {String} row number
    */
    this.checkRowIsNotSelected = function (rowNumber) {
        var isRowSelected = this.getRowByRowNumber(rowNumber).element(by.xpath("ancestor::div[contains(@class, 'adf-datatable-row custom-row-style ng-star-inserted is-selected')]"));
        Util.waitUntilElementIsNotOnPage(isRowSelected);
    };

    /**
    * Check no row is selected
    * @method checkNoRowIsSelected
    */
    this.checkNoRowIsSelected = function () {
        Util.waitUntilElementIsNotOnPage(selectedRowNumber);
    };

    this.checkAllRows = function () {
        Util.waitUntilElementIsVisible(selectAll);
        selectAll.click();
    };

    /**
    * Check specfic row is checked
    * @method checkRowIsChecked
    * @param {String} row number
    */
    this.checkRowIsChecked = function (rowNumber) {
        Util.waitUntilElementIsVisible(this.getRowCheckbox(rowNumber));
    };

    /**
    * Check specfic row is not checked
    * @method checkRowIsNotChecked
    * @param {String} row number
    */
    this.checkRowIsNotChecked = function (rowNumber) {
        Util.waitUntilElementIsNotOnPage(this.getRowCheckbox(rowNumber));
    };

    /**
     * Add a row to the table
     * @method addRow
     */
    this.addRow = function () {
        Util.waitUntilElementIsVisible(addRow);
        addRow.click();
    };

    /**
     * Get the number of rows of the table
     * @method getNumberOfRows
     */
    this.getNumberOfRows = function () {
        return list.count();
    };

    /**
     * Get the number of selected rows of the table
     * @method getNumberOfSelectedRows
     */
    this.getNumberOfSelectedRows = function () {
        return allSelectedRows.count();
    };

    /**
    * replace rows
    * @method replaceRows
    * @param {String} id
    */
    this.replaceRows = function (id) {
        var rowID = this.getRowByRowNumber(id);
        Util.waitUntilElementIsVisible(rowID);
        replaceRows.click();
        Util.waitUntilElementIsNotOnPage(rowID);
    };

    /**
    * replace columns
    * @method replaceColumns
    */
    this.replaceColumns = function () {
        Util.waitUntilElementIsVisible(replaceColumns);
        replaceColumns.click();
        Util.waitUntilElementIsNotOnPage(createdOnColumn);
    };

    /**
    * check the nodeID is the same with the userHome folder's ID
    * @method replaceColumns
    */
    this.checkLoadNode = function (userHome) {
        var nodeId = element(by.css("div[data-automation-id*='" + userHome + "']"));

        Util.waitUntilElementIsVisible(loadNode);
        loadNode.click();
        Util.waitUntilElementIsVisible(nodeId, 10000);
    };

};
module.exports = DataTablePage;