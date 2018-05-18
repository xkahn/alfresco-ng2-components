/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 6/1/2015.
 */

var Page = require('astrolabe').Page;
var Util = require("../../../util/util.js");

/**
 * Provides the top navigation bar
 * @module pages
 * @submodule share
 * @class pages.share.components.Navbar
 */
module.exports = Page.create({

    /**
     * Clicks administrator in the navbar
     * @method clickAdministrator
     */
    clickAdministrator: {
        value: function () {
            var administrator = element(by.id("HEADER_USER_MENU_POPUP_text"))
            Util.waitUntilElementIsVisible(administrator);
            administrator.click();
        }
    },

    /**
     * Clicks my profile under administrator in the navbar
     * @method clickMyProfile
     */
    clickMyProfile: {
        value: function () {
            var myProfile = element(by.css("a[title='My Profile']"))
            Util.waitUntilElementIsVisible(myProfile);
            myProfile.click();
        }
    },

    /**
     * Provides the Home button in the navbar
     * @property btnHome
     * @type protractor.Element
     */
    btnHome: {
        get: function () {
            return element(by.id("HEADER_HOME_text"));
        }
    },

    /**
     * Clicks Home button in the navbar
     * @method clickTasks
     */
    clickHome: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnHome);
            this.btnHome.click();
        }
    },

    /**
     * Provides the tasks button in the navbar
     * @property btnTasks
     * @type protractor.Element
     */
    btnTasks: {
        get: function () {
            return element(by.id("HEADER_TASKS_text"));
        }
    },

    /**
     * Clicks Tasks button in the navbar
     * @method clickTasks
     */
    clickTasks: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnTasks);
            this.btnTasks.click();
        }
    },

    /**
     * Provides the My Task button under tasks menu in the navbar
     *
     * @property btnMyTasks
     * @type protractor.Elemetn
     */
    btnMyTasks: {
        get: function () {
            return element(by.id("HEADER_MY_TASKS_text"));
        }
    },

    /**
     * Clicks My Tasks menu item under the tasks menu in navbar
     *
     * @method clickMyTasks
     */
    clickMyTasks: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnMyTasks);
            this.btnMyTasks.click();
        }
    },

    /**
     * Provides the My Processes button under tasks menu in the navbar
     *
     * @property btnMyProcesses
     * @type protractor.Elemetn
     */
    btnMyProcesses: {
        get: function () {
            return element(by.id("HEADER_MY_WORKFLOWS_text"));
        }
    },

    /**
     * Clicks My Processes menu item under the tasks menu in navbar
     *
     * @method clickProcesses
     */
    clickMyProcesses: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnMyProcesses);
            this.btnMyProcesses.click();
        }
    },

    /**
     * Open the My Tasks page
     *
     * @method openMyTasks
     */
    openMyTasks: {
        value: function () {
            this.clickTasks();
            this.clickMyTasks();
        }
    },

    /* * Open the My Tasks page
     *
     * @method openMyTasks
     */
    openMyProcesses: {
        value: function () {
            this.clickTasks();
            this.clickMyProcesses();
        }
    },

    /**
     * Provides the user dropdown button
     * @property btnUserDropdown
     * @type protractor.Element
     */
    btnUserDropdown: {
        get: function () {
            return element(by.id("HEADER_USER_MENU_POPUP"));
        }
    },

    /**
     * Provides the logout button under the dropdown
     *
     * @property btnLogout
     * @type protractor.Element
     */
    btnLogout: {
        get: function () {
            return element(by.id("HEADER_USER_MENU_LOGOUT_text"));
        }
    },

    /**
     * Logs out the current user.
     *
     * @method doLogout
     */
    doLogout: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnUserDropdown);
            this.btnUserDropdown.click();
            Util.waitUntilElementIsVisible(this.btnLogout);
            this.btnLogout.click()
        }
    },

    /**
     * Provides the username element.
     * @property txtUsername
     * @type protractor.Element
     */
    txtUsername: {
        get: function () {
            return element(by.id("username"));
        }
    },

    /**
     * User that is currently logged in available on callback
     * @method getLoggedUser
     * @return String
     */
    getLoggedUser: {
        value: function (callback) {
            Util.waitUntilElementIsVisible(this.txtUsername);
            this.txtUsername.getText().then(function (text) {
                callback(text);
            });

        }
    }
});