/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 28/01/2015.
 */

var Page = require('astrolabe').Page;

/**
 * Provides the edit user password dialog within the users page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.EditUserPasswordDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the text input for the password
     * @property txtPassword
     * @type protractor.Element
     */
    txtPassword: {
        get: function () {
            return element(by.id("password"));
        }
    },

    /**
     * Fills in the password
     * @param {string} password
     * @method fillPassword
     */
    fillPassword: {
        value: function (password) {
            this.txtPassword.clear();
            this.txtPassword.sendKeys(password);
        }
    },

    /**
     * Provides the input text for the repeat password
     * @property txtRepeatPasswords
     * @type protractor.Element
     */
    txtRepeatPassword: {
        get: function () {
            return element(by.id("passwordRepeat"));
        }
    },

    /**
     * Fills in the repeat password
     * @param {string} repeatPassword
     * @method fillRepeatPassword
     */
    fillRepeatPassword: {
        value: function (repeatPassword) {
            this.txtRepeatPassword.clear();
            this.txtRepeatPassword.sendKeys(repeatPassword);
        }
    },

    /**
     * Clicks the cancel button
     * @method clickCancel
     */
    btnCancel: {
        get: function () {
            return element(by.css('button[ng-click="$hide()"]'));
        }
    },

    /**
     * Clicks the cancel button
     * @method clickCancel
     */
    clickCancel: {
        value: function () {
            this.btnCancel.click();
        }
    },

    /**
     * Provides the change button
     * @property btnChange
     * @type protractor.Element
     */
    btnChange: {
        get: function () {
            return element(by.css('button[ng-click="updateUsers();$hide()"]'));
        }
    },

    /**
     * Clicks the change button
     * @method clickChange
     */
    clickChange: {
        value: function () {
            this.btnChange.click();
        }
    }

});
