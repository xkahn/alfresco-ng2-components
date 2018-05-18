/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: Feb 02 2018
 */

/**
 * Basic auth representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */
var Util = require('../../../util/util.js');

var BasicAuth = function (details) {

    this.name = Util.generateRandomString();
    this.password = Util.generateRandomString();
    this.tenantId = 1234;
    this.username = Util.generateRandomEmail();

    Object.assign(this, details);
};

module.exports = BasicAuth;