/**
 * Created by jdosti on 05/04/2018.
 */

var TestConfig = require('../test.config.js');
var CONSTANTS = require("../util/constants");
var resources = require("../util/resources.js");
var AdfLoginPage = require('../pages/adf/loginPage.js');
var AdfNavigationBarPage = require('../pages/adf/navigationBarPage.js');
var AdfProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var AdfStartProcessPage = require('../pages/adf/process_services/startProcessPage.js');
var AdfProcessFiltersPage = require('../pages/adf/process_services/processFiltersPage.js');
var AdfAppNavigationBarPage = require('../pages/adf/process_services/appNavigationBarPage.js');
var AdfProcessDetailsPage = require('../pages/adf/process_services/processDetailsPage.js');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
//REST API
var UserAPI = require('../restAPI/APS/enterprise/UsersAPI');
var RuntimeAppDeploymentAPI = require('../restAPI/APS/enterprise/RuntimeAppDeploymentAPI');
var RuntimeAppDefinitionAPI = require('../restAPI/APS/enterprise/RuntimeAppDefinitionAPI');
var ModelsAPI = require('../restAPI/APS/enterprise/ModelsAPI');
var AppDefinitionsAPI = require('../restAPI/APS/enterprise/AppDefinitionsAPI');
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
var TenantsAPI = require('../restAPI/APS/enterprise/TenantsAPI');
//Models
var User = require('../restAPI/APS/models/User');
var AppPublish = require('../restAPI/APS/models/AppPublish');
var AppDefinition = require('../restAPI/APS/models/AppDefinition');
var ProcessModel = require('../restAPI/APS/responseModel/ProcessModel.js');
var Tenant = require('../restAPI/APS/models/Tenant');

