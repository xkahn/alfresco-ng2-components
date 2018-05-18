/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Aug 30 2017
 */

var Util = require("../../../../util/util.js");

/**
 * Page Object for form details page
 */

var FormDetailsPage = function () {
    var exportBtn = element(by.css("[ng-if*='model.process.referenceId']"));

    /**
     * Export form
     */
    this.exportForm = function () {
        Util.waitUntilElementIsVisible(exportBtn);
        logger.info("Click on Export form button.");
        return exportBtn.click();
    };
};
module.exports =  FormDetailsPage;