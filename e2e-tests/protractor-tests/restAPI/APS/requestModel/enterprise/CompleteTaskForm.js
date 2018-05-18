/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mar 26 2018
 */
let Util = require('../../../../util/util.js');

/**
 * Complete task form JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */
var CompleteTaskForm = function (details) {
    this.outcome = Util.generateRandomString();
    Object.assign(this, details);
};

module.exports = CompleteTaskForm;