describe('Process Filters Test', function () {

    var adfLoginPage = new AdfLoginPage();
    var adfNavigationBarPage = new AdfNavigationBarPage();
    var adfProcessServicesPage = new AdfProcessServicesPage();
    var adfStartProcessPage = new AdfStartProcessPage();
    var adfProcessFiltersPage = new AdfProcessFiltersPage();
    var adfAppNavigationBarPage = new AdfAppNavigationBarPage();
    var adfProcessDetailsPage = new AdfProcessDetailsPage();
    baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);
    var app = resources.Files.APP_WITH_DATE_FIELD_FORM;
    var appId, modelId, response, procUserModel, basicAuth, tenantId;
    // REST API
    var appUtils = new AppDefinitionsAPI();
    var runtimeAppDefAPI = new RuntimeAppDefinitionAPI();
    var modelUtils = new ModelsAPI();
    var tenantsAPI = new TenantsAPI();
    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var processTitle = {
        running: "Test_running",
        completed: "Test_completed"
    };
    var processFilter = {
        running: "Running",
        all: "All",
        completed: "Completed"
    };


    beforeAll(function (done) {
        tenantsAPI.createTenant(basicAuthAdmin, new Tenant())
            .then(function (result) {
                tenantId = JSON.parse(result.responseBody).id;
                procUserModel = new User({ tenantId: tenantId });
                return new UserAPI().createUser(basicAuthAdmin, procUserModel);
            })
            .then(function (result) {
                basicAuth = new BasicAuthorization(procUserModel.email, procUserModel.password);
                return appUtils.importApp(basicAuth, app.file_location)
            })
            .then(function (result) {
                logger.info("Import app result: ", result);
                response = JSON.parse(result.responseBody);
                appId = response.id;
                modelId = response.definition.models[0].id;
                expect(result['statusCode']).toEqual(CONSTANTS.HTTP_RESPONSE_STATUS_CODE.OK);

                return appUtils.getAppDefinition(basicAuth, appId.toString());
            })
            .then(function (result) {
                logger.info("Get app definition result: ", result);
                expect(result.statusCode).toEqual(CONSTANTS.HTTP_RESPONSE_STATUS_CODE.OK);
                expect(JSON.parse(result.responseBody).id).toEqual(appId);

                return appUtils.publishApp(basicAuth, appId.toString(), new AppPublish());
            })
            .then(function (result) {
                logger.info("Publish app result: ", result);
                expect(result.statusCode).toEqual(CONSTANTS.HTTP_RESPONSE_STATUS_CODE.OK);
                response = JSON.parse(result.responseBody).appDefinition;
                expect(response.id).toEqual(appId);
                expect(response.name).toEqual(app.title);

                return runtimeAppDefAPI.deployApp(basicAuth, new AppDefinition({id: appId.toString()}));
            })
            .then(function (result) {
                logger.info("Deploy app result: ", result.statusCode + ' ' + result.statusMessage);
                expect(result.statusCode).toEqual(CONSTANTS.HTTP_RESPONSE_STATUS_CODE.OK);
            })
            .then(function () {
                adfLoginPage.loginToProcessServicesUsingUserModel(procUserModel);
                done();
            });
    });

    it("Navigate to 'Running' filter", function () {
        adfNavigationBarPage.clickProcessServicesButton();
        adfProcessServicesPage.checkApsContainer();
        adfProcessServicesPage.goToApp(app.title);
        adfAppNavigationBarPage.clickProcessButton();
        adfProcessFiltersPage.clickCreateProcessButton();
        adfProcessFiltersPage.clickNewProcessDropdown();
        adfStartProcessPage.enterProcessName(processTitle.completed);
        adfStartProcessPage.selectFromProcessDropdown(app.process_title);
        adfStartProcessPage.clickFormStartProcessButton();
        adfProcessDetailsPage.clickCancelProcessButton();
        adfNavigationBarPage.clickProcessServicesButton();
        adfProcessServicesPage.goToApp(app.title);
        adfAppNavigationBarPage.clickProcessButton();
        adfProcessFiltersPage.clickCreateProcessButton();
        adfProcessFiltersPage.clickNewProcessDropdown();
        adfStartProcessPage.enterProcessName(processTitle.running);
        adfStartProcessPage.selectFromProcessDropdown(app.process_title);
        adfStartProcessPage.clickFormStartProcessButton();
        adfProcessFiltersPage.checkFilterIsHighlighted(processFilter.running);
        adfProcessFiltersPage.selectFromProcessList(processTitle.running);
        adfProcessDetailsPage.checkProcessDetailsCard();
    });

    it("Navigate to 'All' filter", function () {
        adfProcessFiltersPage.clickAllFilterButton();
        adfProcessFiltersPage.checkFilterIsHighlighted(processFilter.all);
        adfProcessFiltersPage.selectFromProcessList(processTitle.running);
        adfProcessFiltersPage.selectFromProcessList(processTitle.completed);
        adfProcessDetailsPage.checkProcessDetailsCard();
    });

    it("Navigate to 'Completed' filter", function () {
        adfProcessFiltersPage.clickCompletedFilterButton();
        adfProcessFiltersPage.checkFilterIsHighlighted(processFilter.completed);
        adfProcessFiltersPage.selectFromProcessList(processTitle.completed);
        adfProcessDetailsPage.checkProcessDetailsCard();
    });

    afterAll( function (done) {
        modelUtils.deleteModel(basicAuth, appId)
            .then(function (result) {
                logger.info("Delete app result: ", result.statusCode + ' ' + result.statusMessage);
                expect(result.statusCode).toEqual(CONSTANTS.HTTP_RESPONSE_STATUS_CODE.OK);

                return modelUtils.deleteModel(basicAuth, modelId);
            })
            .then(function (result) {
                logger.info("Delete process result: ", result.statusCode + ' ' + result.statusMessage);
                expect(result.statusCode).toEqual(CONSTANTS.HTTP_RESPONSE_STATUS_CODE.OK);
            })
            .then(function () {
                tenantsAPI.deleteTenant(basicAuthAdmin, tenantId.toString());
            })
            .then(function (result) {
                done();
            });
    });
});