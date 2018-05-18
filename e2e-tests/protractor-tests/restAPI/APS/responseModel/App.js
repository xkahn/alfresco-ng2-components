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

let Util = require('../../../util/util.js');
let appDefinition = require('../responseModel/AppDefinition');

/**
 * ImportApp response representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var App = function (details) {
    this.id = 1;
    this.name = 'My App';
    this.description = 'Add defined with automated test';
    this.version = 1;
    this.created = Util.generateRandomDate();
    this.definition = appDefinition;

    Object.assign(this, details);
};

module.exports = new App();