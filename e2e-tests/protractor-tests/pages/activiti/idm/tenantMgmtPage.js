/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Fri Sep 21 2017
 */

var TestConfig = require("../../../test.config.js");
var Util = require("../../../util/util.js");
var CONSTANTS = require('../../../util/constants.js');

var IdmNavBar = require("./components/idmNavBar.js");
var DeleteTenantDialog = require("./components/deleteTenantDialog.js");
var CreateTenantDialog = require("./components/createTenantDialog.js");
var CreateRESTEndpointDialog = require("./components/createRestEndpointDialog.js");
var CreateBasicAuthDialog = require("./components/createBasicAuthorizationDialog");
var CreateDataSourceDialog = require("./components/createDataSourceDialog.js");
var TenantMenu = require('./components/tenantMenu.js');

/**
 * Page Object for tenant management page
 */

var TenantMgmtPage = function () {
    var url = TestConfig.main.webContextRoot + '/idm/#/tenant-mgmt';
    var createTenantBtn = element(by.css('[ng-click*=showCreateTenantPopup]'));
    var tenantsList = element(by.model('model.selectedTenantId'));
    var dateFormatInForms = element(by.model('model.globalDateFormat'));
    var deleteTenantBtn = element(by.css("button[ng-click='showDeleteTenantModal()']"));
    var editTenantBtn = element(by.css('button[ng-click="showEditTenantModal()"]'));
    var iconActive = element(by.css("span[ng-if$='model.selectedTenant.active']"));
    var inactiveIcon = element(by.css("span[ng-if='!model.selectedTenant.active']"));
    var addEndpointBtn = element(by.css('a[ng-click="showAddNewEndpointConfiguration()"]'));
    var addBasicAuthBtn = element(by.css('a[ng-click="showAddNewBasicAuthConfiguration()"]'));
    var addDataSourceBtn = element(by.css('a[ng-click*="showAddNewDataSource()"]'));
    var uploadNewTemplateButton = element(by.css('button[ng-click="showUploadTemplateModal()"]'));
    var templateLink = element(by.repeater('template in documentTemplateModel.templates.data').column('template.name'));
    var involveUsersCanEditForm = element(by.model('model.involvedUsersCanEditForms'));
    var selectedTenant = element(by.css("div[class='main-content']>div[class^='header']>h2"));
    var dtValidationCheckBox = element(by.model('model.decisionTableValidation'));

    var tenantMenu = new TenantMenu();
    var deleteTenantDialog = new DeleteTenantDialog();
    var createTenantDialog = new CreateTenantDialog();
    var createRESTEndpointDialog = new CreateRESTEndpointDialog();
    var createBasicAuthDialog = new CreateBasicAuthDialog();
    var createDataSourceDialog = new CreateDataSourceDialog();

    this.go = function() {
        browser.get(url);
        browser.waitForAngular();
    };
    this.navbar = function(){
        return IdmNavBar;
    };

    /**
     * Click create tenant button
     */
    this.clickCreateTenant = function () {
        Util.waitUntilElementIsPresent(createTenantBtn);
        createTenantBtn.click();
    };

    /**
     * Create a new tenant with the details given as parameters
     * @param {string} name
     * @param {string} domain
     * @param {string} maxUsers
     * @param {boolean} active
     */
    this.createTenant = function (name, domain, maxUsers, active) {
        createTenantDialog.fillName(name);
        createTenantDialog.fillDomain(domain);
        createTenantDialog.fillMaxUsers(maxUsers);
        createTenantDialog.setActive(active);
        createTenantDialog.clickSave();
    };

    /**
     * Retrieve the tenant dropdown option
     */
    this.getTenant = function (tenant) {
        return element(by.cssContainingText('option', tenant));
    };

    
    /**
     * Check if inactive icon is diplayed
     */
    this.isInactiveIconDisplayed = function () {
        return inactiveIcon.isDisplayed();
    };

    /**
     * Select a tenant from the list
     * @param {string} tenant
     */
    this.selectTenant = function (tenant) {
        this.getTenant(tenant).click();
    };

    /**
     * Return the name of the current selected tenant
     * @return {string}
     */
    this.getSelectedTenant = function () {
        Util.waitUntilElementIsPresent(selectedTenant);
        return selectedTenant.getText();
    };

    /**
     * Click the delete tenant button
     */
    this.clickDeleteTenant = function () {
        Util.waitUntilElementIsPresent(deleteTenantBtn);
        deleteTenantBtn.click();
        Util.waitUntilElementIsStale(deleteTenantBtn);
    };

    /**
     * Delete the current selected tenant
     */
    this.deleteTenant = function () {
        this.clickDeleteTenant();
        deleteTenantDialog.clickConfirm();
    };

    /**
     * Click the edit tenant button
     */
    this.clickEditTenant = function () {
        Util.waitUntilElementIsPresent(editTenantBtn);
        editTenantBtn.click();
    };

    /**
     * Edit the current selected tenant
     * @param {string} name
     * @param {string} domain
     * @param {string} maxUsers
     * @param {boolean} active
     */
    this.editTenant = function (name, domain, maxUsers, active) {
        createTenantDialog.fillName(name);
        createTenantDialog.fillDomain(domain);
        createTenantDialog.fillMaxUsers(maxUsers);
        createTenantDialog.setActive(active);
        createTenantDialog.clickSave();
    };

    /**
     * Click add new endpoint button
     */
    this.clickAddEndpoint = function () {
        Util.waitUntilElementIsPresent(addEndpointBtn);
        addEndpointBtn.click();
    };

    /**
     * Create a REST endpoint
     * @param name {string}
     * @param protocol {string}
     * @param host {string}
     * @param port {string}
     * @param path {string}
     */
    this.addNewEndpoint = function (name, protocol, host, port, path, basicAuth) {
        this.clickAddEndpoint();
        createRESTEndpointDialog.fillName(name);
        createRESTEndpointDialog.fillProtocol(protocol);
        createRESTEndpointDialog.fillHost(host);
        createRESTEndpointDialog.fillPort(port);
        createRESTEndpointDialog.fillPath(path);
        createRESTEndpointDialog.fillBasicAuth(basicAuth);
        createRESTEndpointDialog.clickSave();
    };

    /**
     * Click add basic auth button
     */
    this.clickAddBasicAuthorization = function () {
        Util.waitUntilElementIsPresent(addBasicAuthBtn);
        addBasicAuthBtn.click();
    };

    /**
     * Create a basic auth with the given params
     * @param name
     * @param username
     * @param password
     */
    this.addNewBasicAuth = function (name, username, password) {
        this.clickAddBasicAuthorization();
        createBasicAuthDialog.fillName(name);
        createBasicAuthDialog.fillUsername(username);
        createBasicAuthDialog.fillPassword(password);
        createBasicAuthDialog.clickSave();
    };

    /**
     * Click add data source button
     */
    this.clickAddDataSource = function () {
        Util.waitUntilElementIsVisible(addDataSourceBtn);
        addDataSourceBtn.click();
    };

    /**
     * Create a data source with the given params
     * @param name
     * @param jdbc
     * @param driver
     * @param username
     * @param password
     */
    this.addNewDataSource = function (name, jdbc, driver, username, password) {
        this.clickAddDataSource();
        createDataSourceDialog.fillName(name);
        createDataSourceDialog.fillJDBCUrl(jdbc);
        createDataSourceDialog.fillDriverClass(driver);
        createDataSourceDialog.fillUsername(username);
        createDataSourceDialog.fillPassword(password);
        createDataSourceDialog.clickSave();
    };

    /**
     * Check if "Tenants" page is displayed
     */
    this.isTenantsPageDisplayed = function () {
        Util.waitUntilElementIsVisible(createTenantBtn);
        Util.waitUntilElementIsVisible(tenantsList);
    };

    this.openConfig = function () {
        tenantMenu.openMenu(CONSTANTS.TENANT_MANAGEMENT_TABS.CONFIG);
    };

    this.openDataSources = function () {
        tenantMenu.openMenu(CONSTANTS.TENANT_MANAGEMENT_TABS.DATA_SOURCES);
    };

    this.openDocTemplates = function () {
        tenantMenu.openMenu(CONSTANTS.TENANT_MANAGEMENT_TABS.DOCUMENT_TEMPLATES);
    };

    this.openEndpoints = function (){
        tenantMenu.openMenu(CONSTANTS.TENANT_MANAGEMENT_TABS.ENDPOINTS);
    };

    this.setDateFormatInForms = function (dateFormat) {
        Util.waitUntilElementIsVisible(dateFormatInForms);
        dateFormatInForms.clear().sendKeys(dateFormat);
    };

    this.getDateFormatInForms = function () {
        Util.waitUntilElementIsVisible(dateFormatInForms);
        return dateFormatInForms.getAttribute('value');
    };

    /**
     * Click upload new document template
     */
    this.clickUploadNewTemplate = function () {
        Util.waitUntilElementIsVisible(uploadNewTemplateButton);
        uploadNewTemplateButton.click();
    };

    /**
     * Provide the uploaded template name
     */
    this.getUploadedDocumentName = function () {
        Util.waitUntilElementIsVisible(templateLink);
        return templateLink.getText();
    };

    /**
     * Involved users can edit forms
     * @param enable - can be either true/false
     */
    this.setInvolveUsersCanEditForm = function (enable) {
        involveUsersCanEditForm.isSelected().then(function (selected) {
            if (selected !== enable) {
                involveUsersCanEditForm.click();
            }
        });
    };

    this.clickDTValidationCheckBox = function () {
        Util.waitUntilElementIsVisible(dtValidationCheckBox);
        dtValidationCheckBox.click();
    }
};

module.exports = TenantMgmtPage;
