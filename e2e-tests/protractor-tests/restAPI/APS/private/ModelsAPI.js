/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Ciprian Topala
 *
 * Created on: March 21 2018
 */

let request = require('request');
let url = require('url-join');
let RequestPrivateBase = require('./RequestPrivateBase');
let CONSTANTS = require('../../../util/constants');

let ModelsAPI = function () {
    let requestBase = new RequestPrivateBase();

    let uri = url(requestBase.getBaseURL(browser.params.app), '/models');

    /**
     * Update model - POST /app/rest/models/{modelId}/editor/json
     *      
     * @param modelId
     * @param 
     * @returns {Promise}
     */
    this.updateModelContent = function (auth, modelId, contentData) {
        logger.info("[ REST API ] Update model content for:", modelId);
        let options;

        return new Promise(function (resolve, reject) {
            requestBase.requestHeaders(auth)
                .then(function (result) {
                    options = {
                            url: url(uri, modelId, '/editor/json'),
                            headers: result,
                            form: contentData
                        };

                    request.post(options)
                    .on('response', function (response) {
                        response.on('data', function (data) {
                            logger.info('Update model', modelId, 'response:', data.toString());
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

module.exports = new ModelsAPI();