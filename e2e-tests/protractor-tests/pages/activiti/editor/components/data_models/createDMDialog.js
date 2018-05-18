/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 18/07/2016.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");

/**
 * Provides the create data model dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.stencils.createDMDialog
 */
module.exports = Page.create({

    /**
     * Fills in the name for the new data model
     *
     * @param name
     * @method fillName
     */
    fillName: {
        value: function (name) {
            var nameElem = element(by.id('newDataModelName'));

            Util.waitUntilElementIsVisible(nameElem);
            nameElem.sendKeys(name);
            Util.waitUntilElementHasValue(nameElem, name);
        }
    },

    /**
     * Fills in the description for the new data model
     *
     * @param description
     * @method fillDescription
     */
    fillDescription: {
        value: function(description) {
            var descName = element(by.id('newDataModelDescription'));

            Util.waitUntilElementIsVisible(descName);
            descName.sendKeys(description);
            Util.waitUntilElementHasValue(descName,description);
        }
    },

    /**
     * Clicks the Create New Data Model button
     *
     * @method clickCreateNewDM
     */
    clickCreateNewDM: {
        value: function() {
            var createBtn = element(by.xpath('//div[@ng-controller="CreateNewDataModelCtrl"]//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(createBtn);
            createBtn.click();
        }
    }
});
