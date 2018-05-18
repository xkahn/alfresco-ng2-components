/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 07/04/17.
 */

var Util = require('../../../../../util/util.js');
var Page = require("astrolabe").Page;

/**
 * Provides the general edit dialog locators
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.generalEditFieldDialog
 */
module.exports = Page.create({
    /**
     * Closes the edit dialog
     *
     * @method closeDialog
     */
    close: {
        value: function () {
            var closeButton = element(by.css('button[ng-click="doneEditing()"]'));
            Util.waitUntilElementIsVisible(closeButton);
            closeButton.click();
        }
    }


});