/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Mar 13 2018
 */

/**
 * Manage reports
 */

let request = require('request');
let url = require('url-join');
let RequestPrivateBase = require('./RequestPrivateBase');
let apiUtils = new(require('../../APIUtil.js'))();
let CONSTANTS = require('../../../util/constants');

let ReportingAPI = function () {
    let requestBase = new RequestPrivateBase();
    let uri = url(requestBase.getBaseURL(browser.params.app), '/reporting');

    /**
     * Generate default reports - POST /app/rest/reporting/default-reports
     *
     * NOTE: Capabilities.ACCESS_REPORTS is required, otherwise operation is not permitted
     * @param auth - authentication credentials for login
     * @returns {Promise}
     */
    this.generateDefaultReports = function(auth) {
        logger.info('[ REST API ] Generate default reports');
        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(headers) {
                    let options = {
                        url: url(uri, '/default-reports'),
                        headers: headers
                    };
                    request.post(options)
                        .on('response', function(response) {
                            resolve(response);
                            logger.info("Generate default reports successfully:", response.statusCode, response.statusMessage);
                        })
                        .on('error', function(err) {
                            reject(err);
                        });
                });
        });
    };

    /**
     * Get tasks for process definition - GET /app/rest/reporting/report-params/{reportId}/tasks
     *
     * @param auth - authentication credentials for login
     * @param reportId
     * @param queryParameters
     * @returns {Promise}
     */
    this.getProcessDefinitionTasks = function(auth, reportId, queryParameters) {
        logger.info('[ REST API ] Get process definition tasks for report id:', reportId);
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                requestBase.requestHeaders(auth)
                    .then(function(headers) {
                        let options = {
                            url: url(uri, '/report-params', reportId, '/tasks', apiUtils.buildQueryParams(queryParameters)),
                            headers: headers
                        };
                        request.get(options)
                            .on('response', function(response) {
                                response.on('data', function(data) {
                                    resolve({
                                        responseBody: data.toString(),
                                        statusCode: response.statusCode,
                                        responseMessage: response.statusMessage
                                    });
                                    logger.info('Get process definition tasks for report id:', reportId, 'response:', data.toString());
                                });
                            })
                            .on('error', function(err) {
                                reject(err);
                            });
                    });
            }, 5000)
        });
    };

    /**
     * Generate report - POST /app/rest/reporting/report-params/{reportId}
     *
     * @param auth - authentication credentials for login
     * @param reportId
     * @param parameterMap - request body
     * @returns {Promise}
     */
    this.generateReport = function(auth, reportId, parameterMap) {
        logger.info('[ REST API ] Generate report:', reportId, 'parameters.');
        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(headers) {
                    let options = {
                        url: url(uri, '/report-params', reportId),
                        headers: headers,
                        json: true,
                        body: parameterMap
                    };
                    request.post(options)
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                resolve({
                                    responseBody: data.toString(),
                                    statusCode: response.statusCode,
                                    responseMessage: response.statusMessage
                                });
                                logger.info('Generate report:', reportId, 'parameters response:', data.toString());
                            });
                        })
                        .on('error', function(err) {
                            reject(err);
                        });
                });
        });
    };

    /**
     * Search running process definitions - GET /app/rest/reporting/process-definitions
     *
     * @param auth - authentication credentials for login
     * @returns {Promise}
     */
    this.getReportingProcessDefinitions = function(auth) {
        logger.info('[ REST API ] Get reporting process definitions');
        return new Promise(function (resolve, reject) {
            setTimeout(function() {
                requestBase.requestHeaders(auth)
                    .then(function (headers) {
                        let options = {
                            url: url(uri, '/process-definitions'),
                            headers: headers
                        };

                        let responseBody = '';
                        request.get(options)
                        .on('response', function (response) {
                            response
                                .on('data', function (data) {
                                    responseBody += data;
                                })
                                .on('end', function () {
                                    resolve({
                                        responseBody: responseBody.toString(),
                                        statusCode: response.statusCode,
                                        responseMessage: response.statusMessage
                                    });
                                    logger.info('Get reporting process definitions response:', responseBody.toString());
                                });
                        })
                        .on('error', function (err) {
                             reject(err);
                        });
                    })
                }, 5000)
        });
    };

    /**
     * Get report parameters - GET /app/rest/reporting/report-params/{reportId}
     *
     * @param auth - authentication credentials for login
     * @param reportId
     * @returns {Promise}
     */
    this.getReportParameters = function(auth, reportId) {
        logger.info('[ REST API ] Get report', reportId, 'parameters.');
        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(headers) {
                    var options = {
                        url: url(uri, '/report-params', reportId),
                        headers: headers
                    };
                    request.get(options)
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                resolve({
                                    responseBody: data.toString(),
                                    statusCode: response.statusCode,
                                    responseMessage: response.statusMessage
                                });
                                logger.info('Get report', reportId, 'parameters response:', data.toString());
                            });
                        })
                        .on('error', function(err) {
                            reject(err);
                        });
                });
        });
    };

    /**
     * Get reports for user - GET /app/rest/reporting/reports
     *
     * @param auth - authentication credentials for login
     * @param appId - not required
     * @returns {Promise}
     */
    this.getReportsForUser = function(auth, appId) {
        logger.info('[ REST API ] Get reports for user.');
        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(headers) {
                    var options = {
                        url: url(uri, '/reports', appId),
                        headers: headers
                    };
                    request.get(options)
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                resolve({
                                    responseBody: data.toString(),
                                    statusCode: response.statusCode,
                                    responseMessage: response.statusMessage
                                });
                                logger.info('Get reports for user response:', data.toString());
                            });
                        })
                        .on('error', function(err) {
                            reject(err);
                        });
                });
        });
    };

    /**
     * Save report - POST /app/rest/reporting/reports/{reportId}
     *
     * @param auth - authentication credentials for login
     * @param reportId
     * @param parameterMap - request body
     * @returns {Promise}
     */
    this.saveReport = function(auth, reportId, parameterMap) {
        logger.info('[ REST API ] Save report', reportId);
        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(headers) {
                    var options = {
                        url: url(uri, '/reports', reportId),
                        headers: headers,
                        json: true,
                        body: parameterMap
                    };
                    request.post(options)
                        .on('response', function(response) {
                            resolve(response);
                            logger.info('Save report', reportId, 'successfully:', response.statusCode, response.statusMessage);
                        })
                        .on('error', function(err) {
                            reject(err);
                        });
                });
        });
    };

    /**
     * Delete report - DELETE /app/rest/reporting/reports/{reportId}
     *
     * @param auth - authentication credentials for login
     * @param reportId
     * @returns {Promise}
     */
    this.deleteReport = function(auth, reportId) {
        logger.info('[ REST API ] Delete report', reportId);
        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(headers) {
                    var options = {
                        url: url(uri, '/reports', reportId),
                        headers: headers
                    };
                    request.del(options)
                        .on('response', function(response) {
                            resolve(response);
                            logger.info('Delete report', reportId, 'successfully:', response.statusCode, response.statusMessage);
                        })
                        .on('error', function(err) {
                            reject(err);
                        });
                });
        });
    };

    /**
     * Export report to csv - POST /app/rest/reporting/reports/{reportId}/export-to-csv
     *
     * @param auth - authentication credentials for login
     * @param reportId
     * @param parameterMap - request body
     * @returns {Promise}
     */
    this.exportReportToCSV = function(auth, reportId, parameterMap) {
        logger.info('[ REST API ] Export report', reportId, 'to csv.');
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                requestBase.requestHeaders(auth)
                    .then(function(headers) {
                        var options = {
                            url: url(uri, '/reports', reportId, '/export-to-csv'),
                            headers: headers,
                            json: true,
                            body: parameterMap
                        };
                        request.post(options)
                            .on('response', function(response) {
                                response.on('data', function(data) {
                                    resolve({
                                        responseBody: data.toString(),
                                        statusCode: response.statusCode,
                                        responseMessage: response.statusMessage,
                                        responseHeaders: response.headers
                                    });
                                    logger.info('Export report', reportId, 'to csv response:\n', data.toString());
                                });
                            })
                            .on('error', function(err) {
                                reject(err);
                            });
                    });
            }, 5000)
        });
    };
};

module.exports = new ReportingAPI();