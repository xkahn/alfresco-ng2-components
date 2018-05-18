/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 9/1/2015.
 */

/**
 * @module util
 */
var exports = module.exports = {};
var http = require('http');
var https = require('https');

var request = require('request');
var fs = require('fs');
var FormData = require('form-data');
var path = require('path');
var fieldFill = require('./fieldFill.js');
var EC = protractor.ExpectedConditions;
var TestConfig = require("../test.config.js");
var moment = require('moment');
var CONSTANTS = require('./constants.js');

/**
 * Provides utility methods used throughout the testing framework.
 *
 * @class util.Util
 */
var TestConfig = require("../test.config.js");

// Dynamically load http or https library based on protocol chosen
var apiRequest = TestConfig.main.protocol !== 'http' ? https : http;

/**
 * Uploads a file to the server using the input parameter and the file location.
 *
 * @param chooseFileButton {protractor.Element}
 * @param inputElement {protractor.Element}
 * @param filePath  {String}
 * @method uploadFile
 */
exports.uploadFile = function (chooseFileButton, inputElement, filePath) {
    var absolutePath = path.join(TestConfig.main.rootPath + filePath);
    var remote = require('../node_modules/protractor/node_modules/selenium-webdriver/remote');
    browser.setFileDetector(new remote.FileDetector);

    this.waitUntilElementIsVisible(chooseFileButton);
    // following if condition is not needed for Chorme or FF browser
    /*if (browser.browserName != "internet explorer") {
     chooseFileButton.click();
     }*/

    // need to wait for input to be present, could be visible or not
    logger.info("Path: " + absolutePath);
    inputElement.sendKeys(absolutePath);
};

/**
 * creates an absolute path string if multiple file uploads are required
 */
exports.uploadParentFolder = function (filePath) {
    var parentFolder = path.resolve(path.join(__dirname, "test"));
    var absolutePath = path.resolve(path.join(parentFolder, filePath));

    return absolutePath;
};

/**
 * Sleeps the main thread for time millieconds
 * @param time {int} Milliseconds to sleep
 * @param callback
 * @method sleep
 */
exports.sleep = function (time, callback) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
    }
    callback();
};


exports.refreshBrowser = function () {
    browser.refresh();
};

/**
 * Get current date in long format: Oct 24, 2016
 *
 * @return {string}
 * @method getCrtDateLongFormat
 */
exports.getCrtDateLongFormat = function () {
    var currentDate = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    currentDate = months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + (currentDate.getYear() + 1900);

    return currentDate;
};

/**
 * Get current date in specified format
 *
 * @return {string}
 * @method getCrtDateInFormat
 */
exports.getCrtDateInFormat = function (dateFormat) {
    var currentDate = moment().format(dateFormat);
    logger.debug("Current date formatted with: '" + dateFormat + "' format, is: '" + currentDate + "'");
    return currentDate;
};

/**
 * Generates a random string.
 *
 * @param length {int} If this parameter is not provided the length is set to 8 by default.
 * @return {string}
 * @method generateRandomString
 */
exports.generateRandomString = function (length) {
    length = typeof length !== 'undefined' ? length : 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + Date.now();
};

exports.generatePasswordString = function (length) {
    length = typeof length !== 'undefined' ? length : 8;
    var text = "";
    var possibleUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possibleLowerCase = "abcdefghijklmnopqrstuvwxyz";
    var lowerCaseLimit = Math.floor(length/2);

    for (var i = 0; i < lowerCaseLimit; i++)
    {
        text += possibleLowerCase.charAt(Math.floor(Math.random() * possibleLowerCase.length));
    }

    for (var i = 0; i < length - lowerCaseLimit; i++)
    {
        text += possibleUpperCase.charAt(Math.floor(Math.random() * possibleUpperCase.length));
    }

    return text + Date.now();
};

/**
 * Generates a random string - digits only.
 *
 * @param length {int} If this parameter is not provided the length is set to 8 by default.
 * @return {string}
 * @method generateRandomString
 */
exports.generateRandomStringDigits = function (length) {
    length = typeof length !== 'undefined' ? length : 8;
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + Date.now();
};

/**
 * Generates a random string - non-latin characters only.
 *
 * @param length {int} If this parameter is not provided the length is set to 3 by default.
 * @return {string}
 * @method generateRandomString
 */
