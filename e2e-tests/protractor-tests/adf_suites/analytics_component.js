/**
 * Created by jdosti on 14/03/2018.
 */

var Util = require('../util/util.js');
var AdfLoginPage = require('../pages/adf/loginPage.js');
var AdfNavigationBarPage = require('../pages/adf/navigationBarPage.js');
var AdfAnalyticsPage = require('../pages/adf/process_services/analyticsPage');
var AdfProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var AdfAppNavigationBarPage = require('../pages/adf/process_services/appNavigationBarPage.js');
var CONSTANTS = require("../util/constants");
var TestConfig = require('../test.config.js');
var TenantsAPI = require('../restAPI/APS/enterprise/TenantsAPI');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var UserAPI = require('../restAPI/APS/enterprise/UsersAPI');
var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');
//Models
var Tenant = require('../restAPI/APS/models/Tenant');
var User = require('../restAPI/APS/models/User');



describe("Create smoke test for analytics", function () {

    baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);
    var adfLoginPage = new AdfLoginPage();
    var adfNavigationBarPage = new AdfNavigationBarPage();
    var adfAppNavigationBarPage = new AdfAppNavigationBarPage();
    var adfAnalyticsPage = new AdfAnalyticsPage();
    var adfProcessServicesPage = new AdfProcessServicesPage();
    var tenantsAPI = new TenantsAPI();
    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var tenantId, procUserModel;
    var reportTitle = "New Title";



    beforeAll(function (done) {
        protractor.promise.all([
            tenantsAPI.createTenant(basicAuthAdmin, new Tenant())
                .then(function (result) {
                    tenantId = JSON.parse(result.responseBody).id;
                    procUserModel = new User({tenantId: tenantId});
                    return new UserAPI().createUser(basicAuthAdmin, procUserModel)
                })
            ])
            .then(function () {
                adfLoginPage.loginToProcessServicesUsingUserModel(procUserModel);
            })
            .then(function () {
                done();
            });
    });

    it("Change name from Process Definition Heat Map", function () {
        adfNavigationBarPage.clickProcessServicesButton();
        adfProcessServicesPage.checkApsContainer();
        adfProcessServicesPage.goToApp('Task App');
        adfAppNavigationBarPage.clickReportsButton();
        adfAnalyticsPage.checkNoReportMessage();
        adfAnalyticsPage.getReport('Process definition heat map');
        adfAnalyticsPage.changeReportTitle(reportTitle);
        expect(adfAnalyticsPage.getReportTitle()).toEqual(reportTitle);
    });

    afterAll(function (done) {
        tenantsAPI.deleteTenant(basicAuthAdmin, tenantId.toString())
            .then(function () {
                done();
            });
    });

});