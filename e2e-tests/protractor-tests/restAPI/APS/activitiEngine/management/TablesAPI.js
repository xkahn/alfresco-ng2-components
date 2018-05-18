/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Mar 15 2018
 */

/**
 *  Manage Database tables API
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../../APIUtil.js');
var RequestPublicBase = require('../RequestPublicBase.js');

var TablesAPI = function () {
    var requestBase = new RequestPublicBase();
    var uri = url(requestBase.getBaseURL(browser.params.app), '/management/tables');
    var apiUtils = new APIUtils();

    /**
     * Get row data for a single table - GET /management/tables/{tableName}/data
     *
     * @param auth
     * @param tableName - The name of the table to get
     * @param queryParams -
     * @returns {Promise}
     */
    this.getRowData = function (auth, tableName, queryParameters) {
        logger.info('[ REST API ] Get row data for a table:', tableName);

        var options = {
            url: url(uri, tableName, '/data', apiUtils.buildQueryParams(queryParameters)),
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
                          logger.info('Get row data for a table:', tableName, 'response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.error('Get row data for a table:', tableName, 'error:', err);
                    reject(err);
                });
        });
    };

};

module.exports = new TablesAPI();