exports.generateRandomStringNonLatin = function (length) {
    length = typeof length !== 'undefined' ? length : 3;
    var text = "";
    var possible = "密码你好𠮷";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + Date.now();
};

/**
 * Generates a random string to lowercase.
 *
 * @param length {int} If this parameter is not provided the length is set to 8 by default.
 * @return {string}
 * @method generateRandomString
 */
exports.generateRandomStringToLowerCase = function (length) {

    return this.generateRandomString().toLowerCase();
};

/**
 * Generates a random string to uppercase.
 *
 * @param length {int} If this parameter is not provided the length is set to 8 by default.
 * @return {string}
 * @method generateRandomString
 */
exports.generateRandomStringToUpperCase = function (length) {

    return this.generateRandomString().toUpperCase();
};

/**
 * Generates simple random string.
 *
 * @param length {int} If this parameter is not provided the length is set to 5 by default.
 * @return {string}
 * @method generateRandomStringSimple
 */
exports.generateRandomStringSimple = function (length) {
    length = typeof length !== 'undefined' ? length : 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

/**
 * Generates a sequence of files with name: baseName + index + extension (e.g.) baseName1.txt, baseName2.txt, ...
 *
 * @param startIndex {int}
 * @param endIndex {int}
 * @param baseName{string} the base name of all files
 * @param extension{string} the extension of the file
 * @return fileNames
 * @method generateSeqeunceFiles
 */
exports.generateSeqeunceFiles = function (startIndex, endIndex, baseName, extension) {
    var fileNames = [];
    for(var i =startIndex; i<= endIndex; i++) {
        fileNames.push(baseName+i+extension);
    }
    return fileNames;
};

/**
 * Generates a random string containing only numbers.
 *
 * @param length {int} If this parameter is not provided the length is set to 5 by default.
 * @return {string}
 * @method generateRandomNumber
 */
exports.generateRandomNumber = function (length) {
    length = typeof length !== 'undefined' ? length : 5;
    var text = "";
    var possible = "123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

/**
 * Generates a random number (as int) in the interval [min, max).
 *
 * @param min {int}
 * @param max {int}
 * @return {number}
 * @method generateRandomInt
 */
exports.generateRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Generates a random email address following the format: abcdef@activiti.test.com
 *
 * @param length {int}
 * @return {string}
 * @method generateRandomEmail
 */
exports.generateRandomEmail = function (length) {
    length = typeof length !== 'undefined' ? length : 5;
    var email = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++)
        email += possible.charAt(Math.floor(Math.random() * possible.length));

    email += "@activiti.test.com";
    return email.toLowerCase();
};

/**
 * Generates a random email alias address following the format: activiti.qa.test+abcdef@gmail.com
 *
 * @param emailBase {string}
 * @return {string}
 * @method generateEmailAlias
 */
exports.generateEmailAlias = function (emailBase) {
    var email = this.generateRandomDateFormat();
    emailBase = emailBase.split("@");

    email = emailBase[0] + "+" + email + "@" + emailBase[1];
    return email.toLowerCase();
};


/**
 * Generates a random date inside the interval [1990, 2100) following the format ddmmyyyy.
 *
 * @return {string}
 * @method generateRandomDateFormat
 */
exports.generateRandomDateFormat = function () {
    var day = Math.floor(Math.random() * (29 - 1) + 1);
    var month = Math.floor(Math.random() * (12 - 1) + 1);
    var year = Math.floor(Math.random() * (2100 - 1990) + 1990);

    return day + "." + month + "." + year;
};

/**
 * Generates a random date inside the interval [1990, 2100) following the format dd-mm-yyyy.
 *
 * @return {string}
 * @method generateRandomDate
 */
exports.generateRandomDate = function () {
    var day = Math.floor(Math.random() * (29 - 1) + 1);
    if (day < 10) day = "0" + day;
    var month = Math.floor(Math.random() * (12 - 1) + 1);
    if (month < 10) month = "0" + month;
    var year = Math.floor(Math.random() * (2100 - 1990) + 1990);

    return day + "-" + month + "-" + year;
};

/**
 * Generates a random date inside the interval [1990, 2100) following the format dd-mm-yyyy.
 *
 * @return {string}
 * @method generateRandomDateSimple
 */
exports.generateRandomDateSimple = function () {
    var day = Math.floor(Math.random() * (29 - 1) + 1);
    var month = Math.floor(Math.random() * (12 - 1) + 1);
    var year = Math.floor(Math.random() * (2100 - 1990) + 1990);

    return day + "-" + month + "-" + year;
};

/**
 * Generates a random boolean value.
 *
 * @return {boolean}
 * @method generateRandomBool
 */
exports.generateRandomBool = function () {
    var number = Math.floor(Math.random() * (10 - 1) + 1);
    if (number % 2) {
        return true;
    }
    return false;
};

/**
 * Returns TRUE if the first array contains all elements from the second one.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @return {boolean}
 * @method arrayContainsArray
 */
exports.arrayContainsArray = function (superset, subset) {
    if (0 === subset.length) {
        return false;
    }
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
    });
};

