/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Oct 23 2017
 */

/**
 * Default configurations for private endpoints
 */

let url = require('url-join');
let CONSTANTS = require('../../../util/constants');
let APIUtils = require('../../../restAPI/APIUtil');
let AuthenticationAPI = require('../AuthenticationAPI');

let RequestPrivateBase = function () {
    let apiUtils = new APIUtils();

    this.getBaseURL = function (application) {
        return url(apiUtils.getBaseURL(application), "/app/rest");
    };

    this.requestHeaders = function (auth, contentType = CONSTANTS.HTTP_CONTENT_TYPE.JSON) {
        return new Promise(function (resolve) {
            AuthenticationAPI.login(auth.user, auth.password)
                .then(function (activitiRememberMe) {
                    resolve({
                        'Content-Type': contentType,
                        'Accept': 'application/json',
                        'Cookie': activitiRememberMe
                    });
                })
        });
    };
};

module.exports = RequestPrivateBase;