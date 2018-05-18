/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 10/10/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");

/**
 * Provides the Login Page.
 * @module pages
 * @submodule admin
 * @class pages.admin.LoginPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.admin.webContextRoot + '/#/login'
     */
    url: {value: TestConfig.admin.webContextRoot + '/#/login'},

    /**
     * Provides the username input.
     * @property txtUsername
     * @type protractor.Element
     */
    txtUsername: {
        get: function () {
            return element(by.id("username"));
        }
    },

    /**
     * Provides the password input.
     * @property txtPassword
     * @type protractor.Element
     */
    txtPassword: {
        get: function () {
            return element(by.id("password"));
        }
    },

    /**
     * Provides the Sign in button.
     * @property btnSignIn
     * @type protractor.Element
     */
    btnSignIn: {
        get: function () {
            return element(by.xpath("//*[@ng-click='login()']"));
        }
    },

    /**
     * Fills the username input
     * @method fillUsername
     * @param {String} username
     */

    fillUsername: {
        value: function (username) {
            this.txtUsername.clear();
            this.txtUsername.sendKeys(username);
        }
    },

    /**
     * Fills the password input
     * @method fillPassword
     * @param {String} password
     */

    fillPassword: {
        value: function (password) {
            this.txtPassword.clear();
            this.txtPassword.sendKeys(password);
        }
    },

    /**
     * Clicks the Sign In button
     * @method clickSignInButton
     */

    clickSignInButton: {
        value: function () {
            this.btnSignIn.click();
        }
    },

    /**
     * Does all the steps required to login from the login page.
     *
     * @param username {String}
     * @param password {String}
     * @method doLogin
     */
    doLogin: {
        value: function (username, password) {
            this.isLoginPageDisplayed();
            this.fillUsername(username);
            this.fillPassword(password);
            this.clickSignInButton();
            this.waitUntilTheUserIsLogged();
        }
    },

    attemptLogin: {
        value: function (username, password) {
            this.isLoginPageDisplayed();
            this.fillUsername(username);
            this.fillPassword(password);
            this.clickSignInButton();
        }
    },


    isLoginPageDisplayed: {
        value: function(){
            var loginForm = element(by.tagName('form')).element(by.className('content-form'));
            Util.waitUntilElementIsVisible(loginForm);
            Util.waitUntilElementIsVisible(this.txtUsername);
            Util.waitUntilElementIsVisible(this.txtPassword);
        }
    },

    waitUntilTheUserIsLogged: {
        value: function(){
            var landingLoginPage = element(by.xpath("//a[@href='#engine']"));
            Util.waitUntilElementIsVisible(landingLoginPage);
        }
    },

    /*
     * @param message
     */
    waitTopMessage: {
        value: function(message) {
            browser.wait(protractor.until.elementLocated(by.xpath("//div[contains(@class, 'fadein')]/span[text()='" + message + "']")), TestConfig.main.presence_timeout);
        }
    }
});