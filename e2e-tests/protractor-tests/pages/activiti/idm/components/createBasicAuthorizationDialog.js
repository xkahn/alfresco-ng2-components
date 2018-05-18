/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 05/06/2015
 * Updated by Roxana Diacenco on: Tue Sep 26 2017
 */


/**
 * Page Object for create basic auth dialog
 */

var CreateBasicAuthorizationDialog = function () {
    var btnCancel = element(by.css('.btn.btn-default.ng-binding'));
    var btnSave = element(by.css("[ng-click*='createOrUpdateBasicAuthConfiguration']"));
    var nameField = element(by.id('basicAuthNameField'));
    var usernameField = element(by.id('basicAuthUsernameField'));
    var passwordField = element(by.id('basicAuthPasswordField'));

    /**
     * Click cancel button
     */
    this.clickCancel = function() {
        btnCancel.click();
    };

    /**
     * Click save button
     */
    this.clickSave = function() {
        btnSave.click();
    };

    /**
     * Fill the name field
     * @param name
     */
    this.fillName = function(name) {
        nameField.sendKeys(name);
    };

    /**
     * Fill the username field
     * @param username
     */
    this.fillUsername = function(username) {
        usernameField.sendKeys(username);
    };

    /**
     * Fill the password field
     * @param password
     */
    this.fillPassword = function(password) {
        passwordField.sendKeys(password);
    };
};

module.exports = CreateBasicAuthorizationDialog;



