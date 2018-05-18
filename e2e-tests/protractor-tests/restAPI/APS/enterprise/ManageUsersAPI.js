/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Tue March 28 2018
 */

/**
 * Create and manage user-details
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var ManageUsers = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/users');
    var apiUtils = new APIUtils();

    this.queryUsers = function (auth, queryParameters) {
        logger.info('[ REST API ] Query users.');

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
                        logger.info('Query users response:', data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Query users error:', err);
                    reject(err);
                });
        });
    };

    this.getUser = function (auth, userId) {
        logger.info('[ REST API ] Get User by userId:', userId);

        var options = {
            url: url(uri, userId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            let responseBody = '';
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        responseBody += data;
                    }).
                    on('end', function (){
                        resolve({
                            responseBody: responseBody.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info('Get User by userId:', userId, 'response:', responseBody.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Get User by userId:', userId, 'error:', err);
                    reject(err);
                });
        });
    };

    this.updateUserDetails = function (auth, userId, userRequestBody) {
        logger.info('[ REST API ] Update User details:', userId);

        var options = {
            url: url(uri, userId),
            json: true,
            body: userRequestBody,
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            let responseBody = '';
            request.put(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        responseBody += data;
                    }).
                    on('end', function (){
                        resolve({
                            responseBody: responseBody.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                        logger.info('Update User details:', userId, 'response:', responseBody.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info('Update User details:', userId, 'error:', err);
                    reject(err);
                });
        });
    };

    this.updateUserPassword = function (auth, userId, actionRequestBody) {
        logger.info('[ REST API ] Update user password by userId: ', userId, 'with newPassword: ', actionRequestBody.newPassword);

        var options = {
            url: url(uri, userId),
            json: true,
            body: actionRequestBody,
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Update user password by userId:', userId,'successfully');
                })
                .on('error', function (err) {
                    logger.info('Update user password by userId:', userId, 'error:', err);
                    reject(err);
                });
        });
    };

    this.getUserProfilePicture = function (auth, userId) {
        logger.info('[ REST API ] Stream user profile picture for userId: ', userId);

        var options = {
            url: url(uri, userId, '/picture'),
            headers: requestBase.requestHeaders(auth)
        };
        let imageData = '';
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.setEncoding('binary');
                    response
                        .on('data', function (data) {
                            imageData += data;
                        })
                        .on('end', function (data) {
                            resolve({
                                responseBody: imageData,
                                headers: response.headers,
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                        })
                })
                .on('error', function (err) {
                    logger.info('Stream user profile picture for userId: ', userId, ' error: ', err);
                    reject(err);
                });
        });
    };
};

module.exports = new ManageUsers();