/**
 * Creates an user via app's API.
 *
 * @param email {String}
 * @param firstName {String}
 * @param lastName {String}
 * @param password {String}
 * @param tenantID {String}
 * @method createUserViaAPI
 */
exports.createUserViaAPI = function (email, firstName, lastName, password, tenantID, callback) {
    this.createUserByTypeViaAPI(email, firstName, lastName, password, "enterprise", tenantID, callback);

    };

/**
 * Creates an user by type via app's API.
 *
 * @param email {String}
 * @param firstName {String}
 * @param lastName {String}
 * @param password {String}
 * @param type {String}
 * @param tenantID {String}
 * @method createUserViaAPI
 */
exports.createUserByTypeViaAPI = function (email, firstName, lastName, password, type, tenantID, callback) {
    // Type can be: enterprise or trial
    logger.debug("Creating " + type + " user via API: " + email + " (password: " + password + ")");

    var user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        type: type,
        tenantId: tenantID
    };

    var userString = JSON.stringify(user);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/admin/users',
        method: 'POST',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(TestConfig.main.adminEmail, TestConfig.main.adminPassword),
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Content-Length': userString.length
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        logger.info("statusCode: ", response.statusCode);
        logger.info("headers: ", response.headers);

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("User created");
            logger.debug("data" + data);


            var userId = JSON.parse(data)["id"];
            if (callback) {
                callback(userId, data, response.statusCode);
            }
        });

    });

    req.write(userString);
    req.end();
};

/**
 * Creates a group via app's API.
 *
 * @param name {String}
 * @param tenantID {String}
 * @param type {int} (0 for system group, 1 for functional group)
 * @param parentGroupID {String}
 * @param callback {function}
 * @method createGroupViaAPI
 */
exports.createGroupViaAPI = function (name, tenantID, type, parentGroupID, callback) {
    logger.debug("Creating group via API: " + name);

    var group = {

        name: name,
        tenantId: tenantID,
        type: type,
        parentGroupId: parentGroupID
    };

    var groupString = JSON.stringify(group);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/admin/groups',
        method: 'POST',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(TestConfig.main.adminEmail, TestConfig.main.adminPassword),
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Content-Length': groupString.length
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("Group created");
            var groupId = JSON.parse(data)["id"];
            if (callback) {
                callback(groupId);
            }
        });

    });

    req.write(groupString);
    req.end();
};

/**
 * Creates a group via app's API.
 * POST api/enterprise/admin/groups/{groupId}/members/{userId}
 *
 * @param userID {String}
 * @param groupID {String}
 * @param callback {function}
 * @method addUserToGroupViaAPI
 */
exports.addUserToGroupViaAPI = function (userID, groupID, callback) {
    logger.debug("Add user to group via API: ");

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/admin/groups/' + groupID + "/members/" + userID,
        method: 'POST',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(TestConfig.main.adminEmail, TestConfig.main.adminPassword),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("User added to group");
            if (callback) {
                callback();
            }
        });

    });

    req.end();
};

/**
 * Creates a tenant via app's API. On the callback tenant's ID is available for user creation within it.
 *
 * @param name {String}
 * @param active {String}
 * @param callback {String}
 * @method createTenantViaAPI
 */
exports.createTenantViaAPI = function (name, active, callback) {
    logger.debug("Creating tenant via API: " + name);

    var tenant = {
        name: name,
        active: active
    };
    var tenantString = JSON.stringify(tenant);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/admin/tenants',
        method: 'POST',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(TestConfig.main.adminEmail, TestConfig.main.adminPassword),
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Content-Length': tenantString.length
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("Tenant created");
            var tenantId = JSON.parse(data)["id"];
            callback(tenantId);
        });

    });

    req.write(tenantString);
    req.end();
};

