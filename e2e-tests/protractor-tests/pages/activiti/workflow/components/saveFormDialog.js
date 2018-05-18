/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 05/06/2015.
 */

var Page = require("astrolabe").Page;
var Util = require('../../../../util/util.js');

/**
 * Provides the save form dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.SaveFormDialog
 */
module.exports = Page.create({

    saveAndClose: {
        value: function() {
            var closeBtn = element(by.xpath('//button[@ng-click="saveAndClose()"]'));

            Util.waitUntilElementIsVisible(closeBtn);
            closeBtn.click();
            Util.waitUntilElementIsStale(closeBtn);
        }
    },

    save: {
        value: function() {
            var saveBtn = element(by.xpath('//button[@ng-click="save()"]'));

            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
            Util.waitUntilElementIsStale(saveBtn);
        }
    }
});