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
 * Provides the document details page for an item.
 * @module pages
 * @submodule share
 * @class pages.share.DocumentDetailsPage
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
     * Starts the workflow for the current document.
     * @method startWorkflow
     */
    startWorkflow: {
        value: function () {
            var start = element(by.css("div[id='onActionAssignWorkflow']>a"));

            Util.waitUntilElementIsVisible(start);
            start.click();
        }
    },

    /**
     * Provides the involvement in other workflows for the current document.
     * @method isPartOfWorkflow
     */
    isPartOfWorkflow: {
        value: function (callback) {
            element(by.cssContainingText('div[class="info"]', 'This document is not part of any workflows.')).isPresent().then(function (status) {
                callback(status);
            })
        }
    }

});