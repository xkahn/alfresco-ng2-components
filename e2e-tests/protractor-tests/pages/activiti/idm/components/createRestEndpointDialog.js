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
 * Page Object for create rest endpoint dialog
 */
var CreateRESTEndpointDialog = function () {
    var btnSave = element(by.css('button[ng-click="createOrUpdateEndpointConfiguration(editEndpointConfiguration); $hide()"]'));
    var btnCancel = element(by.css("div[class='modal-footer']>button[ng-click='$hide()']"));
    var nameField = element(by.id('nameField'));
    var protocolField = element(by.css("select[id='protocolField']"));
    var hostField = element(by.id('hostField'));
    var portField = element(by.id('portField'));
    var pathField = element(by.id('pathField'));
    var authDropDown = element(by.id('basicAuthField'));

    /**
     * Click the save button
     */
    this.clickSave = function () {
        btnSave.click();
    };

    /**
     * Click the cancel button
     */
    this.clickCancel = function () {
        btnCancel.click();
    };

    /**
     * Fill in the endpoint details
     */
    this.fillName = function (name) {
        nameField.sendKeys(name);
    };

    this.fillProtocol = function (protocol) {
        protocolField.sendKeys(protocol);
    };

    this.fillHost = function (host) {
        hostField.sendKeys(host);
    };

    this.fillPort = function (port) {
        portField.sendKeys(port);
    };

    this.fillPath = function(path) {
        pathField.sendKeys(path);
    };

    this.fillBasicAuth = function(basicAuthName) {
        authDropDown.element(by.cssContainingText('select[id="basicAuthField"]>option',basicAuthName)).click();
    };
};

module.exports = CreateRESTEndpointDialog;


