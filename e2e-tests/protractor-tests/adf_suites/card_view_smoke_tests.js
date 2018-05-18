/**
 * Created by Cristina Jalba on 15/03/2018.
 */

/*
 * Created by Cristina Jalba on 06/12/2017.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ContentServicesPage = require('../pages/adf/contentServicesPage.js');
var AdfViewerPage = require('../pages/adf/viewerPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FileModel = require("../ACSmodels/fileModel.js");

var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var NodesAPI = require('../restAPI/ACM/NodesAPI.js');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var dateFormat = require('dateformat');
var CONSTANTS = require("../util/constants");

describe("Metadata component", function () {

    var adfLoginPage = new AdfLoginPage();
    var contentServicesPage = new ContentServicesPage();
    var adfViewerPage = new AdfViewerPage();
    var cardViewPage;

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var pdfFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.PDF_ALL.file_name, "location" : resources.Files.ADF_DOCUMENTS.PDF_ALL.file_location});

    beforeAll(function (done)
    {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(function () {
                adfLoginPage.loginUsingUserModel(acsUser);
                return contentServicesPage.goToDocumentList();
            })
            .then(function() {
                return NodesAPI.uploadFileViaAPI(acsUser, pdfFileModel, "-my-", false);
            })
            .then(function() {
                done();
            })
    });

    it("Properties", function () {
        adfViewerPage.viewFile(pdfFileModel.name);
        cardViewPage = adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        cardViewPage.clickOnPropertiesTab();
        expect(cardViewPage.getTitle()).toEqual(CONSTANTS.METADATA.TITLE);
        expect(cardViewPage.getActiveTab()).toEqual(CONSTANTS.METADATA.PROPERTY_TAB);
        expect(cardViewPage.getExpandedAspectName()).toEqual(CONSTANTS.METADATA.DEFAULT_ASPECT);
        expect(cardViewPage.getName()).toEqual(pdfFileModel.name);
        expect(cardViewPage.getCreator()).toEqual(pdfFileModel.getCreatedByUser().displayName);
        expect(cardViewPage.getCreatedDate()).toEqual(dateFormat(pdfFileModel.createdAt, CONSTANTS.METADATA.DATAFORMAT));
        expect(cardViewPage.getModifier()).toEqual(pdfFileModel.getCreatedByUser().displayName);
        expect(cardViewPage.getModifiedDate()).toEqual(dateFormat(pdfFileModel.createdAt, CONSTANTS.METADATA.DATAFORMAT));
        expect(cardViewPage.getMimetypeName()).toEqual(pdfFileModel.getContent().mimeTypeName);
        expect(cardViewPage.getSize()).toEqual(pdfFileModel.getContent().getSizeInBytes());
        expect(cardViewPage.getDescription()).toEqual(pdfFileModel.getProperties().getDescription());
        expect(cardViewPage.getAuthor()).toEqual(pdfFileModel.getProperties().getAuthor());
        expect(cardViewPage.getTitleProperty()).toEqual(pdfFileModel.getProperties().getTitle());
        cardViewPage.editIconIsDisplayed();
        cardViewPage.informationButtonIsDisplayed();
        expect(cardViewPage.getInformationButtonText()).toEqual(CONSTANTS.METADATA.MORE_INFO_BUTTON);
        expect(cardViewPage.getInformationIconText()).toEqual(CONSTANTS.METADATA.ARROW_DOWN);
    });

    it("Information button", function () {
        contentServicesPage.navigateToDocumentList();
        adfViewerPage.viewFile(pdfFileModel.name);
        cardViewPage = adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        cardViewPage.clickOnPropertiesTab();
        cardViewPage.informationButtonIsDisplayed();
        cardViewPage.clickOnInformationButton();
        expect(cardViewPage.getInformationButtonText()).toEqual(CONSTANTS.METADATA.LESS_INFO_BUTTON);
        expect(cardViewPage.getInformationIconText()).toEqual(CONSTANTS.METADATA.ARROW_UP);
    });

    it("Versions", function () {
        contentServicesPage.navigateToDocumentList();
        adfViewerPage.viewFile(pdfFileModel.name);
        cardViewPage = adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        cardViewPage.clickOnVersionsTab().checkUploadVersionsButtonIsDisplayed();
        expect(cardViewPage.getActiveTab()).toEqual(CONSTANTS.METADATA.VERSIONS_TAB);
        cardViewPage.checkVersionIsDisplayed(pdfFileModel.name);
    });

    it("Info icon", function () {
        contentServicesPage.navigateToDocumentList();
        adfViewerPage.viewFile(pdfFileModel.name);
        cardViewPage = adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        cardViewPage.clickOnVersionsTab().checkUploadVersionsButtonIsDisplayed();
        expect(cardViewPage.getActiveTab()).toEqual(CONSTANTS.METADATA.VERSIONS_TAB);
        cardViewPage.clickOnPropertiesTab().informationButtonIsDisplayed();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsNotDisplayed();
        adfViewerPage.clickInfoButton();
        adfViewerPage.checkInfoSideBarIsDisplayed();
        expect(cardViewPage.getActiveTab()).toEqual(CONSTANTS.METADATA.COMMENTS_TAB);
        cardViewPage.clickOnPropertiesTab();
        expect(cardViewPage.getActiveTab()).toEqual(CONSTANTS.METADATA.PROPERTY_TAB);
        expect(cardViewPage.getEditIconTooltip()).toEqual(CONSTANTS.METADATA.EDIT_BUTTON_TOOLTIP);
    });

});
