/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mar 20 2018
 */

var Util = require('../../../util/util.js');

/**
 * Model response representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var Model = function (details) {
    this.id = 1;
    this.name = "My Model";
    this.version = 1;
    this.modelType = 0;
    this.description = 'Model created with automated test';
    this.stencilSetId = 0;
    this.createdByFullName = "Random User";
    this.createdBy = 12345;
    this.lastUpdatedByFullName = "Random User";
    this.lastUpdatedBy = 12345;
    this.lastUpdated = Util.generateRandomDate();

    Object.assign(this, details);
};

module.exports = new Model();