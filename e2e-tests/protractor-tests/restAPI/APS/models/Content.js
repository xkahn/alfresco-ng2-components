/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Mar 22 2018
 */

var Util = require('../../../util/util.js');

/**
 * Create Content JSON Object
 *
 * @param details - Content object used to overwrite the default values
 * @constructor
 */

let Content = function (details) {
    this.contentAvailable = true;
    this.id = 0;
    this.name = "Automation content name " + Util.generateRandomString();
    this.relatedContent = true;
    this.source = "Automation source " + Util.generateRandomString();
    this.sourceId = 1;

    Object.assign(this, details);
};

module.exports = Content;
