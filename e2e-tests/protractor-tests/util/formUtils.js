/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Aug 30 2017
 */

var Util = require('./util.js');
var AllFormsPage = require('../pages/activiti/editor/form/allFormsPage.js');
var ImportFormDialog = require('../pages/activiti/editor/form/components/importFormDialog.js');

var FormUtils =  function () {

    var allFormsPage = new AllFormsPage();
    var importFormDialog = new ImportFormDialog();

    this.importForm = function (pathToFormToUpload) {
        allFormsPage.clickImportForm();
        Util.uploadFile(importFormDialog.getFileInput(), importFormDialog.getFileInput(), pathToFormToUpload);
    };
};

module.exports = FormUtils;