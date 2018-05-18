/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */


/*
 * Created by Brindusa Gamaniata on 09/01/2017.
 */

var BasicAuthorization = function (user, password) {
    this.user = user;
    this.password = password;

    this.displayCredentials = function () {
        logger.info("Basic Authorization: " + user + "(" + password + ")");
    }
};

module.exports = BasicAuthorization;