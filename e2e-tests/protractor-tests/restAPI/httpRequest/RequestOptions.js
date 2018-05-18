/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var RequestOptions = function (host, path, port) {
    this.host = host;

    if (!port) {
        port = "";
    }

    this.port = port;
    this.path = path;
};

module.exports = RequestOptions;