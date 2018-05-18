/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 11/18/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");
var saveDialog = "//div[@ng-controller='SaveStencilCtrl']";

/**
 * Provides the save stencil dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.saveStencilDialog
 */
module.exports = Page.create({
    /**
     * Clicks the Save and Close button
     *
     * @method saveAndClose
     */
    saveAndClose: {
        value: function() {
            var saveBtn = element(by.xpath(saveDialog + '//button[@ng-click="saveAndClose()"]'));

            Util.waitUntilElementIsVisible(saveBtn);
            Util.waitUntilElementIsClickable(saveBtn);
            saveBtn.click();
            Util.waitUntilElementIsStale(saveBtn);
        }
    }
});