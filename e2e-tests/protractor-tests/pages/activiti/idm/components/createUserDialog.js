/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 21/01/2015.
 */

var Page = require('astrolabe').Page;
var Constants = require('../../../../util/constants.js');

/**
 * Provides the create user dialog within the user page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.CreateUserDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the cancel button
     * @property btnCancel
     * @type protractor.Element
     */
    btnCancel: {
        get: function () {
            return element(by.css("div[class='modal-footer']>button[ng-click='$hide()']"))
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
            return element(by.css("button[ng-click='createNewUser();']"));
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
    },

    /**
     * Provides the email text input for the new user
     * @property txtEmail
     * @type protractor.Element
     */
    txtEmail: {
        get: function () {
            return element(by.css("input[name='emailInput']"));
        }
    },

    /**
     * Fills in the user email
     * @param {string} email
     * @method fillEmail
     */
    fillEmail: {
        value: function (email) {
            this.txtEmail.clear();
            this.txtEmail.sendKeys(email);
        }
    },

    /**
     * Provides the password text input for the new userf
     * @property txtPassword
     * @type protractor.Element
     */
    txtPassword: {
        get: function () {
            return element(by.id("password"));
        }
    },

    /**
     * Fills in the user password
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
        value: function (firstName) {
            this.txtFirstName.clear();
            this.txtFirstName.sendKeys(firstName);
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
        value: function (lastName) {
            this.txtLastName.clear();
            this.txtLastName.sendKeys(lastName);
        }
    },

    /**
     * Selects the desired tenant for the new user
     * @param {string} tenant
     * @method selectTenant
     */
    selectTenant: {
        value: function (tenant) {
            element(by.cssContainingText('select[ng-model="model.user.tenantId"]>option', tenant)).click()
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
        value: function (company) {
            this.txtCompany.clear();
            this.txtCompany.sendKeys(company);
        }
    },

    /**
     * Provides the button for user status
     * @property btnStatus
     * @type protractor.Element
     */
    btnStatus: {
        get: function () {
            return element(by.xpath('//form[@name="newUserForm"]/div[@class="col-xs-6 ng-scope"][1]//button'));
        }
    },

    /**
     * Clicks the status button for the new user
     * @method clickStatus
     */
    clickStatus: {
        value: function () {
            this.btnStatus.click();
        }
    },

    /**
     * Selects the status for the new user based on the given parameter
     * @param {string} status
     * @method selectStatus
     */
    selectStatus: {
        value: function (status) {
            this.clickStatus();
            switch (status) {
                case Constants.STATUS.ACTIVE:
                    element(by.id("status-active")).click();
                    break;
                case Constants.STATUS.INACTIVE:
                    element(by.id("status-inactive")).click();
                    break;
                case Constants.STATUS.PENDING:
                    element(by.id("status-pending")).click();
                    break;
                case Constants.STATUS.DELETED:
                    element(by.id("status-deleted")).click();
                    break;
            }
        }
    },

    /**
     * Provides the type button for the new user
     * @property btnType
     * @type protractor.Element
     */
    btnType: {
        get: function () {
            return element(by.xpath('//form[@name="newUserForm"]/div[@class="col-xs-6 ng-scope"][2]//button'));
        }
    },

    /**
     * Clicks the type button for the new user
     * @method clickType
     */
    clickType: {
        value: function () {
            this.btnType.click();
        }
    },

    /**
     * Selects the type for the new user
     * @param {string} type
     * @method selectType
     */
    selectType: {
        value: function (type) {
            this.clickType();
            switch (type) {
                case Constants.TYPE.ENTERPRISE:
                    element(by.id("type-trial")).click();
                    break;
                case Constants.TYPE.TRIAL:
                    element(by.id("type-enterprise")).click();
                    break;
            }
        }
    }
});
