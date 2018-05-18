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
var Constants = require("../../../util/constants.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");

var saveDTDialog = require("./components/decision_tables/saveDecisionTableDialog.js");
var cloneDTDialog = require("./components/decision_tables/cloneDecisionTableDialog.js");
var deleteDTDialog = require("./components/decision_tables/deleteDecisionTableDialog.js");
var shareDTDialog = require("./components/decision_tables/shareDecisionTableDialog.js");
var editInputDTDialog = require("./components/decision_tables/editInputDecisionTableDialog.js");
var editOutputDTDialog = require("./components/decision_tables/editOutputDecisionTableDialog.js");
var editRuleDTDialog = require("./components/decision_tables/editRuleDecisionTableDialog.js");
var validationDTDialog = require("./components/decision_tables/validationDecisionTableDialog.js");

/**
 * Provides the Decision Table page.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.decisionTablePage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/decision-tables/ + dtID'
     */
    url: {
        value: TestConfig.main.webContextRoot + '/editor/#/decision-tables/'
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
     * Workaround for extra confirmation dialog: You have unsaved changes
     * @method closeConfirmation
     * @param buttonText {string} Text of the button to click ("Discard changes", "Save changes" etc.) Default: "Continue editing".
     */
    closeConfirmation: {
        value: function(buttonText) {
            if (!buttonText) {
                buttonText = Constants.DECISION_TABLE_CLOSE_BUTTONS.CONTINUE_EDITING;
            }
            element(by.xpath('//div[@ng-controller="EditorUnsavedChangesPopupCrtl"]//button[text()="' + buttonText + '"]')).click();
        }
    },

    /**
     * Provides access on callback to the selected decision table title.
     *
     * @param callback {Function} Provides access to the current selected decision table title
     * @method getDTTitle
     */
    getDTTitle: {
        value: function(callback) {
            return element(by.xpath("//div[@id='main']//div[class='fixed-container']/h2")).getText().then(function(text) {
                callback(text);
            });
        }
    },

    /**
     * Opens the clone dialog for the currently opened decision table
     *
     * @method cloneDT
     */
    cloneDT: {
        value: function() {
            element(by.xpath("//button[@ng-click='duplicateDecisionTable()']")).click();
        }
    },

    /**
     * Clicks favorite this decision table button
     *
     * @method favoritesDT
     */
    favoritesDT: {
        value: function() {
            element(by.xpath("//button[@ng-click='toggleFavorite()']")).click();
        }
    },

    /**
     * Clicks share this decision table button
     *
     * @method shareDT
     */
    shareDT: {
        value: function() {
            element(by.xpath("//button[@ng-click='shareDecisionTable()']")).click();
        }
    },

    /**
     * Clicks delete this decision table button
     *
     * @method deleteDT
     */
    deleteDT: {
        value: function() {
            element(by.xpath("//button[@ng-click='deleteDecisionTable()']")).click();
        }
    },

    /**
     * Clicks the save button
     *
     * @method save
     */
    save: {
        value: function() {
            var saveDT = element(by.xpath('//div[@ng-controller="DecisionTableToolbarController"]//button[@title="Save the decision table"]'));

            Util.waitUntilElementIsVisible(saveDT);
            saveDT.click();
        }
    },

    /**
     * Opens the editor for the currently opened decision table
     *
     * @method editDT
     */
    editDT: {
        value: function() {
            element(by.xpath("//button[@ng-click='openEditor()']")).click();
        }
    },

    /**
     * Provides the save decision table dialog
     *
     * @property saveDecisionTableDialog
     * @type astrolabe.Page
     */
    saveDecisionTableDialog: {
        get: function() {
            return saveDTDialog;
        }
    },

    /**
     * Provides the clone decision table dialog
     *
     * @property cloneDecisionTableDialog
     * @type astrolabe.Page
     */
    cloneDecisionTableDialog: {
        get: function() {
            return cloneDTDialog;
        }
    },

    /**
     * Provides the delete decision table dialog
     *
     * @property deleteDecisionTableDialog
     * @type astrolabe.Page
     */
    deleteDecisionTableDialog: {
        get: function() {
            return deleteDTDialog;
        }
    },

    /**
     * Provides the share decision table dialog
     *
     * @property shareDecisionTableDialog
     * @type astrolabe.Page
     */
    shareDecisionTableDialog: {
        get: function() {
            return shareDTDialog;
        }
    },

    /**
     * Provides the edit input decision table dialog
     *
     * @property editInputDecisionTableDialog
     * @type astrolabe.Page
     */
    editInputDecisionTableDialog: {
        get: function() {
            return editInputDTDialog;
        }
    },

    /**
     * Provides the edit output decision table dialog
     *
     * @property editOutputDecisionTableDialog
     * @type astrolabe.Page
     */
    editOutputDecisionTableDialog: {
        get: function() {
            return editOutputDTDialog;
        }
    },

    /**
     * Provides the edit rule decision table dialog
     *
     * @property editRuleDecisionTableDialog
     * @type astrolabe.Page
     */
    editRuleDecisionTableDialog: {
        get: function() {
            return editRuleDTDialog;
        }
    },

    /**
     * Provides the validation decision table dialog
     *
     * @property validationDTDialog
     * @type astrolabe.Page
     */
    validationDTDialog: {
        get: function() {
            return validationDTDialog;
        }
    },

    /**
     * Add a new input column
     *
     */
    addInputColumn: {
        value: function () {
            element(by.xpath("//button[@ng-click='addInputExpression()']")).click();
        }
    },

    /**
     * Add an input field
     *
     * @param index {int} The index of a field to add (counted from left to right)
     */
    addInputField: {
        value: function (index) {
            var addBtn = element(by.xpath("(.//div[contains(@class,'header-expression header-input-expression')]//*[contains(@id,'header-text')])[" + index + "]"));
            Util.waitUntilElementIsVisible(addBtn);
            browser.actions()
                .mouseMove(addBtn, {x: 100, y: 0})
                .mouseMove(addBtn)
                .perform();
            addBtn.click();
        }
    },

    /**
     * See error for input field
     *
     * @param index {int} The index of a field to add (counted from left to right)
     */
    errorInputField: {
        value: function (index) {
            element(by.xpath("(//div[contains(@class, 'header-expression header-input-expression')]//span[@class='show-error-icon']/img)[" + index + "]")).click();
        }
    },

    /**
     * Add a new output column
     *
     */
    addOutputColumn: {
        value: function () {
            element(by.xpath("//button[@ng-click='addOutputExpression()']")).click();
        }
    },

    /**
     * Add an output field
     *
     * @param index {int} The index of a field to add (counted from left to right)
     */
    addOutputField: {
        value: function (index) {
            var outFieldElem = element(by.xpath("(.//div[contains(@class,'header-expression header-output-expression')]//*[contains(@id,'header-text')])[" + index + "]"));
            Util.waitUntilElementIsVisible(outFieldElem);
            browser.actions()
                .mouseMove(outFieldElem, {x: 100, y: 0})
                .mouseMove(outFieldElem)
                .perform();
            outFieldElem.click();
        }
    },

    /**
     * See error for output field
     *
     * @param index {int} The index of a field to add (counted from left to right)
     */
    errorOutputField: {
        value: function (index) {
            element(by.xpath("(.//div[contains(@class,'header-expression header-output-expression')]//span[@class='show-error-icon']/img)[" + index + "]")).click();
        }
    },

    /**
     * Add an input rule
     *
     * @param index {int} The index of a rule to add (counted from top to bottom)
     */
    addInputRule: {
        value: function(index) {
            element(by.xpath("(.//div[contains(@class,'cell-input-expression')]//span[@class='edit-icon'])[" + index + "]")).click();
        }
    },

    /**
     * Type a value in input rule
     *
     * @param index {int}
     * @param value {String}
     * @method manualTypeInputValue
     */
    manualTypeInputValue: {
        value: function (index, value) {
            var divElem = element(by.xpath("(//div[contains(@class,'cell-input-expression')])[" + index + "]"));
            browser.actions().
            doubleClick(divElem).
            perform();
            var elem = element(by.xpath("(//div[contains(@class,'cell-input-expression')]//form[@name='inputForm']/input)[" + index + "]"));
            elem.sendKeys(value);
            elem.sendKeys(protractor.Key.ENTER);
        }
    },

    /**
     * Add an output rule
     *
     * @param index {int} The index of a rule to add (counted from top to bottom)
     */
    addOutputRule: {
        value: function(index) {
            element(by.xpath("(.//div[contains(@class,'cell-output-expression')]//span[@class='edit-icon'])[" + index + "]")).click();
        }
    },

    /**
     * Type a value in output rule
     *
     * @param index {int}
     * @param value {String}
     * @method manualTypeOutputValue
     */
    manualTypeOutputValue: {
        value: function (index, value) {
            var divElem = element(by.xpath("(//div[contains(@class,'cell-output-expression')])[" + index + "]"));
            browser.actions().
            doubleClick(divElem).
            perform();
            var elem = element(by.xpath("(//div[contains(@class,'cell-output-expression')]//form[@name='inputForm']/input)[" + index + "]"));
            elem.sendKeys(value);
            elem.sendKeys(protractor.Key.ENTER);
        }
    },

    /**
     * Removes an input field
     *
     * @param index {int} The index of a field to remove (counted from left to right)
     */
    removeInputField: {
        value: function(index) {
            element(by.xpath('//div[contains(@ng-click, "grid.appScope.removeInputExpression")][' + index + ']')).click();
        }
    },

    /**
     * Removes an output field
     *
     * @param index {int} The index of a field to remove (counted from left to right)
     */
    removeOutputField: {
        value: function(index) {
            element(by.xpath('//div[contains(@ng-click, "grid.appScope.removeOutputExpression")][' + index + ']')).click();
        }
    },

    /**
     * Validates decision table
     */
    validate: {
        value: function() {
            return element(by.xpath("//div[@ng-controller='DecisionTableToolbarController']//button[@title='Validate the decision table']")).click();
        }
    },

    /*
     * Closes decision table editor
     */
    close: {
        value: function() {
            return element(by.css("button[title='Close']")).click();
        }
    },

    /*
     * @param message
     */
    waitTopMessage: {
        value: function(message) {
            browser.wait(protractor.until.elementLocated(by.xpath("//div[contains(@class, 'fadein')]/span[text()='" + message + "']")), TestConfig.main.presence_timeout);
        }
    },
    
    /**
     * Get validation message for Decision table
     * @param index {int} The index of a field to add (counted from left to right)
     */
    getDecisionTableValidationMessage:{
        value:function(message){
            return browser.wait(protractor.until.elementLocated(by.xpath("//div[contains(@class, 'fadein')]/span[text()='" + message + "']")), TestConfig.main.presence_timeout).getText();
        }
    }
});