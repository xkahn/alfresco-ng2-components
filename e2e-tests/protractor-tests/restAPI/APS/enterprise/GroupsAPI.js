/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 26 2017
 */

/**
 * Retrieve and manage user groups
 */

var request = require('request');
var url = require('url-join');
var APIUtils = require('../../APIUtil.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var GroupsAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/admin/groups');
    var apiUtils = new APIUtils();

    this.createGroup = function (auth, groupReqData){
        logger.info('[ REST API ] Create Group: ', groupReqData.name, ' for tenant: ', groupReqData.tenantId);

        var options = {
            url: url(uri),
            json: true,
            body: groupReqData,
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
                        logger.info('[ REST API ] Create Group Response: ', data.toString());
                    });

                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.queryGroups = function (auth, queryParameters){
        logger.info('[ REST API ] Query groups.');

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
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.deleteUserFromGroup = function (auth, groupId, userId){
        logger.info('[ REST API ] Delete user %s from group %s', userId, groupId);

        var options = {
            url: url(uri, groupId, '/members', userId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    /**
     * Add user to a group - /enterprise/{groupId}/members/{userId}
     * 
     * @auth - credentials
     * @groupId - {Number}
     * @userId - {Number}
     */
    this.addUserToGroup = function (auth, userId, groupId){
        logger.info('[ REST API ] Add user', userId ,'to group', groupId);

        var options = {
            url: url(uri, groupId, '/members', userId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    /**
     * Add capabilities to a group - /enterprise/{groupId}/capabilities
     * 
     * @auth - credentials
     * @groupId - {Number}
     * @capabilitiesList - {Array}
     */
    this.addGroupCapabilities = function (auth, groupId, capabilitiesList){
        logger.info('[ REST API ] Add capabilities', capabilitiesList, 'to group', groupId);

        var options = {
            url: url(uri, groupId, '/capabilities'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: { "capabilities": capabilitiesList}
        };

        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = GroupsAPI;