/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 6/1/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");

/**
 * Provides the Login Page.
 * @module pages
 * @submodule activiti
 * @class pages.activiti.LoginPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/#/login'
     */
    url: {value: TestConfig.main.webContextRoot + '/#/login'},

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
     * Provides the login button.
     * @property btnLogin
     * @type protractor.Element
     */
    btnLogin: {
        get: function () {
            return element(by.id("login"));
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
     * Clicks the login button
     * @method clickLoginButton
     */

    clickLoginButton: {
        value: function () {
            this.btnLogin.click();
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
            this.clickLoginButton();
            this.waitUntilTheUserIsLogged();
        }
    },

    attemptLogin: {
        value: function (username, password) {
            this.isLoginPageDisplayed();
            this.fillUsername(username);
            this.fillPassword(password);
            this.clickLoginButton();
        }
    },
    
    isLoginPageDisplayed: {
        value: function () {
             var loginForm = element(by.css("div[class='content-form']"));
           // var loginForm = element(by.css("form.login-form"));
            Util.waitUntilElementIsVisible(loginForm);
            Util.waitUntilElementIsVisible(this.txtUsername);
            Util.waitUntilElementIsVisible(this.txtPassword);
        }
    },

    waitUntilTheUserIsLogged: {
          value: function(){
            var landingLoginPage = element(by.css("span[class='user-name ng-binding']"));
            Util.waitUntilElementIsVisible(landingLoginPage);
        }
    },

    /**
     * Determines if the login error message is present.
     * @method isLoginErrorDisplayed
     * @return {Boolean} The state of the login error message.
     */

    isLoginErrorDisplayed: {
        value: function () {
            return element(by.css('p[class="login-error ng-scope"]')).isPresent();
        }
    }
});