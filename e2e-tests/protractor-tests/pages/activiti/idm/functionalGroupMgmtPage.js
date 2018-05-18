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
var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");
var createGroupDialog = require("./components/createGroupDialog.js");
var deleteGroupMemberDialog = require("./components/deleteGroupMemberDialog.js");

/**
 * Provides the functional group (Organization) page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.FunctionalGroupMgmtPage
 */

var loadingGroup = element(by.xpath("//div[@ng-show='!model.loadingGroup']"));

module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/idm/#/functional-group-mgmt'
     */
    url: {value: TestConfig.main.webContextRoot + '/idm/#/functional-group-mgmt'},

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

    /**
     * Provides the delete group dialog
     * @property deleteGroupDialog
     * @type astrolabe.Page
     */
    deleteGroupMemberDialog: {
        get: function () {
            return deleteGroupMemberDialog;
        }
    },

    /**
     * Provides the create group button
     * @property btnCreateGroup
     * @type protractor.Element
     */
    btnCreateGroup: {
        get: function () {
            return element(by.css("[ng-click='showCreateGroupPopup()']"));
        }
    },

    /**
     * Provides the combobox for tenant selecting
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
     * @method clickCreateGroup
     */
    clickCreateGroup: {
        value: function () {
            this.btnCreateGroup.click();
        }
    },

    /**
     * Selects the tenant given as parameter
     * @param {string] tenant
     * @method selectTenant
     */
    selectTenant: {
        value: function (tenant) {
            this.cmbSelectTenant.click();
            element(by.cssContainingText("div[id='main-list']>div>div>select>option", tenant)).click();
            this.cmbSelectTenant.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Creates a group with the given groupName parameter within the selected tenant
     * @param {string} groupName
     * @method createGroup
     */
    createGroup: {
        value: function (groupName) {
            this.clickCreateGroup();
            this.createGroupDialog.fillName(groupName);
            this.createGroupDialog.clickSave();
            logger.debug("Successfully created group with name " + groupName);
        }
    },

    /**
     * Selects the group give as parameter
     * @param {string} groupName
     * @method selectGroup
     */
    selectGroup: {
        value: function (groupName) {
            var groupList = element(By.xpath("//*/div[@class='group-tree']"));
            Util.waitUntilElementIsVisible(groupList);
            var groupToSelect = groupList.element(By.cssContainingText("span",groupName));
            Util.waitUntilElementIsVisible(groupToSelect);
            groupToSelect.click();
            this.cmbSelectTenant.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
        }
    },

    /**
     * Returns the current selected group.
     * @return {string} The current selected group
     * @method getSelectedGroup
     */
    getSelectedGroup: {
        value: function () {
            return element(By.css("div[class='main-content']>div>h2")).getText();
        }
    },

    /**
     * Provides the add user button
     * @property btnAdduser
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
        value: function (userFullName) {
            var userToSelect = element(By.xpath("//*/span[@user-name='user' and contains(text(),'" + userFullName + "')]"));
            Util.waitUntilElementIsVisible(userToSelect);
            userToSelect.click();
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
     //a[@ng-click='showRemoveMemberModal(user)']
    removeUserFromGroup: {
        value: function (userEmail) {
            var userOnTable = element(by.xpath("//*/table[//td[contains(text(),'"+userEmail+"')]]"));
            //browser.pause();
            Util.waitUntilElementIsVisible(userOnTable);
            logger.debug("Table USER is present");
            userOnTable.element(by.xpath("//a[@ng-click='showRemoveMemberModal(user)']")).click();
            Util.waitUntilElementIsVisible(this.deleteGroupMemberDialog.btnConfirm);
            this.deleteGroupMemberDialog.clickConfirm();
        }
    },

    /**
     * Provides the add manager to group
     * @property btnAddManager
     * @type protractor.Element
     */
    btnAddManager: {
        get: function () {
            return element(by.id('toggle-select-group-manager'));
        }
    },

    /**
     * clicking add manager button
     * @method clickAddManager
     */
    clickAddManager: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnAddManager);
            this.btnAddManager.click();
        }
    },

    /**
     * Add user as group Manager
     * @param userEmail {String}
     * @param userFullName {String}
     * @method addUserAsGroupManager
     */
    addUserAsGroupManager: {
        value: function (userEmail, userFullName) {
            this.clickAddManager();
            this.fillUserSearchBox(userEmail);
            this.selectUserFromList(userFullName);
        }
    },

    /**
     * groupManager name locator
     * @method groupManagerNameLocator
     */
    groupManagerNameLocator: {
        get: function () {
            return element(by.binding('model.selectedGroup.manager.fullname'));
        }
    },

    /**
     * Get full name of group-manager
     * @method getGroupManagerFullName
     */
    getGroupManagerFullName: {
        get: function () {
            return this.groupManagerNameLocator.getText();
        }
    },

    /**
     * delete groupManager button locator
     * @method deleteGroupManagerBtn
     */
    deleteGroupManagerBtn: {
        get: function () {
            return element(by.css('div[class="actions"]')).element(by.css('.glyphicon.glyphicon-trash'));
        }
    },

    /**
     * delete group manager
     * @method deleteGroupManager
     */
    deleteGroupManager: {
        value: function () {
            Util.waitUntilElementIsVisible(this.groupManagerNameLocator);
            this.groupManagerNameLocator.click();
            Util.waitUntilElementIsVisible(this.deleteGroupManagerBtn);
            this.deleteGroupManagerBtn.click();
        }
    },

    isOrganizationPageDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(loadingGroup);
            Util.waitUntilElementIsVisible(createGroup);
        }
    }
});