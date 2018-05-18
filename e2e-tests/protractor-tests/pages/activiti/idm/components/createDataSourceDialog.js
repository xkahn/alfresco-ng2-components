/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Brindusa Gamaniata on 13/07/2016
 * Updated by Roxana Diacenco on: Tue Sep 26 2017
 */


/**
 * Page Object for create data source dialog
 */

var CreateDataSourceDialog = function () {

    var nameField = element(by.model('editDataSource.name'));
    var jdbcUrl = element(by.model('editDataSource.config.jdbcUrl'));
    var driverClass = element(by.model('editDataSource.config.driverClass'));
    var usernameField = element(by.model('editDataSource.config.username'));
    var passwordField = element(by.model('editDataSource.config.password'));
    var btnSave = element(by.css("[ng-click*='createOrUpdateDataSource']"));

    /**
     * Click the save button
     */
    this.clickSave = function () {
        btnSave.click();
    };

    this.fillName = function (name) {
        nameField.sendKeys(name);
    };

    this.fillJDBCUrl = function (jdbc) {
        jdbcUrl.sendKeys(jdbc);
    };

    this.fillDriverClass = function (driver) {
        driverClass.sendKeys(driver);
    };

    this.fillUsername = function (username) {
        usernameField.sendKeys(username);
    };

    this.fillPassword = function (password) {
        passwordField.sendKeys(password);
    };
};

module.exports = CreateDataSourceDialog;