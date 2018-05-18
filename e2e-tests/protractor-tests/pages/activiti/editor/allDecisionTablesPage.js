/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 11/18/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");
var createDTDialog = require("./components/decision_tables/createDecisionTableDialog.js");

/**
 * Provides the all decision tables page within the "Kickstart" application.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.AllDecisionTablesPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/decision-tables'
     */
    url: {
        value: TestConfig.main.webContextRoot + '/editor/#/decision-tables'
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
     * Provides the create an decision table dialog
     *
     * @property createDTDialog
     * @type astrolabe.Page
     */
    createDTDialog: {
        get: function() {
            return createDTDialog;
        }
    },

    /**
     * Provides decision tables section
     *
     * @method getDTListSection
     */
    getDTListSection: {
        get: function() {
            return element.all(by.repeater('decisionTable in model.decisionTables.data track by $index'));
        }
    },

    /**
     * Selects a decision table given its index in the list
     *
     * @param index
     * @method selectDTByIndex
     */
    selectDTByIndex: {
        value: function(index) {
            element.all(by.css('.item-box')).get(index).click();
        }
    },

    /**
     * Provide decision table by name
     *
     * @param decisionTableName
     * @method getDTByName
     */
    getDTByName: {
        value: function(decisionTableName) {
           return element(by.cssContainingText('.truncate.ng-binding', decisionTableName));
        }
    },

    /**
     * Clicks the create decision table button
     *
     * @method clickCreateDT
     */
    clickCreateDT: {
        value: function() {
            element(by.buttonText('Create Decision Table')).click();
        }
    },

    /**
     * Creates a new decision table with the given name
     *
     * @param decisionTableName
     * @method createNewDT
     */
    createNewDT: {
        value: function(decisionTableName) {
            this.clickCreateDT();
            this.createDTDialog.fillName(decisionTableName);
            this.createDTDialog.clickOk();
        }
    },

    /**
     * Creates a new decision table with the given name and description
     *
     * @param decisionTableName
     * @method createNewDTWithDesc
     */
    createNewDTWithDesc: {
        value: function(decisionTableName, description) {
            this.clickCreateDT();
            this.createDTDialog.fillName(decisionTableName);
            this.createDTDialog.fillDescription(description);
            this.createDTDialog.clickOk();
        }
    },

    /**
     * Provide decision table filters section
     *
     * @method filtersSection
     */
    filtersSection: {
        get: function() {
            return ".//*[@id='list-container']//ul[@class='filter-list']"
        }
    },

    /**
     * Filter decision tables
     *
     * @param filterName
     * @method filterDecisionTables
     */
    filterDecisionTables: {
        value: function(filterName) {
            return element(by.xpath(this.filtersSection + "//a[text()='" + filterName + "']")).click();
        }
    },

    /**
     * Provide decision table Import button locator
     * @method importDecisionTableButton
     */
    importDecisionTableButton:{
        get: function(){
            return element(by.css('button[ng-click="importDecisionTable()"]'));
        }
    },

    /**
     * click import decision table button to view import dialog
     * @method clickImportDecisionTableButton
     */
    clickImportDecisionTableButton:{
        value:function(){
            Util.waitUntilElementIsVisible(this.importDecisionTableButton);
            this.importDecisionTableButton.click();
        }
    },

    /**
     * provides sideFilter locator with given filterName
     * @param filterName
     * @method sideFilterLocator
     */
    sideFilterLocator :{
            value: function (filterName) {
                return element(by.cssContainingText('.ng-binding', filterName));
            }

    },

    /**
     * provides sideFilter locator with given filterName
     * @param filterName
     * @method clickSideFilterByName
     */
    clickSideFilterByName: {
        value: function (filterName) {
            Util.waitUntilElementIsVisible(this.sideFilterLocator(filterName));
            this.sideFilterLocator(filterName).click();
        }
    },

    /**
     * provides locator for decisiontable repeater
     * @method decisionTableRepeater
     */
    decisionTableRepeater:{
        get:function(){
            return element.all(by.repeater('decisionTable in model.decisionTables.data track by $index'));
        }
    },

    /**
     * provides number of decision table available
     * @method getNumberOfDecisionTablesAvailable
     */
    getNumberOfDecisionTablesAvailable:{
        value:function(){
            return this.decisionTableRepeater.count();

        }
    }

});