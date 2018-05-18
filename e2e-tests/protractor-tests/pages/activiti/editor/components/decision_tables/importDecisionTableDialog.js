/*
 * Copyright 2005-2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Sohel Saiyed 04/09/2017
 */

var Util = require("../../../../../util/util.js");

/**
 * Page Object for import decision table  within the "Kickstart"/"App Designer"
 */

var ImportDecisionTableDialog = function () {

    var chooseFile = element(by.css('input[ngf-change="onFileSelect($files)"]'));


    /**
     * provides function to import decision table
     * @param fileLocation
     */
    this.importDecisionTable = function (fileLocation) {
        Util.uploadFile(chooseFile, chooseFile, fileLocation);
    };


};
module.exports = ImportDecisionTableDialog;
