/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 07/11/17.
 * Updated by Roxana Diacenco
 */


/**
 * Retrieve and manage process definitions
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var ProcessDefinitionsAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/process-definitions');

    var apiUtils = new APIUtils();

    /**
     * Get a list of process definitions (visible within the tenant of the user)
     *
     * @param auth
     * @param queryParameters
     *  {
     *      latest: boolean,
     *      appDefinitionId: long,
     *      deploymentId: String
     *  }
     */
    this.getProcessDefinitions = function (auth, queryParameters) {
        logger.info("[ REST API ] Get the list of process definitions", queryParameters);

        var options = {
            url: url(uri, apiUtils.buildQueryParams(queryParameters)),
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
                        logger.info('Get the list of process definitions', queryParameters, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = ProcessDefinitionsAPI;
