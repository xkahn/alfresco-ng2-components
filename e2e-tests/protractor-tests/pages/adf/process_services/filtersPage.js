/*
 * Created by Cristina jalba on 10/02/2018.
 */

var Util = require("../../../util/util.js");
var ContentList = require("../dialog/contentList.js");

var FiltersPage = function () {

    var activeFilter = element(by.css("mat-list-item[class*='active']"));
    var nameColumn = by.css("div[class*='adf-datatable-body'] div[class*='adf-datatable-row'] div[class*='--text'] span");
    var contentList = new ContentList();

    this.getActiveFilter = function () {
        Util.waitUntilElementIsVisible(activeFilter);
        return activeFilter.getText();
    };

    this.goToFilter = function (filterName) {
        var filter = element(by.css("span[data-automation-id='" + filterName + "_filter']"));
        Util.waitUntilElementIsVisible(filter);
        filter.click();
        return this;
    };

    this.sortByName = function (sortOrder) {
        contentList.sortByName(sortOrder);
    };

    this.getAllRowsNameColumn = function () {
        return contentList.getAllRowsColumnValues(nameColumn);
    };

};

module.exports = FiltersPage;

