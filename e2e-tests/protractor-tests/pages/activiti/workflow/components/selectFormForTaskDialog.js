/**
 * Created by ssaiyed on 04/01/17.
 */

var Page = require("astrolabe").Page;
var appPage = require('../../editor/appPage');
var Util = require('../../../../util/util.js');

/**
 * Provides the save process dialog
 * @module pages
 * @submodule activiti
 * @submodule WorkFlow
 * @class pages.activiti.workflow.components.selectFormForTaskDialog
 */
module.exports = Page.create({

    attachFormLink: {
      get: function(){
         return  element(by.css('button[ng-click="attachForm(selectedForm); $hide();"]'));
      }
    },
    selectAndAttachForm:{
        value: function(formName) {
        var formNameFromList = element(by.repeater('form in forms')).element(by.cssContainingText('div[class="ng-binding"]',formName))
            Util.waitUntilElementIsVisible(formNameFromList);
            formNameFromList.click();
            return this.attachFormLink.click();
        }
    }
});