/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 03 2017
 */

/**
 * Retrieve and manage runtime apps
 */

var request = require('request');
var url = require('url-join');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var RuntimeAppDefinitionAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/runtime-app-definitions');

    this.deployApp = function (auth, appDefinition) {
        logger.info("[ REST API ] Deploy app with id:", appDefinition.id);

        var options = {
            url: uri,
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: {
                appDefinitions: [appDefinition]
            }
        };

        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    /**
     * List runtime apps - GET /enterprise/runtime-app-definition
     *
     * @param auth
     * @returns {Promise}
     */
    this.getRunTimeAppDefinitions = function (auth) {
        logger.info("[ REST API ] Get runtime app definitions");

        var options = {
            url: (uri),
            headers: requestBase.requestHeaders(auth),
            json: true
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
                        logger.info('Get runtime app definitions response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = RuntimeAppDefinitionAPI;