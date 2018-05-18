/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 20 2017
 */

/**
 * Retrieve and manage app definition
 */

var request = require('request');
var url = require('url-join');
var RequestPrivateBase = require('./RequestPrivateBase');

var DecisionTableModelsAPI = function () {
    var requestBase = new RequestPrivateBase();
    var uri = url(baseUrl, '/decision-table-models/');

    /**
     * Update decision table - PUT /app/rest/decision-table-models/{dtDefinitionId}
     *      
     * @param dtDefinitionId
     * @param dtRepresentation
     * @returns {Promise}
     */
    this.updateDecisionTable = function (dtDefinitionId, dtRepresentation) {
        logger.info("[ REST API ] Update decision table:", dtDefinitionId);
        return new Promise(function (resolve, reject) {
            requestBase.requestHeaders()
                .then(function (headers) {
                    var options = {
                        url: url(uri, dtDefinitionId),
                        headers: headers,
                        body: dtRepresentation,
                        json: true
                    };

                    request.put(options)
                        .on('response', function (response) {
                            response.on('data', function (data) {
                                resolve({
                                    responseBody: data.toString(),
                                    statusCode: response.statusCode,
                                    responseMessage: response.statusMessage
                                });
                            });
                            logger.info('Update decision table:', dtDefinitionId, 'response:', JSON.stringify(response));
                        })
                        .on('error', function (err) {
                            reject(err);
                        });
                });
        });
    }
};

module.exports = DecisionTableModelsAPI;