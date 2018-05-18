/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 16/01/2015.
 * Updated by Roxana Diacenco on: Tue Sep 26 2017
 */

/**
 * Page Object for create tenant dialog within the tenant page
 */

var CreateTenantDialog = function () {
    var txtName = element(by.css("input[ng-model='model.editedTenant.name']"));
    var txtDomain = element(by.css("input[ng-model='model.editedTenant.domain']"));
    var inpMaxUsers = element(by.css("input[ng-model='model.editedTenant.maxUsers']"));
    var chkActive = element(by.css("input[type='checkbox']"));
    var btnSave = element(by.css("button[ng-click='saveTenant(); $hide()']"));
    var btnCancel = element(by.css("div[class='modal-footer']>button[ng-click='$hide()']"));

    /**
     * Fill in the tenant name
     * @param {string} name
     */
    this.fillName = function (name) {
        txtName.clear();
        txtName.sendKeys(name);
    };

    /**
     * Fill in the tenant domain
     * @param {string} domain
     */
    this.fillDomain = function (domain) {
        txtDomain.clear();
        txtDomain.sendKeys(domain);
    };

    /**
     * Fill in the max users input
     * @param {string} maxUsers
     */
    this.fillMaxUsers = function (maxUsers) {
        inpMaxUsers.clear();
        inpMaxUsers.sendKeys(maxUsers);
    };

    /**
     * Set the active checkbox to the give state
     * @param {boolean} active
     */
    this.setActive = function (active) {
        chkActive.isSelected().then(function (selected) {
            if (selected != active) {
                chkActive.click();
            }
        });
    };

    /**
     * Click the save button
     */
    this.clickSave = function () {
        btnSave.click();
    };

    /**
     * Click the cancel button
     */
    this.clickCancel = function () {
        btnCancel.click();
    };
};

module.exports = CreateTenantDialog;