/**
 * Created by jdosti on 19/03/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ContentServicesPage = require('../pages/adf/contentServicesPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FolderModel = require("../ACSmodels/folderModel.js");

var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var QueriesAPI = require('../restAPI/ACM/QueriesAPI.js');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Util = require("../util/util.js");

describe("Enable infinite scrolling", function () {

    var adfLoginPage = new AdfLoginPage();
    var contentServicesPage = new ContentServicesPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var folderModel = new FolderModel({"name" : "folderOne"});

    var retryNumber = 30;
    var fileNames = [], nrOfFiles = 30;
    var fileNum = 0;

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

    it("Enable infinite scrolling", function () {
        contentServicesPage.navigateToFolder(folderModel.name);
        contentServicesPage.enableInfiniteScrolling();
        contentServicesPage.clickLoadMoreButton();
        for (fileNum; fileNum < nrOfFiles; fileNum++) {
            contentServicesPage.checkContentIsDisplayed(fileNames[fileNum]);
        };
    });


});