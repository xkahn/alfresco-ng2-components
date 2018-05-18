/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 08/11/17.
 */

/**
 * Retrieve and manage Tasks
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var TaskFormsAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/task-forms');

    this.completeTaskForm = function (auth, taskId, taskFormData) {
        logger.info("[ REST API ] Complete task-form for TaskId: ", taskId);

        var options = {
            url: url(uri, taskId),
            headers: requestBase.requestHeaders(auth),
            body: taskFormData,
            json: true
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getTaskFormVariables = function (auth, taskId) {
        logger.info("[ REST API ] Get completed task-form variables for TaskId: ", taskId);

        var options = {
            url: url(uri, taskId, '/variables'),
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
                        logger.info('Get task-form variables ( TaskId: ', taskId, ') response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Save task form  - POST /enterprise/task-forms/{taskId}/save-form
     *
     * @param auth - authentication details
     * @param taskId - task identifier
     * @param taskFormData - task form representation - set form values
     * @returns {Promise}
     */
    this.saveTaskForm = function (auth, taskId, taskFormData) {
        logger.info("[ REST API ] Save task-form for TaskId: ", taskId);

        var options = {
            url: url(uri, taskId, '/save-form'),
            headers: requestBase.requestHeaders(auth),
            body: taskFormData,
            json: true
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getTaskFormDetails = function (auth, taskId) {
        logger.info("[ REST API ] Get task form details for taskId: ", taskId);

        var options = {
            url: url(uri, taskId),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            var responseBody = '';
            request.get(options)
                .on('response', function (response) {
                    response
                        .on('data', function (data) {
                        responseBody += data;
                        })
                        .on('end', function (){
                            resolve({
                                responseBody: responseBody.toString(),
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                            logger.info('Get task form details ( TaskId:', taskId, ') response:', responseBody.toString());
                        });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getFieldValue = function (auth, taskId, field) {
        logger.info('[ REST API ] Get populated field:', field, 'value for taskId:', taskId);

        let options = {
            url: url(uri, taskId, '/form-values', field),
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
                            logger.info('Get populated field:', field, 'value for TaskId:', taskId, 'response:', responseBody.toString());
                            resolve({
                                responseBody: responseBody.toString(),
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

    this.getColumnFieldValue = function (auth, taskId, field, column) {
        logger.info('[ REST API ] Get column', column, 'field:', field, 'value for taskId:', taskId);

        let options = {
            url: url(uri, taskId, '/form-values', field, column),
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
                            logger.info('Get column', column, 'field:', field, 'value for TaskId:', taskId, 'response:', responseBody.toString());
                            resolve({
                                responseBody: responseBody.toString(),
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
};

module.exports = new TaskFormsAPI();
