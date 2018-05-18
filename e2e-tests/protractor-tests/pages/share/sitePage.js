/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 27/3/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");
var shareUtil = require("../../util/shareUtil.js");

/**
 * Provides a Site Page.
 * @module pages
 * @submodule share
 * @class pages.share.SitePage
 */
module.exports = Page.create({

    /**
     * Waits untill the page is fully rendered
     * @method render
     */
    render: {
        value: function () {
            shareUtil.waitForPage();
        }
    },

    /**
     * Opens the document library for the current site.
     * Assumes site page is opened.
     * @method openDocumentLibrary
     */
    openDocumentLibrary: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.id("HEADER_SITE_DOCUMENTLIBRARY")));
            element(by.id("HEADER_SITE_DOCUMENTLIBRARY")).click();
        }
    }
});