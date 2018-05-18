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

/**
 * Provides the edit field dialog for a typeahead field
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.RadioButtonsEditFieldDialog
 */
module.exports = Page.create({
    /**
     * Closes the edit dialog
     *
     * @method closeDialog
     */
    close: {
        value: function() {
            element(by.css('button[ng-click="doneEditing()"]')).click();
        }
    },

    /**
     * Opens the specified tab
     *
     * @param tabName
     * @method openTab
     */
    openTab: {
        value: function(tabName) {
            element(by.cssContainingText("li>a", tabName)).click();
        }
    },

    /**
     * Selects the REST service button for dropdown columns
     *
     * @method selectRestService
     */
    selectRestService: {
        value: function() {
            element(by.css("button[ng-click='setRestOptions()']")).click();
        }
    },

    /**
     * Selects an endpoint for the REST configuration of a dropdown
     *
     * @method selectEndpoint
     */
    selectEndpoint: {
        value: function(endPointName) {
            element(by.cssContainingText('select[id="rest-endpoint-value"]>option', endPointName)).click();
        }
    },

    /**
     * Sets the id property
     *
     * @param id
     * @method setRestIdProperty
     */
    setRestIdProperty: {
        value: function(id) {
            element(by.css('input[ng-model="formElement.restIdProperty"]')).sendKeys(id);
        }
    },

    /**
     * Sets the label property
     *
     * @param label
     * @method setRestLabelProperty
     */
    setRestLabelProperty: {
        value: function(label) {
            element(by.css('input[ng-model="formElement.restLabelProperty"]')).sendKeys(label);
        }
    }
});