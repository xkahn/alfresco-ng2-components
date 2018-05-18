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
 * Provides the save process dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.SaveProcessDialog
 */

var saveAndCloseButton = element(by.xpath(".//button[text()='Save and close editor']"));

module.exports = Page.create({

    /**
     * Fills in the name for the new process
     *
     * @param name
     * @method fillName
     */
    fillName: {
        value: function (name) {
            var nameElem = element(by.id('newProcessName'));

            Util.waitUntilElementIsVisible(nameElem);
            nameElem.clear().sendKeys(name);
            Util.waitUntilElementHasValue(nameElem, name);
        }
    },

    /**
     * Clicks save and close button
     *
     * @method saveAndClose
     */
    saveAndClose: {
        value: function() {
            Util.waitUntilElementIsVisible(saveAndCloseButton);
            saveAndCloseButton.click();
            Util.waitUntilElementIsNotVisible(saveAndCloseButton);
        }
    }
});