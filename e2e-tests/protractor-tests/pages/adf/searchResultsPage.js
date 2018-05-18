/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Cristina Jalba on 21/09/2017.
 */
var Util = require("../../util/util.js");
var ContentList = require("./dialog/contentList.js");

var SearchResultsPage = function () {
    
    var noResultsMessage = element(by.css("div[class='adf-no-result-message']"));
    var noResultsMessageBy = by.css("div[class='adf-no-result-message']");
    var contentList = new ContentList();

    this.checkContentIsDisplayed = function (content) {
        contentList.checkContentIsDisplayed(content);
        return this;
    };
    
    this.numberOfResultsDisplayed = function () {
        return contentList.getAllDisplayedRows();
    };
    
    this.checkContentIsNotDisplayed = function (content) {
        Util.waitUntilElementIsNotOnPage(element(by.css("span[title='" + content +"']")));
    };

    this.checkNoResultMessageIsDisplayed = function() {
        Util.waitUntilElementIsPresent(element(noResultsMessageBy));
        Util.waitUntilElementIsVisible(element(noResultsMessageBy));
        return this;
    };

    this.checkNoResultMessageIsNotDisplayed = function () {
        Util.waitUntilElementIsNotOnPage(noResultsMessage);
        return this;
    };

    this.navigateToFolder = function(content) {
        contentList.navigateToFolder(content);
        return this;
    };

    this.deleteContent = function(content) { 
        contentList.deleteContent(content);
     };

    this.copyContent = function(content) { 
        contentList.copyContent(content);
     };

    this.moveContent = function(content) { 
        contentList.moveContent(content); 
    };

    /**
     * Sort the list by name column.
     *
     * @param sortOrder: 'true' to sort the list ascendant and 'false' for descendant
     */
    this.sortByName = function (sortOrder) {
        contentList.sortByName(sortOrder);
    };

    /**
     * Sort the list by author column.
     *
     * @param sortOrder: 'true' to sort the list ascendant and 'false' for descendant
     */
    this.sortByAuthor = function (sortOrder) {
        contentList.sortByAuthor(sortOrder);
    };

    /**
     * Sort the list by created column.
     *
     * @param sortOrder: 'true' to sort the list ascendant and 'false' for descendant
     */
    this.sortByCreated = function (sortOrder) {
        return contentList.sortByCreated(sortOrder);
    };

    /**
     * Sort by name and check the list is sorted.
     *
     * @param sortOrder: 'true' if the list is expected to be sorted ascendant and 'false' for descendant
     * @return result : 'true' if the list is sorted as expected and 'false' if it isn't
     */
    this.sortAndCheckListIsOrderedByName = function (sortOrder) {
        this.sortByName(sortOrder);
        var deferred = protractor.promise.defer();
        contentList.checkListIsOrderedByNameColumn(sortOrder).then(function(result) {
            deferred.fulfill(result);
        });
        return deferred.promise;
    };

    /**
     * Sort by author and check the list is sorted.
     *
     * @param sortOrder: 'true' if the list is expected to be sorted ascendant and 'false' for descendant
     * @return result : 'true' if the list is sorted as expected and 'false' if it isn't
     */
    this.sortAndCheckListIsOrderedByAuthor = function (sortOrder) {
        this.sortByAuthor(sortOrder);
        var deferred = protractor.promise.defer();
        contentList.checkListIsOrderedByAuthorColumn(sortOrder).then(function(result) {
            deferred.fulfill(result);
        });
        return deferred.promise;
    };

    /**
     * Sort by created and check the list is sorted.
     *
     * @param sortOrder: 'true' if the list is expected to be sorted ascendant and 'false' for descendant
     * @return result : 'true' if the list is sorted as expected and 'false' if it isn't
     */
    this.sortAndCheckListIsOrderedByCreated = function (sortOrder) {
        this.sortByCreated(sortOrder);
        var deferred = protractor.promise.defer();
        contentList.checkListIsOrderedByCreatedColumn(sortOrder).then(function(result) {
            deferred.fulfill(result);
        });
        return deferred.promise;
    };

};
module.exports = SearchResultsPage;
