/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

var Page = require('astrolabe').Page;
var TestConfig = require("../../../../test.config.js");
var Util = require("../../../../util/util.js");

/**
 * Provides the publish app dialog.
 * @module pages
 * @submodule activiti
 * @submodule editor
 * @class pages.activiti.editor.components.PublishAnAppDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Provides the cancel button
     *
     * @property btnCancel
     * @type protractor.Element
     */
    btnCancel: {
        get: function () {
            return element(by.css("button[ng-click='cancel()']"));
        }
    },

    /**
     * Clicks the cancel button.
     *
     * @method clickCancel
     */
    clickCancel: {
        value: function () {
            this.btnCancel.click();
        }
    },

    /**
     * Provides the publish app button.
     *
     * @property btnPublishAppDefinition
     * @type protractor.Element
     */
    btnPublishAppDefinition: {
        get: function () {
            return element(by.xpath("//div[@ng-controller='PublishAppDefinitionPopupCtrl']//button[@ng-click='ok()']"));
        }
    },

    /**
     * Clicks the publish button.
     *
     * @method clickPublishAppDefinition
     */
    clickPublishAppDefinition: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnPublishAppDefinition);
            this.btnPublishAppDefinition.click();
            Util.waitUntilElementIsNotVisible(element(by.css("button[class='btn btn-sm btn-danger']")))
        }
    },

    /**
     * Clicks the Confirm button.
     *
     * @method clickConfirmAppDefinition
     */
    clickConfirmAppDefinition: {
        value: function () {
            btnConfirmAppDef = element(by.xpath("//div[@ng-controller='PublishAppDefinitionPopupCtrl']//button[@ng-click='ok(true)']"));
            if (btnConfirmAppDef.isPresent()) {
                btnConfirmAppDef.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        Util.waitUntilElementIsVisible(btnConfirmAppDef);
                        btnConfirmAppDef.click();
                        Util.waitUntilElementIsNotVisible(element(by.css("button[class='btn btn-sm btn-danger']")));
                    }
                }, function (err) {
                    logger.info("Don't need to close confirmation dialog");
                });
            }
        }
    },

    /*
     * @param message
     */
    waitErrorMessage: {
        value: function (message) {
            Util.waitUntilElementIsVisible(element(by.cssContainingText('.alert-danger.app-publish-error.ng-scope', message)));
        }
    }
});
