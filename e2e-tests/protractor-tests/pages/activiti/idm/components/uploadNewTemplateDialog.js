/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Wed 16 Aug 2017
 */
var Page = require("astrolabe").Page;

/**
 * Provides the upload new template locators
 */
module.exports = Page.create({

    /**
     * Provides the choosefile button locator
     * @property chooseFileButton
     * @type protractor.Element
     */
    chooseFileButton: {
        get: function () {
            return element(by.css("div[class='upload-document-template']>input[type='file']"));
        }
    }

});

