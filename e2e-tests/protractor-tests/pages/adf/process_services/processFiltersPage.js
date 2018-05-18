/**
 * Created by jdosti on 08/01/2018.
 */

var Util = require("../../../util/util.js");
var ContentList = require("../dialog/contentList.js");

var ProcessFiltersPage = function () {

    var runningFilter = element(by.css("span[data-automation-id='Running_filter']"));
    var completedFilter = element(by.css("div[class='mat-list-text'] > span[data-automation-id='Completed_filter']"));
    var allFilter = element(by.css("span[data-automation-id='All_filter']"));
    var createProcessButton = element(by.css(".adf-processes-menu button[data-automation-id='create-button'] > span"));
    var newProcessButton = element(by.css("div > button[data-automation-id='btn-start-process']"));
    var processesPage = element(by.css("div[class='adf-grid'] > div[class='adf-grid-item adf-processes-menu']"));
    var accordionMenu = element(by.css(".adf-processes-menu adf-accordion"));
    var buttonWindow = element(by.css("div > button[data-automation-id='btn-start-process'] > div"));
    var noContentMessage = element(by.css("div[class='no-content-message ng-star-inserted']"));
    var rows = by.css("adf-process-instance-list div[class='adf-datatable-body'] div[class*='adf-datatable-row']");
    var tableBody = element(by.css("adf-datatable div[class='adf-datatable-body']"));
    var contentList = new ContentList();
    var nameColumn = by.css("div[class*='adf-datatable-body'] div[class*='adf-datatable-row'] div[class*='--text'] span");

    this.clickRunningFilterButton = function () {
        Util.waitUntilElementIsVisible(runningFilter);
        Util.waitUntilElementIsClickable(runningFilter);
        return runningFilter.click();
    };

    this.clickCompletedFilterButton = function () {
        Util.waitUntilElementIsVisible(completedFilter);
        Util.waitUntilElementIsClickable(completedFilter);
        completedFilter.click();
        expect(completedFilter.isEnabled()).toBe(true);
    };

    this.clickAllFilterButton = function () {
        Util.waitUntilElementIsVisible(allFilter);
        Util.waitUntilElementIsClickable(allFilter);
        allFilter.click();
        expect(allFilter.isEnabled()).toBe(true);
    };

    this.clickCreateProcessButton = function () {
        Util.waitUntilElementIsOnPage(accordionMenu);
        Util.waitUntilElementIsVisible(processesPage);
        Util.waitUntilElementIsPresent(createProcessButton);
        createProcessButton.click();
    };

    this.clickNewProcessDropdown = function () {
        Util.waitUntilElementIsOnPage(buttonWindow);
        Util.waitUntilElementIsVisible(newProcessButton);
        Util.waitUntilElementIsClickable(newProcessButton);
        newProcessButton.click();
    };

    this.checkNoContentMessage = function () {
        Util.waitUntilElementIsVisible(noContentMessage);
    };

    this.selectFromProcessList = function (title) {
        var processName = element(by.css('div[data-automation-id="text_'+ title +'"]'));
        Util.waitUntilElementIsVisible(processName);
        processName.click();
    };

    this.checkFilterIsHighlighted = function (filterName) {
        var processNameHighlighted = element(by.css("mat-list-item.active span[data-automation-id='" + filterName + "_filter']"));
        Util.waitUntilElementIsVisible(processNameHighlighted);
    };

    this.numberOfProcessRows = function () {
        return element.all(rows).count();
    };

    this.waitForTableBody = function (){
        Util.waitUntilElementIsVisible(tableBody);
    };

    /**
     *  Sort the list by name column.
     *
     * @param sortOrder : 'true' to sort the list ascendant and 'false' for descendant
     */
    this.sortByName = function (sortOrder) {
        contentList.sortByName(sortOrder);
    };

    this.getAllRowsNameColumn = function () {
        return contentList.getAllRowsColumnValues(nameColumn);
    };

};

module.exports = ProcessFiltersPage;