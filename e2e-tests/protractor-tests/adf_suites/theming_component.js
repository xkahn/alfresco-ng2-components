/**
 * Created by Cristina Jalba on 13/03/2018.
 */

var AdfLoginPage = require('../pages/adf/loginPage.js');
var AdfNavigationBarPage = require('../pages/adf/navigationBarPage.js');
var TestConfig = require("../test.config.js");
var AcsUserModel = require("../ACSmodels/acsUserModel.js");
var PeopleAPI = require('../restAPI/ACM/PeopleAPI.js');
var CONSTANTS = require("../util/constants");

describe("Test Theming component", function () {

    var adfNavigationBarPage = new AdfNavigationBarPage();
    var adfLoginPage = new AdfLoginPage();
    var adminUserModel = new AcsUserModel({"id" : TestConfig.adf_acs.adminUser, "password" : TestConfig.adf_acs.adminPassword});
    var acsUser = new AcsUserModel();

    beforeAll(function (done)
    {
        PeopleAPI.createUserViaAPI(adminUserModel, acsUser)
            .then(done());
    });

    it("Theming component", function (){
        adfLoginPage.goToLoginPage();
        adfLoginPage.waitForElements();
        adfLoginPage.getShowPasswordIconColor().then(function (value) {
            expect(value).toEqual(CONSTANTS.THEMING.DEFAULT_PASSWORD_ICON_COLOR);
        });
        adfLoginPage.getSignInButtonColor().then(function (value) {
            expect(value).toEqual(CONSTANTS.THEMING.DEFAULT_LOGIN_BUTTON_COLOR);
        });
        adfLoginPage.getBackgroundColor().then(function (value) {
            expect(value).toEqual(CONSTANTS.THEMING.DEFAULT_BACKGROUND_COLOR);
        });
        adfLoginPage.loginUsingUserModel(acsUser);
        adfNavigationBarPage.clickThemeButton();
        adfNavigationBarPage.clickOnSpecificThemeButton(CONSTANTS.THEMING.PINK_BLUE_DARK);
        adfNavigationBarPage.clickLoginButton();
        adfLoginPage.waitForElements();
        adfLoginPage.enterUsername(acsUser.email);
        adfLoginPage.enterPassword(acsUser.password);
        expect(adfLoginPage.getShowPasswordIconColor()).toEqual(CONSTANTS.THEMING.PINK_BLUE_DARK_PASSWORD_ICON_COLOR);
        adfLoginPage.getSignInButtonColor().then(function (value) {
            expect(value).toEqual(CONSTANTS.THEMING.PINK_BLUE_DARK_LOGIN_BUTTON_COLOR);
        });
        adfLoginPage.getBackgroundColor().then(function (value) {
            expect(value).toEqual(CONSTANTS.THEMING.PINK_BLUE_DARK_BACKGROUND_COLOR);
        });
    });

});