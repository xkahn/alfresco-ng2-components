/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Oct 18 2017
 */

/**
 * Retrieve and manage app definition
 */

var request = require('request');
var path = require('path');
var url = require('url-join');
var fs = require('fs');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');
var TestConfig = require('../../../test.config.js');

//require('request-debug')(request); // to debug the request

var AppDefinitionAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/app-definitions');

    this.importApp = function (auth, filePath) {
        logger.info("[ REST API ] Import app from:", filePath, auth.user, '/', auth.password);
        var absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);

        var options = {
            url: url(uri, '/import'),
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
                        logger.info("Import app response:", data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getAppDefinition = function (auth, appId) {
        logger.info("[ REST API ] Get an app definition by app definition id:", appId);

        var options = {
            url: url(uri, appId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Get a app definition response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.publishApp = function (auth, appId, appPublishModel) {
        logger.info("[ REST API ] Publish app id:", appId);
        uri = url(uri, appId);

        var options = {
            url: url(uri, '/publish'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: appPublishModel
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
                        logger.info("Publish app response:", data.toString());
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.deleteApp = function (auth, appId) {
        logger.info("[ REST API ] Delete app id:", appId);

        var options = {
            url: url(uri, appId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = AppDefinitionAPI;