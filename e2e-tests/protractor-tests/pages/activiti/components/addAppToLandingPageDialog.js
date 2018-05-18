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
var Util = require("../../../util/util.js");

/**
 * Provides the dialog that shows when adding a new app to the landing page.
 * @module pages
 * @submodule activiti
 * @class pages.activiti.components.AddAppToLandingPageDialog
 */
module.exports = Page.create({
    url: {value: ''},

    /**
     * Selects one of the apps available for deploying.
     *
     * @method selectApp
     * @param {String} appTitle
     */
    selectApp: {
        value: function (appTitle) {
            Util.waitUntilElementIsVisible(this.btnDeploy);
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-repeat='app in popup.apps.data']")));
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-repeat='app in popup.apps.data']//h3[contains(text(),'"+ appTitle + "')]")));
            element(by.xpath("//div[@ng-repeat='app in popup.apps.data']//h3[contains(text(),'"+ appTitle + "')]")).click();
        }
    },

    /**
     * Provides the cancel button in the dialog.
     *
     * @property btnCancel
     * @type protractor.Element
     */
    btnCancel: {
        get: function () {
            return element(by.xpath("//button[@ng-click='cancel()']"));
        }
    },

    /**
     * Clicks the cancel button.
     *
     * @method clickCancel
     */

    clickCancel: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnCancel);
            this.btnCancel.click();
        }
    },

    /**
     * Provides the Deploy button for the dialog.
     *
     * @property btnDeploy
     * @type protractor.Element
     */

    btnDeploy: {
        get: function () {
            return element(by.xpath("//button[@ng-click='deploy()']"));
        }
    },

    /**
     * Clicks the deploy button.
     *
     * @method clickDeploy
     */

    clickDeploy: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnDeploy);
            this.btnDeploy.click();
        }
    }
});
