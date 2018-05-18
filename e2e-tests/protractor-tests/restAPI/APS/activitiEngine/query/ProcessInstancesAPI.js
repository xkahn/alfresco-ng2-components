/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Mar 14 2018
 */

/**
 * Retrieve and manage process instances
 */

var request = require('request');
var url = require('url-join');
var RequestPublicBase = require('../RequestPublicBase.js');

var ProcessInstancesAPI = function () {
    var requestBase = new RequestPublicBase();
    var uri = url(requestBase.getBaseURL(browser.params.app), '/query');

    /**
     * @getProcessInstance - /query/process-instances
     * @auth - credentials
     */
    this.queryProcessInstances = function (auth, processInstanceRequestBody) {
        logger.info('[ REST API ] Query process instances');

        var options = {
            url: url(uri, '/process-instances'),
            json: true,
            body: processInstanceRequestBody,
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
                    logger.info('Query process instances response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Query process instances error:', err);
                    reject(err);
                });
        });
    };
};

module.exports = new ProcessInstancesAPI();
