
/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 04/01/17.
 */


var Page = require("astrolabe").Page;
var Util = require('../../../../util/util.js');

/**
 * Provides the save form dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.form.components.CreateFormDialog
 */
module.exports = Page.create({
    /**
     * @locator for form name
     * @method textForFormName
     */
    textForFormName :{
        get:function (){
            return element(by.id('newFormName'));
        }
    },

    /**
     * @input form name
     * @method textForFormName
     */
    formNameText: {
        value: function (formName) {
            Util.waitUntilElementIsVisible(this.textForFormName);
            return this.textForFormName.sendKeys(formName);
        }
    },

    /**
     *
     */
    saveFormButton:{
        get:function(){
            return element(by.css('button[ng-disabled="model.loading || !model.form.name || readOnly"]'));
        }
    },
    /**
     * @Save link for form
     * @method saveFromLink
     */
    clickFormSave: {
        value: function () {
            Util.waitUntilElementIsVisible(this.saveFormButton);
            return this.saveFormButton.click();
        }
    }
});
