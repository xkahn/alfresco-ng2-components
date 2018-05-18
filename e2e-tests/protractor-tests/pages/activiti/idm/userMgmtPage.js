/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 22/01/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Constants = require("../../../util/constants.js");
var Util = require("../../../util/util.js");

var navbar = require("../components/navbar.js");
var createUserDialog = require("./components/createUserDialog");
var editUserDetailsDialog = require("./components/editUserDetailsDialog.js");
var editUserStatusDialog = require("./components/editUserStatusDialog.js");
var editUserTenantDialog = require("./components/editUserTenantDialog.js");
var editUserAccountTypeDialog = require("./components/editUserAccountTypeDialog.js");
var editUserPasswordDialog = require("./components/editUserPasswordDialog.js");

function foundUser(_status, _email, _name, _created, _type, _externalID) {
    this.status = _status;
    this.email = _email;
    this.name = _name;
    this.created = _created;
    this.type = _type;
    this.externalID = _externalID;
}

/**
 * Provides the user management page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.UserMgmtPage
 */

var mainList =  element(by.xpath(".//*[@id='main-list']"));
var addUserBtn = element(by.css("button[ng-click='addUser()']"));
var usersDetails = element(by.xpath("//table[@class='users-details']"));

module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/idm/#/user-mgmt'
     */
    url: {value: TestConfig.main.webContextRoot + '/idm/#/user-mgmt'},


    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar;
        }
    },

    /**
     * Provides the create user dialog
     * @property createUserDialog
     * @type astrolabe.Page
     */
    createUserDialog: {
        get: function () {
            return createUserDialog;
        }
    },

    /**
     * Provides the edit user dialog
     * @property editUserDetailsDialog
     * @type astrolabe.Page
     */
    editUserDetailsDialog: {
        get: function () {
            return editUserDetailsDialog;
        }
    },

    /**
     * Provides the edit user status dialog
     * @property editUserStatusDialog
     * @type astrolabe.Page
     */
    editUserStatusDialog: {
        get: function () {
            return editUserStatusDialog;
        }
    },

    /**
     * Provides the edit user tenant dialog
     * @property editUserTenantDialog
     * @type astrolabe.Page
     */
    editUserTenantDialog: {
        get: function () {
            return editUserTenantDialog;
        }
    },

    /**
     * Provides the edit user account type dialog
     * @property editUserAccountTypeDialog
     * @type astrolabe.Page
     */
    editUserAccountTypeDialog: {
        get: function () {
            return editUserAccountTypeDialog;
        }
    },

    /**
     * Provides the edit user password dialog
     * @property editUserPasswordDialog
     * @type astrolabe.Page
     */
    editUserPasswordDialog: {
        get: function () {
            return editUserPasswordDialog;
        }
    },

    /**
     * Clicks the create user button
     * @method clickCreateUser
     */
    clickCreateUser: {
        value: function () {
            addUserBtn.click();
        }
    },

    /**
     * Creates a new user with the details give as parameters
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} tenant
     * @param {string} company
     * @param {string} status
     * @param {string} type
     * @method createUser
     */
    createUser: {
        value: function (email, password, firstName, lastName, tenant, company, status, type) {
            this.clickCreateUser();
            this.createUserDialog.fillEmail(email);
            this.createUserDialog.fillPassword(password);
            this.createUserDialog.fillFirstName(firstName);
            this.createUserDialog.fillLastName(lastName);
            this.createUserDialog.selectTenant(tenant);
            this.createUserDialog.fillCompany(company);
            this.createUserDialog.selectStatus(status);
            this.createUserDialog.selectType(type);
            this.createUserDialog.clickSave();
        }
    },

    /**
     * Provides the search box for users
     * @property txtEmailOrName
     * @type protractor.Element
     */
    txtEmailOrName: {
        get: function () {
            return element(by.css('input[ng-model="model.pendingFilterText"]'));
        }
    },

    /**
     * Fills the user search box
     * @param {string} queryString
     * @method fillEmailOrName
     */
    fillEmailOrName: {
        value: function (text) {
            this.txtEmailOrName.clear();
            this.txtEmailOrName.sendKeys(text);
        }
    },

    /**
     * Provides the text input for company
     * @property txtCompany
     * @type protractor.Element
     */
    txtCompany: {
        get: function () {
            return element(by.css('input[ng-model="model.pendingCompanyText"]'));
        }
    },

    /**
     * Fills the company search field
     * @param {string} company
     * @method fillCompany
     */
    fillCompany: {
        value: function (company) {
            this.txtCompany.clear();
            this.txtCompany.sendKeys(company);
        }
    },

    /**
     * Provides the tenant combobox
     * @property cmbTenant
     * @type protractor.Element
     */
    cmbTenant: {
        get: function () {
            return element(by.css('select[ng-model="common.selectedTenantId"]'));
        }
    },

    /**
     * Selects the tenant given as parameter
     * @param {string} tenant
     * @method selectTenant
     */
    selectTenant: {
        value: function (tenant) {
            var elemSelect =  element(by.cssContainingText('option', tenant));
            Util.waitUntilElementIsPresent(elemSelect);
            elemSelect.click()

        }
    },

    /**
     * Selects the status given as parameter
     * @param {string} status
     * @method selectStatus
     */
    selectStatus: {
        value: function (status) {
            switch (status) {
                case Constants.STATUS.ACTIVE:
                    element(by.xpath('//ul/li[@ng-repeat="filter in model.statusFilters"][2]')).click();
                    break;
                case Constants.STATUS.INACTIVE:
                    element(by.xpath('//ul/li[@ng-repeat="filter in model.statusFilters"][3]')).click();
                    break;
                case Constants.STATUS.PENDING:
                    element(by.xpath('//ul/li[@ng-repeat="filter in model.statusFilters"][4]')).click();
                    break;
                case Constants.STATUS.DELETED:
                    element(by.xpath('//ul/li[@ng-repeat="filter in model.statusFilters"][5]')).click();
                    break;
            }
        }
    },

    /**
     * Selects the type given as parameter
     * @param {string} type
     * @method selectType
     */
    selectType: {
        value: function (type) {
            switch (type) {
                case Constants.TYPE.TRIAL:
                    element(by.xpath('//ul/li[@ng-repeat="filter in model.typeFilters"][2]')).click();
                    break;
                case Constants.TYPE.ENTERPRISE:
                    element(by.xpath('//ul/li[@ng-repeat="filter in model.typeFilters"][3]')).click();
                    break;
            }
        }
    },

    /**
     * Provides the select action button
     * @property btnSelectAction
     * @type protractor.Element
     */
    btnSelectAction: {
        get: function () {
            return element(by.xpath('//div[@class="btn-group"]/button[2]'));
        }
    },

    /**
     * Clicks the select action button
     * @method clickSelectAction
     */
    clickSelectAction: {
        value: function () {
            this.btnSelectAction.click();
        }
    },

    /**
     * Selects an editing action based on the action parameter that is given. Parameter should be one of util.Constants.CHANGE_ACTIONS
     * @param {string} action
     * @method selectAnAction
     */
    selectAnAction: {
        value: function (action) {
            this.clickSelectAction();
            switch (action) {
                case Constants.CHANGE_ACTIONS.DETAILS:
                    element(by.css("li[ng-click='editUserDetails()']")).click();
                    break;
                case Constants.CHANGE_ACTIONS.STATUS:
                    element(by.css("li[ng-click='editUserStatus()']")).click();
                    break;
                case Constants.CHANGE_ACTIONS.ACCOUNT_TYPE:
                    element(by.css("li[ng-click='editUserAccountType()']")).click();
                    break;
                case Constants.CHANGE_ACTIONS.TENANT:
                    element(by.css("li[ng-click='editUserTenant()']")).click();
                    break;
                case Constants.CHANGE_ACTIONS.PASSWORD:
                    element(by.css("li[ng-click='editUserPassword()']")).click();
                    break;
            }
        }
    },

    /**
     * Selects an user from the results table based on the given email.
     * param {string} email
     * @method selectUserByEmail
     */
    selectUserByEmail: {
        value: function (email) {
            var userRow = element(by.xpath('//tr/td[text()="' + email + '"]/..'));
            userRow.click();
            return userRow;
        }
    },

    /**
     * Users are provided as a list of {object} with the staus, email, name, created, type and external ID properties.
     * @method getFoundUsers
     */
    getFoundUsers: {
        value: function () {
            let foundUsers= [];
            let status = null;
            let email = null;
            let name = null;
            let created = null;
            let type = null;
            let externalID = null;

            return new Promise (function (resolve, reject) {
                element(by.className('users')).all(by.repeater('user in model.users.data')).each(function (row) {
                    row.all(by.className('ng-binding')).get(0).getText().then(function (text) {
                        status = text;
                    });
                    row.all(by.className('ng-binding')).get(1).getText().then(function (text) {
                        email = text;
                    });
                    row.all(by.className('ng-binding')).get(2).getText().then(function (text) {
                        name = text;
                    });
                    row.all(by.className('ng-binding')).get(3).getText().then(function (text) {
                        created = text;
                    });
                    row.all(by.className('ng-binding')).get(4).getText().then(function (text) {
                        type = text;
                    });
                    row.all(by.className('ng-binding')).get(5).getText().then(function (text) {
                        externalID = text;
                        foundUsers.push(new foundUser(status, email, name, created, type, externalID));
                    });
                });
                
                browser.sleep(0).then(function() {
                    foundUsers.push(new foundUser(status, email, name, created, type, externalID));
                    resolve(foundUsers);
                });
            });
        }
    },

    /**
     * Changes the details for the selected user.
     * Only one user should be selected.
     * @param {string} email
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} company
     * @method changeDetails
     */
    changeDetails: {
        value: function (email, firstName, lastName, company) {
            this.selectAnAction(Constants.CHANGE_ACTIONS.DETAILS);
            this.editUserDetailsDialog.fillEmail(email);
            this.editUserDetailsDialog.fillFirstName(firstName);
            this.editUserDetailsDialog.fillLastName(lastName);
            this.editUserDetailsDialog.fillCompany(company);
            this.editUserDetailsDialog.clickSave();
        }
    },

    /**
     * Changes the status for the selected users.
     * @param {string} status
     * @method changeStatus
     */
    changeStatus: {
        value: function (status) {
            this.selectAnAction(Constants.CHANGE_ACTIONS.STATUS);
            this.editUserStatusDialog.selectStatus(status);
            this.editUserStatusDialog.clickUpdateUsers();
        }
    },

    /**
     * Changes the tenant for the selected users.
     * @param {string} tenant
     * @method changeTenant
     */
    changeTenant: {
        value: function (tenant) {
            this.selectAnAction(Constants.CHANGE_ACTIONS.TENANT);
            this.editUserTenantDialog.selectTenant(tenant);
            this.editUserTenantDialog.clickUpdateUsers();
        }
    },

    /**
     * Changes the account type for the selected users
     * @param {string} type
     * @method changeAccountType
     */
    changeAccountType: {
        value: function (type) {
            this.selectAnAction(Constants.CHANGE_ACTIONS.ACCOUNT_TYPE);
            this.editUserAccountTypeDialog.selectType(type);
            this.editUserAccountTypeDialog.clickUpdateUsers();
        }
    },

    /**
     * Changes password for the selected users
     * @param {string} newPassword
     * @method changePassword
     */
    changePassword: {
        value: function (newPassword) {
            this.selectAnAction(Constants.CHANGE_ACTIONS.PASSWORD);
            this.editUserPasswordDialog.fillPassword(newPassword);
            this.editUserPasswordDialog.fillRepeatPassword(newPassword);
            this.editUserPasswordDialog.clickChange();
        }
    },

    isUserPageDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(mainList);
            Util.waitUntilElementIsVisible(addUserBtn);
            Util.waitUntilElementIsVisible(usersDetails);
        }
    },
});
