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
var createNewResponseMapping = require("./components/createNewResponseMapping.js");

/**
 * Provides the User Task Step
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.steps.RestCallStep
 */
module.exports = Page.create({

    /**
     * Provides the create new response mapping dialog
     *
     * @property createNewResponseMapping
     */
    createNewResponseMapping: {
        get: function() {
            return createNewResponseMapping;
        }
    },

    /**
     * Fills the name for the index-th rest call step
     *
     * @param index Index of the step
     * @param name Name for the step
     * @method fillName
     */
    fillName: {
        value: function(index, name) {
            this.openDetailsTab(index);
            var nameInput = element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//input[@ng-model="step[property.id]"]'));

            nameInput.clear();
            nameInput.sendKeys(name);
        }
    },

    /**
     * Fills the url for the index-th rest call step
     *
     * @param index Index of the step
     * @param url Url for the step
     * @method fillUrl
     */
    fillUrl: {
        value: function(index, url) {
            this.openEndpointTab(index);
            var urlInput = element(by.xpath('//input[@id="rest-url-value"]'));

            urlInput.clear();
            urlInput.sendKeys(url);
        }
    },

    /**
     * Opens the Details tab
     *
     * @method openDetailsTab
     */
    openDetailsTab: {
        value: function(index) {
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//li/a[text()="Details"]')).click()
        }

    },

    /**
     * Opens the Endpoint tab
     *
     * @method openEndpointTab
     */
    openEndpointTab: {
        value: function(index) {
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//li/a[text()="Endpoint"]')).click()
        }

    },

    /**
     * Opens the Response tab
     *
     * @param index
     * @method openResponseTab
     */
    openResponseTab: {
        value: function(index) {
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//li/a[text()="Response"]')).click()
        }

    },

    addNewResponseMapping: {
        value: function(index, jsonProperty, variableType, processVariable) {
            this.openResponseTab(index);
            element(by.xpath('//div[@ng-repeat="step in steps"][' + index + ']//div/a[@ng-click="addNewResponseMapping()"]')).click();
            createNewResponseMapping.fillPropertyName(jsonProperty);
            createNewResponseMapping.selectVariableType(variableType);
            createNewResponseMapping.fillVariableName(processVariable);
            createNewResponseMapping.clickOk();
        }
    }


});