/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 07/01/2016.
 */

var Page = require('astrolabe').Page;
var dialog = "//div[@ng-controller='ImportStencilCtrl']";

/**
 * Provides the import a stencil dialog.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.ImportAStencilDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the upload input field
     *
     * @property fileInputField
     * @type protractor.Element
     */
    fileInputField: {
        get: function () {
            return element(by.xpath(dialog + "//div[@class='import-process-form']/input[@type='file']"));
        }
    },

    /**
     * Provides the dialog
     *
     * @property dialogImport
     * @type protractor.Element
     */
    dialogImport: {
        get: function () {
            return element(by.xpath(dialog));
        }
    }
});
