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
var Constants = require('../../../../util/constants.js');

/**
 * Provides the edit status dialog within the user page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.EditUserStatusDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the status button
     * @property btnStatus
     * @type protractor.Element
     */
    btnStatus: {
        get: function () {
            return element(by.css("div[class='form-group']>div>button"));
        }
    },

    /**
     * Selects the new status for the user. The status parameter should be one of util.Constants.STATUS
     * @param {string} status
     * @method selectStatus
     */
    selectStatus: {
        value: function (status) {
            this.btnStatus.click();
            switch (status) {
                case Constants.STATUS.ACTIVE:
                    element(by.xpath("//div/ul/li[1]/a[@ng-click='setStatus(status)']")).click();
                    break;
                case Constants.STATUS.INACTIVE:
                    element(by.xpath("//div/ul/li[2]/a[@ng-click='setStatus(status)']")).click();
                    break;
                case Constants.STATUS.PENDING:
                    element(by.xpath("//div/ul/li[3]/a[@ng-click='setStatus(status)']")).click();
                    break;
                case Constants.STATUS.DELETED:
                    element(by.xpath("//div/ul/li[4]/a[@ng-click='setStatus(status)']")).click();
                    break;
            }
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
     * Provides the update button
     * @property btnUpdate
     * @type protractor.Element
     */
    btnUpdate: {
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
            this.btnUpdate.click();
        }
    }

});
