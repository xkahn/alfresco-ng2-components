/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 9/1/2015.
 */

var Page = require('astrolabe').Page;

/**
 * Provides the change password dialog within personal profile page.
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.ChangePasswordDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the cancel button
     * @property btnCancel
     * @type protractor.Element
     */
    btnCancel: {
        get: function () {
            return element(by.css("button[ng-click='$hide()']"))
        }
    },

    /**
     * Provides the confirm button
     * @property btnConfirm
     * @type protractor.Element
     */
    btnConfirm: {
        get: function () {
            return element(by.css("button[ng-click='changePassword();']"));
        }
    },
    /**
     * Provides the original password text input
     * @property txtOriginalPassword
     * @type protractor.Element
     */
    txtOriginalPassword: {
        get: function () {
            return element(by.css("input[ng-model='model.changePassword.originalPassword']"))
        }
    },

    /**
     * Provides the new password text input
     * @property txtNewPassword
     * @type protractor.Element
     */
    txtNewPassword: {
        get: function () {
            return element(by.css("input[ng-model='model.changePassword.newPassword']"))
        }
    },

    /**
     * Provides the repeat new password text input
     * @property txtRepeatNewPassword
     * @type protractor.Element
     */
    txtRepeatNewPassword: {
        get: function () {
            return element(by.css("input[ng-model='model.changePassword.newPassword2']"));
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
     * Clicks the confirm button.
     * @method clickConfirm
     */
    clickConfirm: {
        value: function () {
            this.btnConfirm.click();
        }
    },

    /**
     * Fills the original password text input.
     * @method fillOriginalPassword
     */
    fillOriginalPassword: {
        value: function (originalPassword) {
            this.txtOriginalPassword.sendKeys(originalPassword);
        }
    },

    /**
     * Fills the new password text input.
     * @method fillNewPassword
     */
    fillNewPassword: {
        value: function (newPassword) {
            this.txtNewPassword.sendKeys(newPassword);
        }
    },

    /**
     * Fills the repeat new password text input
     * @method fillRepeatNewPassword
     */
    fillRepeatNewPassword: {
        value: function (repeatNewPassword) {
            this.txtRepeatNewPassword.sendKeys(repeatNewPassword)
        }
    }
});