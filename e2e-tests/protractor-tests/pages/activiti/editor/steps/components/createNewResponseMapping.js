/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 15/06/2015.
 */

var Page = require("astrolabe").Page;

/**
 * Provides the save process dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.createProcessDialog
 */
module.exports = Page.create({

    /**
     * Fills in the property name
     *
     * @param propertyName
     * @method fillPropertyName
     */
    fillPropertyName: {
        value: function(name) {
            element(by.id('json-property-name')).sendKeys(name);
        }
    },

    /**
     * Selects the desired type for the variable
     *
     * @param type
     * @method selectVariableType
     */
    selectVariableType: {
        value: function(type) {
            element(by.cssContainingText('select[id="json-property-value-type"]>option', type)).click();
        }
    },

    /**
     * Fills the process variable name
     *
     * @param name
     * @method fillVariableName
     */
    fillVariableName: {
        value: function(name) {
            element(by.id('process-variable-name')).sendKeys(name);
        }
    },

    /**
     * Clicks the ok button
     *
     * @method clickOk
     */
    clickOk: {
        value: function() {
            element(by.css('button[ng-click="okResponseMapping()"]')).click();
        }
    }
});