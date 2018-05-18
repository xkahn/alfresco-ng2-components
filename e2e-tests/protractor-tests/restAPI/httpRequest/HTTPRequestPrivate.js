/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */


/*
 * Created by Brindusa Gamaniata on 09/01/2017.
 */

var HTTPRequestPrivate = function(rememberMe, xCSRFToken) {
    this.rememberMe = rememberMe;
    this.xCSRFToken = xCSRFToken;
    this.cookie = 'CSRF-TOKEN=' + xCSRFToken + '; ACTIVITI_REMEMBER_ME=' + rememberMe;

    this.displayCookie = function(){
        logger.debug("Cookie: ", HTTPRequestPrivate.cookie);
    }
};

module.exports = HTTPRequestPrivate;