/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Mar 15 2018
 */

/**
 * Retrieve and manage process instances
 */

var request = require('request');
var url = require('url-join');
var path = require('path');
var fs = require('fs');
var APIUtils = require('../../../APIUtil.js');
var TestConfig = require('../../../../test.config.js');
var RequestPublicBase = require('../RequestPublicBase.js');

var DeploymentsAPI = function () {
    var requestBase = new RequestPublicBase();
    var uri = url(requestBase.getBaseURL(browser.params.app), '/repository/deployments');

    /**
     * @getDeployments - /repository/deployments
     * @auth - credentials
     */
    this.getDeployments = function (auth) {
        logger.info('[ REST API ] Get List of Deployments');

        var options = {
            url: url(uri, '?size=1000'),

            headers: requestBase.requestHeaders(auth)
        };
        let completeResponse = '';
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        completeResponse += data;
                    })
                        .on('end', function (data) {
                            resolve({
                                responseBody: completeResponse.toString(),
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                            logger.info('Get List of Deployments response:', completeResponse.toString());
                        });
                })
                .on('error', function (err) {
                    logger.info('Get List of Deployments error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @createDeployment - /repository/deployments
     * @auth - credentials
     * @deploymentRequestBody - request body
     */
    this.createDeployment = function (auth, filePath, tenantId) {
        logger.info('[ REST API ] Create Deployment');
        var absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);
        var options = {
            url: url(uri),
            headers: requestBase.requestHeaders(auth),
            formData: {
                file: fs.createReadStream(absoluteFilePath),
                tenantId: tenantId
            }
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
                        logger.info('Create Deployment response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Create Deployment error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @deleteDeployment - /repository/deployments/{deploymentId}
     * @auth - credentials
     * @deploymentId - {number}
     */
    this.deleteDeployment = function (auth, deploymentId) {
        logger.info('[ REST API ] Delete deployment by deploymentId:', deploymentId);

        var options = {
            url: url(uri, deploymentId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Delete deployment by deploymentId:', deploymentId, 'successfully');
                })
                .on('error', function (err) {
                    logger.info('Delete deployment by deploymentId:', deploymentId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @getDeploymentById - /repository/deployments/{deploymentId}
     * @auth - credentials
     * @deploymentId - {number}
     */
    this.getDeploymentById = function (auth, deploymentId) {
        logger.info('[ REST API ] Get deployment by deploymentId:', deploymentId);

        var options = {
            url: url(uri, deploymentId),
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
                        logger.info('Get deployment by deploymentId:', deploymentId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get deployment by deploymentId:', deploymentId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @getResourceByDeploymentId - /repository/deployments/{deploymentId}/resources
     * @auth - credentials
     * @resourceId - {number}
     */
    this.getResourceByDeploymentId = function (auth, deploymentId) {
        logger.info('[ REST API ] Get all resources by for deploymentId:', deploymentId);

        var options = {
            url: url(uri, deploymentId, '/resources'),
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
                        logger.info('Get all resources by for deploymentId:', deploymentId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get all resources by for deploymentId:', deploymentId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @getResourceDataById - /repository/deployments/{deploymentId}/resourcedata/{resourceId}
     * @auth - credentials
     * @resourceId - {number}
     */
    this.getResourceDataById = function (auth, deploymentId, resourceId) {
        logger.info('[ REST API ] Get resource by resourceId:', resourceId, 'for deploymentId:', deploymentId);

        var options = {
            url: url(uri, deploymentId, '/resourcedata', resourceId),
            headers: requestBase.requestHeaders(auth)
        };
        let responseData = '';

        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.setEncoding('binary');
                    response
                        .on('data', function (data) {
                            responseData += data;
                        })
                        .on('end', function (data) {
                            resolve({
                                responseBody: responseData,
                                headers: response.headers,
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                        })
                })
                .on('error', function (err) {
                    logger.info('Get resource by resourceId:', resourceId, 'for deploymentId:', deploymentId, 'error:', err);
                    reject(err);
                });
        });
    };
};

module.exports = DeploymentsAPI;