/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 15/06/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../util/util.js");

/**
 * Provides the create process dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.createProcessDialog
 */
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
            nameElem.sendKeys(name);
            Util.waitUntilElementHasValue(nameElem, name);
        }
    },

    /**
     * Selects the desired type for the process
     *
     * @param type
     * @method selectType
     */
    selectEditorType: {
        value: function(type) {
            var typeElem = element(by.cssContainingText('select[id="typeSelect"]>option', type));

            Util.waitUntilElementIsVisible(typeElem);
            typeElem.click();
        }
    },

    /**
     * Clicks the ok button
     *
     * @method clickOk
     */
    clickOk: {
        value: function() {
            var okBtn = element(by.css('button[ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(okBtn);
            okBtn.click();
        }
    }
});