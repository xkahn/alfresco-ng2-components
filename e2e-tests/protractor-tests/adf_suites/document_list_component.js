/*
 * Created by Cristina Jalba on 06/12/2017.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ContentServicesPage = require('../pages/adf/contentServicesPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FileModel = require("../ACSmodels/fileModel.js");
var FolderModel = require("../ACSmodels/folderModel.js");

var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var QueriesAPI = require('../restAPI/ACM/QueriesAPI.js');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Util = require("../util/util.js");

describe("Test DocumentList component", function () {

    var adfLoginPage = new AdfLoginPage();
    var contentServicesPage = new ContentServicesPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var pdfFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.PDF.file_name});
    var docxFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.DOCX.file_name, "location" : resources.Files.ADF_DOCUMENTS.DOCX.file_location});
    var testFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.TEST.file_name, "location" : resources.Files.ADF_DOCUMENTS.TEST.file_location});
    var folderOneModel = new FolderModel({"name" : "folderOne"});
    var folderTwoModel = new FolderModel({"name" : "folderTwo"});

    var retryNumber = 30;
    var rootFolder = "Personal Files", userHomes = "User Homes";
    var fileNames = [], adminFileNames = [], nrOfFiles = 15, adminNrOfFiles = 5;

    var files = {
        base: "newFile",
        firstFile: "newFile14.txt",
        extension: ".txt",
    };

    var extensions = {
        pdf: "pdf",
        docx: "word",
        test: "document",
    };

    beforeAll(function (done)
    {
        fileNames = Util.generateSeqeunceFiles(1, nrOfFiles, files.base, files.extension);
        adminFileNames = Util.generateSeqeunceFiles(nrOfFiles+1, nrOfFiles+adminNrOfFiles, files.base, files.extension);

        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(function () {
                adfLoginPage.loginUsingUserModel(acsUser);
                return contentServicesPage.goToDocumentList();
            })
            .then(function() {
                return protractor.promise.all([
                    NodesAPI.uploadFileViaAPI(acsUser, pdfFileModel, "-my-", false),
                    NodesAPI.uploadFileViaAPI(acsUser, docxFileModel, "-my-", false),
                    NodesAPI.uploadFileViaAPI(acsUser, testFileModel, "-my-", false),
                    NodesAPI.uploadFolderViaAPI(acsUser,folderOneModel, "-my-")
                ]);
            })
            .then(function() {
                return protractor.promise.all([
                    NodesAPI.createEmptyFilesViaAPI(acsUser, fileNames, folderOneModel.id),
                    NodesAPI.createEmptyFilesViaAPI(adminUserModel, adminFileNames, folderOneModel.id)
                ]);
            })
            .then(function(data) {
                QueriesAPI.getNodes(retryNumber, acsUser, "term=nothing*&rootNodeId=-root-", nrOfFiles + adminNrOfFiles, function() {
                    done();
                });
            });

    });

    it("1. File has tooltip", function () {
        expect(contentServicesPage.getTooltip(pdfFileModel.name)).toEqual(pdfFileModel.name);
    });

    it("2. Folder has tooltip", function () {
        expect(contentServicesPage.getTooltip(folderOneModel.name)).toEqual(folderOneModel.name);
        expect(contentServicesPage.getBreadcrumbTooltip(rootFolder)).toEqual(rootFolder);
    });

    it("4. Sort content ascending by name.", function () {
        contentServicesPage.navigateToFolder(folderOneModel.name);
        expect(contentServicesPage.getActiveBreadcrumb()).toEqual(folderOneModel.name);
        expect(contentServicesPage.getCurrentFolderID()).toContain(folderOneModel.id);
        contentServicesPage.checkContentIsDisplayed(files.firstFile);
        contentServicesPage.sortAndCheckListIsOrderedByName(true).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("5. Sort content descending by name.", function () {
        contentServicesPage.sortAndCheckListIsOrderedByName(false).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("6. Sort content ascending by author.", function () {
        contentServicesPage.sortAndCheckListIsOrderedByAuthor(true).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("7. Sort content descending by author.", function () {
        contentServicesPage.sortAndCheckListIsOrderedByAuthor(false).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("8. Sort content ascending by created date.", function () {
        contentServicesPage.sortAndCheckListIsOrderedByCreated(true).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("9. Sort content descending by created date.", function () {
        contentServicesPage.sortAndCheckListIsOrderedByCreated(false).then(function(result) {
            expect(result).toEqual(true);
        });
    });

    it("10. File can be uploaded in a new created folder.", function () {
        contentServicesPage.createNewFolder(folderTwoModel.name).checkContentIsDisplayed(folderTwoModel.name);
        contentServicesPage.navigateToFolder(folderTwoModel.name).checkEmptyFolderMessageIsDisplayed();
    });

    it("11. Navigate to child folder via breadcrumbs.", function () {
        contentServicesPage.navigateToFolderViaBreadcrumbs(rootFolder);
        contentServicesPage.navigateToFolder(userHomes).navigateToFolder(acsUser.getId())
            .navigateToFolder(folderOneModel.name).navigateToFolder(folderTwoModel.name);
        expect(contentServicesPage.getActiveBreadcrumb()).toEqual(folderTwoModel.name);
    });

    it("12. Navigate to parent folder via breadcrumbs.", function () {
        contentServicesPage.navigateToFolderViaBreadcrumbs(folderOneModel.name);
        expect(contentServicesPage.getActiveBreadcrumb()).toEqual(folderOneModel.name);
        expect(contentServicesPage.getCurrentFolderID()).toContain(folderOneModel.id);
        Util.refreshBrowser();
        expect(contentServicesPage.getActiveBreadcrumb()).toEqual(folderOneModel.name);
        expect(contentServicesPage.getCurrentFolderID()).toContain(folderOneModel.id);
    });

    it("13. Navigate to root folder via breadcrumbs.", function () {
        contentServicesPage.navigateToFolderViaBreadcrumbs(rootFolder);
        expect(contentServicesPage.getActiveBreadcrumb()).toEqual(rootFolder);
    });

    it("17. Each known extension has it's own icon.", function () {
        contentServicesPage.navigateToFolder(userHomes).navigateToFolder(acsUser.getId());
        contentServicesPage.checkContentIsDisplayed(pdfFileModel.name);
        contentServicesPage.checkContentIsDisplayed(docxFileModel.name);
        contentServicesPage.checkContentIsDisplayed(testFileModel.name);
        contentServicesPage.checkIconColumn(pdfFileModel.name, extensions.pdf);
        contentServicesPage.checkIconColumn(docxFileModel.name, extensions.docx);
        contentServicesPage.checkIconColumn(testFileModel.name, extensions.test);
    });

});
