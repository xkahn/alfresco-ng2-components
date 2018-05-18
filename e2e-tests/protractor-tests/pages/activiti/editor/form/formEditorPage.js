/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 05/06/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../../test.config.js");
var EC = protractor.ExpectedConditions;
var Util = require('../../../../util/util.js');

var navbar = require("../../components/navbar.js");

/**
 * Provides the form editor
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.FormEditorPage
 */
module.exports = Page.create({
    /**
     * Gets the save button
     *
     * @method saveBtn
     */
    saveBtn: {
        get: function() {
            return element(by.xpath('//div[@ng-controller="FormToolbarController"]/button[1]'));
        }
    },

    /**
     * Clicks the save button
     *
     * @method save
     */
    save: {
        value: function() {
            Util.waitUntilElementIsVisible(this.saveBtn);
            this.saveBtn.click();
        }
    },

    /**
     * Clicks the validate button
     *
     * @method validate
     */
    validate: {
        value: function() {
            element(by.xpath('//div[@ng-controller="FormToolbarController"]/button[2]')).click();
        }
    },

    waitUntilIsLoaded: {
        value: function() {
            var canvasSection = element(by.id("canvasSection"));

            Util.waitUntilElementIsVisible(this.saveBtn);
            Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='main']//h2")));
            Util.waitUntilElementIsVisible(canvasSection);
        }
    },

    /**
     * Adds a field to the form by calling an external script to simulate dragndrop
     *
     * @param fieldType
     * @param callback
     * @method addFieldToForm
     */
    addFieldToForm: {
        value: function(fieldType, callback) {

            browser.driver.executeScript("jQuery('#" + fieldType + "').simulateDragDrop({ dropTarget: '.form-canvas'});").then(function() {
                if (callback) {
                    callback();
                }
            });
        }
    },

    /**
     * Edits the form field recognized by the text
     *
     * @param ngSwitch {boolean, hyperlink, readonly, readonly-text}
     * @method editFieldByType
     */
    editFieldByType: {
        value: function(type) {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@id='canvasSection']//div[@ng-switch-when='" + type + "']/label/following-sibling::div")))
            var fieldLabel = element(by.xpath("//div[@id='canvasSection']//div[@ng-switch-when='" + type + "']/label/following-sibling::div"));

            browser.actions().
                mouseMove(fieldLabel).
                perform();

            var editButton = element(by.xpath("//div[@id='canvasSection']//div[@ng-switch-when='" + type + "']/label"));
            editButton = editButton.element(by.xpath("../../..//button[@ng-click='openFieldPopover()']"));
            editButton.click();
        }
    },

    /**
     * Edits the form field recognized by the label
     *
     * @param index
     * @method editFieldByLabel
     */
    editFieldByLabel: {
        value: function(label) {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@id='canvasSection']")));
        	var fieldLabel = element(by.xpath("//div[@id='canvasSection']//*[contains(text(), '" + label + "')]"));

        	Util.waitUntilElementIsVisible(fieldLabel);

            browser.actions().
                mouseMove(fieldLabel).
                perform();

            var editButton = fieldLabel.element(by.xpath("../../..//button[@ng-click='openFieldPopover()']"));
            Util.waitUntilElementIsVisible(editButton);
            Util.waitUntilElementIsClickable(editButton);
            editButton.click();
        }
    },

    /**
     * Remove the form field recognized by the label
     *
     * @param label
     * @method editFieldByLabel
     */
    removeFieldByLabel: {
        value: function(label) {
            browser.wait(EC.presenceOf(element(by.xpath("//div[@id='canvasSection']"))), TestConfig.main.presence_timeout);
            var fieldLabel = element(by.xpath("//div[@id='canvasSection']//*[contains(text(), '" + label + "')]"));
            Util.waitUntilElementIsVisible(fieldLabel);

            browser.actions().
                mouseMove(fieldLabel).
                perform();

            var removeButton = fieldLabel.element(by.xpath("../../..//button[@ng-click='removeFormElement(formElement)']"));
            removeButton.click();
        }
    },

    /**
     * General form error
     *
     * @method generalFormError
     */
    generalFormError: {
        get: function() {
            var formErrorSpan = element(by.xpath("//div[@class='alert-wrapper']//span"));
            browser.wait(EC.presenceOf(formErrorSpan), TestConfig.main.presence_timeout);
            return formErrorSpan;
        }
    },

    /**
     * View the error of the form field recognized by the label
     *
     * @param label
     * @method viewErrorFieldByLabel
     */
    viewErrorFieldByLabel: {
        value: function(label) {
            var viewButton = element(by.xpath("//div[@id='canvasSection']//*[contains(text(), '" + label + "')]//preceding-sibling::a"));
            viewButton.click();
        }
    },

    /**
     * Validation window header
     *
     * @method validationFormHeader
     */
    validationFormWinHeader: {
        get: function() {
            return element(by.xpath("//div[@ng-controller='ValidateFormModelCtrl']//h2[text()='Validation errors:']"));
        }
    },

    /**
     * Close validation window
     *
     * @method closeValidationWin
     */
    closeValidationWin: {
        value: function() {
            return element(by.xpath("//div[@ng-controller='ValidateFormModelCtrl']//button[@class='close']")).click();
        }
    },

    /**
     * Close validation window
     *
     * @method descriptionValidationWin
     */
    descriptionValidationWin: {
        value: function(index) {
            return element(by.xpath("(.//div[@class='ui-grid-canvas']//div[contains(@class,'ui-grid-cell-contents')])["+index+"]")).getText();
        }
    },


    /**
     * Click design tab
     *
     * @method clickDesignTab
     */
    clickDesignTab: {
        value: function() {
            return element(by.css("button[ng-click*='design']")).click();
        }
    },

