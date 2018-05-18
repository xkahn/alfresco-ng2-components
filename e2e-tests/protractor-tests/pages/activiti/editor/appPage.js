/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");

var Util = require("../../../util/util.js");
var navbar = require("../components/navbar.js");

var publishAppDialog = require("./components/publishAppDialog.js");
var editIncludedModelsDialog = require("./components/editIncludedModelsDialog.js");
var saveAppDialog = require("./components/saveAppDialog.js");

/**
 * Provides the App page.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.AppPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.main.webContextRoot + '/editor/#/apps/ + appID'
     */
    url: {value: TestConfig.main.webContextRoot + '/editor/#/apps/'},

    /**
     * Provides the top navigation bar.
     *
     * @property navbar
     * @type astrolabe.Page
     */
    navbar: {
        get: function () {
            return navbar;
        }
    },

    /**
     * Provides the edit included models dialog
     *
     * @property editIncludedModelsDialog
     * @type astrolabe.Page
     */
    editIncludedModelsDialog: {
        get: function () {
            return editIncludedModelsDialog;
        }
    },

    /**
     * Provides the save app dialog
     *
     * @property saveAppDialog
     * @type astrolabe.Page
     */
    saveAppDialog: {
        get: function () {
            return saveAppDialog;
        }
    },

    /**
     * Provides the publish app dialog that shows when publishing an app.
     *
     * @property publishAppDialog
     * @type astrolabe.Page
     */
    publishAppDialog: {
        get: function () {
            return publishAppDialog;
        }
    },


    /**
     * Provides the publish button.
     *
     * @property btnPublish
     * @type protractor.Element
     */
    btnPublish: {
        get: function () {
            return element(by.css("button[ng-click='publish()']"));
        }
    },

    /**
     * Clicks the publish button.
     *
     * @method clickPublish
     */
    clickPublish: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnPublish);
            this.btnPublish.click();
        }
    },

    /**
     * Provides access on callback to the selected app title.
     *
     * @param callback {Function} Provides access to the current selected application title
     * @method getAppTitle
     */
    getAppTitle: {
        value: function (callback) {
            return element(by.css("div[id='main']>div>div[class='fixed-container']>h2")).getText().then(function (text) {
                callback(text);
            });
        }
    },

    /**
     * Opens the edit included models
     *
     * @method clickEditIncludedModels
     */
    clickEditIncludedModels: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.id('toggle-included-models')));
            element(by.id('toggle-included-models')).click();
        }
    },

    /**
     * Clicks the save button
     *
     * @method save
     */
    save: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.css('div[ng-controller="AppDefinitionToolbarController"]>button[title="Save the app definition"]')));
            element(by.css('div[ng-controller="AppDefinitionToolbarController"]>button[title="Save the app definition"]')).click();
        }
    },

    /**
     * Opens the editor for the currently opened app
     *
     * @method editApp
     */
    editApp: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.xpath("//button[@ng-click='openEditor()']")));
            element(by.xpath("//button[@ng-click='openEditor()']")).click();
        }
    },

    /**
     * Opens the editor for deleting the app
     *
     * @method deleteApp
     */
    deleteApp: {
        value: function () {
            var deleteElement = element(by.xpath(".//button[@ng-click='deleteApp()']"));
            Util.waitUntilElementIsVisible(deleteElement);
            deleteElement.click();
        }
    },

    /**
     * Adds another person to the app
     *
     * @method addAnotherPerson
     */
    addAnotherPerson: {
        value: function () {
            var addPeopleLink = element(by.xpath("//a[@on-people-selected='addPublishUser(user)']"));

            Util.waitUntilElementIsVisible(addPeopleLink);
            addPeopleLink.click();

        }
    },
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
     * Check user/person is in the list.
     *
     * @param type {person | group}
     * @method checkUserInList
     */
    checkUserInList: {
        value: function (type) {
            var list = element(by.xpath("//div[@ng-if='hasPublishAppCapability()']"));

            Util.waitUntilElementIsVisible(list);
            var elementUser = list.element(by.xpath("//div[@class='publish-identity-info']//span[@ng-if='info." + type + "']"));
            Util.waitUntilElementIsVisible(elementUser);

            return elementUser;
        }
    },

    /**
     * click on share app to view shared model
     * @method viewSharedAppDefinitionDialog
     */
    viewShareAppDefinitionDialog:{
        value: function(){
            var shareAppDefinitionToPersonLink = element(by.css('button[ng-click="shareApp()"]'));
            shareAppDefinitionToPersonLink.click();
        }
    }

});
