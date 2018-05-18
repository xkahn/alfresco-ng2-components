/**
 * Created by Cristina Jalba on 30/04/2018.
 */

var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");
var ContentList = require("./dialog/contentList.js");


var TrashcanPage = function () {

    var rows = by.css("adf-document-list div[class*='adf-datatable-body'] div[class*='adf-datatable-row']");
    var tableBody = element(by.css("adf-document-list div[class='adf-datatable-body']"));
    var pagination = element(by.css("adf-pagination"));

    this.numberOfResultsDisplayed = function () {
        return element.all(rows).count();
    };

    this.waitForTableBody = function (){
        Util.waitUntilElementIsVisible(tableBody);
    };

    this.waitForPagination = function (){
        Util.waitUntilElementIsVisible(pagination);
    };

};
module.exports = TrashcanPage;
