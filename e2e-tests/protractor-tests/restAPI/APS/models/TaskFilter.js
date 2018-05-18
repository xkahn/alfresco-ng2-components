/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Sohel Saiyed
 *
 * Created on: March 23 2018
 */
let Util = require('../../../util/util');
let Filters = require('../../../restAPI/APS/models/Filter');

let filter = JSON.stringify(new Filters());

/**
 * Create and manage task-filter JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

let TaskFilter = function (details) {

    this.appId = '1';
    this.filter = JSON.parse(filter);
    this.icon = Util.generateRandomString();
    this.name = Util.generateRandomString();

    Object.assign(this, details);
};
module.exports = TaskFilter;
