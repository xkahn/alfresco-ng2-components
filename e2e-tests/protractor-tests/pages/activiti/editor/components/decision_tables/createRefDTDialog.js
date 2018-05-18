/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 2/2/2016.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");

/**
 * Provides the referenced create decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.createRefDTDialog
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
            var nameElem = element(by.id('newDecisionTableName'));

            Util.waitUntilElementIsVisible(nameElem);
            nameElem.sendKeys(name);
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
            var descElem = element(by.id('newDecisionTableDescription'));

            Util.waitUntilElementIsVisible(descElem);
            descElem.sendKeys(description);
        }
    },

    /**
     * Clicks the Create Decision Table button
     *
     * @method clickCreateDT
     */
    clickCreateDT: {
        value: function() {
            var createElem = element(by.xpath('//button[@ng-click="createDecisionTable()"]'));

            Util.waitUntilElementIsVisible(createElem);
            createElem.click();
        }
    }
});