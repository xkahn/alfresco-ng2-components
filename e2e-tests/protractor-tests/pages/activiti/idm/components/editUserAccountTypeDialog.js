/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 28/01/2015.
 */

var Page = require('astrolabe').Page;
var Constants = require('../../../../util/constants.js');
var TestConfig = require("../../../../test.config.js");
var EC = protractor.ExpectedConditions;

/**
 * Provides the edit user account type dialog within the users page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.EditUserAccountTypeDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the type button
     * @property btnType
     * @type protractor.Element
     */
    btnType: {
        get: function () {
            return element(by.xpath("//div[@class='modal-body']/div/div[@class='btn-group']/button"));
        }
    },

    /**
     * Selects the new type for the user based on the given parameter. The parameter for this method should be a member of util.Constants.TYPE
     * @param {string} type
     * @method selectType
     */
    selectType: {
        value: function (type) {
            this.btnType.click();
            switch (type) {
                case Constants.TYPE.TRIAL:
                    element(by.xpath('//div[@class="modal-body"]/div/div/ul/li[1]/a')).click();
                    break;
                case Constants.TYPE.ENTERPRISE:
                    element(by.xpath('//div[@class="modal-body"]/div/div/ul/li[2]/a')).click();
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