/**
 * Gets the process definitions within an app specified by it's ID. On the callback the response is available as JSON.
 *
 * @param appID {String}
 * @param user {String}
 * @param password {String}
 * @param callback
 * @method getProcessDefinitions
 */
exports.getProcessDefinitions = function (appID, user, password, callback) {
    logger.debug("Getting process definitions via API: appID=" + appID + " user=" + user + " password=" + password);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot +
        '/api/enterprise/process-definitions' + ((appID) ? '?appDefinitionId=' + appID : ''),
        method: 'GET',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(user, password),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var json_data = JSON.parse(data);
            callback(json_data);
        });

    });

    req.end();
};

/**
 * Gets _all_ app definitions for a user. Returns response as JSON on the callback.
 *
 * @param user {String}
 * @param password {String}
 * @param modelType {int} Constants.MODEL_TYPES
 * @param filter {String} Filter, one of "myApps", "sharedWithMe", "sharedWithOthers" or "favorite" (default: "myApps")
 * @param sort {String} Sort mode, one of "modifiedDesc", "modifiedAsc", "nameAsc" or "nameDesc" (default "modifiedDesc")
 * @param callback
 * @method getAppDefinitions
 */
exports.getAppDefinitions = function (user, password, modelType, filter, sort, callback) {
    logger.debug("Getting app definitions via API: user=" + user + " password=" + password + " filter=" + filter);

    if (!filter) {
        filter = "myApps";
    }
    if (!sort) {
        sort = "modifiedDesc";
    }
    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot +
        '/api/enterprise/models?modelType=' + modelType + '&filter=' + filter + '&sort=' + sort,
        method: 'GET',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(user, password),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var json_data = JSON.parse(data);
            callback(json_data);
        });

    });

    req.end();
};

/**
 * Gets the process start form.
 *
 * @param processDefinitionID {String}
 * @param user {String}
 * @param password {String}
 * @param callback
 * @method getProcessStartFormByProcessID
 */
exports.getProcessStartFormByProcessID = function (processDefinitionID, user, password, callback) {
    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/process-definitions/' + processDefinitionID + '/start-form',
        method: 'GET',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(user, password),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var json_data = JSON.parse(data);
            callback(json_data);
        });

    });

    req.end();
};

/**
 * Gets the process (specified by processDefinitionName) start form within the app specified by appID
 *
 * @param appID {String}
 * @param processDefinitionName {String}
 * @param user {String}
 * @param password {String}
 * @param callback
 * @method getProcessStartFormByAppIdAndName
 */
exports.getProcessStartFormByAppIdAndName = function (appID, processDefinitionName, user, password, callback) {
    var process_definitions;
    var process_definition_id;
    var process_start_form;
    var runTime_appDefinitions;
    var runTime_appDefinitionId;

    exports.getRunTimeAppDefinitions(user, password, function (json_data) {
        runTime_appDefinitions = json_data['data'];

        for (var i = 0; i < runTime_appDefinitions.length; i++) {
            if (runTime_appDefinitions[i]['modelId'] == appID) {
                runTime_appDefinitionId = runTime_appDefinitions[i]['id'];
            }
        }

        exports.getProcessDefinitions(runTime_appDefinitionId, user, password, function (json_data) {
            process_definitions = json_data['data'];

            for (var i = 0; i < process_definitions.length; i++) {
                if (process_definitions[i]['name'] == processDefinitionName) {
                    process_definition_id = process_definitions[i]['id'];
                }
            }
            exports.getProcessStartFormByProcessID(process_definition_id, user, password, function (json_data) {
                process_start_form = json_data;
                callback(process_start_form);
            });
        });
    });
};

/**
 * Fills in all fields within a form
 *
 * @param form
 * @param tenant {String} This is required for filling People/Group select fields.
 * @values
 * @method fillAllFieldsInForm
 */
