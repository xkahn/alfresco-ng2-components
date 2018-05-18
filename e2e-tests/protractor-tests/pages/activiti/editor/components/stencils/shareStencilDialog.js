/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 06/01/2016.
 */

var Page = require("astrolabe").Page;
var Util = require("../../../../../util/util.js");
var shareDialog = "//div[@ng-controller='ShareModelPopupCrtl']";

/**
 * Provides the share stencil dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.shareStencilDialog
 */
module.exports = Page.create({
    /**
     * Clicks the Confirm changes button
     *
     * @method confirmChanges
     */
    confirmChanges: {
        value: function() {
            var confirmBtn = element(by.xpath(shareDialog + '//button[@ng-click="ok()"]'));

            Util.waitUntilElementIsVisible(confirmBtn);
            Util.waitUntilElementIsClickable(confirmBtn);
            confirmBtn.click();
            Util.waitUntilElementIsStale(confirmBtn);
        }
    },

    /**
     * Add people who share stencil
     *
     * @method addPeople
     */
    addPeople: {
        value: function() {
            var addBTn = element(by.xpath(shareDialog + '//a[contains(@class,"toggle-people-select")]'));

            Util.waitUntilElementIsVisible(addBTn);
            addBTn.click();
        }
    },

    /**
     * Add group who share stencil
     *
     * @method addGroup
     */
    addGroup: {
        value: function() {
            var addBtn = element(by.xpath(shareDialog + '//a[contains(@class,"group-selection")]'));

            Util.waitUntilElementIsVisible(addBtn);
            addBtn.click();
        }
    },

    /**
     * Provides the people select input inside the pop-up.
     *
     * @property peopleSelect
     * @type protractor.Element
     */
    peopleSelect: {
        get: function() {
            return element(by.id("people-select-input"));
        }
    },

    /**
     * Share with person.
     *
     * @param personName
     * @method sharePerson
     */
    sharePerson: {
        value: function(personName) {
            this.addPeople();
            Util.waitUntilElementIsVisible(this.peopleSelect);
            this.peopleSelect.sendKeys(personName);
            this.peopleSelect.sendKeys(protractor.Key.DOWN);
            this.peopleSelect.sendKeys(protractor.Key.ENTER, protractor.Key.ESCAPE);
        }
    },

    /**
     * Share with person.
     *
     * @param groupName
     * @method shareGroup
     */
    shareGroup: {
        value: function(groupName) {
            this.addGroup();
            Util.waitUntilElementIsVisible(this.peopleSelect);
            this.peopleSelect.sendKeys(groupName);
            this.peopleSelect.sendKeys(protractor.Key.DOWN);
            this.peopleSelect.sendKeys(protractor.Key.ENTER, protractor.Key.ESCAPE);
        }
    }
});