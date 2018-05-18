/**
 * Created by jdosti on 03/05/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ContentServicesPage = require('../pages/adf/contentServicesPage.js');
var PaginationPage = require('../pages/adf/paginationPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FolderModel = require("../ACSmodels/folderModel.js");

var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var QueriesAPI = require('../restAPI/ACM/QueriesAPI.js');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Util = require("../util/util.js");

describe("Pagination - returns to previous page when current is empty", function () {

    var adfLoginPage = new AdfLoginPage();
    var contentServicesPage = new ContentServicesPage();
    var paginationPage = new PaginationPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var folderModel = new FolderModel({"name" : "folderOne"});

    var retryNumber = 30;
    var fileNames = [], nrOfFiles = 6;
    var lastFile = 'newFile6.txt';

    var itemsPerPage = {
        five: "5",
        fiveValue: 5,
    };

    var files = {
        base: "newFile",
        extension: ".txt"
    };

    beforeAll(function (done)
    {
        fileNames = Util.generateSeqeunceFiles(1, nrOfFiles, files.base, files.extension);

        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(function () {
                adfLoginPage.loginToContentServicesUsingUserModel(acsUser);
                return contentServicesPage.goToDocumentList();
            })
            .then(function() {
                return NodesAPI.uploadFolderViaAPI(acsUser,folderModel, "-my-");
            })
            .then(function() {
                return NodesAPI.createEmptyFilesViaAPI(acsUser, fileNames, folderModel.id);
            })
            .then(function(data) {
                QueriesAPI.getNodes(retryNumber, acsUser, "term=nothing*&rootNodeId=-root-", nrOfFiles, function() {
                    done();
                });
            });

    });

    it("Pagination - returns to previous page when current is empty", function () {
        contentServicesPage.goToDocumentList();
        contentServicesPage.navigateToFolder(folderModel.name);
        contentServicesPage.checkAcsContainer();
        contentServicesPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.fiveValue);
        contentServicesPage.checkAcsContainer();
        contentServicesPage.waitForTableBody();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(contentServicesPage.numberOfResultsDisplayed()).toBe(itemsPerPage.fiveValue);
        contentServicesPage.getAllRowsNameColumn().then(function (list) {
            expect(Util.arrayContainsArray(list, fileNames.slice(0, 5))).toEqual(true);
        });
        paginationPage.clickOnNextPage();
        contentServicesPage.checkAcsContainer();
        contentServicesPage.waitForTableBody();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        contentServicesPage.getAllRowsNameColumn().then(function (list) {
            expect(Util.arrayContainsArray(list, fileNames.slice(5, 6))).toEqual(true);
        });
        contentServicesPage.deleteContent(lastFile);
        contentServicesPage.checkContentIsNotDisplayed(lastFile);
        contentServicesPage.checkAcsContainer();
        contentServicesPage.waitForTableBody();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(contentServicesPage.numberOfResultsDisplayed()).toBe(itemsPerPage.fiveValue);
        contentServicesPage.getAllRowsNameColumn().then(function (list) {
            expect(Util.arrayContainsArray(list, fileNames.slice(0, 5))).toEqual(true);
        });

    });

    afterAll(function (done) {
        NodesAPI.deleteContent(acsUser, folderModel.id, function() {
            done();
        })
    });

});