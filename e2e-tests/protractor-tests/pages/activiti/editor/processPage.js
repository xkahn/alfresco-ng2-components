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
var TestConfig = require("../../../test.config.js");
var Util = require('../../../util/util.js');
var navbar = require("../components/navbar.js");

/**
 * Provides the Process page within the "Kickstart" application.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.Process
 */

var saveButton = element(by.css(".btn.btn-inverse.ng-scope[title='Save the model']>*[title='Save the model']"));

module.exports = Page.create({

    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/processes'
     */
    url: {value: TestConfig.main.webContextRoot + '/editor/#/processes'},

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
     * Provides process header
     *
     * @method processHeader
     */
    processHeader: {
        value: function (processName) {
            return element(by.xpath(".//*[@id='canvasHeader']/h2[text()='" + processName + "']"));
        }
    },

    /**
     * Opens the editor for the currently opened process
     *
     * @method editProcess
     */
    editProcess: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.xpath('//button[@ng-click="openEditor()"]')));
            element(by.xpath('//button[@ng-click="openEditor()"]')).click();
        }
    },

    /**
     * Clicks the save and close button
     *
     * @method save
     */
    save: {
        value: function () {
            logger.info("Perform save on process page");
            Util.waitUntilElementIsVisible(saveButton);
            saveButton.click();
        }
    },

    /**
     * Clicks the validate button
     *
     * @method validate
     */
    validate: {
        value: function () {
            var validateBtn = element(by.xpath('//div[@ng-controller="KickstartToolbarController"]/button[2]'));

            Util.waitUntilElementIsVisible(validateBtn);
            validateBtn.click();
        }
    },

    /**
     * Validation window header
     *
     * @method validationFormHeader
     */
    validationFormWinHeader: {
        get: function () {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-controller='ValidateKickstartModelCtrl']//h2[text()='Validation errors:']")));
            return element(by.xpath("//div[@ng-controller='ValidateKickstartModelCtrl']//h2[text()='Validation errors:']"));
        }
    },

    /**
     * Close validation window
     *
     * @method closeValidationWin
     */
    closeValidationWin: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-controller='ValidateKickstartModelCtrl']//button[@class='close']")));
            return element(by.xpath("//div[@ng-controller='ValidateKickstartModelCtrl']//button[@class='close']")).click();
        }
    },

    /**
     * Close validation window
     *
     * @method descriptionValidationWin
     */
    descriptionValidationWin: {
        value: function (index) {
            Util.waitUntilElementIsVisible(element(by.xpath("(.//div[@class='ui-grid-canvas']//div[contains(@class,'ui-grid-cell-contents')])[" + index + "]")));
            return element(by.xpath("(.//div[@class='ui-grid-canvas']//div[contains(@class,'ui-grid-cell-contents')])[" + index + "]")).getText();
        }
    }

});