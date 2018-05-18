/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 26/01/2015.
 */

var Page = require('astrolabe').Page;

/**
 * Provides the edit user details dialog within the users page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.EditUserDetailsDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the email text input for the new user
     * @property txtEmail
     * @type protractor.Element
     */
    txtEmail: {
        get: function () {
            return element(by.css("input[ng-model='model.user.email']"));
        }
    },

    /**
     * Fills in the user email
     * @param {string} email
     * @method fillEmail
     */
    fillEmail: {
        value: function (_email) {
            this.txtEmail.clear();
            this.txtEmail.sendKeys(_email);
        }
    },

    /**
     * Provides the text input for the user first name
     * @property txtFirstname
     * @type protractor.Element
     */
    txtFirstName: {
        get: function () {
            return element(by.css("input[ng-model='model.user.firstName']"));
        }
    },

    /**
     * Fills in the user first name
     * @param {string} firstName
     * @method fillFirstName
     */
    fillFirstName: {
        value: function (_firstName) {
            this.txtFirstName.clear();
            this.txtFirstName.sendKeys(_firstName);
        }
    },

    /**
     * Provides the user last name
     * @property txtLastName
     * @type protractor.Element
     */
    txtLastName: {
        get: function () {
            return element(by.css("input[ng-model='model.user.lastName']"));
        }
    },

    /**
     * Fills in user last name
     * @param {string} lastName
     * @method fillLastName
     */
    fillLastName: {
        value: function (_lastName) {
            this.txtLastName.clear();
            this.txtLastName.sendKeys(_lastName);
        }
    },

    /**
     * Provides the text input for the new user company
     * @property txtCompany
     * @type protractor.Element
     */
    txtCompany: {
        get: function () {
            return element(by.css("input[ng-model='model.user.company']"));
        }
    },

    /**
     * Fills in the new user company
     * @method fillCompany
     */
    fillCompany: {
        value: function (_company) {
            this.txtCompany.clear();
            this.txtCompany.sendKeys(_company);
        }
    },

    /**
     * Provides the cancel button
     * @property btnCancel
     * @type protractor.Element
     */
    btnCancel: {
        get: function () {
            return element(by.css("button[ng-click='$hide()']"));
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
     * Provides the save button
     * @property btnSave
     * @type protractor.Element
     */
    btnSave: {
        get: function () {
            return element(by.css("button[ng-click='editUserDetails();']"));
        }
    },

    /**
     * Clicks the save button
     * @method clickSave
     */
    clickSave: {
        value: function () {
            this.btnSave.click();
        }
    }
});