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
var Util = require('../../../../../util/util.js');

/**
 * Provides the save form dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.SaveFormDialog
 */
module.exports = Page.create({
    /**
     * Clicks save and close button
     *
     * @method saveAndClose
     */
    saveAndClose: {
        value: function() {
            var closeBtn = element(by.css("button[ng-click='saveAndClose()']"));
            console.log("Click save and close");
            Util.waitUntilElementIsVisible(closeBtn);
            closeBtn.click();
        }
    },

    save: {
        value: function() {
            var saveBtn = element(by.css("button[ng-click='save()']"));
            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
            Util.waitUntilElementIsNotVisible(saveBtn);
        }
    },

    setFormName: {
        value: function(formName) {
            var formNameField = element(by.id("formName"));
            Util.waitUntilElementIsVisible(formNameField);
            formNameField.clear().sendKeys(formName);
        }
    }
});