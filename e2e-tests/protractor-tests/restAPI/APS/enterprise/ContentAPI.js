/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Nov 23 2017
 */

/**
 * upload and manage content
 */

var request = require('request');
var url = require('url-join');
var path = require('path');
var fs = require('fs');
var TestConfig = require('../../../test.config.js');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var ContentAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/content');

    this.createLocalContentFromRemoteRepo = function (auth, relatedContentData){
        logger.info('[ REST API ] Create a local representation of content from a remote repository');

        var options = {
            url: url(uri),
            json: true,
            body: relatedContentData,
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
                        logger.info('Create a local representation of content from a remote repository response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.uploadContentCreateLocalRepresentation = function (auth, filePath){
        logger.info('[ REST API ] Upload content and create a local representation.');
        var absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);

        var options = {
            url: url(uri, '/raw'),
            headers: requestBase.requestHeaders(auth),
            formData: {
                file: fs.createReadStream(absoluteFilePath)
            }
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
                        logger.info('Upload content from file: ', absoluteFilePath, ' and create a local representation response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.deleteContent = function (auth, contentId){
        logger.info('[ REST API ] Delete content: ', contentId);

        var options = {
            url: url(uri, contentId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                    logger.info('Delete content successfully: ', contentId);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getContent = function (auth, contentId){
        logger.info('[ REST API ] Get content id: ', contentId);

        var options = {
            url: url(uri, contentId),
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
                        logger.info('Get content id: ', contentId, ' response: ', data.toString());
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getStreamContent = function (auth, contentId){
        logger.info('[ REST API ] Stream content from a local content representation, content id: ', contentId);

        var options = {
            url: url(uri, contentId, '/raw'),
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
                        logger.info('Stream content id: ', contentId, ' response message: ', response.statusMessage);
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getStreamContentRendition = function (auth, contentId, renditionType){
        logger.info('[ REST API ] Stream content rendition, content id: ', contentId);

        var options = {
            url: url(uri, contentId, '/rendition', renditionType),
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
                        logger.info('Stream content id: ', contentId, 'rendition type:', renditionType, ' response message: ', response.statusMessage);
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };
};

module.exports = new ContentAPI();