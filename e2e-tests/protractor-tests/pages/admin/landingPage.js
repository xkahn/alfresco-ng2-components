/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 10/10/2016.
 */

var Page = require("astrolabe").Page;
var TestConfig = require("../../test.config.js");
var Util = require("../../util/util.js");
var navbar = require("./components/navbar.js");

/**
 * Provides the Landing Page
 * @module pages
 * @submodule admin
 * @class pages.admin.LandingPage
 */
module.exports = Page.create({
    /**
     * Indicates this page's url.
     *
     * @property url
     * @type {String}
     * @default TestConfig.admin.webContextRoot + '/#'
     */
    url: {value: TestConfig.admin.webContextRoot + '/#'},

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
    }
});