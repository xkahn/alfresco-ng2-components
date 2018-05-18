/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 08/06/17.
 */

var Util = require('../../util/util.js');
var RestAPI = require('../../restAPI/APS/RestApi.js');
var TestConfig = require("../../test.config.js");
var Constants = require("../../util/constants.js");
var loginPage = require('../../pages/activiti/loginPage.js');
var landingPage = require('../../pages/activiti/landingPage.js');
var RequestOptions = require('../../restAPI/httpRequest/RequestOptions');
var BasicAuthorization = require('../../restAPI/httpRequest/BasicAuthorization');
var organizationPage = require('../../pages/activiti/idm/functionalGroupMgmtPage.js');
var profilePage = require('../../pages/activiti/idm/profilePage.js');


fdescribe("[C816][IDM] A user can have a primary group whose manager is auto-involved", function () {
    var dataPrepared = false;
    var SETTINGS = {
        user1: {
            id: null,
            email: Util.generateRandomEmail(),
            password: Util.generateRandomString(),
            firstName: Util.generateRandomString(),
            lastName: Util.generateRandomString(),
            fullName: function () {
                return this.firstName + " " + this.lastName;
            }
        },

        user2: {
            id: null,
            email: Util.generateRandomEmail(),
            password: Util.generateRandomString(),
            firstName: Util.generateRandomString(),
            lastName: Util.generateRandomString(),
            fullName: function () {
                return this.firstName + " " + this.lastName;
            }
        },

        tenantName: Util.generateRandomString(),
        tenantActive: true,
        tenantId: null,


        organisationGroupId: null,
        organisationGroupName: "groupA",
        groupTypeId: 1


    };

    var requestOptions = new RequestOptions(TestConfig.main.host, TestConfig.main.apiContextRoot, TestConfig.main.port);
    var basicAuthAdmin = new BasicAuthorization(TestConfig.main.adminEmail, TestConfig.main.adminPassword);
    var user1Auth = new BasicAuthorization(SETTINGS.user1.email, SETTINGS.user1.password);
    var user2Auth = new BasicAuthorization(SETTINGS.user2.email, SETTINGS.user2.password);

    beforeAll(function (done) {
        var isDataPrepared = function () {
            return dataPrepared;
        };
        RestAPI.createTenantViaAPI(requestOptions, basicAuthAdmin, SETTINGS.tenantName, SETTINGS.tenantActive, function (tenantId) {
            SETTINGS.tenantId = tenantId;
            RestAPI.createUserViaAPI(requestOptions, basicAuthAdmin, SETTINGS.user1.email, SETTINGS.user1.firstName, SETTINGS.user1.lastName, SETTINGS.user1.password, SETTINGS.tenantId, function (userId) {
                SETTINGS.user2.id = userId;
                RestAPI.createUserViaAPI(requestOptions, basicAuthAdmin, SETTINGS.user2.email, SETTINGS.user2.firstName, SETTINGS.user2.lastName, SETTINGS.user2.password, SETTINGS.tenantId, function (userId) {
                    SETTINGS.user1.id = userId;
                    RestAPI.createGroupViaAPI(requestOptions, basicAuthAdmin, SETTINGS.organisationGroupName, SETTINGS.tenantId, SETTINGS.groupTypeId, "", function (organizationGroupId) {
                        SETTINGS.organisationGroupId = organizationGroupId;
                        RestAPI.addUserToGroupViaAPI(requestOptions, basicAuthAdmin, SETTINGS.user1.id, SETTINGS.organisationGroupId, function () {
                            dataPrepared = true;

                        });
                    });
                });
            });
        });

        browser.wait(isDataPrepared, TestConfig.main.presence_timeout * 2).then(function () {
            logger.debug("Data prepared");
        });
        done();
    });

    fit('login as admin', function () {
        logger.debug("login as Admin to add user as group manager");

        loginPage.go();
        loginPage.doLogin(basicAuthAdmin.user, basicAuthAdmin.password);
        Util.waitUntilElementIsVisible(landingPage.navbar.btnUserMenu);

    });

    fit('nav to organisation and select group', function () {
        logger.debug("Go to 'Organization tab'");
        profilePage.go();
        Util.waitUntilElementIsVisible(profilePage.txtCompany.non_editable);
        expect(landingPage.currentUrl).toEqual(browser.baseUrl + profilePage.url);
        profilePage.navbar.clickOrganization();
        expect(organizationPage.currentUrl).toEqual(browser.baseUrl + organizationPage.url);
        logger.debug("Select a tenant");
        organizationPage.selectTenant(SETTINGS.tenantName);
        logger.debug("Select a group");
        organizationPage.selectGroup(SETTINGS.organisationGroupName);
        expect(organizationPage.getSelectedGroup()).toEqual(SETTINGS.organisationGroupName);

    });

    fit('add user of organization group as group manager', function () {
        logger.debug("Adding user of no-privilege group as group-manager'");
        organizationPage.addUserAsGroupManager(SETTINGS.user1.email, SETTINGS.user1.fullName());//SETTINGS.user1.email, SETTINGS.user1.firstName + ' ' + SETTINGS.user1.lastName);
        expect(organizationPage.getGroupManagerFullName).toEqual(SETTINGS.user1.fullName());
    });

    fit('add user of same tenant but not from organization group as group manager', function () {
        logger.debug("Adding user2 from same tenant as group-manager");
        organizationPage.addUserAsGroupManager(SETTINGS.user2.email, SETTINGS.user2.fullName());
        logger.debug("verify user1 is automatically removed as group manager after user2 is selected as group manager");
        expect(organizationPage.getGroupManagerFullName).not.toEqual(SETTINGS.user1.fullName());
        logger.debug("verify user2 is selected as group manager");
        expect(organizationPage.getGroupManagerFullName).toEqual(SETTINGS.user2.fullName());
    });

    fit('clicking on the bin next to group manager name should remove user as group manager',function(){
        organizationPage.deleteGroupManager();
        logger.debug("Verify no group manager present");
        expect(organizationPage.groupManagerNameLocator.isPresent()).toEqual(false);
    });

    afterAll(function (done) {
        RestAPI.deleteGroupViaAPI(requestOptions, basicAuthAdmin, SETTINGS.organisationGroupId, function (data, status) {
            expect(status).toEqual(Constants.HTTP_RESPONSE_STATUS_CODE.OK);
            done();
        });
    });
});
