/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 11/18/2015.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");

/**
 * Provides the save decision table dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.saveDecisionTableDialog
 */
module.exports = Page.create({

    /**
     * Clicks the Save and Close button
     *
     * @method saveAndCloseBtn
     */
    saveAndCloseBtn: {
        get: function () {
            return element.all(by.css('button[ng-click="saveAndClose()"]')).get(0);
        }
    },

    /**
     * Clicks the Save and Close button
     *
     * @method saveAndClose
     */
    saveAndClose: {
        value: function () {
            Util.waitUntilElementIsVisible(this.saveAndCloseBtn);
            this.saveAndCloseBtn.click();
            Util.waitUntilElementIsClickable(element(by.css('a[ng-click="setMainPage(item)"]')));
        }
    },


    /**
     * Type decision table key
     *
     * @param key {String}
     * @method fillKey
     */
    fillKey: {
        value: function (key) {
            var keyElem = element(by.id('decisiontableKey'));

            Util.waitUntilElementIsVisible(keyElem);
            keyElem.clear().sendKeys(key);
            Util.waitUntilElementHasValue(keyElem, key);
        }
    },

    /**
     * Decision table validation message
     *
     * @property validationMessageDT
     */
    validationMessageDT: {
        get: function () {
            return element(by.css('.popup-error>span:nth-child(2)'));
        }
    }
});