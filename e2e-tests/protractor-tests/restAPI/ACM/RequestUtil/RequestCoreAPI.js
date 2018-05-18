/**
 * Created by Cristina Jalba on 08/11/2017.
 */

/**
 * Default configurations for CORE endpoints
 */
var url = require('url-join');
var APIUtils = require('../../../restAPI/APIUtil');
var ACMBaseURL = "/alfresco/versions/1";
var CONSTANTS = require('../../../util/constants.js');

exports.getBaseURL = function () {
    return url(new APIUtils().getBaseURL(CONSTANTS.APPLICATION.ADF_ACS), ACMBaseURL);
};

exports.requestHeaders = function (auth) {
    var headers = {
        'Authorization': new APIUtils().getAuthorization(auth.id, auth.password)
    };
    return headers;
};
