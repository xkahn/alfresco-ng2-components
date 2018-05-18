/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Apr 10 2018
 */

var Util = require('../../../../util/util.js');
let moment = require('moment');

/**
 * Create Date Range Model Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

let DateRangeModel = function(details) {
    this.startDate = moment().subtract(1, 'day').toISOString();
    this.endDate = moment().endOf('day').toISOString();
    this.rangeId = "today";

    Object.assign(this, details);
};

module.exports = DateRangeModel;