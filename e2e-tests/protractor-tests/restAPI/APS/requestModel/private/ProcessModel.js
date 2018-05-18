/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Ciprian Topala
 *
 * Created on: March 21 2018
 */

var Util = require('../../../../util/util.js');

/**
 * Create Process Model Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var ProcessModel = function (details) {

    this.modeltype = 'model';
    this.json_xml = '';
    this.name = '';
    this.description = '';
    this.newversion = false;
    this.comment = '';
    this.lastUpdated = null;

    Object.assign(this, details);
};

module.exports = ProcessModel;