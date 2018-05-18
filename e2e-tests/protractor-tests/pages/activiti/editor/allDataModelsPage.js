/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 18/7/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");
var createDMDialog = require("./components/data_models/createDMDialog.js");

/**
 * Provides the all Data Models page within the "Kickstart" application.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.AllDataModelsPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/data-models'
     */
    url: {
        value: TestConfig.main.webContextRoot + '/editor/#/data-models'
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
     * Provides the create a data model dialog
     *
     * @property createDMDialog
     * @type astrolabe.Page
     */
    createDMDialog: {
        get: function () {
            return createDMDialog;
        }
    },

    /**
     * Provides data model section
     *
     * @method getDMListSection
     */
    getDMListSection: {
        get: function () {
            return "//div[@ng-repeat='dataModel in model.dataModels.data track by $index']";
        }
    },

    /**
     * Selects a data model given its index in the list
     *
     * @param index
     * @method selectDMByIndex
     */
    selectDMByIndex: {
        value: function (index) {
            var dmElem = element(by.xpath(this.getDMListSection + "[" + index + "]//div[@class='item-box']//h3"));

            Util.waitUntilElementIsPresent(dmElem);
            Util.waitUntilElementIsClickable(dmElem);
            dmElem.click();
            Util.waitUntilElementIsStale(dmElem);
        }
    },

    /**
     * Provide data model by name
     *
     * @param dmName
     * @method getDMByName
     */
    getDMByName: {
        value: function (dmName) {
            return element(by.css("h3[title='" + dmName + "']"));
        }
    },

    /**
     * Clicks the create data model button
     *
     * @method clickCreateDM
     */
    clickCreateDM: {
        value: function () {
            var createBtn = element(by.buttonText('Create Data Model'));
            Util.waitUntilElementIsVisible(createBtn);
            createBtn.click();
        }
    },

    /**
     * Creates a new data model with the given name
     *
     * @param dmName
     * @method createNewDM
     */
    createNewDM: {
        value: function (dmName) {
            this.clickCreateDM();
            this.createDMDialog.fillName(dmName);
            this.createDMDialog.clickCreateNewDM();
        }
    },

    sideFilterLocator: {
        value: function (filterName) {
            return element(by.cssContainingText('.ng-binding', filterName));

        }
    },

    /**
     * select the filter with given filter name
     * @param filter
     * @method selectFilter
     */
    selectFilter: {
        value: function (filter) {
            Util.waitUntilElementIsVisible(this.sideFilterLocator(filter));
                        this.sideFilterLocator(filter).click();
        }
    },
    allDataModelRepeater: {
        get: function () {
            return element.all(by.repeater('dataModel in model.dataModels.data track by $index'));
        }
    },
    getNumberOfDataModelAvailable: {
        value: function () {
            return this.allDataModelRepeater.count();
        }
    }

});