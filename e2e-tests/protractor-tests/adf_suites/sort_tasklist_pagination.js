/**
 * Created by Cristina Jalba on 15/05/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var TasksPage = require('../pages/adf/process_services/tasksPage.js');
var PaginationPage = require('../pages/adf/paginationPage.js');

var apps = require('../aps_suites/rest_api/reusableActions/apps');
var CONSTANTS = require("../util/constants");
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var users = require('../aps_suites/rest_api/reusableActions/users');
var taskAPI = require('../restAPI/APS/enterprise/TaskAPI');
var StandaloneTask = require('../restAPI/APS/models/StandaloneTask');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var Util = require("../util/util.js");

describe("Task List Pagination - Sorting", function () {

    var adfLoginPage = new AdfLoginPage();
    var processServicesPage = new ProcessServicesPage();
    var taskPage = new TasksPage();
    var paginationPage = new PaginationPage();

    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth, processUserModel;
    var app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    var nrOfTasks = 20, appDetails;
    var taskNameBase = 'Task';
    var taskNames = Util.generateSeqeunceFiles(10, nrOfTasks + 9, taskNameBase, '');

    var itemsPerPage = {
        five: "5",
        fiveValue: 5,
        ten: "10",
        tenValue: 10
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
                            arr.push(taskAPI.createStandaloneTask(basicAuth, new StandaloneTask({ name: taskNames[i]})));
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

    it("[C260308] Sorting by Name", function () {
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp();
        taskPage.usingFiltersPage().goToFilter(CONSTANTS.TASKFILTERS.INV_TASKS);
        taskPage.usingTasksListPage().waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.twentyValue);
        taskPage.usingTasksListPage().waitForTableBody();
        taskPage.usingFiltersPage().sortByName(true);
        taskPage.usingTasksListPage().waitForTableBody();
        taskPage.usingFiltersPage().getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(taskNames)).toEqual(true);
        });
        taskPage.usingFiltersPage().sortByName(false);
        taskPage.usingFiltersPage().getAllRowsNameColumn().then(function (list) {
            taskNames.reverse();
            expect(JSON.stringify(list) == JSON.stringify(taskNames)).toEqual(true);
        });

        paginationPage.selectItemsPerPage(itemsPerPage.fiveValue);
        taskPage.usingTasksListPage().waitForTableBody();
        taskPage.usingFiltersPage().getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(taskNames.slice(15, 20))).toEqual(true);
        });

        paginationPage.clickOnNextPage();
        taskPage.usingTasksListPage().waitForTableBody();
        taskPage.usingFiltersPage().getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(taskNames.slice(10, 15))).toEqual(true);
        });

        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        taskPage.usingTasksListPage().waitForTableBody();
        taskPage.usingFiltersPage().getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(taskNames.slice(10, 20))).toEqual(true);
        });
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