/*************************************Style tab*************************************/

    /**
     * Click style tab
     *
     * @method clickStyleTab
     */
    clickStyleTab: {
        value: function() {
            return element(by.css("button[ng-click*='style']")).click();
        }
    },

    /**
     * Check style tab is displayed correctly
     *
     * @method  checkStyleTab
     */
    checkStyleTab: {
        value: function() {
            element(by.css("input[data-ng-model='model.formClassName']")).isPresent();
            return element(by.css("div[class*='ace_editor']")).isPresent();
        }
    },

    /**
     * enter style class name
     *
     * @method  enterStyleClassName
     */
    enterStyleClassName: {
        value: function(className) {
            return element(by.css("input[data-ng-model='model.formClassName']")).sendKeys(className);
        }
    },

    /**
     * clear css style
     *
     * @method  clearCssStyle
     */
    clearStyleClassName: {
        value: function() {
        	return element(by.css("input[data-ng-model='model.formClassName']")).clear();
        }
    },

    /**
     * enter css style
     *
     * @method  enterCssStyle
     */
    enterCssStyle: {
        value: function(css) {
        	element(by.css("div[class*='ace_editor']")).click();
        	return element(by.css("div[class*='ace_editor'] > textarea")).sendKeys(css);
        }
    },

    /**
     * clear css style
     *
     * @method  clearCssStyle
     */
    clearCssStyle: {
        value: function() {
            var _this = this;
            element(by.css("div[class*='ace_editor'] > textarea")).sendKeys(protractor.Key.BACK_SPACE);
            element(by.className("ace_text-layer")).getText().then( function(value) {
                if (value.length > 0) {
                    _this.clearCssStyle();
                }
            });
        }
    },

    /**
     * check classname and css
     *
     * @method  checkCss
     */
    checkCss: {
        value: function(css) {
        	element(by.css("div[class='ace_content']")).getText().then(function(textvalue)
        	{
        	  return expect (textvalue).toBe(css);
        	});
        }
    },

    /**
     * ensure css styling error message displayed
     *
     * @method  cssErrorMessage
     */
    cssErrorMessage: {
        value: function(css) {

        	//element.all(by.css("div[class='ace_gutter'] > div[class='ace_layer ace_gutter-layer ace_folding-enabled'] > div[class*='ace']")).each(function (element) {
            /*element.all(by.css("html.no-js body.ng-scope div#main.wrapper.full.clearfix.ng-scope div.inset.fixed-container.form-palette.ng-scope div.col-sm-10 div.center-pane div.content.padding-bottom-tabs div.detail-wrapper.ng-scope div.row div.col-xs-12 div.form-group div.ng-untouched.ng-valid.ace_editor.ace-tm.ng-dirty.ng-valid-parse div.ace_gutter div.ace_layer.ace_gutter-layer.ace_folding-enabled div.ace_gutter-cell.ace_error")).each(function (element) {
        		var linkTarget = element.getAttribute('class').then(function(attr) {;
        	        expect(typeof attr).toBe("string");
        	        console.log(attr);
        	    });
        	});*/

        	//error element
        	return element(by.xpath("/html/body/div[3]/div[2]/div[2]/div/div/div[6]/div[3]/div/div/div/div[1]/div[1]/div")).isDisplayed();

        }
    },

    /**
     * Get Variables tab
     *
     */
    variablesTab: {
        get: function () {
            return element(by.css("button[ng-click*='variables']"));
        }
    },

    /**
     * Click Variables tab
     *
     */
    clickVariablesTab: {
        value: function () {
            var variablesTabElem = "button[ng-click*='variables']";
            element(by.css(variablesTabElem)).click();
        }
    },

    /**
     * Check Variables tab is displayed
     *
     */
    checkVariablesTabIsDisplayed: {
        value: function () {
            var variablesTabElem = "button[ng-click*='variables']";
            var activeTab = element(by.css(variablesTabElem)).getAttribute('class').then(function(attr) {
                console.log("Attribute value is: " + attr);
                expect(attr).toContain('active');
            });

            Util.waitUntilElementIsVisible(element(by.xpath(".//label[text()='Form Variables']")));
        }
    },

    /**
     * Get Javascript tab
     *
     */
    javascriptTab: {
        get: function () {
            return element(by.css("button[ng-click*='javascript']"));
        }
    },

    /**
     * Click Javascript tab
     *
     */
    clickJavascriptTab: {
        value: function () {
            Util.waitUntilElementIsVisible(this.javascriptTab);
            this.javascriptTab.click();
        }
    }
});