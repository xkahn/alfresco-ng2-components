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
var EC = protractor.ExpectedConditions;
var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");
var createGroupDialog = require("./components/createGroupDialog.js");
var deleteGroupMemberDialog = require("./components/deleteGroupMemberDialog.js");
var deleteCapabilityDialog = require("./components/deleteCapabilityDialog.js");

/**
 * Provides the system group (capabilities) management page.
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.SystemGroupMgmtPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/idm/#/system-group-mgmt'
     */
    url: {value: TestConfig.main.webContextRoot + '/idm/#/system-group-mgmt'},

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
     * Provides the create group dialog
     * @property createGroupDialog
     * @type astrolabe.Page
     */
    createGroupDialog: {
        get: function () {
            return createGroupDialog;
        }
    },


    isCapabilityPageDisplayed : {
       value : function(){
           var mainList = element(by.id("main-list"));
           Util.waitUntilElementIsVisible(mainList);
       }
    },

    /**
     * Provides the delete group member dialog
     * @property deletGroupMemberDialog
     * @type astrolabe.Page
     */
    deleteGroupMemberDialog: {
        get: function () {
            return deleteGroupMemberDialog;
        }
    },

    /**
     * Provides the delete capability dialog
     * @property deleteCapabilityDialog
     * @type astrolabe.Page
     */
    deleteCapabilityDialog: {
        get: function () {
            return deleteCapabilityDialog;
        }
    },

    /**
     * Provides the create button group
     * @property btnCreateGroup
     * @type protractor.Element
     */
    btnCreateGroup: {
        get: function () {
            return element(By.css("div[id='main-list']>div>div>button"));
        }
    },

    /**
     * Provides the combobox for selecting the tenant.
     * @property cmbSelectTenant
     * @type protractor.Element
     */
    cmbSelectTenant: {
        get: function () {
            return element(By.css("div[id='main-list']>div>div>select"));
        }
    },

    /**
     * Clicks the create group button
     * @method clickCreategroup
     */
    clickCreateGroup: {
        value: function () {
            this.btnCreateGroup.click();
        }
    },

    /**
     * Selects a tenant
     * @param {string} tenant
     * @method selectTenant
     */
    selectTenant: {
        value: function (tenant) {
            Util.waitUntilElementIsVisible(this.cmbSelectTenant);
            this.cmbSelectTenant.click();
            var selTennant = element(by.cssContainingText("div[id='main-list']>div>div>select>option", tenant));
            Util.waitUntilElementIsVisible(selTennant);
            selTennant.click();
            this.cmbSelectTenant.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Selects a tenant
     * @param {string} tenant
     * @method selectTenantWithinDropdown
     */
    selectTenantWithinDropdown:
    {
        value: function (tenant)
        {
           element(by.css("select[ng-model='common.selectedTenantId']")).sendKeys(tenant);
        }
    },

    /**
     * Creates a new group with the name given as parameter
     * @param {string} groupName
     * @method createGroup
     */
    createGroup: {
        value: function (groupName) {
            this.clickCreateGroup();
            this.createGroupDialog.fillName(groupName);
            this.createGroupDialog.clickSave();
            logger.info("Successfully created group with name " + groupName);
        }
    },

    /**
     * Selects the group with the name given as parameter from the left panel
     * @param {string} groupName
     * @method selectGroup
     */
    selectGroup: {
        value: function (groupName) {
            var groupFromList = element(By.cssContainingText('li[ng-repeat="group in model.groups"]', groupName));
            Util.waitUntilElementIsVisible(groupFromList);
            groupFromList.click();
            this.cmbSelectTenant.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Return the name of the current selected group
     * @return {string}
     * @method getSelectedGroup
     */
    getSelectedGroup: {
        value: function () {
            return element(By.css("div[class='main-content']>div>h2")).getText();
        }
    },

    /**
     * Provides the add user button
     * @property btnAddUser
     * @type protractor.Element
     */
    btnAddUser: {
        get: function () {
            return element(By.id("toggle-add-group-member"));
        }
    },

    /**
     * Clicks the add user button
     * @method clickAddUser
     */
    clickAddUser: {
        value: function () {
            this.btnAddUser.click()
        }
    },

    /**
     * Provides the input on the people select pop-up
     * @property txtUserSearchBox
     * @type protractor.Element
     */
    txtUserSearchBox: {
        get: function () {
            return element(By.id("people-select-input"))
        }
    },

    /**
     * Fills the text input on the people select group with the text given as parameter (name or email).
     * @param {string} queryString
     * @method fillUserSearchBox
     */
    fillUserSearchBox: {
        value: function (queryString) {
            this.txtUserSearchBox.sendKeys(queryString);
        }
    },

    /**
     * Selects the user from the results in pop-up box.
     * @param {string} userFullName
     * @method selectUserFromList
     */
    selectUserFromList: {
        value: function (_userFullName) {
            var labelUser = element(By.xpath("//*/span[@user-name='user' and contains(text(),'"+ _userFullName+"')]"));
            Util.waitUntilElementIsVisible(labelUser);
            labelUser.click();
        }
    },

    /**
     * Adds an user to the current selected group
     * @param {string} userEmail
     * @param {string} userFullName
     * @method addUserToGroup
     */
    addUserToGroup: {
        value: function (userEmail, userFullName) {
            this.clickAddUser();
            var peopleSelectInput = element(By.id("people-select-input"));
            Util.waitUntilElementIsVisible(peopleSelectInput);
            this.fillUserSearchBox(userEmail);
            this.selectUserFromList(userFullName);
        }
    },

    /**
     * Determines whether or not the user is part of the current select group
     * @param {string} userEmail
     * @method isUserGroupMember
     * @return {boolean}
     */
    isUserGroupMember: {
        value: function (userEmail) {
            return element(By.cssContainingText("tr>td", userEmail)).isDisplayed();

        }
    },

    /**
     * Removes the user given as parameter from the current selected group
     * @param {string} userEmail
     * @method removeUserFromGroup
     */
    removeUserFromGroup: {
        value: function (userEmail) {
            var table = element(by.css("table[class='users ng-scope']"));
            logger.debug("remove user from group");
            Util.waitUntilElementIsVisible(table);
            logger.debug("user table is showed");
            var tableUser = table.element(by.xpath("//*/tr[td[contains(text(),'"+userEmail+"')]]//a[@ng-click='showRemoveMemberModal(user)' ]"));
            Util.waitUntilElementIsVisible(tableUser);
            tableUser.click();
            logger.debug("confirm remove user");
            this.deleteGroupMemberDialog.clickConfirm();
            logger.debug("remove user from group - alert confirm");
        }
    },

    /**
     * Provides the add capability button
     * @property btnAddCapability
     * @type protractor.Element
     */
    btnAddCapability: {
        get: function () {
            return element(by.id("toggle-add-capability"));
        }
    },

    /**
     * Clicks the add capability button
     * @method clickAddCapability
     */
    clickAddCapability: {
        value: function () {
            this.btnAddCapability.click();
        }
    },

    /**
     * Provides the add selected capabilities button
     * @property btnAddSelectedCapabilities
     * @type protractor.Element
     */
    btnAddSelectedCapabilities: {
        get: function () {
            return element(by.css("button[ng-click='addCapabilitiesToGroup();']"));
        }
    },

    /**
     * Clicks the add selected capabilities button
     * @method clickAddSelectedCapabilities
     */
    clickAddSelectedCapabilities: {
        value: function () {
            this.btnAddSelectedCapabilities.click();
        }
    },

    /**
     * Selects the capability given as parameter by clicking it.
     * @param {string} capability
     * @method selectCapability
     */
    selectCapability: {
        value: function (capability) {
            element(by.cssContainingText('div>ul[class="simple-list pack"]>li>span', capability)).click();
        }
    },

    /**
     * Adds the selected capabilities given as array parameter to the group. The parameter should be an array of util.Constants.CAPABILITIES
     * @param {array} capabilities
     * @method addCapabilities
     */
    addCapabilities: {
        value: function (capabilities) {
            this.clickAddCapability();
            for (var i = 0; i < capabilities.length; i++) {
                this.selectCapability(capabilities[i]);
            }
            this.clickAddSelectedCapabilities();
        }
    },

    /**
     * Removes the capability given as parameter
     * @param {string} capability
     * @method removeCapability
     */
    removeCapability: {
        value: function (capability) {
            logger.debug("Removing capability");
            var capabilityXpath = "//*/span[contains(text(),'"+capability+"')]";
            var capability_row = element(by.xpath(capabilityXpath));
            Util.waitUntilElementIsVisible(capability_row);
            logger.debug("capability found");
            browser.actions().
                mouseMove(capability_row).
                perform();
            var removeBtn =  element(by.xpath("//*/li[span[contains(text(),'"+capability+"')]]//i[@class='glyphicon glyphicon-trash']"));
            Util.waitUntilElementIsVisible(removeBtn);
            logger.debug("remove button click");
            removeBtn.click();
            this.deleteCapabilityDialog.clickConfirm();
            logger.debug("confirm removing");
        }
    }
});
