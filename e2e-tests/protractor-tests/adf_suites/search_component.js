
/*
 * Created by Cristina Jalba on 07/09/2017.
 */
var AdfLoginPage = require('../pages/adf/loginPage.js');
var SearchDialog = require('../pages/adf/dialog/searchDialog.js');
var ContentServicesPage = require('../pages/adf/contentServicesPage.js');
var filePreviewPage = require('../pages/adf/filePreviewPage.js');
var SearchResultPage = require('../pages/adf/searchResultsPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FileModel = require("../ACSmodels/fileModel.js");
var FolderModel = require("../ACSmodels/folderModel.js");

var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Util = require("../util/util.js");
var retryNumber = 30;

describe("Test Search component - Search Bar", function () {

    search = {
        inactive: {
            firstChar: "x",
            secondChar: "y",
            thirdChar: "z",
            name: "nonexistent",
        },
        active: {
            base: "newFile",
            extension: ".txt",
        }
    };

    var adfLoginPage = new AdfLoginPage();
    var contentServicesPage = new ContentServicesPage();
    var searchDialog = new SearchDialog();
    var searchResultPage = new SearchResultPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var firstFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.PDF.file_name, "shortName" : resources.Files.ADF_DOCUMENTS.PDF.short_file_name});
    var firstFolderModel = new FolderModel({"name" : "folderOne", "shortName" : "folde"});
    var secondFolder = new FolderModel({"name" : "nameFolderOne", "shortName" : "name"});
    var thirdFolder = new FolderModel({"name" : "nameFolderTwo"});

    beforeAll(function (done)
    {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser).then(function () {
            return protractor.promise.all([
                NodesAPI.uploadFileViaAPI(acsUser, firstFileModel, "-my-", false),
                NodesAPI.uploadFolderViaAPI(acsUser, firstFolderModel, "-my-", false),
                NodesAPI.uploadFolderViaAPI(acsUser, secondFolder, "-my-", false),
                NodesAPI.uploadFolderViaAPI(acsUser, thirdFolder, "-my-", false),
                NodesAPI.getNode(retryNumber, acsUser, firstFileModel.id, function() {
                })
            ]).then(function() {
                adfLoginPage.loginUsingUserModel(acsUser);
                contentServicesPage.goToDocumentList();
                done();
            });
        });
    });

    it("1. Search bar is visible", function () {
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible();
        searchDialog.clickOnSearchIcon().checkSearchBarIsVisible().checkSearchIconIsVisible();
        searchDialog.clickOnSearchIcon().checkSearchBarIsNotVisible().checkSearchIconIsVisible();
    });

    it("2. Add input and close", function () {
        searchDialog.checkSearchIconIsVisible().clickOnSearchIcon().enterText(firstFolderModel.shortName);
        searchDialog.clickOnSearchIcon().checkSearchBarIsNotVisible().checkSearchIconIsVisible();
        contentServicesPage.checkAcsContainer();
    });

    it("3. Search for content that doesn't exist", function () {
        searchDialog.checkSearchBarIsNotVisible().clickOnSearchIcon().checkNoResultMessageIsNotDisplayed()
                    .enterText(search.inactive.name).checkNoResultMessageIsDisplayed();
        searchDialog.clearText();
        searchDialog.checkSearchBarIsNotVisible();
    });

    it("4. Existing folder and file are displayed in search suggestion when typing only the first 4 letters", function () {
       contentServicesPage.goToDocumentList();
       searchDialog.clickOnSearchIcon().checkSearchBarIsVisible().enterText(firstFolderModel.shortName);
       searchDialog.resultTableContainsRow(firstFolderModel.name);
       searchDialog.getSpecificRowsHighlightName(firstFolderModel.name).then(function(text) {
           expect(text).toEqual(firstFolderModel.shortName);
       });
       searchDialog.getSpecificRowsAuthor(firstFolderModel.name).then(function(text) {
           expect(text).toEqual(acsUser.firstName+ " " + acsUser.lastName);
       });
       searchDialog.getSpecificRowsCompleteName(firstFolderModel.name).then(function(text) {
           expect(text).toEqual(firstFolderModel.name);
       });
        searchDialog.clearText();
        searchDialog.checkSearchBarIsNotVisible();

       searchDialog.clickOnSearchIcon().enterText(firstFileModel.shortName);
       searchDialog.resultTableContainsRow(firstFileModel.name);
       searchDialog.getSpecificRowsHighlightName(firstFileModel.name).then(function(text) {
           expect(text).toEqual(firstFileModel.shortName);
       });
       searchDialog.getSpecificRowsAuthor(firstFileModel.name).then(function(text) {
           expect(text).toEqual(acsUser.firstName+ " " + acsUser.lastName);
       });
       searchDialog.getSpecificRowsCompleteName(firstFileModel.name).then(function(text) {
           expect(text).toEqual(firstFileModel.name);
       });
        searchDialog.clearText();
        searchDialog.checkSearchBarIsNotVisible();
    });

    it("5. Existing folder and file are displayed in search suggestion", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.clickOnSearchIcon().checkSearchBarIsVisible().enterText(firstFolderModel.name);
        searchDialog.resultTableContainsRow(firstFolderModel.name);
        searchDialog.getSpecificRowsHighlightName(firstFolderModel.name).then(function(text) {
            expect(text).toEqual(firstFolderModel.name);
        });
        searchDialog.getSpecificRowsAuthor(firstFolderModel.name).then(function(text) {
            expect(text).toEqual(acsUser.firstName+ " " + acsUser.lastName);
        });
        searchDialog.getSpecificRowsCompleteName(firstFolderModel.name).then(function(text) {
            expect(text).toEqual(firstFolderModel.name);
        });
        searchDialog.clearText();
        searchDialog.checkSearchBarIsNotVisible();

        searchDialog.clickOnSearchIcon().enterText(firstFileModel.name);
        searchDialog.resultTableContainsRow(firstFileModel.name);
        searchDialog.getSpecificRowsHighlightName(firstFileModel.name).then(function(text) {
            expect(text).toEqual(firstFileModel.name);
        });
        searchDialog.getSpecificRowsAuthor(firstFileModel.name).then(function(text) {
            expect(text).toEqual(acsUser.firstName+ " " + acsUser.lastName);
        });
        searchDialog.getSpecificRowsCompleteName(firstFileModel.name).then(function(text) {
            expect(text).toEqual(firstFileModel.name);
        });

        searchDialog.clearText();
        searchDialog.checkSearchBarIsNotVisible();
    });

    it("6. Folder content is displayed when clicking on existing folder", function () {
        searchDialog.clickOnSearchIcon().enterText(firstFolderModel.shortName);
        searchDialog.resultTableContainsRow(firstFolderModel.name);
        searchDialog.clickOnSpecificRow(firstFolderModel.name);
        contentServicesPage.checkAcsContainer();
        contentServicesPage.currentFolderName().then(function(result) {
            expect(result).toEqual(firstFolderModel.name);
        });
        contentServicesPage.goToDocumentList();

        searchDialog.checkSearchIconIsVisible().clickOnSearchIcon().checkSearchBarIsVisible();
        searchDialog.enterText(firstFileModel.name).resultTableContainsRow(firstFileModel.name);
        searchDialog.clickOnSpecificRow(firstFileModel.name);
        filePreviewPage.getPDFTitleFromSearch().then(function(title) {
            expect(title).toEqual(firstFileModel.name);
        });
        filePreviewPage.closePreviewWithButton();
    });

    it("7. Non-existent folder is not displayed in search page", function () {
        searchDialog.checkSearchIconIsVisible().clickOnSearchIcon();
        searchDialog.enterTextAndPressEnter(search.inactive.name);
        searchResultPage.checkNoResultMessageIsDisplayed();
        contentServicesPage.goToDocumentList();
    });

    it("8. Existing folder is displayed in search page", function () {
        searchDialog.clickOnSearchIcon();
        searchDialog.enterTextAndPressEnter(firstFolderModel.name);
        searchResultPage.checkContentIsDisplayed(firstFolderModel.name);
    });

    it("9. Existing file is displayed in search page", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.clickOnSearchIcon();
        searchDialog.enterTextAndPressEnter(firstFileModel.name);
        searchResultPage.checkContentIsDisplayed(firstFileModel.name);
    });

    it("10. A folder is selected from search bar using arrows", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.clickOnSearchIcon().enterText(secondFolder.shortName);
        searchDialog.resultTableContainsRow(secondFolder.name).resultTableContainsRow(thirdFolder.name);
        var names = [];
        searchDialog.getAllRowsValues().then(function(array) {
            names = array;
        });
        Util.pressDownArrowAndEnter();
        contentServicesPage.checkAcsContainer();
        contentServicesPage.currentFolderName().then(function(result) {
            expect(result).toEqual(names[0]);
        });
    });

    it("11. The search bar gets closed when clicking on another browser tab", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.clickOnSearchIcon().enterText(secondFolder.shortName);
        searchDialog.resultTableContainsRow(secondFolder.name).resultTableContainsRow(thirdFolder.name);
        Util.openNewTabInBrowser();
        Util.switchToWindowHandler(0);
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible();
    });

    afterAll(function (done) {
        NodesAPI.deleteContent(acsUser, firstFileModel.id, function() {
            NodesAPI.deleteContent(acsUser, firstFolderModel.id, function() {
                done();
            });
        });
    });
});


