/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 14/1/2015.
 */

var Page = require('astrolabe').Page;

/**
 * Provides the delete group member dialog within the group page
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.DeleteGroupMemberDialog
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
            return element(by.css("div[class='modal-footer']>button[ng-click='$hide()']"))
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
     * Provides the confirm button
     * @property btnConfirm
     * @type protractor.Element
     */
    btnConfirm: {
        get: function () {
            return element(by.css("button[ng-click='deleteGroupMember(); $hide()']"));
        }
    },

    /**
     * Clicks the confirm button
     * @method clickConfirm
     */
    clickConfirm: {
        value: function () {
            this.btnConfirm.click();
        }
    }
});