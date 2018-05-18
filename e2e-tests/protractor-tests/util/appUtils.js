/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mon July 10 2017
 */

/**
 * Provides utility methods for an app
 */
var landingPage = require('../pages/activiti/landingPage.js');
var EditorNavBar = require('../pages/activiti/editor/components/editorNavBar.js');
var allAppsPage = require('../pages/activiti/editor/allAppsPage.js');
var appPage = require('../pages/activiti/editor/appPage.js');
var DeleteAppDialog = require('../pages/activiti/editor/components/deleteAppDialog');

var AppUtils = function () {

    var editorNavBar = new EditorNavBar();
    var deleteAppDialog = new DeleteAppDialog();

    this.deleteApp =  function (appName) {
        // navigate to app details page
        landingPage.go();
        landingPage.clickKickstartApp();
        editorNavBar.clickAppsMenu();

        allAppsPage.getAppByName(appName);

        // delete the app
        appPage.deleteApp();

        // confirm the deletion
        deleteAppDialog.selectAllVersions();
        deleteAppDialog.clickDeleteAppDefinition();

        allAppsPage.verifyAppNotDisplayed(appName);
    };

};

module.exports = AppUtils;