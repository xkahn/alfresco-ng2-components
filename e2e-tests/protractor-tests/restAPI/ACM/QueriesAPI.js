/**
 * Created by Cristina Jalba on 13/10/2017.
 */

var exports = module.exports = {};
var request = require('request');
var queriesBaseUrl = "queries";
var RequestCoreAPI = require('./RequestUtil/RequestCoreAPI');
var url = require('url-join');

/**
 * Get nodes using API.
 *
 * @param retry {integer}
 * @param requestUserModel {User that makes the request}
 * @param parameters {String}
 * @param expectedNumber {integer}
 * @param callback
 * @method getNodes
 */
exports.getNodes = function (retry, requestUserModel, parameters, expectedNumber, callback) {
    var uri = url(RequestCoreAPI.getBaseURL(), queriesBaseUrl, "/nodes?" + parameters);

    function run() {
        request.get({url: uri, headers: RequestCoreAPI.requestHeaders(requestUserModel)}, function (error, httpResponse, body) {
            retry--;
            var json_data = JSON.parse(body);
            var totalNumber = json_data.list.pagination.totalItems;
            if(totalNumber<expectedNumber && retry>0) {
                run();
            }
            else
            if( typeof callback === 'function'){
                callback.apply(null);
            }
        });
    }
    run();
};

