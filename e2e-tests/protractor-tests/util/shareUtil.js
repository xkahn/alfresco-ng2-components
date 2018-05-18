/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 9/1/2015.
 */

/**
 * @module util
 */
var exports = module.exports = {};

var TestConfig = require('../test.config.js');
var Util = require('./util.js');

/**
 * Provides utility methods used for tests between Share and Activiti
 *
 * @class util.shareUtil
 */
var TestConfig = require("../test.config.js");

/**
 * @method waitForPage
 */
exports.waitForPage = function () {
        browser.wait(function () {
            var deferred = protractor.promise.defer();
            browser.executeScript("return document.readyState").then(function (text) {
                deferred.fulfill(function (text) {
                    return text === "complete";
                });
            });
            return deferred.promise;
    })
};

/**
 *  Sets the settings for protractor in order to function with Share.
 *  @method switchSyncForShare
 */
exports.switchSyncForShare = function () {
    browser.ignoreSynchronization = true;
};

/**
 * Sets the settings for protractor in order to function with Activiti.
 * @method switchSyncForActiviti
 */
exports.switchSyncForActiviti = function () {
    browser.ignoreSynchronization = false;
    browser.rootEl = "div.activiti-alfresco-page>div";
};

/**
 * Open
 * @param siteShortName
 * @method openSiteDashboard
 */
exports.openSiteDashboard = function (siteShortName) {
    var siteURL = TestConfig.share.protocol + '://' + TestConfig.share.host + ':' + TestConfig.share.port + TestConfig.share.webContextRoot + '/page/site/' +
        siteShortName + '/dashboard';
    browser.get(siteURL);
};

/**
 * wait for element
 * @param locator
 * @method waitForElement
 */
exports.waitForElement = function (locator) {
	var EC = protractor.ExpectedConditions;
	browser.wait(EC.presenceOf(element(locator)), 10000);
	expect(element(locator).isPresent()).toBeTruthy();
};