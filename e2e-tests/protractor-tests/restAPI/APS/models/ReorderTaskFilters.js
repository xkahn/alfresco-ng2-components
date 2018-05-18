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

let Util = require('../../../util/util.js');

/**
 * Create Json Object for re-order Task filters
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var ReorderTaskFilters = function (details) {

    this.appId = '1';
    this.order = ['1'];

    Object.assign(this, details);
};
module.exports = ReorderTaskFilters;

