/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Tue Oct 31 2017
 */

/**
 * Create and manage Tenants
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');


var TenantsAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/admin/tenants');

    this.createTenant = function (auth, tenantReqData){
        logger.info("[ REST API ] Create tenant: " + tenantReqData.name);

        var options = {
            url: url(uri),
            json: true,
            body: tenantReqData,
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
                        logger.info("Create tenant response: ", data.toString());
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.deleteTenant = function (auth, tenantId){
        logger.info("[ REST API ] Delete tenant:", tenantId);

        var options = {
            url: url(uri, tenantId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info("Delete tenant response:", response.statusCode, response.statusMessage);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getTenants = function (auth){
        logger.info("[ REST API ] Get tenants list");

        let options = {
            url: url(uri),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            let responseBody = '';
            request.get(options)
                .on('response', function (response) {
                    response
                        .on('data', function (data) {
                            responseBody += data;
                        }).
                        on('end', function (){
                            logger.info("Get tenants response: ", responseBody.toString());
                            resolve({
                                responseBody: responseBody.toString(),
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
};

module.exports = TenantsAPI;