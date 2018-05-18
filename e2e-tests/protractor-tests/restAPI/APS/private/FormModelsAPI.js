/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mar 27 2018
 */

let request = require('request');
let url = require('url-join');
var path = require('path');
var fs = require('fs');
let RequestPrivateBase = require('./RequestPrivateBase');
let TestConfig = require("../../../test.config.js");
let CONSTANTS = require('../../../util/constants');

let FormModelsAPI = function () {
    let requestBase = new RequestPrivateBase();
    let uri = url(requestBase.getBaseURL(browser.params.app), '/form-models');

    /**
     * Import form model - POST /app/rest/form-models/import-form
     *
     * @param auth - authentication credentials
     * @param filePath - form.json file location
     * @returns {Promise}
     */
    this.importForm = function (auth, filePath) {
        logger.info('[ REST API ] Import form from file:', filePath);
        let absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);

        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(result) {
                    let options = {
                        url: url(uri, '/import-form'),
                        headers: result,
                        formData: {
                            file: fs.createReadStream(absoluteFilePath)
                        }
                    };
                    request.post(options)
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                logger.info('Import form response:', data.toString());
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
     * Update form model - PUT /app/rest/form-models/{formModelId}
     *
     * @param auth - authentication credentials
     * @param formModelId - form id
     * @param requestBody - form updated details object
     * @returns {Promise}
     */
    this.updateForm = function (auth, formModelId, requestBody) {
        logger.info('[ REST API ] Update form:', formModelId);

        return new Promise(function(resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function(result) {
                    let options = {
                        url: url(uri, formModelId),
                        headers: result,
                        body: requestBody,
                        json: true
                    };
                    request.put(options)
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                logger.info('Update form response:', data.toString());
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

module.exports = new FormModelsAPI();