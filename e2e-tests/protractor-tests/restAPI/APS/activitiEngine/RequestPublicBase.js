/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Wed Mar 13 2018
 */

/**
 * Default configurations for Public endpoints
 */

var url = require('url-join');
var APIUtils = require('../../APIUtil');

var RequestPublicBase = function () {
    var apiUtils = new APIUtils();

    this.getBaseURL = function (application) {
        return url(apiUtils.getBaseURL(application), '/api');
    };

    this.requestHeaders = function (auth) {
        var headers = {'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': apiUtils.getAuthorization(auth.user, auth.password)
        };
        return headers;
    };
};

module.exports = RequestPublicBase;