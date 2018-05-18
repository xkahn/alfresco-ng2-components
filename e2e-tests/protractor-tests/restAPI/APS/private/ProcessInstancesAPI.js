/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Apr 10 2018
 */

let request = require('request');
let url = require('url-join');
let RequestPrivateBase = require('./RequestPrivateBase');

let ProcessInstancesAPI = function () {
    let requestBase = new RequestPrivateBase();
    let uri = url(requestBase.getBaseURL(browser.params.app), '/process-instances');

    /**
     * Get process instance details - GET /app/rest/process-instances/{processInstanceId}
     *
     * @param auth
     * @param processInstanceId
     * @returns {Promise}
     */
    this.getProcessInstance = function (auth, processInstanceId) {
        logger.info('[ REST API ] Get process instance', processInstanceId, 'details');
        let options;

        return new Promise(function (resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function (headers) {
                    options = {
                        url: url(uri, processInstanceId),
                        headers: headers
                    };

                    request.get(options)
                        .on('response', function (response) {
                            response.on('data', function (data) {
                                logger.info('Get process instance', processInstanceId, 'details, response:', data.toString());
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
        });
    };

    /**
     * Query process instances - POST /app/rest/query/process-instances
     *
     * @param auth
     * @param processInstanceId
     * @returns {Promise}
     */
    this.queryProcessInstances = function (auth, processInstancesQuery) {
        logger.info('[ REST API ] Query process instances');
        let options;

        return new Promise(function (resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function (headers) {
                    options = {
                        url: url(requestBase.getBaseURL(browser.params.app), '/query', '/process-instances'),
                        headers: headers,
                        json: true,
                        body: processInstancesQuery
                    };
                    request.post(options)
                        .on('response', function (response) {
                            response.on('data', function (data) {
                                logger.info('Query process instances response:', data.toString());
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
        });
    }
};

module.exports = new ProcessInstancesAPI();