exports.fillAllFieldsInForm = function (form, tenant, values) {
    var mainFields = form['fields'];
    var fieldsValues = values || {};

    for (var i = 0; i < mainFields.length; i++) {
        var mainField = mainFields[i];
        var innerField;

        if (mainField.type == 'container' || mainField.type == 'group') {
            //container || header
            var columns = mainField['fields'];
            var leftColumn = columns['1'];
            var rightColumn = columns['2'];

            for (var j = 0; j < leftColumn.length; j++) {
                innerField = leftColumn[j];
                fieldFill.randomFieldFill(innerField, tenant, fieldsValues[innerField['id']]);
            }

            for (j = 0; j < rightColumn.length; j++) {
                innerField = rightColumn[j];
                fieldFill.randomFieldFill(innerField, tenant, fieldsValues[innerField['id']]);
            }
        }
        else if (mainField.type == 'dynamic-table') {
            //datatable
            fieldFill.randomFieldFill(mainField, tenant, fieldsValues[innerField['id']]);

        }
    }
};

exports.fileExists = function (filePath, retry) {
    var found = false;
    while(!found && retry > 0) {
        console.log('RETRY:', retry);
        found = fs.existsSync(filePath);
        console.log('FOUND:', found);
        console.log('Path:', filePath)
        retry--;
    }
    return found ;
}

/**
 * Import App using API
 *
 * @param filePath
 * @param auth id and pass of user
 * @param callback
 * @method importAppViaAPI
 */
exports.importAppViaAPI = function (filePath, auth, callback) {
    logger.debug("Importing app via API: filePath=" + filePath + " auth=" + JSON.stringify(auth));
    exports.uploadFileViaAPI(filePath, '/api/enterprise/app-definitions/import', auth, callback);
};

/**
 * Publish App using API
 *
 * @param modelId
 * @param auth id and pass of user
 * @param callback
 * @method publishAppViaAPI
 */
exports.publishAppViaAPI = function (modelId, auth, callback) {
    logger.debug("Publishing app via API: modelId=" + modelId + " auth=" + JSON.stringify(auth));

    var app = {comment: ''};
    var appString = JSON.stringify(app);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/app-definitions/' + modelId + '/publish',
        method: 'POST',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(auth.id, auth.pass),
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Content-Length': appString.length
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {
        if (callback) {
            callback(response.statusCode);
        }
    });

    req.write(appString);
    req.end();

};

/**
 * Deploy App using API
 *
 * @param appIds array of app ids to deploy
 * @param auth id and pass of user
 * @param callback
 * @method deployAppViaAPI
 */
exports.deployAppViaAPI = function (appIds, auth, callback) {

    var apps = {appDefinitions: []};
    for (var i = 0; i < appIds.length; i++) {
        apps.appDefinitions.push({id: appIds[i]})
    }
    var appsString = JSON.stringify(apps);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot + '/api/enterprise/runtime-app-definitions',
        method: 'POST',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(auth.id, auth.pass),
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Content-Length': appsString.length
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {
        if (callback) {
            callback(response.statusCode);
        }
    });

    req.write(appsString);
    req.end();
};

/**
 * Upload file using API
 *
 * @param filePath
 * @param appUrl
 * @param auth
 * @param callback
 * @method uploadFileViaAPI
 */
exports.uploadFileViaAPI = function (filePath, appUrl, auth, callback) {
    logger.debug("Upload file via API: filePath=" + filePath + " appUrl=" + appUrl + " auth=" + JSON.stringify(auth));

    var absolutePath = path.join(TestConfig.main.rootPath + filePath);

    var pathSplit = absolutePath.split("/");
    var fileName = pathSplit[pathSplit.length - 1];

    var form = new FormData();
    form.append('filename', fileName);
    form.append('file', fs.createReadStream(absolutePath));

    // form.submit doesn't seem to work (server complains that request is not a multipart request)
    form.getLength(function (err, length) {
        var headers = {'Authorization': TestConfig.main.basic_authorization(auth.id, auth.pass)};
        headers['Content-Length'] = length;
        headers['Content-Type'] = form.getHeaders()['content-type'];

        var request = apiRequest.request({
            host: TestConfig.main.host,
            port: TestConfig.main.port,
            path: TestConfig.main.apiContextRoot + appUrl,
            headers: headers,
            method: 'post',
            rejectUnauthorized: TestConfig.main.rejectUnauthorized
        });

        form.pipe(request);

        request.on('response', function (response) {
            var data = "";

            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                if (callback) {
                    if (data.length > 0) {
                        return callback(JSON.parse(data), response.statusCode);
                    } else {
                        return callback(response.statusCode);
                    }
                }
            });
        });

    });
};

