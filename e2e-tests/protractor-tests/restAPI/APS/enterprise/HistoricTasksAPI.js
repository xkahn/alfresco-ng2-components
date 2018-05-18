/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ctopala on 14/03/18.
 */

let request = require('request');
let url = require('url-join');
let path = require('path');
let fs = require('fs');

let RequestEnterpriseBase = require('./RequestEnterpriseBase');

let HistoricTasksAPI = function () {
    let requestBase = new RequestEnterpriseBase();
    let uri = url(baseUrl, '/historic-tasks');
    
    /**
     * Query historic tasks - /enterprise/historic-tasks/query
     * 
     * @auth - credentials
     * @queryRequest - query data
     */
    this.queryHistoricTasks = function (auth, queryRequest) {
        logger.info('[ REST API ] Query historic tasks using:', queryRequest);

        let options = {
            url: url(uri, '/query'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: queryRequest
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Query historic tasks response:', data.toString());
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
}

module.exports = new HistoricTasksAPI();