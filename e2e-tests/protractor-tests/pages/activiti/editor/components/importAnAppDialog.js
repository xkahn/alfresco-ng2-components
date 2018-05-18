/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

var Page = require('astrolabe').Page;

/**
 * Provides the import a process dialog.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.ImportAnAppDialog
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
            return element(by.css("div[class='import-process-form']>input[type='file']"));
        }
    }
});
