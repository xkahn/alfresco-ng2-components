/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Ciprian Topala
 *
 * Created on: Apr 10 2018
 */


var Util = require('../../../../util/util.js');

/**
 * Involve User JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var InvolveUser = function (details) {
    this.user = null;
    this.type = 'participant';

    Object.assign(this, details);
};
module.exports = InvolveUser;