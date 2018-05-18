
/*
 * Created by Cristina Jalba on 21/12/2017.
 */
var AdfLoginPage = require('../pages/adf/loginPage.js');
var UserInfoDialog = require('../pages/adf/dialog/userInfoDialog.js');
var NavigationBarPage = require('../pages/adf/navigationBarPage.js');

var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var FileModel = require("../ACSmodels/fileModel.js");
var Tenant = require('../restAPI/APS/models/Tenant');
var User = require('../restAPI/APS/models/User');

var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var UserProfileAPI = require('../restAPI/APS/enterprise/UserProfileAPI.js');
var UserAPI = require('../restAPI/APS/enterprise/UsersAPI');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');

var TestConfig = require("../test.config.js");
var resources = require("../util/resources.js");
var CONSTANTS = require("../util/constants");

var RequestEnterpriseBase = require('../restAPI/APS/enterprise/RequestEnterpriseBase');

describe("Test User Info component", function () {

    var adfLoginPage = new AdfLoginPage();
    var navigationBarPage = new NavigationBarPage();
    var userInfoDialog = new UserInfoDialog();
    var adminACSUserModel = new AcsUserModel({"id" : TestConfig.adf_acs.adminUser, "password" : TestConfig.adf_acs.adminPassword});
    var acsAvatarFileModel = new FileModel({"name" : resources.Files.PROFILE_IMAGES.ECM.file_name, "location" : resources.Files.PROFILE_IMAGES.ECM.file_location});
    var apsAvatarFileModel = new FileModel({"name" : resources.Files.PROFILE_IMAGES.BPM.file_name, "location" : resources.Files.PROFILE_IMAGES.BPM.file_location});
    var basicAuthAdmin = new BasicAuthorization(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    var basicAuth, contentUserModel, processUserModel, retry = 20;
    baseUrl = new RequestEnterpriseBase().getBaseURL(CONSTANTS.APPLICATION.ADF_APS);
    var TenantsAPI = require('../restAPI/APS/enterprise/TenantsAPI');
    var Tenant = require('../restAPI/APS/models/Tenant');

    beforeAll(function (done)
    {
        new TenantsAPI().createTenant(basicAuthAdmin, new Tenant())
            .then(function (result) {
                return new UserAPI().createUser(basicAuthAdmin, processUserModel = new User({ tenantId: JSON.parse(result.responseBody).id }));
            })
        .then(function () {
            contentUserModel = new AcsUserModel({"id" : processUserModel.email, "password" : processUserModel.password,
                "firstName" : processUserModel.firstName, "lastName" : processUserModel.lastName, "email" : processUserModel.email});
            basicAuth = new BasicAuthorization(processUserModel.email, processUserModel.password);
            return PeopleAPI.createUserViaAPI(adminACSUserModel, contentUserModel);
        })
        .then(function() {
            done();
        })
    });


    it("1. Enable Process Services and Content Services ", function () {
        adfLoginPage.goToLoginPage();
        adfLoginPage.enableAPS();
        adfLoginPage.enableACS();
        adfLoginPage.login(contentUserModel.id, contentUserModel.password);
        navigationBarPage.clickUserProfile();
        userInfoDialog.dialogIsDisplayed().contentServicesTabIsDisplayed().processServicesTabIsDisplayed();
        expect(userInfoDialog.getContentHeaderTitle()).toEqual(contentUserModel.firstName + " " + contentUserModel.lastName);
        expect(userInfoDialog.getContentTitle()).toEqual(contentUserModel.firstName + " " + contentUserModel.lastName);
        expect(userInfoDialog.getContentEmail()).toEqual(contentUserModel.email);
        expect(userInfoDialog.getContentJobTitle()).toEqual(contentUserModel.jobTitle);
        userInfoDialog.checkInitialImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.clickOnContentServicesTab();
        expect(userInfoDialog.getContentHeaderTitle()).toEqual(contentUserModel.firstName + " " + contentUserModel.lastName);
        expect(userInfoDialog.getContentTitle()).toEqual(contentUserModel.firstName + " " + contentUserModel.lastName);
        expect(userInfoDialog.getContentEmail()).toEqual(contentUserModel.email);
        expect(userInfoDialog.getContentJobTitle()).toEqual(contentUserModel.jobTitle);
        userInfoDialog.checkInitialImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.clickOnProcessServicesTab().processServicesTabIsDisplayed();
        expect(userInfoDialog.getProcessHeaderTitle()).toEqual(processUserModel.firstName + " " + processUserModel.lastName);
        expect(userInfoDialog.getProcessTitle()).toEqual(processUserModel.firstName + " " + processUserModel.lastName);
        expect(userInfoDialog.getProcessEmail()).toEqual(processUserModel.email);
        userInfoDialog.checkInitialImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.closeUserProfile();
    });

    it("2. Enable Content Services and disable Process Services ", function () {
        navigationBarPage.clickLoginButton();
        adfLoginPage.disableAPS();
        adfLoginPage.enableACS();
        adfLoginPage.login(contentUserModel.id, contentUserModel.password);
        navigationBarPage.clickUserProfile();
        userInfoDialog.dialogIsDisplayed().contentServicesTabIsNotDisplayed().processServicesTabIsNotDisplayed();
        expect(userInfoDialog.getContentHeaderTitle()).toEqual(contentUserModel.firstName + " " + contentUserModel.lastName);
        expect(userInfoDialog.getContentTitle()).toEqual(contentUserModel.firstName + " " + contentUserModel.lastName);
        expect(userInfoDialog.getContentEmail()).toEqual(contentUserModel.email);
        expect(userInfoDialog.getContentJobTitle()).toEqual(contentUserModel.jobTitle);
        userInfoDialog.checkInitialImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.closeUserProfile();
    });

    it("3. Enable Process Services and disable Content Services ", function () {
        navigationBarPage.clickLoginButton();
        adfLoginPage.enableAPS();
        adfLoginPage.disableACS();
        adfLoginPage.login(processUserModel.email, processUserModel.password);
        navigationBarPage.clickUserProfile();
        userInfoDialog.dialogIsDisplayed().contentServicesTabIsNotDisplayed().processServicesTabIsNotDisplayed();
        expect(userInfoDialog.getProcessHeaderTitle()).toEqual(processUserModel.firstName + " " + processUserModel.lastName);
        expect(userInfoDialog.getProcessTitle()).toEqual(processUserModel.firstName + " " + processUserModel.lastName);
        expect(userInfoDialog.getProcessEmail()).toEqual(processUserModel.email);
        userInfoDialog.checkInitialImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.closeUserProfile();
    });

    it("4. Enable Process Services and Content Services ", function () {
        var flow = protractor.promise.controlFlow();
        flow.execute(function() {
            PeopleAPI.updateAvatarViaAPI(contentUserModel, acsAvatarFileModel, "-me-");
            PeopleAPI.getAvatarViaAPI(retry, contentUserModel, "-me-", function(result) {
            });
        });

        navigationBarPage.clickLoginButton();
        adfLoginPage.enableACS();
        adfLoginPage.disableAPS();
        adfLoginPage.login(contentUserModel.id, contentUserModel.password);
        navigationBarPage.clickUserProfile();
        userInfoDialog.checkACSProfileImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.closeUserProfile();
    });

    it("5. The profile picture is changed from APS", function () {
        navigationBarPage.clickLoginButton();
        new UserProfileAPI().changeProfilePicture(basicAuth, apsAvatarFileModel.getLocation());

        adfLoginPage.enableAPS();
        adfLoginPage.disableACS();
        adfLoginPage.login(processUserModel.email, processUserModel.password);
        navigationBarPage.clickUserProfile();
        userInfoDialog.checkAPSProfileImage();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.initialImageNotDisplayed();
        userInfoDialog.closeUserProfile();
    });

    it("6. Delete the profile picture from ACS", function () {
        navigationBarPage.clickLoginButton();
        PeopleAPI.deleteAvatarViaAPI(contentUserModel, "-me-");
        adfLoginPage.enableACS();
        adfLoginPage.disableAPS();
        adfLoginPage.login(contentUserModel.id, contentUserModel.password);
        navigationBarPage.clickUserProfile();
        userInfoDialog.checkInitialImage();
        userInfoDialog.APSProfileImageNotDisplayed();
        userInfoDialog.ACSProfileImageNotDisplayed();
        userInfoDialog.closeUserProfile();
    });
});
