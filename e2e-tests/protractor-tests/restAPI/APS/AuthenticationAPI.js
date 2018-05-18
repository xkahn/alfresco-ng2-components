/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Ciprian Topala
 *
 * Created on: March 21 2018
 */

let urlJoin = require('url-join');
let APIUtils = require('../../restAPI/APIUtil');
let CONSTANTS = require('../../util/constants');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let AuthenticationAPI = function () {
    /**
     * Login  - POST /app/authentication
     *      
     * @param email
     * @param password
     * @returns {Promise}
     */
    this.login = function (email, password) {
        logger.info("[ REST API ] Login using:", email, password);

        let http = new XMLHttpRequest();
        let url = urlJoin(new APIUtils().getBaseURL(browser.params.app), '/app/authentication');
        let params = 'j_username=' + email + '&j_password=' + password;

        return new Promise(function (resolve, reject) {
            http.addEventListener("load", loginComplete);
            http.addEventListener("error", loginFailed);
            http.open("POST", url, true);
            http.setRequestHeader("Content-Type", CONSTANTS.HTTP_CONTENT_TYPE.URLENCODED);
            http.send(params);

            function loginComplete() {
                // Get ACTIVITI_REMEMBER_ME cookie
                resolve(http.getResponseHeader("Set-Cookie")[0].split(";")[0]);
            }
            function loginFailed(e) {
                reject("An error has occured" + e);
            }
        })
    }
};

module.exports = new AuthenticationAPI();