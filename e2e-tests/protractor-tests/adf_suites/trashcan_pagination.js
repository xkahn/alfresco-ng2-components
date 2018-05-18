/**
 * Created by Cristina Jalba on 25/04/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var TrashcanPage = require('../pages/adf/trashcanPage.js');
var PaginationPage = require('../pages/adf/paginationPage.js');
var NavigationBarPage = require('../pages/adf/navigationBarPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FolderModel = require("../ACSmodels/folderModel.js");
var FilesModel = require("../ACSmodels/filesModel.js");

var NodesAPI = require('../restAPI/ACM/NodesAPI.js');
var QueriesAPI = require('../restAPI/ACM/QueriesAPI.js');
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');

var TestConfig = require("../test.config.js");
var Util = require("../util/util.js");
var retryNumber = 100;

describe("Trashcan - Pagination", function () {
    var pagination = {
        base: "newFile",
        extension: ".txt",
    };

    var itemsPerPage = {
        five: "5",
        fiveValue: 5,
        ten: "10",
        tenValue: 10,
        fifteen: "15",
        fifteenValue: 15,
        twenty: "20",
        twentyValue: 20,
        default: "25",
    };

    var adfLoginPage = new AdfLoginPage();
    var trashcanPage = new TrashcanPage();
    var paginationPage = new PaginationPage();
    var navigationBarPage = new NavigationBarPage();

    var acsUser = new AcsUserModel();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf.mainAdminEmail, "password" : TestConfig.adf.mainAdminPassword});
    var newFolderModel = new FolderModel({"name" : "newFolder"});
    var fileNames = [], nrOfFiles = 20, currentPage = 1;
    var filesModel = new FilesModel();

    beforeAll(function (done)
    {
        fileNames = Util.generateSeqeunceFiles(10, nrOfFiles + 9, pagination.base, pagination.extension);

        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(function () {
                return adfLoginPage.loginUsingUserModel(acsUser);
            })
            .then(function() {
                return NodesAPI.uploadFolderViaAPI(acsUser, newFolderModel, "-my-");
            })
            .then(function() {
                return NodesAPI.createEmptyFilesViaAPI(acsUser, fileNames, newFolderModel.id);
            })
            .then(function(body) {
                filesModel.setFiles(body.list.entries);
                return new Promise(function (res, rej) {
                    QueriesAPI.getNodes(retryNumber, acsUser, "term=newFile*&rootNodeId=-root-", nrOfFiles, function() {
                        res();
                    });
                });
            })
            .then(function() {
                function a(item) {
                    return new Promise(function (res, rej) {
                        NodesAPI.deleteContent( acsUser, item.id, function () {
                            res();
                        });
                    });
                };

                return filesModel.getFiles().reduce((acc, item) => {
                    return acc.then(() => a(item));
                }, Promise.resolve());

            })
            .then(function () {
                done();
            })
    });

    it("[C272811] 20 Items per page", function () {
        navigationBarPage.clickTrashcanButton();
        trashcanPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.twentyValue);
        trashcanPage.waitForTableBody();
        trashcanPage.waitForPagination();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.twenty);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + nrOfFiles + ' of ' + nrOfFiles);
        expect(trashcanPage.numberOfResultsDisplayed()).toBe(nrOfFiles);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });

    it("[C276742] 15 Items per page", function () {
        navigationBarPage.clickTrashcanButton();
        trashcanPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.fifteenValue);
        trashcanPage.waitForTableBody();
        trashcanPage.waitForPagination();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.fifteenValue + ' of ' + nrOfFiles);
        expect(trashcanPage.numberOfResultsDisplayed()).toBe(itemsPerPage.fifteenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });

    it("[C276743] 10 Items per page", function () {
        navigationBarPage.clickTrashcanButton();
        trashcanPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        trashcanPage.waitForTableBody();
        trashcanPage.waitForPagination();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue + ' of ' + nrOfFiles);
        expect(trashcanPage.numberOfResultsDisplayed()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });

    it("[C276744] 5 Items per page", function () {
        navigationBarPage.clickTrashcanButton();
        trashcanPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.fiveValue);
        trashcanPage.waitForTableBody();
        trashcanPage.waitForPagination();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.fiveValue + ' of ' + nrOfFiles);
        expect(trashcanPage.numberOfResultsDisplayed()).toBe(itemsPerPage.fiveValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });
});






