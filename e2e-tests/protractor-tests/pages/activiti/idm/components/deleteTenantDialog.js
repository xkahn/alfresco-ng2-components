/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Lucian Tuca on 16/01/2015
 *
 * Updated by Roxana Diacenco on: Fri Sep 21 2017
 */

/**
 * Provides the delete tenant dialog within the tenants page
 */
var DeleteTenantDialog = function () {
    var btnCancel = element(by.css("div[class='modal-footer']>button[ng-click='$hide()']"));
    var btnConfirm = element(by.css("button[ng-click='deleteTenant(); $hide()']"));

    this.clickCancel = function () {
        btnCancel.click();
    };

    this.clickConfirm = function () {
		btnConfirm.click();
    };
};

module.exports = DeleteTenantDialog;