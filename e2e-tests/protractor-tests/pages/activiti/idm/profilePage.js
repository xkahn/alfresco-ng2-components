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
var TestConfig = require("../../../test.config.js");
var Util = require('../../../util/util.js');

var navbar = require("../components/navbar.js");
var changePasswordDialog = require("./components/changePasswordDialog.js");
/**
 * Provides the Personal page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @submodule idm
 * @class pages.activiti.idm.ProfilePage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/idm/#/profile'
     */
    url: {value: TestConfig.main.webContextRoot + '/idm/#/profile'},

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
     * Provides the change password dialog
     * @property changePasswordDialog
     * @type astrolabe.Page
     */
    changePasswordDialog: {
        get: function () {
            return changePasswordDialog;
        }
    },

    /**
     * Provides the first name field. This property provides the field in the both possible states, editable or non-editable.
     * @property txtFirstName.
     * @type {object}
     */
    txtFirstName: {
        get: function () {
            return {
                editable: element(by.xpath("//*/input[@ng-model='model.profile.firstName']")),
                non_editable: element(by.xpath("//*/div[@ng-click='model.editingFirstName = true']/span"))
            }
        }
    },

    /**
     * Clears the first name input
     * @method clearFirstName
     */
    clearFirstName: {
        value: function () {
            this.txtFirstName.non_editable.click();
            this.txtFirstName.editable.clear();
            // this.txtFirstName.editable.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Fills firt name input
     * @param {string} firstName
     * @method fillFirstName
     */
    fillFirstName: {
        value: function (firstName) {
            // this.txtFirstName.non_editable.click();
            //  this.txtFirstName.editable.clear();
            this.txtFirstName.editable.sendKeys(firstName);
            this.txtFirstName.editable.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Provides the password text field
     * @property txtPassword
     * @type protractor.Element
     */
    txtPassword: {
        get: function (password) {
            return element(by.model('model.profile.password'));
        }
    },

    /**
     * Provides the update profile button
     * @property updateProfileButton
     * @type protractor.Element
     */
    updateProfileButton: {
        get: function () {
            return element(by.cssContainingText('.btn.btn-clean', 'Update profile'));
        }
    },
    /**
     * updates profile by entering password and clicking update profile button
     * @param {string} password
     * @method updateProfile
     */
    updateProfile: {
        value: function (password) {
            Util.waitUntilElementIsVisible(this.txtPassword);
            this.txtPassword.sendKeys(password);
            Util.waitUntilElementIsVisible(this.updateProfileButton);
            this.updateProfileButton.click();
        }
    },

    /**
     * Changes the first name for the current user.
     * @param {string} firstName
     * @method changeFirstName
     */
    changeFirstName: {
        value: function (firstName, password) {
            this.clearFirstName();
            this.fillFirstName(firstName);
            this.updateProfile(password);
        }
    },

    /**
     * Provides the last name field. This property provides the field in the both possible states, editable or non-editable.
     * @property txtLastName
     * @type {object}
     */
    txtLastName: {
        get: function () {
            return {
                editable: element(by.xpath("//*/input[@ng-model='model.profile.lastName']")),
                non_editable: element(by.xpath("//*/div[@ng-click='model.editingLastName = true']/span"))
            }
        }
    },

    /**
     * Clears the last name field.
     * @method clearLastName
     */
    clearLastName: {
        value: function () {
            this.txtLastName.non_editable.click();
            this.txtLastName.editable.clear();
            this.txtLastName.editable.click();
            this.txtLastName.editable.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Fills in the last name field.
     * @param {string} lastName
     * @method fillLastName
     */
    fillLastName: {
        value: function (lastName) {
            //this.txtLastName.non_editable.click();
            this.txtLastName.editable.clear();
            this.txtLastName.editable.sendKeys(lastName);
            this.txtLastName.editable.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Changes the last name for the current user
     * @param {string} lastName
     * @method changeLastName
     */
    changeLastName: {
        value: function (lastName, password) {
            this.clearLastName();
            this.fillLastName(lastName);
            this.updateProfile(password);
        }
    },

    /**
     * Provides the email field. This property provides the field in the both possible states, editable or non-editable.
     * @property txtEmail
     * @type {object}
     */
    txtEmail: {
        get: function () {
            return {
                editable: element(by.xpath("//*/input[@ng-model='model.profile.email']")),
                non_editable: element(by.xpath("//*/div[@ng-click='model.editingEmail = true']/span"))
            }
        }
    },

    /**
     * Changes the current user email address.
     * @param {string} email
     * @method changeEmail
     */
    changeEmail: {
        value: function (email, password) {
            this.txtEmail.non_editable.click();
            this.txtEmail.editable.clear();
            this.txtEmail.editable.sendKeys(email);
            //browser.actions().sendKeys(protractor.Key.chord(protractor.Key.ENTER)).perform();
            // browser.sleep(20000);
            this.updateProfile(password);
        }
    },

    /**
     * Provides the company field. This property provides the field in the both possible states, editable or non-editable.
     * @property txtCompany
     * @type {object}
     */
    txtCompany: {
        get: function () {
            return {
                editable: element(by.xpath("//*/input[@ng-model='model.profile.company']")),
                non_editable: element(by.xpath("//*/div[@ng-click='model.editingCompany = true']/span"))
            }
        }
    },

    /**
     * Clears the company field
     * @method clearCompany
     */
    clearCompany: {
        value: function () {
            this.txtCompany.non_editable.click();
            this.txtCompany.editable.clear();
            //this.txtCompany.editable.sendKeys(protractor.Key.chord(protractor.Key.ENTER));

        }
    },

    /**
     * Fills in the company field
     * @param {string} company
     * @method fillCompany
     */
    fillCompany: {
        value: function (company) {
            //this.txtCompany.non_editable.click();
            this.txtCompany.editable.sendKeys(company);
            //this.txtCompany.editable.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Changes the current user company
     * @param {string} company
     * @method changeCompany
     */
    changeCompany: {
        value: function (company, password) {
            this.clearCompany();
            this.fillCompany(company);
            this.updateProfile(password);
        }
    },

    /**
     * Provides the change password button
     * @property btnChangePassword
     * @type protractor.Element
     */
    btnChangePassword: {
        get: function () {
            return element(by.css("div[class='header']>div>button[ng-click='showChangePasswordModal()']"))
        }
    },

    /**
     * Clicks the change password button
     * @method clickChangePassword
     */
    clickChangePassword: {
        value: function () {
            this.btnChangePassword.click();
        }
    },

    /**
     * Verifies if the current user membership to a certain group is displayed
     * @param {string} group
     * @method isMembershipDisplayed
     * @return {boolean}
     */
    isMembershipDisplayed: {
        value: function (group) {
            var xpath_selector = '//div/ul/li[@ng-repeat="group in model.profile.groups"]/span[@class="ng-binding" and text() = "' + group + '"]';
            logger.debug("EN");
            return element(by.xpath(xpath_selector)).isPresent();
        }
    },

    /**
     * Verifies if the current user has a the capability given as parameter. The capability should be one of util.Constants.CAPABILITES
     * @param {string} capability.
     * @return {boolean}
     * @method isCapabilityDisplayed
     */
    isCapabilityDisplayed: {
        value: function (capability) {
            return element(by.cssContainingText('div>ul[class="simple-list"]>li>span[class="ng-binding"]', capability)).isPresent();
        }
    },

    /**
     * Clicks capabilities
     * @method clickCapabilities
     */
    clickCapabilities: {
        value: function () {
            element(by.css("li[id='systemGroupMgmt']")).click();
        }
    },

    /**
     * Provides the change profile image button
     * @property btnChangeProfileImage
     * @type protractor.Element
     */
    btnChangeProfileImage: {
        get: function () {
            return element(by.css("img[ng-click='showUploadPictureModal()']"));
        }
    },

    /**
     * Provides the change profile image button
     * @property btnUploadProfileImage
     * @type protractor.Element
     */
    btnUploadProfileImage: {
        get: function () {
            return element(by.css("div[class='upload-image-form'] > input[ngf-change='onFileSelect($files)']"));
        }
    },

    /**
     * Clicks the change profile image button
     * @method clickChangeProfileImage
     */
    clickChangeProfileImage: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnChangeProfileImage);
            this.btnChangeProfileImage.click();
            Util.waitUntilElementIsVisible(this.btnUploadProfileImage);
        }
    },

    /**
     * uploads profile image
     * @method clickUploadProfileImage
     */
    uploadFile: {
        value: function (fileLocation) {
            Util.waitUntilElementIsVisible(this.btnUploadProfileImage);
            this.btnUploadProfileImage.click();
            Util.uploadFile(this.btnUploadProfileImage, this.btnUploadProfileImage, fileLocation);
            Util.waitUntilElementIsVisible(this.btnChangeProfileImage);
        }
    },

    /**
     * uploads profile image
     * @method uploadProfileImage
     */
    uploadProfileImage: {
        value: function (fileLocation) {
            this.clickChangeProfileImage();
            this.uploadFile(fileLocation);
        }
    },





});