/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 05/01/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");
var deleteDialog = "//div[@ng-controller='StencilDeleteCtrl']";

/**
 * Provides the delete stencil dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.deleteStencilDialog
 */
module.exports = Page.create({
    /**
     * Clicks the delete stencil button
     *
     * @method deleteStencil
     */
    deleteStencil: {
        value: function() {
            var okBtn = element(by.xpath(deleteDialog + '//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsPresent(okBtn);
            Util.waitUntilElementIsClickable(okBtn);
            okBtn.click();
            Util.waitUntilElementIsStale(okBtn);
        }
    }
});