/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 18/07/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");

var saveDMDialog = require("./components/data_models/saveDMDialog.js");
var dialog = '//div[@ng-controller="DataModelToolbarController"]';

/**
 * Provides the Data Model page.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.dataModelPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/data-models/ + dmID'
     */
    url: {
        value: TestConfig.main.webContextRoot + '/editor/#/data-models/'
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
     * Provides access on callback to the selected data model title.
     *
     * @param callback {Function} Provides access to the current selected data model title
     * @method getDataModelTitle
     */
    getDataModelTitle: {
        value: function (callback) {
            return element(by.xpath("//div[@id='main']//div[class='fixed-container']/h2")).getText().then(function (text) {
                callback(text);
            });
        }
    },

    /**
     * Clicks the save button
     *
     * @method save
     */
    save: {
        value: function () {
            var saveController = element(by.xpath(dialog));

            Util.waitUntilElementIsVisible(saveController);

            var saveBtn = element(by.xpath(dialog + '//button[@title="Save the data model"]'));
            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
        }
    },

    /**
     * Opens the editor for the currently opened data model
     *
     * @method editDataModel
     */
    editDataModel: {
        value: function () {
            var editBtn = element(by.xpath("//button[@ng-click='openEditor()']"));

            Util.waitUntilElementIsVisible(editBtn);
            editBtn.click();
        }
    },

    /**
     * Provides the save data model dialog
     *
     * @property saveDMDialog
     * @type astrolabe.Page
     */
    saveDMDialog: {
        get: function () {
            return saveDMDialog;
        }
    },

    /*
     * Closes data model editor
     */
    close: {
        value: function () {
            var saveController = element(by.xpath(dialog));

            Util.waitUntilElementIsVisible(saveController);
            var closeBtn = element(by.xpath(dialog + "/button[@title='Close']"));
            Util.waitUntilElementIsVisible(closeBtn);
            closeBtn.click();
        }
    },

    /*
     * Select data source
     *
     * @param dataSource
     */
    selectDataSource: {
        value: function (dataSource) {
            var selectDS = element(by.xpath("//select[@id='dataSourceSelect']/option[text()='" + dataSource + "']"));

            Util.waitUntilElementIsVisible(selectDS);
            selectDS.click();
        }
    },

    /*
     * Click Add entity
     */
    clickAddEntity: {
        value: function () {
            var addBtn = element(by.xpath("//button[@ng-click='addEntity()']"));

            Util.waitUntilElementIsVisible(addBtn);
            addBtn.click();
            Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='nameField']")));
        }
    },

    /*
     * Fill in entity name
     */
    fillEntityName: {
        value: function (name) {
            var nameInput = element(by.xpath(".//*[@id='nameField']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(name);
        }
    },

    /*
     * Fill in entity description
     */
    fillEntityDesc: {
        value: function (desc) {
            var nameInput = element(by.xpath(".//*[@id='descriptionField']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(desc);
        }
    },

    /*
     * Fill in entity table
     */
    fillEntityTable: {
        value: function (table) {
            var nameInput = element(by.xpath(".//*[@id='tableNameField']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(table);
        }
    },

    addEntity: {
        value: function (name, desc, table) {
            this.clickAddEntity();

            this.fillEntityName(name);
            this.fillEntityDesc(desc);
            this.fillEntityTable(table);
        }
    },

    /*
     * Click Add attribute
     */
    clickAddAttribute: {
        value: function () {
            var addBtn = element(by.xpath("//button[@ng-click='addAttribute()']"));

            Util.waitUntilElementIsVisible(addBtn);
            addBtn.click();
            Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='attributeNameField']")));
        }
    },

    /*
     * Fill in attribute name
     */
    fillAttributeName: {
        value: function (name) {
            var nameInput = element(by.xpath(".//*[@id='attributeNameField']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(name);
        }
    },

    /*
     * Fill in attribute description
     */
    fillAttributeDesc: {
        value: function (desc) {
            var nameInput = element(by.xpath(".//*[@id='attributeDescriptionField']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(desc);
        }
    },

    /*
     * Fill in attribute column
     */
    fillAttributeColumn: {
        value: function (column) {
            var nameInput = element(by.xpath(".//*[@id='mappedNameField']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(column);
        }
    },

    /*
     * Select attribute type
     */
    selectAttributeType: {
        value: function (type) {
            var option = element(by.xpath(".//*[@id='attributeTypeField']/option[text()='" + type + "']"));

            Util.waitUntilElementIsVisible(option);
            option.click();
        }
    },

    addAttribute: {
        value: function (name, desc, column, type, primary, required) {
            this.clickAddAttribute();

            this.fillAttributeName(name);
            this.fillAttributeDesc(desc);
            this.fillAttributeColumn(column);
            this.selectAttributeType(type);
            if (primary)
                element(by.xpath(".//*[@id='primaryKeyCheckbox']")).click();
            if (required)
                element(by.xpath(".//*[@id='requiredCheckbox']")).click();
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