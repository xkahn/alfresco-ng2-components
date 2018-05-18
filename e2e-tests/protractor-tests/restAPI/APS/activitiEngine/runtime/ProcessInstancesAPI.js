/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Mar 12 2018
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

var ProcessInstancesAPI = function () {
    var requestBase = new RequestPublicBase();
    var apiUtils = new APIUtils();
    var uri = url(requestBase.getBaseURL(browser.params.app), '/runtime/process-instances');

    /**
     * getProcessInstances - /runtime/process-instances
     * 
     * @auth - credentials
     */
    this.getProcessInstances = function (auth, queryParameters) {
        logger.info('[ REST API ] Get list of process instances');

        let options = {
            url: url(uri, apiUtils.buildQueryParams(queryParameters)),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            let responseBody = '';
            request.get(options)
                .on('response', function (response) {
                    response
                        .on('data', function (data) {
                            responseBody += data;
                        }).
                        on('end', function (){
                            logger.info('Get list of process instances response:', responseBody.toString());
                            resolve({
                                responseBody: responseBody.toString(),
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                        });
                })
                .on('error', function (err) {
                    logger.info('Get list of process instances response:', err);
                    reject(err);
                });
        });
    };

    /**
     * startProcessInstance - /runtime/process-instances
     * @auth - credentials
     * @processInstanceRequestBody - request body
     */
    this.startProcessInstance = function (auth, processInstanceRequestBody) {
        logger.info('[ REST API ] Start process instance using:', processInstanceRequestBody);

        let options = {
            url: url(uri),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: processInstanceRequestBody
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
                        logger.info('Start process instance for response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Start process instance for error: ', err);
                    reject(err);
                });
        });
    };

    /**
     * deleteProcessInstance - /runtime/process-instances/{processInstanceId}
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     * @processInstanceRequestBody - request body
     */
    this.deleteProcessInstance = function (auth, processInstanceId) {
        logger.info('[ REST API ] Delete process instance:', processInstanceId);

        let options = {
            url: url(uri, processInstanceId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Deleted process instance:', processInstanceId, 'successfully');
                })
                .on('error', function (err) {
                    logger.info('Delete process instance:', processInstanceId, 'error: ', err);
                    reject(err);
                });
        });
    };

    /**
     * getProcessInstance - /runtime/process-instances/{processInstanceId}
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     */
    this.getProcessInstance = function (auth, processInstanceId) {
        logger.info('[ REST API ] Get process instance for processInstanceId:', processInstanceId);

        let options = {
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
                        logger.info('Get process instance for processInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get process instance for processInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * updateProcessInstance - /runtime/process-instances/{processInstanceId}
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     */
    this.updateProcessInstance = function (auth, processInstanceId, actionRepresentation) {
        logger.info('[ REST API ] Update process instance for processInstanceId:', processInstanceId);

        let options = {
            url: url(uri, processInstanceId),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: actionRepresentation
        };

        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Process instance id:', processInstanceId, 'updated successfully');
                })
                .on('error', function (err) {
                    logger.info('Update process instance for processInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @actionOnProcessInstance - /runtime/process-instances
     * @auth - credentials
     * @processInstanceId - {number}
     * @processInstanceRequestBody - request body
     */
    this.actionOnProcessInstance = function (auth, processInstanceId, requestBody) {
        logger.info('[ REST API ] Activate or suspend processInstance by processDefinitionId:', processInstanceId);
        var options = {
            url: url(uri),
            json: true,
            body: requestBody,
            headers: requestBase.requestHeaders(auth)
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
                        logger.info('Activate or suspend processInstance by processDefinitionId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Activate or suspend processInstance by processDefinitionId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };


    /**
     * getDiagram - /runtime/process-instances/{processInstanceId}/diagram
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     */
    this.getDiagram = function (auth, processInstanceId) {
        logger.info('[ REST API ] Get diagram for processInstanceId:', processInstanceId);

        var options = {
            url: url(uri, processInstanceId,'/diagram'),
            headers: requestBase.requestHeaders(auth)
        };
        let imageData = '';
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.setEncoding('binary');
                    response
                        .on('data', function (data) {
                            imageData += data;
                        })
                        .on('end', function () {
                            var imageDatabase64 = new Buffer(imageData, 'binary').toString('base64');
                            resolve({
                                responseBody: imageDatabase64,
                                headers: response.headers,
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                            logger.info('Get diagram for processInstanceId response:', imageDatabase64);
                        });
                })
                .on('error', function (err) {
                    logger.info('Get diagram for processInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @getInvolvedUsers - /runtime/process-instances/{processInstanceId}/identitylinks
     * @auth - credentials
     * @processInstanceId - {number}
     */
    this.getInvolvedUsers = function (auth, processInstanceId) {
        logger.info('[ REST API ] Get involved people with processInstanceId:', processInstanceId);

        let options = {
            url: url(uri, processInstanceId, '/identitylinks'),
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
                        logger.info('Get involved people with processInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get involved people with processInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @involveUser - /runtime/process-instances/{processInstanceId}/identitylinks
     * @auth - credentials
     * @processInstanceId - {number}
     * @involveUserRepresentation - request body
     */
    this.involveUser = function (auth, processInstanceId, involveUserRepresentation) {
        logger.info('[ REST API ] Involve user', involveUserRepresentation.userId, 'with processInstanceId:', processInstanceId);

        let options = {
            url: url(uri, processInstanceId, '/identitylinks'),
            json: true,
            body: involveUserRepresentation,
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
                        logger.info('Involve user with processInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Involve user with processInstanceId:', processInstanceId,'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @removeInvolvedUser - /runtime/process-instances/{processInstanceId}/identitylinks/users/{userId}/{type}
     * @auth - credentials
     * @processInstanceId - {Number}
     * @userId - {Number}
     * @type - {String}
     */
    this.removeInvolvedUser = function (auth, processInstanceId, userId, type) {
        logger.info('[ REST API ] Remove involved user:', userId, 'from processInstanceId:', processInstanceId);

        let options = {
            url: url(uri, processInstanceId, '/identitylinks/users', userId, type),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Remove involved user:', userId, 'from processInstanceId:', processInstanceId, 'successfully');
                })
                .on('error', function (err) {
                    logger.info('Remove involved user:', userId, 'from processInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * @deleteVariables - /runtime/process-instances/{processInstanceId}/variables
     * @auth - credentials
     * @processInstanceId - {number}
     */
    this.deleteVariables = function (auth, processInstanceId) {
        logger.info('[ REST API ] Delete process instance variables for processInstanceId:', processInstanceId);

        let options = {
            url: url(uri, processInstanceId, 'variables'),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Deleted process instance variables for processInstanceId:', processInstanceId, 'successfully');
                })
                .on('error', function (err) {
                    logger.info('Delete process instance variables for processInstanceId:', processInstanceId, 'error: ', err);
                    reject(err);
                });
        });
    };

    /**
     * getVariables - get process instance variables
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     */
    this.getVariables = function (auth, processInstanceId) {
        logger.info('[ REST API ] Get list of process instance variables for ProcessInstanceId:', processInstanceId);

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
                        logger.info('Get list of process instance variables for ProcessInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get list of process instance variables for ProcessInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * addVariables - Add process instance variables
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     * @variableRequestBody - request body
     */
    this.addVariables = function (auth, processInstanceId, variableList) {
        logger.info('[ REST API ] Add variables for ProcessInstanceId:', processInstanceId);
        let options = {
            url: url(uri, processInstanceId, '/variables'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: variableList
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
                        logger.info('Add variables for ProcessInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Add variables for ProcessInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * updateVariables - update process instance variables
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     * @variableRequestBody - request body
     */
    this.updateVariables = function (auth, processInstanceId, variableList) {
        logger.info('[ REST API ] Update variables for ProcessInstanceId:', processInstanceId);
        var options = {
            url: url(uri, processInstanceId, '/variables'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: variableList
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
                        logger.info('Update variables for ProcessInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Update variables for ProcessInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * getSingleVariable - get single process instance variable
     * runtime/process-instances/{processInstanceId}/variables/{variableName}
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     * @variableName - {String}
     */
    this.getSingleVariable = function (auth, processInstanceId, variableName) {
        logger.info('[ REST API ] Get variable:', variableName, 'for processInstanceId:', processInstanceId);

        let options = {
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
                        logger.info('Get variable:', variableName, 'for processInstanceId:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get variable:', variableName, 'for processInstanceId:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };

    /**
     * updateSingleVariable - update single process instance variable
     * runtime/process-instances/{processInstanceId}/variables/{variableName}
     * 
     * @auth - credentials
     * @processInstanceId - {number}
     * @variableName - {String}
     * @variableRequestBody - request body
     */
    this.updateSingleVariable = function (auth, processInstanceId, variableName, variableRepresentation) {
        logger.info('[ REST API ] Update single variable:', variableName, 'for ProcessInstance:', processInstanceId);
        
        let options = {
            url: url(uri, processInstanceId, '/variables', variableName),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: variableRepresentation
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
                        logger.info('Update single variable:', variableName, 'for ProcessInstance:', processInstanceId, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Update single variable:', variableName, 'for ProcessInstance:', processInstanceId, 'error:', err);
                    reject(err);
                });
        });
    };
};

module.exports = new ProcessInstancesAPI();