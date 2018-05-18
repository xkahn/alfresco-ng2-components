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
 * Default configurations for enterprise endpoints
 */

var url = require('url-join');
var APIUtils = require('../../../restAPI/APIUtil');
let CONSTANTS = require('../../../util/constants.js');

var RequestEnterpriseBase = function () {
    var apiUtils = new APIUtils();

    this.getBaseURL = function (application) {
        return url(apiUtils.getBaseURL(application), "/api/enterprise");
    };

    this.requestHeaders = function (auth, contentType = CONSTANTS.HTTP_CONTENT_TYPE.JSON, acceptType = null) {
        var headers = {'Content-Type': contentType,
        'Accept': acceptType ? acceptType : contentType,
        'Authorization': apiUtils.getAuthorization(auth.user, auth.password)
        };
        return headers;
    };
};

module.exports = RequestEnterpriseBase;
