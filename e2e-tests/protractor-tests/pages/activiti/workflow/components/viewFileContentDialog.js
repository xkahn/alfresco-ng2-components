/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Wed 17 Aug 2017
 */
var Page = require("astrolabe").Page;
var Util = require('../../../../util/util.js');
/**
 * Provides the locator for view file content dialog
 */
module.exports = Page.create({

    /**Provides located for the file content(all text within the file)
     * @property contentOfTheUploadedFileLink
     * @type protractor.Element
     */
    contentOfTheUploadedFileLink: {
        get: function () {
            Util.waitUntilElementIsVisible(element(by.xpath('//*[@id="pageContainer1"]/div[2]/div[6]')));
            return element(by.xpath('//*[@id="pageContainer1"]/div[2]'))
        }
    },

    /**
     * Switching to view content frame
     * @property switchToContentViewFrame
     * @type protractor.Element
     */
    switchToContentViewFrame: {
        value: function () {
            browser.ignoreSynchronization = true;
            browser.driver.switchTo().defaultContent(); // you are now outside both frames
            browser.driver.switchTo().frame(browser.driver.findElement(by.tagName('iframe')));
            Util.waitUntilElementIsVisible(this.contentOfTheUploadedFileLink);
        }
    },

    /** Gets all the text for the file in view frame
     *  @property getContentOfTheFile
     */
    getContentOfTheFile: {
        value: function () {
            return this.contentOfTheUploadedFileLink.getText();
        }
    }

});

