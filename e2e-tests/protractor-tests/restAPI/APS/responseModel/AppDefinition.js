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
let model = require('../responseModel/Model');

/**
 * App Definition response representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var AppDefinition = function (details) {
    this.models = [model];
    this.theme = 'My Theme';
    this.icon = 'App icon';
    this.publishIdentityInfo = [];

    Object.assign(this, details);
};

module.exports = new AppDefinition();