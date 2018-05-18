/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 05/01/2016.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");

/**
 * Provides the create decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.stencils.createStencilDialog
 */
module.exports = Page.create({

    /**
     * Fills in the name for the new stencil
     *
     * @param name
     * @method fillName
     */
    fillName: {
        value: function (name) {
            var nameElem = element(by.id('newStencilName'));

            Util.waitUntilElementIsVisible(nameElem);
            nameElem.sendKeys(name);
            Util.waitUntilElementHasValue(nameElem, name);
        }
    },

    /**
     * Fills in the description for the new stencil
     *
     * @param description
     * @method fillDescription
     */
    fillDescription: {
        value: function(description) {
            var descName = element(by.id('newStencilDescription'));

            Util.waitUntilElementIsVisible(descName);
            descName.sendKeys(description);
            Util.waitUntilElementHasValue(descName,description);
        }
    },

    /**
     * Select the editor type for the new stencil
     *
     * @param editorType
     * @method selectEditorType
     */
    selectEditorType: {
        value: function(editorType) {
            var typeElem = element(by.id('typeSelect'));

            Util.waitUntilElementIsVisible(typeElem);
            typeElem.sendKeys(editorType);
        }
    },

    /**
     * Clicks the Create New Stencil button
     *
     * @method clickCreateNewStencil
     */
    clickCreateNewStencil: {
        value: function() {
            var createBtn = element(by.xpath('//div[@ng-controller="CreateNewStencilCrtl"]//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(createBtn);
            createBtn.click();
        }
    }
});
