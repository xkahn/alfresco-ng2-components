/**
 * Created by jdosti on 15/05/2018.
 */


var AdfLoginPage = require('../pages/adf/loginPage.js');
var ProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var TasksPage = require('../pages/adf/process_services/tasksPage.js');
var PaginationPage = require('../pages/adf/paginationPage.js');
var NavigationBarPage = require('../pages/adf/navigationBarPage.js');

var apps = require('../aps_suites/rest_api/reusableActions/apps');
var CONSTANTS = require("../util/constants");
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var users = require('../aps_suites/rest_api/reusableActions/users');



var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");

describe("Items per page set to 15 and adding of tasks", function () {

    var adfLoginPage = new AdfLoginPage();
    var processServicesPage = new ProcessServicesPage();
    var taskPage = new TasksPage();
    var paginationPage = new PaginationPage();
    var navigationBarPage = new NavigationBarPage();

    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth, processUserModel;
    var app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    var currentPage = 1, nrOfTasks = 25, appDetails, totalPages = 2;

    var itemsPerPage = {
        fifteen: "15",
        fifteenValue: 15
    };


    beforeAll(function(done) {
        users.createTenantAndUser(basicAuthAdmin)
            .then(function(user) {
                processUserModel = user;
                basicAuth = new BasicAuthorization(user.email, user.password);
                apps.importPublishDeployApp(basicAuth, app.file_location)
                    .then(function(resultApp) {
                        appDetails = resultApp;
                        var arr = [];
                        for(var i =0; i< nrOfTasks; i++) {
                            arr.push(apps.startProcess(basicAuth, resultApp));
                        }

                        Promise.all(arr).then( function () {
                            adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
                            done();
                        });
                    })
                    .catch(function (error) {
                        done.fail('Create test precondition failed: ' + error);
                    });
            });
    });

    it("Items per page set to 15 and adding of tasks", function () {
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        paginationPage.selectItemsPerPage(itemsPerPage.fifteenValue);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + currentPage);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.fifteenValue + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fifteenValue);
        currentPage ++;
        paginationPage.clickOnNextPage();

        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + currentPage);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 16-' + nrOfTasks + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(nrOfTasks - itemsPerPage.fifteenValue);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsEnabled();
    });

    afterAll(function (done) {
        apps.cleanupApp(basicAuth, appDetails)
            .then(function () {
                return users.cleanupTenant(basicAuthAdmin, processUserModel.tenantId)
            })
            .then(function () {
                done();
            })
    });

});
