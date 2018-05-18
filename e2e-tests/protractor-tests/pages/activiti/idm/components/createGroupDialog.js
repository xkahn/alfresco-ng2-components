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
 * Provides the create group dialog within the group page.
 * @module pages
 * @submodule activiti
 * @submodule idm
 * @class pages.activiti.idm.components.CreateGroupDialog
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
     * Provides the save button
     * @property btnSave
     * @type protractor.Element
     */
    btnSave: {
        get: function () {
            return element(by.css("button[ng-click='saveGroup(); $hide()']"));
        }
    },

    /**
     * Clicks the save button
     * @method clickSave
     */
    clickSave: {
        value: function () {
            this.btnSave.click();
        }
    },

    /**
     * Provides the text input for the group name
     * @property txtName
     * @type protractor.Element
     */
    txtName: {
        get: function () {
            return element(by.css("div[class='modal-body']>div>input"))
        }
    },

    /**
     * Fills in the name for the new group
     * @param {string} name
     * @method fillName
     */
    fillName: {
        value: function (name) {
            this.txtName.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
            this.txtName.sendKeys(protractor.Key.BACK_SPACE);
            this.txtName.sendKeys(name);
        }
    }
});
