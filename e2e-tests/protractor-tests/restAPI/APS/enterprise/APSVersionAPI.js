/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Jan 17 2018
 */

var request = require('request');
var url = require('url-join');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');
//require('request-debug')(request);

var APSVersionAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/app-version');

    this.getAPSVersion = function (auth) {
        logger.info('[ REST API ] Get APS version details, using credentials: ', auth.user,'/', auth.password);

        var options = {
            url: uri,
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
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });

    };
};

module.exports = APSVersionAPI;