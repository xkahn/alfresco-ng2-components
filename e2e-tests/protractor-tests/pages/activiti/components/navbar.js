/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 6/1/2015.
 */
var shareUtil = require("../../../util/shareUtil.js");
var Util = require("../../../util/util.js");
var Page = require('astrolabe').Page;
var TestConfig = require("../../../test.config.js");
var loginPage = require("../loginPage.js");
var EC = protractor.ExpectedConditions;

/**
 * Provides the top navigation bar
 * @module pages
 * @submodule activiti
 * @class pages.activiti.components.Navbar
 */
module.exports = Page.create({
    url: {
        value: ''
    },


    /* Start of IDM (Identity Management) navbar buttons */

    /**
     * Click Activiti logo
     *
     * @method homeLink
     */
    homeLink: {
        value: function () {
            var homeElem = element(by.xpath("//a[@ng-click='backToLanding()']"));

            Util.waitUntilElementIsVisible(homeElem);
            homeElem.click();
        }
    },

    /**
     * Provides the button for the user menu.
     *
     * @property btnUserMenu
     * @type protractor.Element
     */
    btnUserMenu: {
        get: function () {
            return element(by.css('button[class="btn btn-default dropdown-toggle user-menu"]'));
        }
    },

    /**
     * Provides the button for log out.
     *
     * @property btnLogOut
     * @type protractor.Element
     */
    btnLogOut: {
        get: function () {
            return element(by.css("a[ng-click='logout()']"));
        }
    },

    /**
     * Returns the user that is currently logged in.
     * @method getLoggedUser
     * @return String
     */
    getLoggedUser: {
        value: function () {
            try {
                Util.waitUntilElementIsVisible(this.btnUserMenu);
                return this.btnUserMenu.getText();
            } catch (err) {
                console.log(err + "Couldn't get element text!");
            }
        }
    },

    /**
     * Logs the user out.
     *
     * @method clickLogout
     */
    clickLogout: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnUserMenu);
            this.btnUserMenu.click(function () {
                Util.waitUntilElementIsVisible(this.btnLogOut);
                this.btnLogOut.click(function () {
                    loginPage.isLoginPageDisplayed();
                });
            });
        }
    },

    //TODO To be removed - it was moved to dedicated file for idm navigation bar (idmNavBar.js)

    /**
     * Provides the "Personal" tab button.
     *
     * @property btnPersonal
     * @type protractor.Element
     */
    btnPersonal: {
        get: function () {
            return element(by.id("profile"));
        }
    },

    /**
     * Clicks the "Personal" tab button
     *
     * @method clickPersonal
     */
    clickPersonal: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnPersonal);
            this.btnPersonal.click();
        }
    },

    /**
     * Provides the "Organization" tab button
     *
     * @property btnOrganization
     * @type protractor.Element
     */
    btnOrganization: {
        get: function () {
            return element(by.id('functionalGroupMgmt'));
        }
    },

    /**
     * Clicks the "Organization" tab button
     *
     * @method clickOrganization
     */
    clickOrganization: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnOrganization);
            Util.waitUntilElementIsClickable(this.btnOrganization);
            this.btnOrganization.click();
            this.isOrganizationPageDisplayed();
        }
    },

    isOrganizationPageDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnTenants);
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@ng-show='!model.loadingGroup']")));
            Util.waitUntilElementIsVisible(element(by.xpath("//*/button[@ng-click='showCreateGroupPopup()']")));
        }
    },

    /**
     * Provides the "Tenants" tab button
     *
     * @property btnTenants
     * @type protractor.Element
     */
    btnTenants: {
        get: function () {
            return element(by.id('tenantMgmt'));
        }
    },

    /**
     * Clicks the "Tenants" tab button
     *
     * @method clickTenants
     */
    clickTenants: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnTenants);
            this.btnTenants.click();
            this.isTenantsPageDisplayed();
        }
    },

    /**
     * Clicks the "Tenants" tab button
     *
     * @method clickTenants
     */
    isTenantsPageDisplayed: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnTenants);
            Util.waitUntilElementIsVisible(element(by.xpath("//*/button[@ng-click='showCreateTenantPopup()']")));
            Util.waitUntilElementIsVisible(element(by.xpath("//*/div[@class='list-wrapper ng-isolate-scope']")));
        }
    },

    /**
     * Provides the "Users" tab button
     *
     * @property btnUsers
     * @type protractor.Element
     */
    btnUsers: {
        get: function () {
            return element(by.id('userMgmt'));
        }
    },

    /**
     * Clicks the "Users" tab button.
     *
     * @method clickUsers
     */
    clickUsers: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnUsers);
            this.btnUsers.click();
            this.isUserPageShowed();
        }
    },

    isUserPageShowed: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='main-list']")));
            Util.waitUntilElementIsVisible(element(by.xpath("//*/button[@ng-click='addUser()']")));
            Util.waitUntilElementIsVisible(element(by.xpath("//table[@class='users-details']")));
        }
    },
    /**
     * Provides the "Capabilities" tab button.
     *
     * @property btnCapabilities
     * @type protractor.Element
     */
    btnCapabilities: {
        get: function () {
            return element(by.id('systemGroupMgmt'))
        }
    },

    /**
     * Clicks the "Capabilities" tab button.
     *
     * @method clickCapabilities
     */
    clickCapabilities: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnCapabilities);
            logger.debug("wait for btnCapabilities");
            this.btnCapabilities.click();
            logger.debug("click on btnCapabilities");
            var mainList = element(By.id("main-list"));
            Util.waitUntilElementIsVisible(mainList);
            logger.debug("Capability page should be displayed");
            var groupDetail = element(By.css("div.main-content"));
            Util.waitUntilElementIsVisible(groupDetail);
        }
    },
    /* End of IDM navbar buttons */
    //TODO To be removed - it was moved to dedicated file for editor navigation bar

    /* Start of EDITOR (Kickstart) navbar buttons */

    /**
     * Provides the "Processes" tab button inside the "Kickstart" application.
     *
     * @property btnProcesses_editor
     * @type protractor.Element
     */
    btnProcesses_editor: {
        get: function () {
            return element(by.xpath("//div[@class='navbar-header']//a[text()='Processes']"))
        }
    },

    /**
     * Clicks the "Processes" tab button inside the "Kickstart" application.
     *
     * @method clickProcesses_editor
     */
    clickProcesses_editor: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnProcesses_editor);
            this.btnProcesses_editor.click();
        }
    },

    /**
     * Provides the "Forms" tab button inside the "Kickstart" application.
     *
     * @property btnForms
     * @type protractor.Element
     */
    btnForms: {
        get: function () {
            return element(by.xpath('//div[@class="navbar-header"]/ul/li[2]'))
        }
    },

    /**
     * Clicks the "Forms" tab button inside the "Kickstart" application.
     *
     * @method clickForms
     */
    clickForms: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnForms);
            this.btnForms.click();
        }
    },

    /**
     * Provides the "Decision Tables" tab button inside the "Kickstart" application.
     *
     * @property btnDecisionTables
     * @type protractor.Element
     */
    btnDecisionTables: {
        get: function () {
            return element(by.cssContainingText('.ng-binding','Decision Tables'));
        }
    },

    /**
     * Clicks the "Decision Tables" tab button inside the "Kickstart" application
     *
     * @method clickDecisionTables
     */
    clickDecisionTables: {
        value: function () {
            // needed this for IE and FF
            //if (browser.browserName != "chrome") {
            //    browser.refresh();
            //    browser.wait(EC.visibilityOf(this.btnDecisionTables), TestConfig.main.presence_timeout);
            //}
            Util.waitUntilElementIsClickable(this.btnDecisionTables);
            this.btnDecisionTables.click();
        }
    },

    /**
     * Provides the "Data Models" tab button inside the "Kickstart" application.
     *
     * @property btnDataModels
     * @type protractor.Element
     */
    btnDataModels: {
        get: function () {
            return element(by.xpath(".//*[@id='main-nav']//a[text()='Data Models']"))
        }
    },

    /**
     * Clicks the "Data Models" tab button inside the "Kickstart" application
     *
     * @method clickDataModels
     */
    clickDataModels: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnDataModels);
            this.btnDataModels.click();
        }
    },

    /**
     * Provides the "Apps" tab button inside the "Kickstart" application.
     *
     * @property btnApps
     * @type protractor.Element
     */
    btnApps: {
        get: function () {
            return element(by.xpath(".//*[@id='main-nav']//a[text()='Apps']"))
        }
    },

    /**
     * Clicks the "Apps" tab button inside the "Kickstart" application
     *
     * @method clickApps
     */
    clickApps: {
        value: function () {
            /*if (browser.browserName != "chrome") {
             browser.refresh();
             browser.wait(EC.visibilityOf(this.btnApps), TestConfig.main.presence_timeout);
             }*/
            Util.waitUntilElementIsVisible(element(by.xpath(".//*[@id='main-nav']//a[text()='Apps']")));
            Util.waitUntilElementIsVisible(this.btnApps);
            this.btnApps.click();
        }
    },

    waitForAppsPageToLoad: {
        value: function () {
            var leftMenuElement = element(by.xpath("//*/a[@ng-click='activateFilter(filter)' and text()='My app definitions']"));
            Util.waitUntilElementIsVisible(leftMenuElement);
            Util.waitUntilElementIsVisible(this.btnApps);
        }
    },

    /**
     * Provides the "Stencils" tab button inside the "Kickstart" application
     *
     * @property btnStencils
     * @type protractor.Element
     */
    btnStencils: {
        get: function () {
            return element(by.xpath(".//*[@id='main-nav']//a[text()='Stencils']"));
        }
    },

    /**
     * Clicks the "Stencils" tab button inside the "Kickstart" application
     *
     * @method clickStencils
     */
    clickStencils: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnStencils);
            Util.waitUntilElementIsClickable(this.btnStencils);
            this.btnStencils.click();
        }
    },

    /* End of EDITOR (Kickstart) navbar buttons */

