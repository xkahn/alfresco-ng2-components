/**
 * Created by jdosti on 09/05/2018.
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

describe("Task List Pagination", function () {

    var adfLoginPage = new AdfLoginPage();
    var processServicesPage = new ProcessServicesPage();
    var taskPage = new TasksPage();
    var paginationPage = new PaginationPage();
    var navigationBarPage = new NavigationBarPage();

    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth, processUserModel, processUserModel1;
    var app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    var currentPage = 1, nrOfTasks = 20, appDetails, totalPages;

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


    beforeAll(function(done) {
        users.createTenantAndUser(basicAuthAdmin)
            .then(function(user) {
                users.createTenantAndUser(basicAuthAdmin)
                    .then(function(response) {
                        processUserModel1 = response;
                    });
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
                            done();
                        });
                    })
                    .catch(function (error) {
                        done.fail('Create test precondition failed: ' + error);
                    });
            });
    });

    it("Pagination at first 20 started tasks", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.default);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + nrOfTasks + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(nrOfTasks);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
        paginationPage.selectItemsPerPage(itemsPerPage.twentyValue);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.twenty);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + nrOfTasks + ' of ' + nrOfTasks);
        navigationBarPage.clickLogoutButton();
    });

    it("Items per page set to 5", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        paginationPage.selectItemsPerPage(itemsPerPage.fiveValue);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.fiveValue + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.clickOnNextPage();
        currentPage ++;
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 6-' + itemsPerPage.fiveValue * currentPage + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.clickOnNextPage();
        currentPage ++;
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 11-' + itemsPerPage.fiveValue * currentPage + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.clickOnNextPage();
        currentPage ++;
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 16-' + itemsPerPage.fiveValue * currentPage + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fiveValue);
        navigationBarPage.clickLogoutButton();
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        navigationBarPage.clickLogoutButton();
    });
    
    it("Items per page set to 10", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.tenValue);
        paginationPage.clickOnNextPage();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 11-' + itemsPerPage.twentyValue + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.tenValue);
        navigationBarPage.clickLogoutButton();
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        navigationBarPage.clickLogoutButton();
    });

    it("Items per page set to 15", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        paginationPage.selectItemsPerPage(itemsPerPage.fifteenValue);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.fifteenValue + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fifteenValue);
        paginationPage.clickOnNextPage();
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 16-' + itemsPerPage.twentyValue  + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.fiveValue);
        navigationBarPage.clickLogoutButton();
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
    });
    
    it("[C261006] Page number dropdown", function () {
        currentPage = 1; totalPages = 2;
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        taskPage.usingTasksListPage().waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        taskPage.usingTasksListPage().waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + currentPage);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue * currentPage + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();

        paginationPage.clickOnPageDropdown();
        expect(paginationPage.getPageDropdownOptions()).toEqual(['1', '2']);
        currentPage = 2;
        paginationPage.clickOnPageDropdownOption(currentPage);
        taskPage.usingTasksListPage().waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + currentPage);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 11-' + itemsPerPage.tenValue * currentPage + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsEnabled();

        paginationPage.clickOnPageDropdown();
        expect(paginationPage.getPageDropdownOptions()).toEqual(['1', '2']);
        currentPage = 1;
        paginationPage.clickOnPageDropdownOption(currentPage);
        taskPage.usingTasksListPage().waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + currentPage);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue * currentPage + ' of ' + nrOfTasks);
        expect(taskPage.getAllDisplayedRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });

    it("Pagination in an empty task list", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel1);
        processServicesPage.goToProcessServices().goToTaskApp();
        paginationPage.checkPaginationIsNotDisplayed();
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
