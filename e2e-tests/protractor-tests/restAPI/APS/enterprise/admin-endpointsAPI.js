/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Feb 02 2018
 */

var request = require('request');
var path = require('path');
var url = require('url-join');
var fs = require('fs');
var APIUtils = require('../../APIUtil.js');
var apiUtils = new APIUtils();
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var AdminEndpointsAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/admin');
    this.getBasicAuths = function (auth, queryParams) {
        logger.info("[ REST API ] Get basic admin auths for tenantId: ");

        var options = {
            url: url(uri, '/basic-auths', apiUtils.buildQueryParams(queryParams)),
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

    this.createBasicAuth = function (auth, requestBody) {
        logger.info('[ REST API ] Create Basic Authentication: ', requestBody.username, ' ', requestBody.password, ' for tenantId: ', requestBody.tenantId);

        var options = {
            url: url(uri, '/basic-auths'),
            json: true,
            body: requestBody,
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info("Create basic authentication response: ", data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.createEndpoint = function (auth, requestBody) {
        logger.info('[ REST API ] Create Tenant Endpoint for tenantId: ', requestBody.tenantId);

        var options = {
            url: url(uri, '/endpoints'),
            json: true,
            body: requestBody,
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info("Create tenant enpoint response: ", data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };
};

module.exports = new AdminEndpointsAPI();