/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 05/01/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Constants = require("../../../util/constants.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");

var saveStencilDialog = require("./components/stencils/saveStencilDialog.js");
var deleteStencilDialog = require("./components/stencils/deleteStencilDialog.js");
var shareStencilDialog = require("./components/stencils/shareStencilDialog.js");
var addCommentDialog = require("./components/stencils/addCommentDialog.js");
var dialog = '//div[@ng-controller="StencilToolbarController"]';

/**
 * Provides the Stencil page.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.stencilPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/stencils/ + stencilID'
     */
    url: {
        value: TestConfig.main.webContextRoot + '/editor/#/stencils/'
    },

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function() {
            return navbar;
        }
    },

    /**
     * Provides access on callback to the selected stencil title.
     *
     * @param callback {Function} Provides access to the current selected stencil title
     * @method getStencilTitle
     */
    getStencilTitle: {
        value: function(callback) {
            return element(by.xpath("//div[@id='main']//div[class='fixed-container']/h2")).getText().then(function(text) {
                callback(text);
            });
        }
    },

    /**
     * Clicks favorite this stencil button
     *
     * @method favoritesStencil
     */
    favoritesStencil: {
        value: function() {
            var favBtn = element(by.xpath("//button[@ng-click='toggleFavorite()']"));

            Util.waitUntilElementIsVisible(favBtn);
            favBtn.click();
        }
    },

    /**
     * Clicks share this stencil button
     *
     * @method shareStencil
     */
    shareStencil: {
        value: function() {
            var shareBtn = element(by.xpath("//button[@ng-click='shareStencil()']"));

            Util.waitUntilElementIsVisible(shareBtn);
            shareBtn.click();
        }
    },

    /**
     * Clicks export this stencil button
     *
     * @method exportStencil
     */
    exportStencil: {
        value: function() {
            var exportBtn = element(by.xpath("//a[@title='Export stencil']"));

            Util.waitUntilElementIsVisible(exportBtn);
            exportBtn.click();
        }
    },

    /**
     * Clicks delete this stencil button
     *
     * @method deleteStencil
     */
    deleteStencil: {
        value: function() {
            var deleteBtn = element(by.xpath("//button[@ng-click='deleteStencil()']"));

            Util.waitUntilElementIsVisible(deleteBtn);
            deleteBtn.click();
        }
    },

    /**
     * Clicks the Add comment
     *
     * @method addComment
     */
    addComment: {
        value: function() {
            var addBtn = element(by.xpath("//button[@id='toggle-comment']"));

            Util.waitUntilElementIsVisible(addBtn);
            addBtn.click();
        }
    },

    /**
     * Clicks the save button
     *
     * @method save
     */
    save: {
        value: function() {
            var saveController = element(by.xpath(dialog));

            Util.waitUntilElementIsVisible(saveController);

            var saveBtn = element(by.xpath(dialog + '//button[@title="STENCIL_TOOLBAR.ACTION.SAVE"]'));
            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
        }
    },

    /**
     * Opens the editor for the currently opened stencil
     *
     * @method editStencil
     */
    editStencil: {
        value: function() {
            var editBtn = element(by.xpath("//button[@ng-click='openEditor()']"));

            Util.waitUntilElementIsVisible(editBtn);
            editBtn.click();
        }
    },

    /**
     * Provides the save stencil dialog
     *
     * @property saveStencilDialog
     * @type astrolabe.Page
     */
    saveStencilDialog: {
        get: function() {
            return saveStencilDialog;
        }
    },

    /**
     * Provides the delete stencil dialog
     *
     * @property deleteStencilDialog
     * @type astrolabe.Page
     */
    deleteStencilDialog: {
        get: function() {
            return deleteStencilDialog;
        }
    },

    /**
     * Provides the share stencil dialog
     *
     * @property shareStencilDialog
     * @type astrolabe.Page
     */
    shareStencilDialog: {
        get: function() {
            return shareStencilDialog;
        }
    },

    /**
     * Provides the add comment dialog
     *
     * @property addCommentDialog
     * @type astrolabe.Page
     */
    addCommentDialog: {
        get: function() {
            return addCommentDialog;
        }
    },

    /*
     * Closes stencil editor
     */
    close: {
        value: function() {
            var saveController = element(by.xpath(dialog));

            Util.waitUntilElementIsVisible(saveController);
            var closeBtn = element(by.xpath(dialog + "/button[@title='Close']"));
            Util.waitUntilElementIsVisible(closeBtn);
            closeBtn.click();
        }
    },

    /*
     * @param message
     */
    waitTopMessage: {
        value: function (message) {
            Util.waitUntilElementIsPresent(element(by.xpath("//div[contains(@class, 'alert fadein')]/span[@class='ng-binding' and text()='" + message + "']")));
        }
    }
});