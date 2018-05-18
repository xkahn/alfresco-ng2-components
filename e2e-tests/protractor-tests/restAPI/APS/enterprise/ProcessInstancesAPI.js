/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 07/11/17.
 */

/**
 * Retrieve and manage process instances
 */

var request = require('request');
var url = require('url-join');
var path = require('path');
var fs = require('fs');
var APIUtils = require('../../APIUtil.js');
var TestConfig = require('../../../test.config.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');


var ProcessInstancesAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/process-instances');

    this.startProcessInstance = function (auth, processInstanceData) {
        logger.info("[ REST API ] Start process instance", processInstanceData);
        var options = {
            url: url(uri),
            json: true,
            body: processInstanceData,
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
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getProcessInstance = function (auth, processInstanceId) {
        logger.info("[ REST API ] Get processInstance info for the given processInstanceId: " + processInstanceId);

        var options = {
            url: url(uri, processInstanceId),
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
                    reject(err);
                });
        });
    };

    this.getProcessComments = function (auth, processInstanceId) {
        logger.info("[ REST API ] Get processInstance comments for the given processInstanceId:" + processInstanceId);

        var options = {
            url: url(uri, processInstanceId, '/comments'),
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
                        logger.info('Get process instance id:', processInstanceId, 'comments response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.addProcessComment = function (auth, processInstanceId, commentRequestData) {
        logger.info("[ REST API ] Add comment to the processInstanceId:" + processInstanceId);

        var options = {
            url: url(uri, processInstanceId, '/comments'),
            json: true,
            body: commentRequestData,
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
                        logger.info('Add comment to process instance id:', processInstanceId, ', response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.attachContent = function (auth, processInstanceId, relatedContentData) {
        logger.info("[ REST API ] Attach existing content to ProcessInstance Id: ", processInstanceId);

        var options = {
            url: url(uri, processInstanceId, '/content'),
            headers: requestBase.requestHeaders(auth),
            body: relatedContentData,
            json: true
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
                        logger.info('Attach existing content to process instance id: ', processInstanceId, ' response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.uploadContent = function (auth, processInstanceId, filePath, isRelatedContent) {
        logger.info("[ REST API ] Upload Document to ProcessInstance Id: ", processInstanceId, " Document filePath: ", filePath);
        var absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);

        var options = {
            url: url(uri, processInstanceId, '/raw-content', (typeof isRelatedContent == "undefined")? '' : '?isRelatedContent=' + isRelatedContent),
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
                        logger.info('Upload Document to process instance id: ', processInstanceId, ' response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getContentListForProcessInstance = function (auth, processInstanceId, isRelatedContent) {
        logger.info("[ REST API ] Get attached content list for processInstanceId : ", processInstanceId);

        var options = {
            url: url(uri, processInstanceId, '/content', (typeof isRelatedContent == "undefined")? '' : '?isRelatedContent=' + isRelatedContent),
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
                        logger.info('Get attached content list for process instance id: ', processInstanceId, ' response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * @getInvolvedIdentitybyType - /enterprise/process-instances/{processInstanceId}/identitylinks/{family}/{identityId}/{type}
     * @auth - credentials
     * @processInstanceId - {number}
     * @family - user or group
     * @identityId - userId
     * @type - customType or candidate
     */
    this.getInvolvedIdentitybyType = function (auth, processInstanceId, family, identityId, type) {
        logger.info('[ REST API ] Get involved user from ProcessInstance:', processInstanceId, 'by family, identityId and type');

        var options = {
            url: url(uri, processInstanceId, '/identitylinks', family, identityId, type),
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
                    logger.info('Get involved user from ProcessInstance:', processInstanceId, 'by family, identityId and type response:', data.toString());
                })
                .on('error', function (err) {
                    logger.info('Get involved user from ProcessInstance:', processInstanceId, 'by family, identityId and type error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @getVariableByName - /enterprise/process-instances/{processInstanceId}/variables/{variableName}
     * @auth - credentials
     * @processInstanceId - {number}
     * @variableName - {String}
     */
    this.getVariableByName = function (auth, processInstanceId, variableName) {
        logger.info('[ REST API ] Get ProcessInstance Variables for processInstanceId:', processInstanceId,' by variable name:', variableName);

        var options = {
            url: url(uri, processInstanceId, '/variables', variableName),
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
                    logger.info('Get ProcessInstance Variables for processInstanceId:', processInstanceId, 'by variable name:', variableName,'response:', data.toString());
                })
                .on('error', function (err) {
                    logger.info('Get ProcessInstance Variables for processInstanceId:', processInstanceId, 'by variable name:', variableName,'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @deleteVariableByName - /enterprise/process-instances/{processInstanceId}/variables/{variableName}
     * @auth - credentials
     * @processInstanceId - {number}
     * @variableName - {String}
     */
    this.deleteVariableByName = function (auth, processInstanceId, variableName) {
        logger.info('[ REST API ] Delete ProcessInstance Variables for processInstanceId: ', processInstanceId, 'by variable name:', variableName);

        var options = {
            url: url(uri, processInstanceId, 'variables', variableName),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Delete ProcessInstance Variables for processInstanceId:', processInstanceId, 'by variable name:', variableName,'successfully');
                })
                .on('error', function (err) {
                    logger.info('Delete ProcessInstance Variables for processInstanceId:', processInstanceId, 'by variable name:', variableName,'error: ', err);
                    reject(err);
                });
        });
    };

    /**
     * Create a new process instance variable  - POST /enterprise/process-instances/{processInstanceId}/variable
     *
     * @param auth
     * @param processInstanceId
     * @param requestBody - variable details json
     * @returns {Promise}
     */
    this.addProcessInstanceVariable = function (auth, processInstanceId, requestBody) {
        logger.info("[ REST API ] Add variable for process instanceId: " , processInstanceId);
        var options = {
            url: url(uri, processInstanceId, '/variables'),
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
                        logger.info('Add variable for process instanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    /**
     * List process instance variables - GET /enterprise/process-instances/{processInstanceId}/variables
     * @param auth
     * @param processInstanceId
     * @returns {Promise}
     */
    this.getListOfProcessInstanceVariables = function (auth, processInstanceId) {
        logger.info("[ REST API ] Get list of variables for processInstanceId: ",processInstanceId);
        var options = {
            url: url(uri, processInstanceId, '/variables'),
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
                        logger.info('Get list of variables for processInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = ProcessInstancesAPI;