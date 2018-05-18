/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 05/12/2016.
 */

var Page = require("astrolabe").Page;
var appPage = require('../../editor/appPage');
var Util = require('../../../../util/util.js');

/**
 * Provides the save process dialog
 * @module pages
 * @submodule activiti
 * @submodule WorkFlow
 * @class pages.activiti.workflow.components.appPageDialog
 */
module.exports = Page.create({
    /**
     * Provides the people select input inside the pop-up.
     *
     * @property peopleSelect
     * @type protractor.Element
     */
    peopleSelect: {
        get: function () {
            return element(by.id("people-select-input"));
        }
    },

    /**
     * Share app with person.
     *
     * @param personName
     * @method shareAppPerson
     */
    shareAppPerson: {
        value: function (personName) {
            Util.waitUntilElementIsVisible(this.peopleSelect);
            this.peopleSelect.sendKeys(personName);
            this.peopleSelect.sendKeys(protractor.Key.DOWN);
            this.peopleSelect.sendKeys(protractor.Key.ENTER, protractor.Key.ESCAPE);
        }
    },

    /**
     * Adds another group to the app
     *
     * @method addAnotherGroup
     */
    addAnotherGroup: {
        value: function () {
            var addGroupLink = element(by.xpath("//a[@on-group-selected='addPublishGroup(group)']"));

            Util.waitUntilElementIsVisible(addGroupLink);
            addGroupLink.click();

        }
    },
    /**
     * Share with person.
     *
     * @param groupName
     * @method shareGroup
     */
    shareAppGroup: {
        value: function (groupName) {
            Util.waitUntilElementIsVisible(this.peopleSelect);
            this.peopleSelect.sendKeys(groupName);
            this.peopleSelect.sendKeys(protractor.Key.DOWN);
            this.peopleSelect.sendKeys(protractor.Key.ENTER, protractor.Key.ESCAPE);
        }
    },
    /**
     * Adds another person for share app definition
     *
     * @method addPersonWithInShareAppDefinition
     */
    addPersonWithInShareAppDefinition:{
        value:function(){
            var addPersonLink = element(by.xpath("//a[@on-people-selected='addRealUser(user)']"));
            Util.waitUntilElementIsVisible(addPersonLink);
            addPersonLink.click();
        }
    },

    /**
     * Adds another group to to app
     *
     * @method addGroupWithInSharedAppDefinition
     */
    addGroupWithInSharedAppDefinition:{
        value:function(){
            var shareAppDefinitionToGroupLink = element(by.xpath("//a[@on-group-selected='addGroup(group)']"));
            Util.waitUntilElementIsVisible(shareAppDefinitionToGroupLink);
            shareAppDefinitionToGroupLink.click();
        }
    },
    /**
     * Check user/group is in the list on popup model of share app.
     * @param type {person | group}
     * @method checkUserInList
     */
    checkUserInList: {
        value: function (type) {
            var list = element(by.xpath("//div[@ng-if='popup.shareInfo.data']"));

            Util.waitUntilElementIsVisible(list);
            var elementUser = list.element(by.repeater('info in popup.shareInfo.data')).element(by.css("span[ng-if='info."+ type +"']"));
            Util.waitUntilElementIsVisible(elementUser);
            return elementUser;
        }
    },

    /**
     * save and confirm changes on shared app definition popup
     * @saveAndConfirmChanges
     */
    saveAndConfirmChanges:{
        value:function(){
            var confirmChangesBtn = element(by.css('div[class="modal ng-scope top am-fade"]')).element(by.buttonText('Confirm changes'));
            confirmChangesBtn.click();
        }
    }
});