
/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 07/11/17.
 */

/**
 * Process Instance representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var ProcessInstance = function (details) {
    this.processDefinitionId = 1234;
    this.name = "Process started from REST API";

    Object.assign(this, details);
};

module.exports = ProcessInstance;
