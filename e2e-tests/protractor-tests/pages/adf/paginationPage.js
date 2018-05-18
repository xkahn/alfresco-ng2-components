/**
 * Created by Cristina Jalba on 23/04/2018.
 */

var Util = require("../../util/util.js");

var PaginationPage = function () {

    var itemsPerPageDropdown = element(by.css("div[class*='adf-pagination__block'] button"));
    var pageSelectorDropDown = element(by.css("div[class*='adf-pagination__page-selector']"));
    var itemsPerPage = element(by.css("span[class='adf-pagination__max-items']"));
    var currentPage = element(by.css("span[class='adf-pagination__current-page']"));
    var totalPages = element(by.css("span[class='adf-pagination__total-pages']"));
    var paginationRange = element(by.css("span[class='adf-pagination__range']"));
    var nextPageButton = element(by.css("button[class*='adf-pagination__next-button']"));
    var previousPageButton = element(by.css("button[class*='adf-pagination__previous-button']"));
    var nextButtonDisabled = element(by.css("button[class*='adf-pagination__next-button'][disabled]"));
    var previousButtonDisabled = element(by.css("button[class*='adf-pagination__previous-button'][disabled]"));
    var pageDropDown = element(by.css("div[class*='adf-pagination__actualinfo-block'] button"));
    var pageDropDownOptions = by.css("div[class*='mat-menu-content'] button");
    var paginationSection = element(by.css("adf-pagination"));

    this.selectItemsPerPage = function (item) {
        Util.waitUntilElementIsVisible(itemsPerPageDropdown);
        Util.waitUntilElementIsClickable(itemsPerPageDropdown);
        browser.actions().mouseMove(itemsPerPageDropdown).perform();
        Util.waitUntilElementIsVisible(itemsPerPageDropdown);
        Util.waitUntilElementIsClickable(itemsPerPageDropdown);
        itemsPerPageDropdown.click();
        Util.waitUntilElementIsVisible(pageSelectorDropDown);
        var itemsPerPage = element(by.cssContainingText("div[class*='adf-pagination__page-selector'] button", item));
        Util.waitUntilElementIsVisible(itemsPerPage);
        itemsPerPage.click();
        return this;
    };

    this.checkPaginationIsNotDisplayed = function () {
        Util.waitUntilElementIsNotOnPage(paginationSection);
        return this;
    };

    this.getCurrentItemsPerPage = function () {
        Util.waitUntilElementIsVisible(itemsPerPage);
        return itemsPerPage.getText();
    };

    this.getCurrentPage = function () {
        Util.waitUntilElementIsVisible(paginationSection);
        Util.waitUntilElementIsVisible(currentPage);
        return currentPage.getText();
    };

    this.getTotalPages = function () {
        Util.waitUntilElementIsVisible(totalPages);
        return totalPages.getText();
    };

    this.getPaginationRange = function () {
        Util.waitUntilElementIsVisible(paginationRange);
        return paginationRange.getText();
    };

    this.clickOnNextPage = function () {
        Util.waitUntilElementIsVisible(nextPageButton);
        Util.waitUntilElementIsClickable(nextPageButton);
        return nextPageButton.click();
    };

    this.clickOnPageDropdown = function () {
        Util.waitUntilElementIsVisible(pageDropDown);
        Util.waitUntilElementIsClickable(pageDropDown);
        return pageDropDown.click();
    };

    this.clickOnPageDropdownOption = function (item) {
        Util.waitUntilElementIsVisible(element(pageDropDownOptions));
        var option = element(by.cssContainingText("div[class*='mat-menu-content'] button", item));
        Util.waitUntilElementIsVisible(option);
        option.click();
        return this;
    };

    this.getPageDropdownOptions = function() {
        var deferred = protractor.promise.defer();
        Util.waitUntilElementIsVisible(element(pageDropDownOptions));
        var initialList = [];
        element.all(pageDropDownOptions).each(function(element) {
            element.getText().then(function(text) {
                if(text !== '') {
                    initialList.push(text);
                };
            });
        }).then(function () {
            deferred.fulfill(initialList);
        });
        return deferred.promise;
    };

    this.checkNextPageButtonIsDisabled = function() {
        Util.waitUntilElementIsVisible(nextButtonDisabled);
    };

    this.checkPreviousPageButtonIsDisabled = function() {
        Util.waitUntilElementIsVisible(previousButtonDisabled);
    };

    this.checkNextPageButtonIsEnabled = function() {
        Util.waitUntilElementIsNotOnPage(nextButtonDisabled);
    };

    this.checkPreviousPageButtonIsEnabled = function() {
        Util.waitUntilElementIsNotOnPage(previousButtonDisabled);
    };

};
module.exports = PaginationPage;

