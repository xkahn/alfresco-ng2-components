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
var EC = protractor.ExpectedConditions;
var TestConfig = require('../../../../test.config.js');
var Util = require("../../../../util/util.js");

/**
 * Provides the create edit included models dialog
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.editIncludedModelsDialog
 */
module.exports = Page.create({

    /**
     * Selects the process to be included in the app
     *
     * @param processName
     * @method selectProcess
     */
    selectProcess: {
        value: function(processName) {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-controller='ModelsIncludedPopupCtrl']")));
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-controller='ModelsIncludedPopupCtrl']//div[@class='details']/h3[@title='" + processName + "']")));
            element(by.xpath("//div[@ng-controller='ModelsIncludedPopupCtrl']//div[@class='details']/h3[@title='" + processName + "']")).click();
        }
    },

    /**
     * Clicks the close button
     *
     * @method close
     */
    close: {
        value: function() {
            Util.waitUntilElementIsVisible(element(by.xpath('//button[@ng-click="close()"]')));
            element(by.xpath('//button[@ng-click="close()"]')).click();
            Util.waitUntilElementIsNotVisible(element(by.xpath('//button[@ng-click="close()"]')));
        }
    }
});