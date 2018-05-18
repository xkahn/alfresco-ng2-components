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

let Util = require('../../../../util/util.js');
let DateRangeModel = require('./DateRangeModel');

/**
 * Create Report Model Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

let ReportModel = function(details) {
    this.processDefinitionId = null;
    this.dateRange = new DateRangeModel();
    this.slowProcessInstanceInteger = 10;
    this.status = "All";
    this.__reportName = Util.generateRandomString();

    Object.assign(this, details);
};

module.exports = ReportModel;