/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 05/07/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../util/util.js");
var startSection = '//div[contains(@ng-class," model.processStart.expanded")]';
var mappingSection = startSection + '//div[@ng-show="showVariableMapping()"]';
var formVariableSection = mappingSection + '//*[@id="formProcessVariable"]';

/**
 * Provides the Process Start Step
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.steps.ProcessStartStep
 */
module.exports = Page.create({

    /**
     * Check Map Variables
     *
     * @method clickMapVariables
     */
    checkMapVariables: {
        value: function () {
            element(by.xpath(startSection + '//div[@ng-controller="FormVariableMappingController"]//input[@ng-model="model.hasVariableMapping"]')).click();
        }
    },

    /**
     * Add variable mapping in variable mapping section
     *
     * @method addVariableMapping
     */
    addVariableMapping: {
        value: function () {
            var buttonAdd = element(by.xpath(mappingSection + '//a[@ng-click="addField()"]'));

            Util.waitUntilElementIsVisible(buttonAdd);
            buttonAdd.click();
        }
    },

    /**
     * Select form field from drop down in variable mapping section
     *
     * @method selectFormField
     * @param fieldName {String}
     */
    selectFormField: {
        value: function (fieldName) {
            var buttonDropDown = element(by.xpath(formVariableSection + '/button[contains(@class,"selection form-control")]'));

            Util.waitUntilElementIsVisible(buttonDropDown);
            buttonDropDown.click();

            var fieldElem = element(by.xpath(formVariableSection + '/ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + fieldName + '")]'));

            Util.waitUntilElementIsVisible(fieldElem);
            fieldElem.click();
        }
    },

    /**
     * Fills the name of target process variable in variable mapping section
     *
     * @param name Name of the variable
     * @method fillName
     */
    fillTargetProcVar: {
        value: function(name) {
            var nameInput = element(by.xpath(mappingSection + '//*[@id="outputValueField"]'));

            nameInput.clear();
            nameInput.sendKeys(name);
        }
    },

});