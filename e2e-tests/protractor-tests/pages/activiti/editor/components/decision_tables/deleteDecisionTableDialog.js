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
var deleteDialog = "//div[@ng-controller='DeleteModelPopupCrtl']";

/**
 * Provides the delete decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.deleteDecisionTableDialog
 */
module.exports = Page.create({
    /**
     * Clicks the duplicate decision table button
     *
     * @method deleteDecisionTable
     */
    deleteDecisionTable: {
        value: function() {
            var deleteElem = element(by.xpath(deleteDialog + '//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(deleteElem);
            deleteElem.click();
        }
    }
});