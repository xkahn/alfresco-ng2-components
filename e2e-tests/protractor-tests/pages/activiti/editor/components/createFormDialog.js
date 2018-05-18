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

/**
 * Provides the create form dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.createFormDialog
 */
module.exports = Page.create({

    /**
     * Fills in the name for the new process
     *
     * @param name
     * @method fillName
     */
    fillName: {
        value: function(name) {
            element(by.id('newFormName')).sendKeys(name);
        }
    },

    /**
     * Clicks the ok button
     *
     * @method clickOk
     */
    clickOk: {
        value: function() {
            element(by.css('button[ng-click="ok()"]')).click();
        }
    },

    /**
     * Create form
     *
     * @method createForm
     */
    createForm: {
        value: function() {
            return element(by.css("button[ng-click='createForm()']")).click();
        }
    }

});