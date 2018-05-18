/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mon July 3 2017
 */


/**
 * Form variables page
 *
 */
var FormEditorVariablesPage = function () {
    var variableValue = element(by.id("variableValue"));

    /**
     * Get form variables by name
     */
    this.getFormVariableByName = function(varName) {
        return element(by.xpath(".//div[text()='" + varName + "']"));
    };

    /**
     * Select form variables by name
     */
    this.selectFormVariableByName = function(varName) {
        this.getFormVariableByName(varName).click();
    };

    /**
     * Update form variables value
     */
    this.updateFormVariableValue = function (newVarValue) {
        variableValue.clear().sendKeys(newVarValue);
    };
};

module.exports = FormEditorVariablesPage;