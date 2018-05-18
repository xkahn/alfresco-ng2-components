

/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by Cristina Jalba on 05/01/2018.
 */

/**
 *  Manage user profile API
 */

var request = require('request');
var url = require('url-join');
var RequestEnterpriseBase = require('./RequestEnterpriseBase');
var path = require('path');
var fs = require('fs');
var TestConfig = require('../../../test.config.js');

var UserProfileAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var uri = url(baseUrl, '/profile-picture');

    this.changeProfilePicture = function (auth, filePath) {
        logger.info("[ REST API ] Change profile picture", filePath, 'for user', auth.user, auth.password);
        var absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);

        var options = {
            url: url(uri),
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
                        logger.info("Change profile picture response:", data.toString());
                    });
                })
                .on('error', function (err) {
                    logger.info("Change profile picture Error:", err);
                    reject(err);
                });
        });
    };
};

module.exports = UserProfileAPI;