/**
 * Reads the content of the file and provides it on callback
 *
 * @param filePath
 * @param callback
 * @method readFile
 */
exports.readFile = function (filePath, callback) {
    var absolutePath = path.join(TestConfig.main.rootPath + filePath);
    fs.readFile(absolutePath, {encoding: 'utf8'}, function (err, data) {
        if (err) throw err;
        callback(data);
    });
};

/**
 * Executes external script that simulates dragndrop
 * Waits for the form to open
 */
exports.prepareFieldDndOnForm = function (script) {
    // TODO
    // Currently all fields are added to the second column
    // Ability to add fields to first column is needed as well
    // dnd simulation script may need to be modified for this to be possible
    browser.driver.executeScript(script);
    browser.waitForAngular();
};

/**
 * Wait for url
 */
exports.waitUntilUrlIsShowed = function (urlToWait, timeout) {

    if (!timeout) {
        timeout = 20000;
    }
    browser.wait(function () {
        return browser.getCurrentUrl().then(function (url) {
            return (url.indexOf(TestConfig.main.host + urlToWait.toString()) !== -1);
        }, timeout)
    });
};

/**
 * Wait for element
 *
 exports.waitUntilElementIsVisible = function (elementToCheck, timeout) {
    if (!timeout) {
        timeout = 20000;
    }

    browser.wait(function () {
        return elementToCheck.isPresent();
    }, timeout);
    browser.wait(function () {
        return elementToCheck.isDisplayed();
    }, timeout);
};*/

exports.waitUntilElementIsVisible = function (elementToCheck, timeout) {
    if (!timeout) {
        timeout = 20000;
    }

    this.waitUntilElementIsPresent(elementToCheck, timeout);

    var isDisplayed = false;
    browser.wait(function () {
        elementToCheck.isDisplayed().then(
            function () {
                isDisplayed = true;
            },
            function (err) {
                isDisplayed = false;
            }
        );
        return isDisplayed;
    }, timeout);
};

exports.waitUntilElementIsPresent = function (elementToCheck, timeout) {
    if (!timeout) {
        timeout = 20000;
    }

    var isPresent = false;
    browser.wait(function () {
        elementToCheck.isPresent().then(
            function () {
                isPresent = true;
            },
            function (err) {
                isPresent = false;
            }
        );
        return isPresent;
    }, timeout);
};

/**
 * Click element
 */
exports.clickElement = function (elementToClick, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    waitUntilElementIsVisible(elementToClick, timeout);
    elementToClick.click();
};

/**
 * Type in  element
 */
exports.typeElement = function (elementToType, valueToType, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    waitUntilElementIsVisible(elementToType, timeout);
    elementToType.clear().sendKeys(valueToType);
};

/**
 * Type in  element
 */
exports.typeElementWithoutClear = function (elementToType, valueToType, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    waitUntilElementIsVisible(elementToType, timeout);
    elementToType.sendKeys(valueToType);
};

/*
 * Wait for element to have value
 */
exports.waitUntilElementHasValue = function (elementToCheck, elementValue, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    browser.wait(function () {
        return EC.textToBePresentInElementValue(elementToCheck, elementValue);

    }, timeout);
};

/*
 * Wait for element to be clickable
 */
exports.waitUntilElementIsClickable = function (elementToCheck, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    browser.wait(function () {
        return EC.elementToBeClickable(elementToCheck);

    }, timeout);
};

/*
 * Wait for element to not be visibile
 */
exports.waitUntilElementIsNotVisible = function (elementToCheck, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    return browser.wait(function () {
        return elementToCheck.isPresent().then(function (present) {
            return !present;
        })
    }, timeout);
};

exports.waitUntilElementIsNotDisplayed = function (elementToCheck, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    return browser.wait(function () {
        return elementToCheck.isDisplayed().then(function (present) {
            return !present;
        })
    }, timeout);
};

/*
 * Wait for element to not be visibile
 */
exports.waitUntilElementIsStale = function (elementToCheck, timeout) {

    if (!timeout) {
        timeout = 20000;
    }

    browser.wait(function () {
        return EC.stalenessOf(elementToCheck);

    }, timeout);
};

/*
 * Wait for element to not be visibile
 */
