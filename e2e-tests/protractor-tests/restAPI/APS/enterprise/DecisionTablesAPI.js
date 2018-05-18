/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 22 2017
 */

/**
 * Retrieve decision tables
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

//require('request-debug')(request); // to debug the request

var DecisionTableAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/decisions/decision-tables');
    var apiUtils = new APIUtils();

    this.queryDecisionTable = function (auth, queryParameters) {
        logger.info('[ REST API ] Query decision tables');

        var options = {
            url: url(uri, apiUtils.buildQueryParams(queryParameters)),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.getDecisionTableDefinition = function (auth, decisionTableId) {
        logger.info('[ REST API ] Get definition for decision table: ', decisionTableId);

        var options = {
            url: url(uri, decisionTableId, '/editorJson'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = DecisionTableAPI;