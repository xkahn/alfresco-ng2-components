/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue Aug 29 2017
 */

/**
 * Import form model dialog
 *
 */
var ImportFormDialog = function () {
    
    var fileInput = element(by.css(".import-process-form>input"));

    this.getFileInput = function () {
        return fileInput;
    }
};

module.exports = ImportFormDialog;