exports.waitUntilElementIsNotOnPage = function (elementToCheck, timeout) {
    var EC = protractor.ExpectedConditions;
    if (!timeout) {
        timeout = 20000;
    }

    return browser.wait(function () {
        return browser.wait(EC.not(EC.visibilityOf(elementToCheck)));
    }, timeout);
};

exports.waitUntilElementIsOnPage = function (elementToCheck, timeout) {
    var EC = protractor.ExpectedConditions;
    if (!timeout) {
        timeout = 50000;
    }

    return browser.wait(function () {
        return browser.wait(EC.visibilityOf(elementToCheck));
    }, timeout);
};

/*
 * Wait for top message 'form saved' etc to not be visible
 * @param URL is url navigating to
 */
exports.waitUntilTopMessageIsNotVisible = function (URL) {

    this.waitUntilUrlIsShowed(URL);
    this.waitUntilElementIsNotVisible(element(by.css("div[ng-click='dismissAlert()'] > i[class='glyphicon glyphicon-ok']")));
    this.waitUntilElementIsNotOnPage(element(by.css("div[class='alert fadein ng-animate info-remove ng-hide-add ng-hide info-remove-active ng-hide-add-active']")));
    this.waitUntilElementIsNotOnPage(element(by.css("div[ng-click='dismissAlert()']")));
};


/*
 * Wait for top message 'process model contains error' etc to not be visible
 * @param URL is url navigating to
 */
exports.waitUntilTopErrorMessageIsNotVisible = function (URL) {

    this.waitUntilUrlIsShowed(URL);
    this.waitUntilElementIsNotVisible(element(by.css("div[ng-click='dismissAlert()'] > i[class='glyphicon glyphicon-remove']")));
    this.waitUntilElementIsNotOnPage(element(by.css("div[class='alert fadein ng-animate error-remove ng-hide-add ng-hide error-remove-active ng-hide-add-active']")));
    this.waitUntilElementIsNotOnPage(element(by.css("div[ng-click='dismissAlert()']")));
};

/**
 * @method waitForPage
 */
exports.waitForPage = function () {
    browser.wait(function () {
        var deferred = protractor.promise.defer();
        browser.executeScript("return document.readyState").then(function (text) {
            deferred.fulfill(function (text) {
                return text === "complete";
            });
        });
        return deferred.promise;
    })
};

exports.openNewTabInBrowser = function() {
    browser.driver.executeScript("window.open('about: blank', '_blank');");
};

exports.switchToWindowHandler = function(number) {
    browser.driver.getAllWindowHandles().then(function (handles) {
        browser.driver.switchTo().window(handles[number]);
    });
};

exports.pressDownArrowAndEnter = function() {
    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER).perform();
};

/**
 * Retrieve the text from alert window
 * 
 * @param timeout - wait timeout
 */
exports.getAlertText = function (timeout) {
    if (timeout===undefined) {
        timeout = TestConfig.main.presence_timeout;
        logger.info("1 - Wait " + timeout + "msec to verify alert is displayed.");
    }
    var deferred = protractor.promise.defer();
    browser.wait(EC.alertIsPresent(), timeout).then(function () {
        var alertText;
        browser.switchTo().alert().then(function (alert) {
            alert.getText().then(function (value) {
                alertText = value;
                deferred.fulfill(alertText);
            });
            alert.accept();
        });
    });
    return deferred.promise;
};

/**
 * Retrieve all logs available in the browser's console
 * 
 */
exports.getBrowserLogs = function () {
    var deferred = protractor.promise.defer();
    browser.manage().logs().get('browser').then(function(browserLogs) {
        deferred.fulfill(browserLogs);
    });
    return deferred.promise;
};

/**
 * Verify browser logs
 *
 * @param logLevel - filter logs by LEVEL
 * @param expectedItemsArray - expected content of the logs
 * Next two parameters are used only if original log is altered
 * @param find - String to be replaced
 * @param replace - replacement String
 */
exports.verifyBrowserLogs = function (logLevel, expectedItemsArray, find, replace) {
    var _this = this;
    this.getBrowserLogs().then(function (browserLogs) {
        var logFound = false;
        browserLogs.forEach(function(log) {
            if (log.level.name === logLevel) {
                logFound = true;
                var logMessage = log.message;
                if(typeof find !== "undefined" && typeof replace !== "undefined"){}
                    logMessage = _this.replaceAll(log.message, find, replace);
                logger.info("Log message: " + logMessage);

                expectedItemsArray.forEach(function (item) {
                    expect(logMessage).toContain(item);
                });
            }
        });
        if(!logFound)
            logger.warn("No '" + logLevel + "' was found. Browser logs have not been validated.")
    });
};

