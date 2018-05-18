/**
 * Created by Cristina Jalba on 20/02/2018.
 */

var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var NodesAPI = require('../restAPI/ACM/NodesAPI.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FileModel = require("../ACSmodels/fileModel.js");

var AdfLoginPage = require('../pages/adf/loginPage.js');
var TagPage = require('../pages/adf/tagPage.js');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Util = require("../util/util.js");

describe("Tag component", function () {

    var adfLoginPage = new AdfLoginPage();
    var tagPage = new TagPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf_acs.adminUser, "password" : TestConfig.adf_acs.adminPassword});
    var pdfFileModel = new FileModel({"name" : resources.Files.ADF_DOCUMENTS.PDF.file_name});
    var sameTag = Util.generateRandomStringToLowerCase();
    var tagList = [Util.generateRandomStringToLowerCase(), Util.generateRandomStringToLowerCase()];
    var uppercaseTag = Util.generateRandomStringToUpperCase();
    var digitsTag = Util.generateRandomStringDigits();
    var nonLatinTag = Util.generateRandomStringNonLatin();

    beforeAll(function (done)
    {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(NodesAPI.uploadFileViaAPI(acsUser, pdfFileModel, "-my-", false))
            .then(adfLoginPage.loginUsingUserModel(acsUser))
            .then(done());
    });

    it("Tag node ID", function () {
        tagPage.goToTagPage();
        expect(tagPage.getNodeId()).toEqual("");
        expect(tagPage.getNewTagPlaceholder()).toEqual("New Tag");
        expect(tagPage.addTagButtonIsEnabled()).toEqual(false);
        tagPage.checkTagListIsEmpty();
        tagPage.checkTagListByNodeIdIsEmpty();
        expect(tagPage.addNewTagInput("a").addTagButtonIsEnabled()).toEqual(false);
        expect(tagPage.getNewTagInput()).toEqual("a");
    });

    it("New tag for specific Node ID", function () {
        tagPage.goToTagPage();
        tagPage.insertNodeId(pdfFileModel.id);
        tagPage.addTag(tagList[0]);
        tagPage.checkTagIsDisplayedInTagList(tagList[0]);
        tagPage.checkTagIsDisplayedInTagListByNodeId(tagList[0]);
        tagPage.checkTagIsDisplayedInTagListContentServices(tagList[0]);
    });

    it("Tag name already exists", function () {
        tagPage.goToTagPage();
        tagPage.insertNodeId(pdfFileModel.id);
        tagPage.addTag(sameTag);
        tagPage.checkTagIsDisplayedInTagList(sameTag);
        tagPage.addTag(sameTag);
        expect(tagPage.getErrorMessage()).toEqual("Tag already exists");
    });

    it("Multiple tags", function () {
        tagPage.goToTagPage();
        tagPage.insertNodeId(pdfFileModel.id);
        tagPage.checkTagListIsOrderedAscending();
        tagPage.checkTagListByNodeIdIsOrderedAscending();
        tagPage.checkTagListContentServicesIsOrderedAscending();
    });

    it("Tag text field", function () {
        tagPage.goToTagPage();
        tagPage.insertNodeId(pdfFileModel.id);
        tagPage.addTag(uppercaseTag);
        tagPage.checkTagIsDisplayedInTagList(uppercaseTag.toLowerCase());
        tagPage.checkTagIsDisplayedInTagListByNodeId(uppercaseTag.toLowerCase());
        tagPage.checkTagIsDisplayedInTagListContentServices(uppercaseTag.toLowerCase());
        tagPage.checkTagIsNotDisplayedInTagList(uppercaseTag);
        tagPage.addTag(digitsTag);
        tagPage.checkTagIsDisplayedInTagList(digitsTag);
        tagPage.checkTagIsDisplayedInTagListByNodeId(digitsTag);
        tagPage.checkTagIsDisplayedInTagListContentServices(digitsTag);
        tagPage.addTag(nonLatinTag);
        tagPage.checkTagIsDisplayedInTagList(nonLatinTag);
        tagPage.checkTagIsDisplayedInTagListByNodeId(nonLatinTag);
        tagPage.checkTagIsDisplayedInTagListContentServices(nonLatinTag);
    });
});



