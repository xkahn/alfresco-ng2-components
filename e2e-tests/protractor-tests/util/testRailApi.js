/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by Brindusa Gamaniata on 03/10/16.
 *
 * TestRail API Reference: http://docs.gurock.com/testrail-api2/start
 */

/**
 * @module testRailAPI
 */
var TestConfig = require('../test.config.js');
var Constants = require("../util/constants.js");

var exports = module.exports = {};
var https = require('https');
var request = require('request');

const util = require('util');
const async = require('async');

/**
 * Generates the authorization string for http based on the user and password parameters that are given
 * @method getAuthorization
 * @param user {string}
 * @param password {string}
 * @returns {string} The basic http authorization string.
 */
exports.getAuthorization = function (user, password) {
    return 'Basic ' + Buffer(user + ':' + password).toString('base64');
};

/**
 * Send POST request
 *
 * @param uri {String}
 * @param dataSet {Json}
 * @method sendPost
 * @usage var dataSet= {
            "status_id": 5,
            "comment": "This test failed",
            "defects": "3239",
            "version": "1.0 RC1 build 3724"
        };

 TestRailAPI.sendPost('add_result_for_case/65/430', dataSet, function(testcase){
            const util = require('util');

            console.log("TEST CASE: " + util.inspect(testcase, {depth: null, colors: true}))
        });
 */
exports.sendPost = function (uri, dataSet, callback) {
    this.sendRequest("POST", uri, dataSet, callback);
};

/**
 * Send GET request
 *
 * @param uri {String}
 * @method sendPost
 * @usage  TestRailAPI.sendGet('get_case/430', function(testcase){
            const util = require('util');

            console.log("TEST CASE: " + util.inspect(testcase, {depth: null, colors: true}))
        });
 */
exports.sendGet = function (uri, callback) {
    this.sendRequest("GET", uri, null, callback);
};

/**
 * Send request
 *
 * @param requestMethod {String}
 * @param uri {String}
 * @method sendPost
 */
exports.sendRequest = function (requestMethod, uri, dataSet, callback) {

    var options = {
        host: TestConfig.testRail.host,
        path: TestConfig.testRail.apiContextRoot + uri,

        method: requestMethod,

        headers: {
            'Authorization': this.getAuthorization(TestConfig.testRail.apiEmail, TestConfig.testRail.apiPassword),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    };

    if (requestMethod == 'POST') {
        var dataString = JSON.stringify(dataSet);
        options.headers['Content-Length'] = dataString.length;
    }

    var req = https.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("Request done");

            if (callback) {
                var json_data = JSON.parse(data);
                callback(json_data);
            }
        });
    });

    if (requestMethod == 'POST') {
        req.write(dataString);
    }
    req.end();
};

/**
 * Set setTestRailStatus
 *
 * @param failedSpecNo {Number}
 * @method setTestRailStatus
 * @return statusSuite
 */
exports.setTestRailStatus = function (failedSpecNo) {
    var statusSuite = "";

    if (failedSpecNo > 0) {
        statusSuite = Constants.TEST_RAIL_STATUS_ID.FAILED;
    } else {
        statusSuite = Constants.TEST_RAIL_STATUS_ID.PASSED;
    }

    return statusSuite;
};

/**
 * Set getTCTestRailStatusRequests
 *
 * @param desciption {String}
 * @method getTCTestRailStatusRequests
 * @return requestsURI
 */
exports.getTCTestRailStatusRequests = function (description) {

    // Description example: [C418][REST] Rest field tests
    // need Test Case ID: 418
    var arrTestCaseID = description.split("[C");
    var requestsURI = [];

    for (i = 0; i < arrTestCaseID.length; i++) {
        if (arrTestCaseID[i] !== '' && arrTestCaseID[i]) {
            arrTestCaseID[i] = arrTestCaseID[i].split(']')[0];
            var requestURI = 'add_result_for_case/' + TestConfig.testRail.testRun + '/' + arrTestCaseID[i];
            requestsURI.push(requestURI);
        }
    }

    return requestsURI;
};

exports.changeTCsStatusTestRail = function (description, failedSpec, done) {
    var statusSuite = this.setTestRailStatus(failedSpec);
    var dataSet = {
        "status_id": statusSuite,
        "comment": "Test Status updated using TestRail API"
    };

    var requestsURI = this.getTCTestRailStatusRequests(description);
    var self = this;
    async.each(requestsURI, function (requestURI, callback) {
        self.sendPost(requestURI, dataSet, function (testResult) {
            logger.info("TEST RESULT: " + util.inspect(testResult, {depth: null, colors: true}));
            var statusID = testResult.status_id;
            if (statusID != dataSet.status_id) {
                logger.error("Test was not updated in TestRail!");
            }
            callback();
        });
    }, function (err, results) {
        done();
    });
};