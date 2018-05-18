/**
 * Created by jdosti on 01/11/2017.
 */

var Util = require("../util/util.js");
var TestConfig = require("../test.config.js");
var AdfLoginPage = require('../pages/adf/loginPage');
var AdfContentServicesPage = require('../pages/adf/contentServicesPage');
var AdfViewerPage = require('../pages/adf/viewerPage.js');
var AcsUserModel = require("../ACSmodels/acsUserModel.js");

var resources = require("../util/resources.js");
var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');

var fs = require('fs');
var path = require('path');
var FileModel = require("../ACSmodels/fileModel.js");
var AcsUserModel = require("../ACSmodels/acsUserModel.js");


describe('Test Content Services Viewer', function (){

    var acsUser = new AcsUserModel();
    var adfViewerPage = new AdfViewerPage();
    var adfContentServicesPage = new AdfContentServicesPage();
    var adfLoginPage = new AdfLoginPage();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf_acs.adminUser, "password" : TestConfig.adf_acs.adminPassword});

    var defaultHeight;
    var defaultWidth;
    var zoomedInHeight;
    var zoomedInWidth;
    var scaledHeight;
    var scaledWidth;
    var zoomedOutHeight;
    var zoomedOutWidth;

    var pdfFile = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.PDF.file_name});
    var jpgFile = new FileModel({"location" : resources.Files.ADF_DOCUMENTS.JPG.file_location, "name" : resources.Files.ADF_DOCUMENTS.JPG.file_name});
    var mp4File = new FileModel({"location" : resources.Files.ADF_DOCUMENTS.MP4.file_location, "name" : resources.Files.ADF_DOCUMENTS.MP4.file_name});
    var pagesFile = new FileModel({"location" : resources.Files.ADF_DOCUMENTS.PAGES.file_location, "name" : resources.Files.ADF_DOCUMENTS.PAGES.file_name});
    var pptFile = new FileModel({"location" : resources.Files.ADF_DOCUMENTS.PPT.file_location, "name" : resources.Files.ADF_DOCUMENTS.PPT.file_name, "firstPageText" : resources.Files.ADF_DOCUMENTS.PPT.first_page_text});

    var downloadedPdfFile = path.join(browser.downloadDir, pdfFile.name);
    var downloadedJpgFile = path.join(browser.downloadDir, jpgFile.name);
    var downloadedMp4File = path.join(browser.downloadDir, mp4File.name);
    var downloadedPagesFile = path.join(browser.downloadDir, pagesFile.name);

    beforeAll(function (done) {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(function () {
                console.log("User name: " + acsUser.getId() + "pass: " + acsUser.getPassword());
                adfLoginPage.loginUsingUserModel(acsUser);
                adfContentServicesPage.goToDocumentList();
            })
            .then(function () {
                return protractor.promise.all([

                    NodesAPI.uploadFileViaAPI(acsUser, pdfFile, "-my-", false),

                    NodesAPI.uploadFileViaAPI(acsUser, jpgFile, "-my-", false),

                    NodesAPI.uploadFileViaAPI(acsUser, mp4File, "-my-", false),

                    NodesAPI.uploadFileViaAPI(acsUser, pagesFile, "-my-", false),

                    NodesAPI.uploadFileViaAPI(acsUser, pptFile, "-my-", false)])
            })
            .then(function() {
                done();
            });
    });

    it('1. Open viewer for a .pdf file', function () {
        adfContentServicesPage.checkAcsContainer();
        adfViewerPage.viewFile(pdfFile.name);
        adfViewerPage.checkFileContent('1', pdfFile.firstPageText);
        adfViewerPage.checkCloseButtonIsDisplayed();
        adfViewerPage.checkFileThumbnailIsDisplayed();
        adfViewerPage.checkFileNameIsDisplayed(pdfFile.name);
        adfViewerPage.checkDownloadButtonIsDisplayed();
        adfViewerPage.checkInfoButtonIsDisplayed();
        adfViewerPage.checkPreviousPageButtonIsDisplayed();
        adfViewerPage.checkNextPageButtonIsDisplayed();
        adfViewerPage.checkPageSelectorInputIsDisplayed('1');
        adfViewerPage.checkZoomInButtonIsDisplayed();
        adfViewerPage.checkZoomOutButtonIsDisplayed();
        adfViewerPage.checkScalePageButtonIsDisplayed();
    });

    it('2. Use viewer pagination', function () {
        adfViewerPage.clickNextPageButton();
        adfViewerPage.checkFileContent('2',pdfFile.secondPageText);
        adfViewerPage.checkPageSelectorInputIsDisplayed('2');
        adfViewerPage.clickPreviousPageButton();
        adfViewerPage.checkFileContent('1', pdfFile.firstPageText);
        adfViewerPage.checkPageSelectorInputIsDisplayed('1');
        adfViewerPage.enterPage(pdfFile.lastPageNumber);
        adfViewerPage.checkFileContent(pdfFile.lastPageNumber, pdfFile.lastPageText);
        adfViewerPage.checkPageSelectorInputIsDisplayed(pdfFile.lastPageNumber);
        adfViewerPage.canvasHeight().then(function (value) {
            defaultHeight = parseInt(value);
        });
        adfViewerPage.canvasWidth().then(function (value) {
            defaultWidth = parseInt(value);
        });
        adfViewerPage.clickZoomInButton();
        adfViewerPage.canvasHeight().then(function (value) {
            zoomedInHeight = parseInt(value);
            expect(zoomedInHeight).toBeGreaterThan(defaultHeight);
        });
        adfViewerPage.canvasWidth().then(function (value) {
            zoomedInWidth = parseInt(value);
            expect(zoomedInWidth).toBeGreaterThan(defaultWidth);
        });
        adfViewerPage.clickScalePageButton();
        adfViewerPage.canvasHeight().then(function (value) {
            scaledHeight = parseInt(value);
            expect(scaledHeight).toEqual(defaultHeight);
        });
        adfViewerPage.canvasWidth().then(function (value) {
            scaledWidth = parseInt(value);
            expect(scaledWidth).toEqual(defaultWidth);
        });
        adfViewerPage.clickZoomOutButton();
        adfViewerPage.canvasHeight().then(function (value) {
            zoomedOutHeight = parseInt(value);
            expect(zoomedOutHeight).toBeLessThan(defaultHeight);
        });
        adfViewerPage.canvasWidth().then(function (value) {
            zoomedOutWidth = parseInt(value);
            expect(zoomedOutWidth).toBeLessThan(defaultWidth);
        })
    });

    it('3. Use viewer toolbar', function () {
        adfViewerPage.clickDownloadButton();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsNotDisplayed();
        expect(Util.fileExists(downloadedPdfFile, 10)).toBe(true);
        adfViewerPage.clickCloseButton();
    });

    it('4. Open viewer for a .jpg file', function () {
        adfViewerPage.viewFile(jpgFile.name);
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsNotDisplayed();
        adfViewerPage.checkDownloadButtonIsDisplayed();
        adfViewerPage.clickDownloadButton();
        adfViewerPage.checkFileThumbnailIsDisplayed();
        adfViewerPage.checkFileNameIsDisplayed(jpgFile.name);
        expect(Util.fileExists(downloadedJpgFile, 10)).toBe(true);
        adfViewerPage.clickCloseButton();
    });

    it('5. Open viewer for a .ppt file converted to .pdf', function () {
        adfViewerPage.viewFile(pptFile.name);
        adfViewerPage.checkFileContent('1', pptFile.firstPageText);
        adfViewerPage.checkCloseButtonIsDisplayed();
        adfViewerPage.checkFileThumbnailIsDisplayed();
        adfViewerPage.checkFileNameIsDisplayed(pptFile.name);
        adfViewerPage.checkDownloadButtonIsDisplayed();
        adfViewerPage.checkInfoButtonIsDisplayed();
        adfViewerPage.checkPreviousPageButtonIsDisplayed();
        adfViewerPage.checkNextPageButtonIsDisplayed();
        adfViewerPage.checkPageSelectorInputIsDisplayed('1');
        adfViewerPage.checkZoomInButtonIsDisplayed();
        adfViewerPage.checkZoomOutButtonIsDisplayed();
        adfViewerPage.checkScalePageButtonIsDisplayed();
        adfViewerPage.clickCloseButton();
    });


    it('6. Open viewer fot an unsupported file', function () {
        adfViewerPage.viewFile(pagesFile.name);
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsNotDisplayed();
        adfViewerPage.checkFileThumbnailIsDisplayed();
        adfViewerPage.checkDownloadButtonIsDisplayed();
        adfViewerPage.clickDownloadButton();
        expect(Util.fileExists(downloadedPagesFile, 10)).toBe(true);
        adfViewerPage.checkFileNameIsDisplayed(pagesFile.name);
        adfViewerPage.clickCloseButton();
    });

    it('7. Open viewer for a .mp4 file', function () {
        adfViewerPage.viewFile(mp4File.name);
        adfViewerPage.checkMediaPlayerContainerIsDisplayed();
        adfViewerPage.clickDownloadButton();
        expect(Util.fileExists(downloadedMp4File, 10)).toBe(true);
        adfViewerPage.checkFileThumbnailIsDisplayed();
        adfViewerPage.checkFileNameIsDisplayed(mp4File.name);
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsNotDisplayed();
        adfViewerPage.checkDownloadButtonIsDisplayed();
        adfViewerPage.clickCloseButton();
    });


    afterAll(function (done) {
        NodesAPI.deleteContent(acsUser, pdfFile.getId(), function() {
            done();
        });

        NodesAPI.deleteContent(acsUser, jpgFile.getId(), function() {
            done();
        });

        NodesAPI.deleteContent(acsUser, mp4File.getId(), function() {
            done();
        });

        NodesAPI.deleteContent(acsUser, pagesFile.getId(), function() {
            done();
        });

        NodesAPI.deleteContent(acsUser, pptFile.getId(), function() {
            done();
        });

    });
});