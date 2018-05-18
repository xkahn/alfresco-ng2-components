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
 * Provides the document library page for a site.
 * @module pages
 * @submodule share
 * @class pages.share.DocumentLibraryPage
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
     * Opens the item specified by the path param
     * @param {string} path
     * @method openItem
     */
    openItem: {
        value: function (path) {
            var pathDirs = path.split('/');
            shareUtil.waitForPage();

            for (var i = 0; i < pathDirs.length; i++) {

                // Wait untill the element is present (js loading)
                Util.waitUntilElementIsVisible(element(by.cssContainingText('h3>span>a', pathDirs[i])));

                // Actually clicking the element
                element(by.cssContainingText('h3>span>a', pathDirs[i])).click();
            }
        }
    },

    /**
     * Provides the select button for files.
     * @property selectButton
     * @type protractor.Element
     */
    selectButton: {
        get: function () {
            return element(by.css("button[id$=fileSelect-button-button]"));
        }
    },

    /**
     * Clicks the select button
     * @method clickSelect
     */
    clickSelect: {
        value: function () {
            Util.waitUntilElementIsVisible(this.selectButton);
            this.selectButton.click();
        }
    },

    /**
     * Provides the select all button
     * @property selectAllButton
     * @type protractor.Element
     */
    selectAllButton: {
        get: function () {
            return element(by.css("div>ul>li>a>span[class='selectAll']"));
        }
    },

    /**
     * Clicks the select all button
     * @method clickSelectAll
     */
    clickSelectAll: {
        value: function () {
            Util.waitUntilElementIsVisible(this.selectAllButton);
            this.selectAllButton.click()
        }
    },

    /**
     * Provides the selected items button
     * @property selectedItemsButton
     * @type protractor.Element
     */
    selectedItemsButton: {
        get: function () {
            return element(by.css("button[id$=selectedItems-button-button]"));
        }
    },

    /**
     * Clicks the selected items button
     * @method clickSelectedItemsButton
     */
    clickSelectedItems: {
        value: function () {
            this.selectedItemsButton.click();
        }
    },

    /**
     * Provides the start workflow button
     * @property startWorkflowButton
     * @type protractor.Element
     */
    startWorkflowButton: {
        get: function () {
            return element(by.css("div>ul>li>a>span[class='onActionAssignWorkflow']"));
        }
    },

    /**
     * Clicks the start workflow button under selected items menu
     * @method clickStartWorkflow
     */
    clickStartWorkflow: {
        value: function () {
            Util.waitUntilElementIsVisible(this.startWorkflowButton);
            this.startWorkflowButton.click();
        }
    }

});