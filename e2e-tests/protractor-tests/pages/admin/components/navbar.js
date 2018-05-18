/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 10/10/2016.
 */
var Util = require("../../../util/util.js");
var Page = require('astrolabe').Page;
var loginPage = require("../loginPage.js");

/**
 * Provides the top navigation bar
 * @module pages
 * @submodule admin
 * @class pages.admin.components.Navbar
 */
module.exports = Page.create({
    url: {
        value: ''
    },


    /**
     * Provides the button for the user menu.
     *
     * @property btnUserMenu
     * @type protractor.Element
     */
    btnUserMenu: {
        get: function () {
            return element(by.xpath('(//button[@class="btn btn-default dropdown-toggle ng-binding"])[1]'));
        }
    },

    /**
     * Provides the button for log out.
     *
     * @property btnLogOut
     * @type protractor.Element
     */
    btnLogOut: {
        get: function () {
            return element(by.css('[href="#logout"]'));
        }
    },

    /**
     * Returns the user that is currently logged in.
     * @method getLoggedUser
     * @return String
     */
    getLoggedUser: {
        value: function () {
            try {
                Util.waitUntilElementIsVisible(this.btnUserMenu);
                return this.btnUserMenu.getText();
            } catch (err) {
                console.log(err + "Couldn't get element text!");
            }
        }
    },

    /**
     * Logs the user out.
     *
     * @method clickLogout
     */
    clickLogout: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnUserMenu);
            this.btnUserMenu.click();
            Util.waitUntilElementIsVisible(this.btnLogOut);
            this.btnLogOut.click();
            loginPage.isLoginPageDisplayed();
        }
    },

    /**
     * Provides the "Configuration" menu.
     *
     * @property configuration
     * @type protractor.Element
     */

    configuration: {
        get: function () {
            return element(by.xpath("//a[@href='#engine']"));
        }
    },

    /**
     * Opens the "Configuration" menu.
     *
     * @method clickConfiguration
     */

    clickConfiguration: {
        value: function () {
            Util.waitUntilElementIsVisible(this.configuration);
            this.configuration.click();
            Util.waitUntilElementIsVisible(element(by.xpath("//*[@ng-click='addMasterConfiguration()']")));
        }
    }
});