// TODO - Items below have been moved to workflowNavBar.js
// TODO - Clean-up after code refactoring
    /* Start of TASKS|APP (My tasks) navbar buttons */

    /**
     * Provides the "Tasks" tab button.
     *
     * @property btnTasks
     * @type protractor.Element
     */
    btnTasks: {
        get: function () {
            return element(by.xpath("//div[@class='navbar-header']//a[text()='Tasks']"));
        }
    },

    /**
     * Clicks the "Tasks" button.
     *
     * @method clickTasks
     */
    clickTasks: {
        value: function () {
            Util.waitUntilElementIsVisible(element(by.xpath("//div[@class='navbar-header']//a[text()='Tasks']")));
            this.btnTasks.click();
        }
    },

    /**
     * Provides the "Processes" tab button.
     *
     * @property btnProcesses_workflow
     * @type protractor.Element
     */
    btnProcesses_workflow: {
        get: function () {
            return element(by.xpath("//*/div[@id='main-nav']//a[@class='ng-binding' and text()='Processes']"));
        }
    },

    /**
     * Clicks the "Processes" tab button.
     *
     * @method clickProcesses_workflow
     */
    clickProcesses_workflow: {
        value: function () {
            Util.waitUntilElementIsVisible(this.btnProcesses_workflow);
            this.btnProcesses_workflow.click();
            Util.waitUntilElementIsVisible(element(by.xpath("//input[@ng-change='filterChanged()']")));
            //Util.waitUntilElementIsVisible(element(by.css("div[class='help-dude-jumping']")));
        }
    }
    /* End of TASKS|APP (My tasks) navbar buttons */
});