/**
 * Get cookie value by cookie name
 *
 * @param cookieName the name of the cookie
 * @param callback function
 * @method getCookieValue
 */
exports.getCookieValue = function (cookieName, callback) {
    var cookieValue = "";

    this.getHTTPCookies(function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].name == cookieName) {
                cookieValue = cookies[i].value;
                callback(cookieValue);
                break;
            }
        }
        logger.debug('Got value', cookieValue);
    });
};

/**
 * Get all HTTP cookies
 *
 * @param callback function
 * @method getHTTPCookies
 */
exports.getHTTPCookies = function (callback) {
    browser.driver.manage().getCookies().then(function (cookies) {
        logger.debug('Got cookies', cookies);
        callback(cookies);
    });
};

/**
 * Gets the run time app definitions for the current user. On the callback the response is available as JSON.
 *
 * @param user {String}
 * @param password {String}
 * @param callback
 * @method getRunTimeAppDefinitions
 */
exports.getRunTimeAppDefinitions = function (user, password, callback) {
    logger.debug("Getting runtime-app-definitions for current user" + " user=" + user + " password=" + password);

    var options = {
        host: TestConfig.main.host,
        port: TestConfig.main.port,
        path: TestConfig.main.apiContextRoot +
        '/api/enterprise/runtime-app-definitions',
        method: 'GET',
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: {
            'Authorization': TestConfig.main.basic_authorization(user, password),
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    };

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var json_data = JSON.parse(data);
            callback(json_data);
        });

    });

    req.end();

};

/**
 * Remove line break from text
 *
 * @param text - to remove line-break from within the given text
 * @return {string}
 * @method generateRandomString
 */
exports.removeLineBreakFromText = function (text) {

    var text = text.replace(/\r?\n|\r/g, " ");
    return text;
};

/**
 * Replace all occurrences of a pattern, in a String
 *
 * @param originalString - String that will be changed
 * @param find - searched String
 * @param replace - replace with String
 * @returns modified String
 */
exports.replaceAll = function (originalString, find, replace) {
    logger.info("Original string: '" + originalString.toString() + "'");
    logger.info("Find string: '" + find + "' and replace it with: '" + replace + "'");
    return originalString.toString().replace(new RegExp((find), 'g'), replace);
};

/**
 * Delete all files with a certain pattern in the name, from a directory
 *
 * @param dirPath - directory absolute path
 * @param pattern - file name pattern
 */
exports.deleteDirFilesByPattern = function (dirPath, pattern) {
    // get all file names in the directory
    fs.readdir(dirPath, function (err, fileNames) {
        if (err) throw err;
        fileNames.forEach(function (file) {
            var match = file.match(new RegExp((pattern)));
            if (match !== null) {
                var filePath = path.join(dirPath, file);
                logger.log("File '" + filePath + "' was found. Pending deletion...");
                fs.unlink(filePath, function (err) {
                    if (err) throw err;
                    logger.info("File '" + filePath + "' was deleted successfully!");
                });
            }
        });
    });
};

/**
 * Verify file exists
 * @param filePath - absolute path to the searched file
 * @param retries - number of retries
 * @returns - true if file is found, false otherwise
 */
exports.fileExists = function(filePath, retries) {
    var tries = 0;
    return new Promise(function(resolve, reject) {
        var checkExist = setInterval(function() {
            fs.stat(filePath, function (error, stats) {
                tries ++;

                if(error && tries === retries) {
                    clearInterval(checkExist);
                    resolve(false);
                }

                if(!error) {
                    clearInterval(checkExist);
                    resolve(true);
                }
            });
        }, 1000);
    });
};

/**
 * get select all key combination
 * @returns - OS specific key combination
 */
exports.getSelectAllKeys = function() {
    if (process.platform == CONSTANTS.OS.MACOS) {
        return protractor.Key.chord(protractor.Key.COMMAND, "a");
    } else {
        return protractor.Key.chord(protractor.Key.CONTROL, "a");
    }

    return null;
};