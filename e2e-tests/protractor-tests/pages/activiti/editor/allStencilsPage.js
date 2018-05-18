/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 05/1/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");
var importAStencilDialog = require("./components/stencils/importAStencilDialog.js");
var createStencilDialog = require("./components/stencils/createStencilDialog.js");

/**
 * Provides the all stencils page within the "Kickstart" application.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.AllStencilsPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/stencils'
     */
    url: {
        value: TestConfig.main.webContextRoot + '/editor/#/stencils'
    },

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar;
        }
    },

    /**
     * Provides the create a stencil dialog
     *
     * @property createStencilDialog
     * @type astrolabe.Page
     */
    createStencilDialog: {
        get: function () {
            return createStencilDialog;
        }
    },

    /**
     * Provides stencil section
     *
     * @method getStencilListSection
     */
    getStencilListSection: {
        get: function () {
            return "//div[@ng-repeat='stencil in model.stencils.data track by $index']";
        }
    },

    /**
     * Selects a stencil given its index in the list
     *
     * @param index
     * @method selectStencilByIndex
     */
    selectStencilByIndex: {
        value: function (index) {
            var stencilElem = element(by.xpath(this.getStencilListSection + "[" + index + "]//div[@class='item-box']//h3"));

            Util.waitUntilElementIsPresent(stencilElem);
            Util.waitUntilElementIsClickable(stencilElem);
            stencilElem.click();
            Util.waitUntilElementIsStale(stencilElem);
        }
    },

    /**
     * Provide stencil by name
     *
     * @param stencilName
     * @method getStencilByName
     */
    getStencilByName: {
        value: function (stencilName) {
            return element(by.css("h3[title='" + stencilName + "']"));
        }
    },

    /**
     * Provides the dialog that shows when importing a stencil.
     *
     * @property importAStencilDialog
     * @type astrolabe.Page
     */
    importAStencilDialog: {
        get: function () {
            return importAStencilDialog;
        }
    },

    /**
     * Provides the import button.
     *
     * @property btnImportStencil
     * @type protractor.Element
     */
    btnImportStencil: {
        get: function () {
            return element(by.xpath("//div[@class='fixed-container']/div/button[@ng-click='importStencil()']"));
        }
    },

    /**
     * Clicks the import stencil button
     *
     * @method clickImportStencil
     */
    clickImportStencil: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnImportStencil);
            this.btnImportStencil.click();
        }
    },

    /**
     * Imports a stencil to the web application
     *
     * @param {String} pathToStencilToUpload The path of the .zip archive which contains the stencil
     * @method uploadApp
     */
    uploadStencil: {
        value: function (pathToStencilToUpload) {
            this.clickImportStencil();
            Util.waitUntilElementIsVisible(this.importAStencilDialog.fileInputField);
            Util.uploadFile(this.importAStencilDialog.fileInputField, this.importAStencilDialog.fileInputField, pathToStencilToUpload);
            Util.waitUntilElementIsNotVisible(this.importAStencilDialog.dialogImport);
        }
    },

    /**
     * Clicks the create stencil button
     *
     * @method clickCreateStencil
     */
    clickCreateStencil: {
        value: function () {
            var createBtn = element(by.buttonText('Create Stencil'));
            Util.waitUntilElementIsVisible(createBtn);
            createBtn.click();
        }
    },

    /**
     * Creates a new stencil with the given name
     *
     * @param stencilName
     * @method createNewStencil
     */
    createNewStencil: {
        value: function (stencilName, stencilType) {
            this.clickCreateStencil();
            this.createStencilDialog.fillName(stencilName);
            this.createStencilDialog.selectEditorType(stencilType);
            this.createStencilDialog.clickCreateNewStencil();
        }
    },

    /**
     * Creates a new stencil with the given name and description
     *
     * @param stencilName
     * @method createNewStencilWithDesc
     */
    createNewStencilWithDesc: {
        value: function (stencilName, description, stencilType) {
            this.clickCreateStencil();
            this.createStencilDialog.fillName(stencilName);
            this.createStencilDialog.selectEditorType(stencilType);
            this.createStencilDialog.fillDescription(description);
            this.createStencilDialog.clickCreateNewStencil();
        }
    },

    /**
     * Provide stencil filters section
     *
     * @method filtersSection
     */
    filtersSection: {
        get: function () {
            return ".//*[@id='list-container']//ul[@class='filter-list']"
        }
    },

    sideFilterLocator: {
        value: function (filterName) {
            return element(by.cssContainingText('.ng-binding', filterName));

        }
    },

    /**
     * Filter stencils
     * @param filterName
     * @method filterStencil
     */
    filterStencil: {
        value: function (filterName) {
            Util.waitUntilElementIsVisible(this.sideFilterLocator(filterName));
            this.sideFilterLocator(filterName).click();
        }
    },

    /**
     * provides locator for stencils repeater
     * @method allStencilsRepeater
     */
    allStencilsRepeater: {
        get: function () {
            return element.all(by.repeater('stencil in model.stencils.data track by $index'));
        }
    },

    /**
     * provides number of stencils available
     * @method getNumberOfStencilsAvailable
     */
    getNumberOfStencilsAvailable: {
        value: function () {
            return this.allStencilsRepeater.count();
        }
    }
});