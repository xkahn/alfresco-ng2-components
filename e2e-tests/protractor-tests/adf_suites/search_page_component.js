
/*
 * Created by Cristina Jalba on 21/09/2017.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var SearchDialog = require('../pages/adf/dialog/searchDialog.js');
var ContentServicesPage = require('../pages/adf/contentServicesPage.js');
var SearchResultPage = require('../pages/adf/searchResultsPage.js');
var filePreviewPage = require('../pages/adf/filePreviewPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FolderModel = require("../ACSmodels/folderModel.js");
var FileModel = require("../ACSmodels/fileModel.js");

var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var QueriesAPI = require('../restAPI/ACM/QueriesAPI.js');
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');

var TestConfig = require("../test.config.js");
var Util = require("../util/util.js");
var retryNumber = 100;
var resources = require("../util/resources.js");

describe("Test Search component - Search Page", function () {
    var search = {
            active: {
                base: "newFile",
                firstFile: "newFile14.txt",
                secondFile: "newFile15.txt",
                extension: ".txt",
            },
            no_permission: {
                noPermFile: "Meetings",
                noPermFolder: "Meeting Notes",
            }
        };

    var adfLoginPage = new AdfLoginPage();
    var contentServicesPage = new ContentServicesPage();
    var searchDialog = new SearchDialog();
    var searchResultPage = new SearchResultPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var emptyFolderModel = new FolderModel({"name" : "emptyFolder"});
    var firstFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.PDF.file_name});
    var newFolderModel = new FolderModel({"name" : "newFolder"});
    var fileNames = [], adminFileNames = [], nrOfFiles = 15, adminNrOfFiles = 5;

    beforeAll(function (done)
    {
        fileNames = Util.generateSeqeunceFiles(1, nrOfFiles, search.active.base, search.active.extension);
        adminFileNames = Util.generateSeqeunceFiles(nrOfFiles+1, nrOfFiles+adminNrOfFiles, search.active.base, search.active.extension);

        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(function () {
                return adfLoginPage.loginUsingUserModel(acsUser);
            })
            .then(function() {
                return protractor.promise.all([
                    NodesAPI.uploadFolderViaAPI(acsUser, emptyFolderModel, "-my-"),
                    NodesAPI.uploadFolderViaAPI(acsUser, newFolderModel, "-my-")
                ]);
            })
            .then(function() {
                return protractor.promise.all([
                    NodesAPI.createEmptyFilesViaAPI(acsUser, fileNames, newFolderModel.id),
                    NodesAPI.createEmptyFilesViaAPI(adminUserModel, adminFileNames, newFolderModel.id),
                    NodesAPI.uploadFileViaAPI(acsUser, firstFileModel, "-my-", false),
                ]);
            })
            .then(function(data) {
                QueriesAPI.getNodes(retryNumber, acsUser, "term=nothing*&rootNodeId=-root-", nrOfFiles + adminNrOfFiles, function() {
                    done();
                });
            });

    });

    it("1. 'No results found searching for' message is displayed on Search Page", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter("nonexistent");
        searchResultPage.checkNoResultMessageIsDisplayed();
    });

    it("2. File previewer is displayed", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(firstFileModel.name);
        searchResultPage.checkContentIsDisplayed(firstFileModel.name);
        searchResultPage.navigateToFolder(firstFileModel.name);
        filePreviewPage.getPDFTitleFromSearch().then(function(title) {
            expect(title).toEqual(firstFileModel.name);
        });
        filePreviewPage.closePreviewWithButton();
    });

    it("3. Only the searched file is displayed", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.firstFile);
        searchResultPage.checkContentIsDisplayed(search.active.firstFile);
        expect(searchResultPage.numberOfResultsDisplayed()).toBe(1);
    });

    it("4. Folder content is displayed", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(emptyFolderModel.name);
        searchResultPage.checkNoResultMessageIsNotDisplayed();
        searchResultPage.checkContentIsDisplayed(emptyFolderModel.name);
        searchResultPage.navigateToFolder(emptyFolderModel.name);
        contentServicesPage.currentFolderName().then(function(result) {
            expect(result).toEqual(emptyFolderModel.name);
        });
    });

    it("5. Delete a file from the Search Results Page", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.firstFile);
        searchResultPage.checkContentIsDisplayed(search.active.firstFile);
        searchResultPage.deleteContent(search.active.firstFile);
        searchResultPage.checkNoResultMessageIsDisplayed();
        searchResultPage.checkContentIsNotDisplayed(search.active.firstFile);
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.firstFile);
        searchResultPage.checkNoResultMessageIsDisplayed();
    });

    it("6. Delete a folder from the Search Results Page", function () {
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(emptyFolderModel.name);
        searchResultPage.checkContentIsDisplayed(emptyFolderModel.name);
        searchResultPage.checkNoResultMessageIsNotDisplayed();
        searchResultPage.checkContentIsDisplayed(emptyFolderModel.name);
        searchResultPage.deleteContent(emptyFolderModel.name);
        searchResultPage.checkNoResultMessageIsDisplayed();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(emptyFolderModel.name);
        searchResultPage.checkNoResultMessageIsDisplayed();
    });

    it("8. Sort content ascending by name.", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.base);
        searchResultPage.checkContentIsDisplayed(search.active.secondFile);
        searchResultPage.sortAndCheckListIsOrderedByName(true).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("9. Sort content descending by name.", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.base);
        searchResultPage.checkContentIsDisplayed(search.active.secondFile);
        searchResultPage.sortAndCheckListIsOrderedByName(false).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("10. Sort content ascending by author.", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.base);
        searchResultPage.checkContentIsDisplayed(search.active.secondFile);
        searchResultPage.sortAndCheckListIsOrderedByAuthor(true).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("11. Sort content descending by author.", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.base);
        searchResultPage.checkContentIsDisplayed(search.active.secondFile);
        searchResultPage.sortAndCheckListIsOrderedByAuthor(false).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("12. Sort content ascending by created date.", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.base);
        searchResultPage.checkContentIsDisplayed(search.active.secondFile);
        searchResultPage.sortAndCheckListIsOrderedByCreated(true).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("13. Sort content descending by created date.", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.active.base);
        searchResultPage.checkContentIsDisplayed(search.active.secondFile);
        searchResultPage.sortAndCheckListIsOrderedByCreated(false).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("14. Try to delete a file without rights from the Search Results Page", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.no_permission.noPermFile);
        searchResultPage.checkContentIsDisplayed(search.no_permission.noPermFile);
        searchResultPage.deleteContent(search.no_permission.noPermFile);
        searchResultPage.checkContentIsDisplayed(search.no_permission.noPermFile);
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.no_permission.noPermFile);
        searchResultPage.checkNoResultMessageIsNotDisplayed();
        searchResultPage.checkContentIsDisplayed(search.no_permission.noPermFile);
    });

    it("15. Try to delete a folder without rights from the Search Results Page", function () {
        contentServicesPage.goToDocumentList();
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.no_permission.noPermFolder);
        searchResultPage.checkContentIsDisplayed(search.no_permission.noPermFolder);
        searchResultPage.deleteContent(search.no_permission.noPermFolder);
        searchResultPage.checkContentIsDisplayed(search.no_permission.noPermFolder);
        searchDialog.checkSearchBarIsNotVisible().checkSearchIconIsVisible().clickOnSearchIcon()
            .enterTextAndPressEnter(search.no_permission.noPermFolder);
        searchResultPage.checkNoResultMessageIsNotDisplayed();
        searchResultPage.checkContentIsDisplayed(search.no_permission.noPermFolder);
    });

    afterAll(function (done) {
        NodesAPI.deleteContent(acsUser, newFolderModel.id, function() {
            NodesAPI.deleteContent(acsUser, emptyFolderModel.id, function() {
                done();
            });
        })
    });
});


