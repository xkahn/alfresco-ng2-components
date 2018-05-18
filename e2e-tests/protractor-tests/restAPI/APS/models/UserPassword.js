/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: April 03 2018
 */
var Util = require('../../../util/util.js');

/**
 * Change User Password JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var UserPassword = function (details) {

    this.action = 'updatePassword';
    this.newPassword = Util.generateRandomString();
    this.oldPassword = 'oldPassword';

    Object.assign(this, details);
};
module.exports = UserPassword;
