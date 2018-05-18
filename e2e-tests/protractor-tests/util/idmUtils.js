/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mon July 24 2017
 */

var TenantMgmtPage = require('../pages/activiti/idm/tenantMgmtPage');

var IdmUtils = function () {

    var tenantMgmtPage = new TenantMgmtPage();

    // Set Date Format at tenant configuration level
    this.setDateFormat = function(tenantName, dateFormat) {
        this.goToTenantConfig(tenantName);
        tenantMgmtPage.setDateFormatInForms(dateFormat);
    };

    /**
     * Enable/disable 'Involved users can edit forms' at tenant configuration level
     * 
     * @param tenantName 
     * @param enable - true - enable the feature by checking the checkbox
     *                 false - disable the feature by un-checking the checkbox 
     */
    this.setInvolvedUsersCanEditForms = function(tenantName, enable) {
        this.goToTenantConfig(tenantName);
        tenantMgmtPage.setInvolveUsersCanEditForm(enable);
    };

    this.goToTenantConfig = function (tenantName) {
        tenantMgmtPage.go();
        tenantMgmtPage.selectTenant(tenantName);
        tenantMgmtPage.openConfig();
    };
};

module.exports = IdmUtils;
