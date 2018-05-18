/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 27/3/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");
var shareUtil = require("../../util/shareUtil.js");

/**
 * Provides the Login Page.
 * @module pages
 * @submodule share
 * @class pages.share.LoginPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/#/login'
     */
    url: {value: TestConfig.share.webContextRoot + '/page'},

    /**
     * Waits untill the page is fully rendered
     * @method render
     */
    render: {
        value: function () {
            shareUtil.waitForPage();
        }
    },

    /**
     * Provides the username input.
     * @property txtUsername
     * @type protractor.Element
     */
    txtUsername: {
        get: function () {
            return element(by.css("input[id$='username']"));
        }
    }
    ,

    /**
     * Provides the password input.
     * @property txtPassword
     * @type protractor.Element
     */
    txtPassword: {
        get: function () {
            return element(by.css("input[id$='password']"));
        }
    }
    ,

    /**
     * Provides the login button.
     * @property btnLogin
     * @type protractor.Element
     */
    btnLogin: {
        get: function () {
            return element(by.css("button[id$='button']"));
        }
    }
    ,

    /**
     * Fills the username input
     * @method fillUsername
     * @param {String} username
     */

    fillUsername: {
        value: function (username) {
            Util.waitUntilElementIsVisible(this.txtUsername);
            this.txtUsername.clear();
            this.txtUsername.sendKeys(username);
        }
    }
    ,

    /**
     * Fills the password input
     * @method fillPassword
     * @param {String} password
     */

    fillPassword: {
        value: function (password) {
            Util.waitUntilElementIsVisible(this.txtPassword);
            this.txtPassword.clear();
            this.txtPassword.sendKeys(password);
        }
    }
    ,

    /**
     * Clicks the login button
     * @method clickLoginButton
     */

    clickLoginButton: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnLogin);
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
            this.fillUsername(username);
            this.fillPassword(password);
            this.clickLoginButton();
        }
    }
    ,

    /**
     * Determines if the login error message is present.
     * @method isLoginErrorDisplayed
     * @return {Boolean} The state of the login error message.
     */
    isLoginErrorDisplayed: {
        value: function () {
            return element(by.css("div>div[class='error']")).isPresent();
        }
    }
});