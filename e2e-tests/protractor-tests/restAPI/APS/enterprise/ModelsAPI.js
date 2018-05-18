/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Oct 30 2017
 */

/**
 *  Manage Models API
 */

var request = require('request');
var url = require('url-join');
var path = require('path');
var fs = require('fs');
var APIUtils = require('../../APIUtil.js');
var TestConfig = require('../../../test.config.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');
let CONSTANTS = require('../../../util/constants.js');

var ModelsAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    apiUtils= new APIUtils();
    var uri = url(baseUrl, '/models');

    /**
     * List models (process, form, decision rule or app) - GET /enterprise/models
     *
     * @param auth
     * @param includePermissions - boolean value
     * @returns {Promise}
     */
    this.getModels = function (auth, includePermissions) {
        logger.info('[ REST API ] List models (process, form, decision rule or app)');

        var options = {
            url: url(uri,  (typeof includePermissions == "undefined")? '' : '?includePermissions=' + includePermissions),
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
                        logger.info('List models response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('List models error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Create a new model - POST /enterprise/models
     *
     * @param auth
     * @param modelRepresentation - model details
     * @returns {Promise}
     */
    this.createModel = function (auth, modelRepresentation) {
        logger.info('[ REST API ] Create new model with representation:', modelRepresentation);

        var options = {
            url: url(uri),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: modelRepresentation
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
                        logger.info('Create new model response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Create new model error: ', err);
                    reject(err);
                });
        });
    };

    /**
     * List process definition models shared with the current user - GET /enterprise/models-for-app-definition
     *
     * @param auth
     * @returns {Promise}
     */
    this.getAppDefinitionModels = function (auth) {
        logger.info('[ REST API ] List process definition models shared with the current user');

        var options = {
            url: url(baseUrl, '/models-for-app-definition'),
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
                        logger.info('List process definition models response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('List process definition models error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Delete model - DELETE /enterprise/models/{modelId}
     *
     * @param auth
     * @param modelId
     * @param queryParameters - request query parameters
     * @returns {Promise}
     */
    this.deleteModel = function (auth, modelId, queryParameters) {
        logger.info('[ REST API ] Delete model by modelId:', modelId);
        var params = (typeof queryParameters == "undefined") ? '?cascade=true&deleteRuntimeApp=true' : apiUtils.buildQueryParams(queryParameters);
        var options = {
            url: url(uri, modelId, params),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Delete model by modelId:', modelId, 'successfully');
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Get a model - GET /enterprise/models/{modelId}
     *
     * @param auth
     * @param modelId
     * @returns {Promise}
     */
    this.getModel= function (auth, modelId) {
        logger.info('[ REST API ] Get model', modelId);

        var options = {
            url: url(uri, modelId),
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
                        logger.info('Get models', modelId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Get models', modelId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Update a model - PUT /enterprise/models/{modelId}
     *
     * @param auth
     * @param modelId
     * @param updatedModel - updated model metadata
     * @returns {Promise}
     */
    this.updateModel= function (auth, modelId, updatedModel) {
        logger.info('[ REST API ] Update model', modelId);

        var options = {
            url: url(uri, modelId),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: updatedModel
        };

        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info('Update model', modelId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Update model', modelId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Get model content - GET /enterprise/models/{modelId}/editor/json
     *
     * @param auth
     * @param modelId
     * @returns {Promise}
     */
    this.getModelContent = function (auth, modelId) {
        logger.info("[ REST API ] Get model content:", modelId);

        var options = {
            url: url(uri, modelId, '/editor/json'),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    let body = '';
                    response.on('data', function (data) {
                        body += data;
                    });
                    response.on('end', function () {
                        resolve({
                            responseBody: body.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info('Get model content response:', body.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Get model content error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Validate model content - POST /enterprise/models/{modelId}/editor/validate
     *
     * @param auth
     * @param modelId
     * @param values - request body - not required
     * @returns {Promise}
     */
    this.validateModelContent = function (auth, modelId, values) {
        logger.info('[ REST API ] Validate model', modelId, 'content.');

        var options = {
            url: url(uri, modelId, '/editor/validate'),
            headers: requestBase.requestHeaders(auth, CONSTANTS.HTTP_CONTENT_TYPE.URLENCODED, 'application/json'),
            json: true,
            body: values
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
                        logger.info('Validate model', modelId, 'content response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Validate model', modelId, 'content error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Create a new version of a model - POST /enterprise/models/{modelId}/newversion
     *
     * @param auth
     * @param modelId
     * @param filePath - new model version file location
     * @returns {Promise}
     */
    this.newModelVersion = function (auth, modelId, filePath) {
        logger.info('[ REST API ] Create a new version for model:', modelId);

        var absoluteFilePath = path.join(TestConfig.main.rootPath, filePath);

        var options = {
            url: url(uri, modelId, '/newversion'),
            headers: requestBase.requestHeaders(auth),
            formData: {
                file: fs.createReadStream(absoluteFilePath)
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
                        logger.info('Create a new version for model:', modelId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Create a new version for model:', modelId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Get a model's thumbnail image - GET /enterprise/models/{modelId}/thumbnail
     *
     * @param auth
     * @param modelId
     * @returns {Promise}
     */
    this.getThumbnail = function (auth, modelId) {
        logger.info('[ REST API ] Get model\'s', modelId, 'thumbnail image');
        
        var options = {
            url: url(uri, modelId, '/thumbnail'),
            headers: requestBase.requestHeaders(auth, CONSTANTS.HTTP_CONTENT_TYPE.IMAGE_PNG)
        };
        
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    body = "";
                    response.setEncoding('binary');
                    response.on('data', function (data) {
                        body += data;
                    });
                    response.on('end', function () {
                        var base64 = new Buffer(body, 'binary').toString('base64');
                        resolve({
                            responseBody: base64,
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage,
                            responseHeaders: response.headers
                        });
                        logger.info('Get model\'s', modelId, 'thumbnail image response:', base64);
                    });
                })
                .on('error', function (err) {
                    logger.info('Get model\'s', modelId, 'thumbnail image error:', err);
                    reject(err);
                });
        });
    };

    /**
     * Import a BPMN 2.0 XML file - POST /enterprise/process-models/import
     *
     * @param auth
     * @param xmlFilePath - xml file location
     * @returns {Promise}
     */
    this.importProcessModel = function (auth, xmlFilePath) {
        logger.info("[ REST API ] Import process model");

        var absoluteFilePath = path.join(TestConfig.main.rootPath, xmlFilePath);

        var options = {
            url: url(baseUrl, "/process-models/import"),
            headers: requestBase.requestHeaders(auth),
            formData: {
                file: fs.createReadStream(absoluteFilePath)
            }
        };

        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        resolve({
                            responseBody: data,
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info("Import process model response:" + data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error("Import process model error:" + err);
                    reject(err);
                });
        });
    }
};

module.exports = ModelsAPI;