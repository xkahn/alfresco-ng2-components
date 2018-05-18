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
var duplicateDialog = "//div[@ng-controller='DuplicateDecisionTableCtrl']";

/**
 * Provides the duplicate decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.cloneDecisionTableDialog
 */
module.exports = Page.create({
    /**
     * Clicks the duplicate decision table button
     *
     * @method duplicateDecisionTable
     */
    duplicateDecisionTable: {
        value: function() {
            var duplicateElem = element(by.xpath(duplicateDialog + '//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(duplicateElem);
            duplicateElem.click();
        }
    },

    /**
     * Enter decision table name
     *
     * @param decisionTableName {String}
     * @method fillName
     */
    fillName: {
        value: function(decisionTableName) {
            var nameElem = element(by.xpath(duplicateDialog + '//input[@id="newFormName"]'));

            Util.waitUntilElementIsVisible(nameElem);
            nameElem.clear().sendKeys(decisionTableName);
        }
    },

    /**
     * Enter decision table name
     *
     * @param description {String}
     * @method fillDescription
     */
    fillDescription: {
        value: function(description) {
            var descElem = element(by.xpath(duplicateDialog + '//textarea[@id="newFormDescription"]'));

            Util.waitUntilElementIsVisible(descElem);
            descElem.clear().sendKeys(description);
        }
    }
});