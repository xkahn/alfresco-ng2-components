/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Tue Nov 1 2017
 */

/**
 * Create and manage Tenants
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var UserAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/admin/users');
    var apiUtils = new APIUtils();

    this.createUser = function (auth, userReqData) {
        logger.info('[ REST API ] Create user:', userReqData.email, 'with password:', userReqData.password, 'for tenant:', userReqData.tenantId);

        var options = {
            url: url(uri),
            json: true,
            body: userReqData,
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
                        logger.info("Create user response:", data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Create user error:', err);
                    reject(err);
                });
        });
    };
};

module.exports = UserAPI;
