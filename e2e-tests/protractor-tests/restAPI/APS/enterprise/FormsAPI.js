/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Ciprian Topala
 *
 * Created on: Mar 26 2018
 */

let request = require('request');
let url = require('url-join');
let apiUtils = new (require('../../APIUtil.js'))();
let RequestEnterpriseBase = require('./RequestEnterpriseBase');

let FormsAPI = function () {
    let requestBase = new RequestEnterpriseBase();
    let uri = url(baseUrl, '/forms');

    this.queryForms = function (auth, queryParams) {
        logger.info('[ REST API ] Query forms using:', queryParams);

        let options = {
            url: url(uri, apiUtils.buildQueryParams(queryParams)),
            headers: requestBase.requestHeaders(auth),
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Query forms response:', data.toString());
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
}

module.exports = new FormsAPI();