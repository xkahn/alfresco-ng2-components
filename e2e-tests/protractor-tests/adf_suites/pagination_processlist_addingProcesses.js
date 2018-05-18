/**
 * Created by Cristina Jalba on 14/05/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var PaginationPage = require('../pages/adf/paginationPage.js');
var ProcessFiltersPage = require('../pages/adf/process_services/processFiltersPage.js');
var ProcessDetailsPage = require('../pages/adf/process_services/processDetailsPage.js');
var NavigationBarPage = require('../pages/adf/navigationBarPage.js');

var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var CONSTANTS = require("../util/constants");
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var apps = require('../aps_suites/rest_api/reusableActions/apps');
var users = require('../aps_suites/rest_api/reusableActions/users');

describe("Test Process List - Pagination when adding processes", function () {

    var itemsPerPage = {
        fifteen: "15",
        fifteenValue: 15
    };

    var adfLoginPage = new AdfLoginPage();
    var processServicesPage = new ProcessServicesPage();
    var paginationPage = new PaginationPage();
    var processFiltersPage = new ProcessFiltersPage();
    var processDetailsPage = new ProcessDetailsPage();

    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth;
    var processUserModel;
    var app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    var nrOfProcesses = 25;
    var page, totalPages, appDetails;

    beforeAll(function(done) {
        users.createTenantAndUser(basicAuthAdmin)
            .then(function(user) {
                processUserModel = user;
                basicAuth = new BasicAuthorization(user.email, user.password);
                apps.importPublishDeployApp(basicAuth, app.file_location)
                    .then(function(resultApp) {
                        appDetails = resultApp;
                        var arr = [];
                        for(var i =0; i< nrOfProcesses; i++) {
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

    it("[C261046] Items per page set to 15 and adding of processes", function () {
        totalPages = 2; page = 1;
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.fifteenValue);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.fifteenValue * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.fifteenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();

        page ++;
        paginationPage.clickOnNextPage();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 16-' + nrOfProcesses + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(nrOfProcesses - itemsPerPage.fifteenValue);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsEnabled();
    });

    afterAll(function(done) {
        apps.cleanupApp(basicAuth, appDetails)
            .then(function() {
                return users.cleanupTenant(basicAuthAdmin, processUserModel.tenantId)
            })
            .then(function() {
                done();
            })
    });
});






