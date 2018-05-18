/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Nov 03 2017
 */

/**
 * App definition publish representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */
var AppPublish = function (details) {
    this.comment = "";
    this.force = true;

    Object.assign(this, details);
};

module.exports = AppPublish;