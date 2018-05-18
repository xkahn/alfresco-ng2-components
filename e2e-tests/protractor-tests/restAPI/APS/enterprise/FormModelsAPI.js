/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 07 2017
 */

/**
 * Retrieve and manage form models
 */

var request = require('request');
var url = require('url-join');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var FormModel = function () {
    var requestBase = new RequestEnterpriseBase();
    var editorUri = url(baseUrl, '/editor/form-models');
    var formsUri = url(baseUrl, '/forms');
    var responseBody = '';

    this.getFormModels = function (auth) {
        logger.info("[ REST API ] List form models");

        var options = {
            url: editorUri,
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        responseBody += data;
                    }).
                    on('end', function (){
                        logger.info("List form models response:", responseBody.toString());
                        resolve({
                            responseBody: responseBody.toString(),
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

    this.getFormModel = function (auth, formModelId) {
        logger.info("[ REST API ] List form model");

        var options = {
            url: url(editorUri, formModelId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
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
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };

    this.getForm = function (auth, formId) {
        logger.info("[ REST API ] Get form by formId:", formId);

        var options = {
            url: url(formsUri, formId),
            headers: requestBase.requestHeaders(auth)
        };

        return new Promise(function (resolve, reject) {
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
                    });
                })
                .on('error', function (err) {
                    resolve(err);
                });
        });
    };
};

module.exports = FormModel;