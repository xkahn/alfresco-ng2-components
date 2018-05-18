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

var request = require('request');
var path = require('path');
var url = require('url-join');
var fs = require('fs');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var FiltersAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/filters');

    this.listProcessInstanceFilters = function (auth, appId) {
        logger.info("[ REST API ] List ProcessInstance filters for appId: ", appId);

        var options = {
            url: url(uri, 'processes?appId=' + appId),
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
                        logger.info('List ProcessInstance filters for appId response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('List ProcessInstance filters for appId error: ', err);
                    reject(err);
                });
        });
    };

    this.createProcessInstanceFilter = function (auth, requestBody) {
        logger.info('[ REST API ] Create ProcessInstance filter with request body:' ,requestBody);

        var options = {
            url: url(uri, '/processes'),
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
                        logger.info('Create ProcessInstance filter response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Create ProcessInstance filter error: ', err);
                    reject(err);
                });
        });
    };

    this.reorderUserProcessInstanceFilters = function (auth, requestBody) {
        logger.info('[ REST API ] Re-ordering process-filter using', requestBody);

        var options = {
            url: url(uri, '/processes'),
            json: true,
            body: requestBody,
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    request.put(options)
                        .on('response', function (response) {
                            resolve(response);
                            logger.info('Reorder of process-filter successfully');
                        })
                })
                .on('error', function (err) {
                    logger.info('Re-ordering process-filter error: ', err);
                    reject(err);
                });
        });
    };

    this.deleteProcessInstanceFilter = function (auth, userFilterId) {
        logger.info('[ REST API ] Delete Process filter by filterId:', userFilterId);

        var options = {
            url: url(uri, '/processes', userFilterId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Delete Process filter successfully:', userFilterId);
                })
                .on('error', function (err) {
                    logger.info('Delete Process filter by filterId error:', err);
                    reject(err);
                });
        });
    };

    this.getProcessInstanceFilter = function (auth, userFilterId) {
        logger.info('[ REST API ] Get ProcessInstance filter: ', userFilterId);

        var options = {
            url: url(uri, '/processes', userFilterId),
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
                        logger.info('Get ProcessInstance filter response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get ProcessInstance filter response: ', err);
                    reject(err);
                });
        });
    };

    this.updateProcessInstanceFilter = function (auth, userFilterId, requestBody) {
        logger.info('[ REST API ] Update a ProcessInstance filter by userFilterId: ', userFilterId);

        var options = {
            url: url(uri, '/processes', userFilterId),
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
                        logger.info('Update a ProcessInstance filter by userFilterId response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Update a ProcessInstance filter by userFilterId: ', err);
                    reject(err);
                });
        });
    };

    this.listTaskFilters = function (auth, appId) {
        logger.info("[ REST API ] List Task filters for appId: ", appId);

        var options = {
            url: url(uri, '/tasks?appId=' + appId),
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
                        logger.info('List Task filters for appId response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('List Task filters for appId error: ', err);
                    reject(err);
                });
        });
    };

    this.createTaskFilter = function (auth, requestBody) {
        logger.info('[ REST API ] Create Task filter');

        var options = {
            url: url(uri, '/tasks'),
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
                        logger.info('Create Task filter response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Create Task filter error: ', err);
                    reject(err);
                });
        });
    };

    this.reorderUserTaskFilters = function (auth, requestBody) {
        logger.info('[ REST API ] Re-ordering User Task filters using', requestBody);

        var options = {
            url: url(uri, '/tasks'),
            json: true,
            body: requestBody,
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    request.put(options)
                        .on('response', function (response) {
                            resolve(response);
                            logger.info('Re-ordering User Task filters successful');
                        });
                })
                .on('error', function (err) {
                    logger.info('Re-ordering User Task filters error: ', err);
                    reject(err);
                });
        });
    };

    this.deleteTaskFilter = function (auth, userFilterId) {
        logger.info('[ REST API ] Delete Task filter by filterId: ', userFilterId);

        var options = {
            url: url(uri, '/tasks', userFilterId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Task filter deleted successfully: ', userFilterId);
                })
                .on('error', function (err) {
                    logger.info('Delete Task filter by filterId error: ', err);
                    reject(err);
                });
        });
    };

    this.getTaskFilter = function (auth, userFilterId) {
        logger.info('[ REST API ] Get Task filter: ', userFilterId);

        var options = {
            url: url(uri, '/tasks', userFilterId),
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
                        logger.info('Get Task filter response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get Task filter response: ', err);
                    reject(err);
                });
        });
    };

    this.updateTaskFilter = function (auth, userFilterId, requestBody) {
        logger.info('[ REST API ] Update a Task filter by userFilterId: ', userFilterId);

        var options = {
            url: url(uri, '/tasks', userFilterId),
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
                        logger.info('Update a Task filter by userFilterId response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Update a Task filter by userFilterId: ', err);
                    reject(err);
                });
        });
    };

};

module.exports = FiltersAPI;