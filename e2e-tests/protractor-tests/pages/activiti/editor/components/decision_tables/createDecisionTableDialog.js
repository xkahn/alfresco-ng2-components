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

/**
 * Provides the create decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.createDecisionTableDialog
 */
module.exports = Page.create({

    /**
     * Fills in the name for the new decision table
     *
     * @param name
     * @method fillName
     */
    fillName: {
        value: function(name) {
            var nameElem = element(by.id('newFormName'));

            Util.waitUntilElementIsVisible(nameElem);
            nameElem.sendKeys(name);
            Util.waitUntilElementHasValue(nameElem, name);
        }
    },

    /**
     * Fills in the description for the new decision table
     *
     * @param description
     * @method fillName
     */
    fillDescription: {
        value: function(description) {
            var descElem = element(by.id('newFormDescription'));

            Util.waitUntilElementIsVisible(descElem);
            descElem.sendKeys(description);
        }
    },

    /**
     * Clicks the ok button
     *
     * @method clickOk
     */
    clickOk: {
        value: function() {
            var okElem = element(by.xpath('//div[@ng-controller="CreateNewDecisionTableCtrl"]//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(okElem);
            okElem.click();
        }
    }
});