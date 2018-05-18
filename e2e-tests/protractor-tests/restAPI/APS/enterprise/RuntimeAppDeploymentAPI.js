/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 03 2017
 */

/**
 * Retrieve and manage runtime app deployments
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var RuntimeAppDeploymentAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/runtime-app-deployments');
    var apiUtils = new APIUtils();

    this.deleteApp = function (auth, appId) {
        logger.info("[ REST API ] Delete app with id: ", appId);

        var options = {
            url: url(uri, appId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    /**
     * @getRunTimeAppDeployment - /enterprise/runtime-app-deployments/{queryParameters}
     * @auth - credentials
     * @queryParameters - nameLike/tenantId/latest/start/sort/order/size
     */
    this.getRunTimeAppDeployment = function (auth, queryParameters) {
        logger.info('[ REST API ] Get runTime App Deployment');

        var options = {
            url: url(uri, apiUtils.buildQueryParams(queryParameters)),
            headers: requestBase.requestHeaders(auth),
            json: true
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
                        logger.info('Get runTime App Deployment response:',data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get runTime App Deployment error:', err);
                    resolve(err);
                });
        });
    };
};

module.exports = RuntimeAppDeploymentAPI;