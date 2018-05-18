/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 27/01/2015.
 */

var Page = require('astrolabe').Page;
var Util = require('../../../../util/util.js');

/**
 * Provides the edit user tenant dialog within the users page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.EditUserTenantDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Selects the new tenant for the user
     * @param {string} tenant
     * @method selectTenant
     */
    selectTenant: {
        value: function (tenant) {
            element(by.cssContainingText('select[ng-model="model.updateUsers.tenantId"]>option', tenant)).click();
        }
    },

    /**
     * Provides the cancel button
     * @property btnCancel
     * @type protractor.Element
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
     * Provides the update users button
     * @property btnUpdateUsers
     * @type protractor.Element
     */
    btnUpdateUsers: {
        get: function () {
            return element(by.css('button[ng-click="updateUsers();$hide()"]'));
        }
    },

    /**
     * Clicks the update users button
     * @method clickUpdateUsers
     */
    clickUpdateUsers: {
        value: function () {
            this.btnUpdateUsers.click();
        }
    }

});
