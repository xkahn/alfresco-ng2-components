/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 15/06/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../util/util.js");

/**
 * Provides the save app dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.saveAppDialog
 */
module.exports = Page.create({

    /**
     * Clicks the publish checkbox (checks it)
     *
     * @method clickPublish
     */
    clickPublish: {
        value: function() {
            Util.waitUntilElementIsVisible(element(by.css('input[ng-model="saveDialog.publish"]')));
            element(by.css('input[ng-model="saveDialog.publish"]')).click();
        }
    },

    /**
     * Clicks the ok button
     *
     * @method clickOk
     */
    saveAndClose: {
        value: function() {
            var saveBtn = element(by.css('button[ng-click="saveAndClose()"]'));

            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
            Util.waitUntilElementIsStale(saveBtn);
            Util.waitUntilElementIsNotVisible(element(by.xpath("//div[@ng-controller='SaveAppDefinitionCtrl']")));
        }
    },

    /**
     * Clicks the Save button
     *
     * @method clickSave
     */
    save: {
        value: function() {
            var saveBtn = element(by.css('button[ng-click="save()"]'));

            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
            Util.waitUntilElementIsStale(saveBtn);
        }
    }
});