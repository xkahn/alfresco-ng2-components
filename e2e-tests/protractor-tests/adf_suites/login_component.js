/**
 * Created by jdosti on 21/08/2017.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var AdfContentServicesPage = require('../pages/adf/contentServicesPage.js');
var AdfProcessServicesPage = require('../pages/adf/process_services/processServicesPage.js');
var AdfNavigationBarPage = require('../pages/adf/navigationBarPage.js');
var TestConfig = require("../test.config.js");
var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');

describe("Test Login component", function () {

    var adfProcessServicesPage = new AdfProcessServicesPage();
    var adfNavigationBarPage = new AdfNavigationBarPage();
    var adfContentServicesPage = new AdfContentServicesPage();
    var adfLoginPage = new AdfLoginPage();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf_acs.adminUser, "password" : TestConfig.adf_acs.adminPassword});
    var adminUser = new AcsUserModel({"id" : TestConfig.adf_aps.apsAdminEmail, "password" : TestConfig.adf_aps.apsAdminPassword});

    var error_messages = {
        username: "Your username needs to be at least 2 characters.",
        invalid_credentials: "You've entered an unknown username or password",
        password: "Enter your password to sign in",
        required: "Required"
    };

    beforeAll(function (done)
    {
        PeopleAPI.createUserViaAPI(adminUserModel, adminUser);
        browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_login);
        //browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_port + TestConfig.adf.adf_login);
        done();
    });

        it("1. Username Required", function (){
            adfLoginPage.checkUsernameInactive();
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enterUsername("A");
            adfLoginPage.checkUsernameTooltip(error_messages.username);
            adfLoginPage.clearUsername();
            adfLoginPage.checkUsernameTooltip(error_messages.required);
            adfLoginPage.checkUsernameHighlighted();
            adfLoginPage.checkSignInButtonIsDisabled();
        });


       it("2. Enter Password to sign in", function (){
            adfLoginPage.checkPasswordInactive();
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enterPassword("A");
            adfLoginPage.checkPasswordTooltipIsNotVisible();
            adfLoginPage.clearPassword();
            adfLoginPage.checkPasswordTooltip(error_messages.password);
            adfLoginPage.checkPasswordHighlighted();
            adfLoginPage.checkSignInButtonIsDisabled();
        });

        it("3. Username must be at least 2 characters long", function () {
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enterUsername("A");
            adfLoginPage.checkUsernameTooltip(error_messages.username);
            adfLoginPage.enterUsername("AB");
            adfLoginPage.checkUsernameTooltipIsNotVisible();
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.clearUsername();
        });

        it("4. Login button is enabled",function (){
            adfLoginPage.enterUsername(TestConfig.admin.adminEmail);
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enterPassword('a');
            adfLoginPage.checkSignInButtonIsEnabled();
            adfLoginPage.clearUsername(TestConfig.admin.adminEmail);
            adfLoginPage.clearPassword();
        });

        it("5. You have entered an invalid username or password", function (){
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enterUsername("test");
            adfLoginPage.enterPassword("test");
            adfLoginPage.checkSignInButtonIsEnabled();
            adfLoginPage.clickSignInButton();
            adfLoginPage.checkLoginError(error_messages.invalid_credentials);
            adfLoginPage.clearUsername();
            adfLoginPage.clearPassword();
        });

        it("6. Password field is crypted", function () {
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enterPassword("test");
            adfLoginPage.showPassword();
            adfLoginPage.checkPasswordIsShown("test");
            adfLoginPage.hidePassword();
            adfLoginPage.checkPasswordIsHidden();
            adfLoginPage.clearPassword();
        });

        it("7. 'Remember', 'Need Help?' and 'Register' are displayed and hidden", function (){
            adfLoginPage.enableFooter();
            adfLoginPage.checkRememberIsDisplayed();
            adfLoginPage.checkNeedHelpIsDisplayed();
            adfLoginPage.checkRegisterDisplayed();
            adfLoginPage.disableFooter();
            adfLoginPage.checkRememberIsNotDisplayed();
            adfLoginPage.checkNeedHelpIsNotDisplayed();
            adfLoginPage.checkRegisterIsNotDisplayed();


        });

        it("8. Login to Process Services with Content Services disabled", function (){
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.disableACS();
            adfLoginPage.enableAPS();
            adfLoginPage.login(adminUser.id, adminUser.password);
            adfNavigationBarPage.clickProcessServicesButton();
            adfProcessServicesPage.checkApsContainer();
            adfNavigationBarPage.clickContentServicesButton();
            adfLoginPage.waitForElements();

        });

        it("9. Login to Content Services with Process Services disabled", function () {
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enableACS();
            adfLoginPage.disableAPS();
            adfLoginPage.login(TestConfig.adf_acs.adminUser, TestConfig.adf_acs.adminPassword);
            adfNavigationBarPage.clickContentServicesButton();
            adfContentServicesPage.checkAcsContainer();
            adfNavigationBarPage.clickProcessServicesButton();
            adfLoginPage.waitForElements();

        });

        it("10. Able to login to both Content Services and Process Services", function (){
            adfLoginPage.checkSignInButtonIsDisabled();
            adfLoginPage.enableACS();
            adfLoginPage.enableAPS();
            adfLoginPage.login(adminUser.id, adminUser.password);
            adfNavigationBarPage.clickProcessServicesButton();
            adfProcessServicesPage.checkApsContainer();
            adfNavigationBarPage.clickContentServicesButton();
            adfContentServicesPage.checkAcsContainer();
            adfNavigationBarPage.clickLoginButton();
            adfLoginPage.waitForElements();
        });
});