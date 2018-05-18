/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 14/07/2016.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../util/util.js");
var referenceDialog = "//div[@ng-controller='ActivitiEntityAttributeMappingPopupCtrl']";

/**
 * Provides the process attribute mapping dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.attrMapBPMNProcessDialog
 */
module.exports = Page.create({

    /**
     * Clicks Save button
     *
     * @method saveAttributeMapping
     */
    saveAttributeMapping: {
        value: function () {
            var saveBtn = element(by.xpath(referenceDialog + '//button[@ng-click="save()"]'));

            Util.waitUntilElementIsVisible(saveBtn);
            saveBtn.click();
        }
    },

    /**
     * Select data model
     *
     * @method selectDataModel
     * @param dataModel {String}
     */
    selectDataModel: {
        value: function (dataModel) {
            var dataModelList = referenceDialog + "//*[@id='mappedDataModel']";

            Util.waitUntilElementIsVisible(element(by.xpath(dataModelList)));
            element(by.xpath(dataModelList + "//option[text()='" + dataModel + "']")).click();
        }
    },

    /**
     * Selects data model entity
     *
     * @method selectEntityModel
     * @param entity {String}
     */
    selectEntityModel: {
        value: function (entity) {
            var entityOption = element(by.xpath(referenceDialog + '//*[@id="mappedEntity"]/option[text()="' + entity + '"]'));

            Util.waitUntilElementIsVisible(entityOption);
            entityOption.click();
        }
    },

    /*
     * Fill in variable
     */
    fillVariable: {
        value: function (name) {
            var nameInput = element(by.xpath(".//*[@id='newVariableName']"));

            Util.waitUntilElementIsVisible(nameInput);
            nameInput.sendKeys(name);
        }
    },


    /**
     * Selects the attribute row by attribute name
     *
     * @method selectAttributeRow
     * @param name {String}
     */
    selectAttributeRow: {
        value: function (name) {
            var attrRow = element(by.xpath(referenceDialog + '//div[@ng-show="entityObject.mappedEntity"]//div[contains(@class,"ui-grid-cell-contents") and text()="' + name + '"]'));

            Util.waitUntilElementIsVisible(attrRow);
            attrRow.click();
        }
    },

    /**
     * Selects Form field button
     *
     * @method clickFormFieldButton
     */
    clickFormFieldButton: {
        value: function () {
            element(by.css("button[ng-click*='field']")).click();
        }
    },

    /**
     * Selects the field name
     *
     * @param fieldName
     * @method selectFormField
     */
    selectFormField: {
        value: function (fieldName) {
            var divSelection = '//div[@ng-show="selectedAttributeMapping.valueType == \'field\'"]';

            element(by.xpath(divSelection + '//button')).click();
            element(by.xpath(divSelection + '//ul/li/a[@ng-click="selectField(field)" and contains(text(),"' + fieldName + '")]')).click();
        }
    }
});