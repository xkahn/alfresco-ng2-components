/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 27/3/2015.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../../test.config.js");
var Util = require("../../../util/util.js");

/**
 * Provides the Login Page.
 * @module pages
 * @submodule share
 * @class pages.share.dashlets.activiti
 */
module.exports = Page.create({

    /**
     * Provides the Start Workflow Button
     * @property btnStartWorkflow
     * @type protractor.Element
     */
    btnStartWorkflow: {
        get: function () {
            return element(by.css("a[href='/share/page/start-workflow?referrer=tasks']"))
        }
    },

    /**
     * Clicks the start workflow element
     * @method clickStartWorkflow
     */
    clickStartWorkflow: {
        value: function () {
            this.btnStartWorkflow.click();
        }
    },

    isTaskDisplayed: {
        value: function (taskName, callback) {

            element(by.xpath("(//div[contains(@class,'dashlet activiti-my-tasks')]//h3/a[contains(text(),'" + taskName + "')])[1]")).isDisplayed().then(function (status) {
                callback(status);
            });
        }
    }
});