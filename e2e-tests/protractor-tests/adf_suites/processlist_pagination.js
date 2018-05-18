/**
 * Created by Cristina Jalba on 09/05/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var ProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var PaginationPage = require('../pages/adf/paginationPage.js');
var ProcessFiltersPage = require('../pages/adf/process_services/processFiltersPage.js');
var ProcessDetailsPage = require('../pages/adf/process_services/processDetailsPage.js');
var NavigationBarPage = require('../pages/adf/navigationBarPage.js');

var User = require('../restAPI/APS/models/User');

var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var CONSTANTS = require("../util/constants");
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var apps = require('../aps_suites/rest_api/reusableActions/apps');
var users = require('../aps_suites/rest_api/reusableActions/users');
var Util = require("../util/util.js");

describe("Test Process List - Pagination", function () {

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
    var processServicesPage = new ProcessServicesPage();
    var paginationPage = new PaginationPage();
    var processFiltersPage = new ProcessFiltersPage();
    var processDetailsPage = new ProcessDetailsPage();
    var navigationBarPage = new NavigationBarPage();

    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth;
    var processUserModel, secondUserModel;
    var app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    var nrOfProcesses = 20;
    var page, totalPages, processNameBase = 'process';
    var processNames = Util.generateSeqeunceFiles(10, nrOfProcesses + 9, processNameBase, '');

    beforeAll(function(done) {
        users.createTenantAndUser(basicAuthAdmin)
            .then(function(user) {
                users.createTenantAndUser(basicAuthAdmin)
                    .then(function(response) {
                        secondUserModel = response;
                    });
                processUserModel = user;
                basicAuth = new BasicAuthorization(user.email, user.password);
                apps.importPublishDeployApp(basicAuth, app.file_location)
                    .then(function(resultApp) {
                        var arr = [];
                        for(var i =0; i< nrOfProcesses; i++) {
                            arr.push(apps.startProcess(basicAuth, resultApp, processNames[i]));
                        }

                        Promise.all(arr).then( function () {
                            adfLoginPage.loginToProcessServicesUsingUserModel(secondUserModel);
                            done();
                        });
                    })
                    .catch(function (error) {
                        done.fail('Create test precondition failed: ' + error);
                    });
            });
    });

    it("[C261042] Default pagination", function () {
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processFiltersPage.checkNoContentMessage();
        paginationPage.checkPaginationIsNotDisplayed();
        navigationBarPage.clickLogoutButton();

        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        totalPages = 1; page = 1;
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.default);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + nrOfProcesses + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(nrOfProcesses);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });

    it("[C261043] Items per page set to 15", function () {
        page = 1; totalPages = 2;
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

        navigationBarPage.clickLogoutButton();
        page = 1;
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.fifteen);
    });

    it("[C261044] Items per page set to 10", function () {
        page = 1; totalPages = 2;
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();

        page ++;
        paginationPage.clickOnNextPage();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 11-' + nrOfProcesses + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsEnabled();

        navigationBarPage.clickLogoutButton();
        page = 1;
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
    });

    it("[C261047] Items per page set to 20", function () {
        page = 1; totalPages = 1;
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.twentyValue);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.twenty);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + nrOfProcesses + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(nrOfProcesses);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsDisabled();

        navigationBarPage.clickLogoutButton();
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.twenty);
    });

    it("[C261045] 5 Items per page", function () {
        page = 1; totalPages = 4;
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.fiveValue);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.five * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();

        page ++;
        paginationPage.clickOnNextPage();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 6-' + itemsPerPage.five * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsEnabled();

        page ++;
        paginationPage.clickOnNextPage();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 11-' + itemsPerPage.five * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsEnabled();

        page ++;
        paginationPage.clickOnNextPage();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 16-' + itemsPerPage.five * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.fiveValue);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsEnabled();

        navigationBarPage.clickLogoutButton();
        page = 1;
        adfLoginPage.loginToProcessServicesUsingUserModel(processUserModel);
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.five);
    });

    it("[C261049] Page number dropdown", function () {
        page = 1; totalPages = 2;
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();

        paginationPage.clickOnPageDropdown();
        expect(paginationPage.getPageDropdownOptions()).toEqual(['1', '2']);
        page = 2;
        paginationPage.clickOnPageDropdownOption(page);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 11-' + itemsPerPage.tenValue * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsDisabled();
        paginationPage.checkPreviousPageButtonIsEnabled();

        paginationPage.clickOnPageDropdown();
        expect(paginationPage.getPageDropdownOptions()).toEqual(['1', '2']);
        page = 1;
        paginationPage.clickOnPageDropdownOption(page);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        expect(paginationPage.getCurrentPage()).toEqual('Page ' + page);
        expect(paginationPage.getTotalPages()).toEqual('of ' + totalPages);
        expect(paginationPage.getCurrentItemsPerPage()).toEqual(itemsPerPage.ten);
        expect(paginationPage.getPaginationRange()).toEqual('Showing 1-' + itemsPerPage.tenValue * page + ' of ' + nrOfProcesses);
        expect(processFiltersPage.numberOfProcessRows()).toBe(itemsPerPage.tenValue);
        paginationPage.checkNextPageButtonIsEnabled();
        paginationPage.checkPreviousPageButtonIsDisabled();
    });

    it("[C261048] Sorting by Name", function () {
        processServicesPage.goToProcessServices().goToTaskApp().clickProcessButton();
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        paginationPage.selectItemsPerPage(itemsPerPage.twentyValue);
        processDetailsPage.checkProcessTitleIsDisplayed();
        processFiltersPage.waitForTableBody();
        processFiltersPage.sortByName(true);
        processFiltersPage.waitForTableBody();
        processFiltersPage.getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(processNames)).toEqual(true);
        });
        processFiltersPage.sortByName(false);
        processFiltersPage.getAllRowsNameColumn().then(function (list) {
            processNames.reverse();
            expect(JSON.stringify(list) == JSON.stringify(processNames)).toEqual(true);
        });

        paginationPage.selectItemsPerPage(itemsPerPage.fiveValue);
        processFiltersPage.waitForTableBody();
        processFiltersPage.getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(processNames.slice(15, 20))).toEqual(true);
        });

        paginationPage.clickOnNextPage();
        processFiltersPage.waitForTableBody();
        processFiltersPage.getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(processNames.slice(10, 15))).toEqual(true);
        });

        paginationPage.selectItemsPerPage(itemsPerPage.tenValue);
        processFiltersPage.waitForTableBody();
        processFiltersPage.getAllRowsNameColumn().then(function (list) {
            expect(JSON.stringify(list) == JSON.stringify(fileNames.slice(10, 20))).toEqual(true);
        });
    });
});






