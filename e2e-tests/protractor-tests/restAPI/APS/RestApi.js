/*
 * Copyright 2005-2016 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by Brindusa Gamaniata on 19/12/16.
 *
 * Activiti Alfresco API Reference: https://docs.alfresco.com/activiti/docs/dev-guide/1.5.0/#_rest_api
 */

/**
 * @module RestAPI
 */
var TestConfig = require('../../test.config.js');
var HTTPRequestBase = require('../httpRequest/HTTPRequestBase');
var HTTPRequestPublic = require('../httpRequest/HTTPRequestPublic');
var HTTPRequestPrivate = require('../httpRequest/HTTPRequestPrivate');

var exports = module.exports = {};
var http = require('http');
var https = require('https');
var request = require('request');
var path = require('path');
var FormData = require('form-data');
var fs = require('fs');

// Dynamically load http or https library based on protocol chosen
var apiRequest = TestConfig.main.protocol !== 'http' ? https : http;

/**
 * Generates the authorization string for http based on the user and password parameters that are given
 * @method getAuthorization
 * @param user {string}
 * @param password {string}
 * @returns {string} The basic http authorization string.
 */
exports.getAuthorization = function (user, password) {
    return 'Basic ' + Buffer(user + ':' + password).toString('base64');
};

/**
 * Resolve port, if defined
 * @param port
 * @returns port
 */
exports.portSet = function (port) {

    if (!port || TestConfig.main.port.length) {
        definedPort = "";
    } else {
        definedPort = port;
    }

    return definedPort;
};

/**
 * Send request
 *
 * @param requestOptions {RequestOptions}
 * @param requestMethod {String}
 * @param uri {String}
 * @param dataSet {Object}
 * @param rememberMe {String}
 * @param xCSRFToken {String}
 * @method sendPost
 */
exports.sendRequestPrivate = function (requestOptions, requestMethod, uri, dataSet, rememberMe, xCSRFToken, callback) {

    var requestHeaders = {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    };

    HTTPRequestPrivate.prototype = new HTTPRequestBase(requestOptions.host, requestOptions.path, requestMethod, uri, dataSet, requestOptions.port);
    var privateRequest = new HTTPRequestPrivate(rememberMe, xCSRFToken);
    requestHeaders['X-CSRF-TOKEN'] = privateRequest.xCSRFToken;
    requestHeaders['Cookie'] = privateRequest.cookie;
    privateRequest.displayCookie();

    var options = {
        host: privateRequest.host,
        port: this.portSet(privateRequest.port),
        path: privateRequest.rootPath + privateRequest.uri,

        method: privateRequest.requestMethod,
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: requestHeaders
    };

    if (requestMethod == 'POST' || requestMethod == 'PUT' && privateRequest.dataSet != null) {
        var dataString = JSON.stringify(privateRequest.dataSet);
        options.headers['Content-Length'] = dataString.length;
    }

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        logger.info("statusCode: ", response.statusCode);
        //logger.info("headers: ", response.headers);

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("Request done");

            if (callback) {
                callback(data, response.statusCode);
            }
        });
    });

    if (requestMethod == 'POST' || requestMethod == 'PUT' && dataSet != null) {
        req.write(dataString);
    }
    req.end();
};

/**
 * Send request
 *
 * @param requestOptions {RequestOptions}
 * @param requestMethod {String}
 * @param uri {String}
 * @param dataSet {Object}
 * @method sendRequest
 */
exports.sendRequest = function (requestOptions, requestMethod, uri, authorization, dataSet, callback) {

    var requestHeaders = {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    };

    HTTPRequestPublic.prototype = new HTTPRequestBase(requestOptions.host, requestOptions.path, requestMethod, uri, dataSet, requestOptions.port);
    var publicRequest = new HTTPRequestPublic(authorization);
    requestHeaders['Authorization'] = publicRequest.authorization;

    logger.info("authorisation: ", publicRequest.authorization);

    var options = {
        host: publicRequest.host,
        port: this.portSet(publicRequest.port),

        path: publicRequest.rootPath + publicRequest.uri,

        method: publicRequest.requestMethod,
        rejectUnauthorized: TestConfig.main.rejectUnauthorized,

        headers: requestHeaders
    };

    if (requestMethod == 'POST' || requestMethod == 'PUT' && publicRequest.dataSet != null) {
        var dataString = JSON.stringify(publicRequest.dataSet);
        options.headers['Content-Length'] = dataString.length;
    }

    var req = apiRequest.request(options, function (response) {
        response.setEncoding('utf8');
    });

    req.on('response', function (response) {

        logger.info("statusCode: ", response.statusCode);
        //logger.info("headers: ", response.headers);

        var data = "";

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            logger.debug("Request done");

            if (callback) {
                callback(data, response.statusCode);
            }
        });
    });

    if (requestMethod == 'POST' || requestMethod == 'PUT' && dataSet != null) {
        req.write(dataString);
    }
    req.end();
};

/**
 * Creates an user via app's API.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param email {String}
 * @param firstName {String}
 * @param lastName {String}
 * @param password {String}
 * @param tenantID {String}
 * @method createUserViaAPI
 */
exports.createUserViaAPI = function (requestOptions, basicAuth, email, firstName, lastName, password, tenantID, callback) {
    this.createUserByTypeViaAPI(requestOptions, basicAuth, email, firstName, lastName, password, "enterprise", tenantID, callback);
};

/**
 * Creates an user by type via app's API.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param email {String}
 * @param firstName {String}
 * @param lastName {String}
 * @param password {String}
 * @param type {String}
 * @param tenantID {String}
 * @method createUserViaAPI
 */
exports.createUserByTypeViaAPI = function (requestOptions, basicAuth, email, firstName, lastName, password, type, tenantID, callback) {
    // Type can be: enterprise or trial
    logger.debug("Creating " + type + " user via API: " + email + " (password: " + password + ")");

    var userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        type: type,
        tenantId: tenantID
    };
    var uri = '/api/enterprise/admin/users';

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), userData, function (data, statusCode) {
        var userId = JSON.parse(data)["id"];
        if (callback)
            callback(userId, data, statusCode);
    })
};

/**
 * Creates a group via app's API.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param name {String}
 * @param tenantID {String}
 * @param type {int} (0 for system group, 1 for functional group)
 * @param parentGroupID {String}
 * @param callback {function}
 * @method createGroupViaAPI
 */
exports.createGroupViaAPI = function (requestOptions, basicAuth, name, tenantID, type, parentGroupID, callback) {
    logger.debug("Creating group via API: " + name);

    var groupData = {
        name: name,
        tenantId: tenantID,
        type: type,
        parentGroupId: parentGroupID
    };
    var uri = '/api/enterprise/admin/groups';

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), groupData, function (data, statusCode) {
        var groupId = JSON.parse(data)["id"];
        callback(groupId, data, statusCode);
    })
};

/**
 * Adds a user to a group via app's API.
 * POST api/enterprise/admin/groups/{groupId}/members/{userId}
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param userID {String}
 * @param groupID {String}
 * @param callback {function}
 * @method addUserToGroupViaAPI
 */
exports.addUserToGroupViaAPI = function (requestOptions, basicAuth, userID, groupID, callback) {
    logger.debug("Add user to group via API ");

    var uri = '/api/enterprise/admin/groups/' + groupID + "/members/" + userID;

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Creates a tenant via app's API. On the callback tenant's ID is available for user creation within it.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param name {String}
 * @param active {String}
 * @param callback {String}
 * @method createTenantViaAPI
 */
exports.createTenantViaAPI = function (requestOptions, basicAuth, name, active, callback) {
    logger.debug("Creating tenant via API: " + name);

    var tenantData = {
        name: name,
        active: active
    };

    var uri = '/api/enterprise/admin/tenants';

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), tenantData, function (data, statusCode) {
        var tenantId = JSON.parse(data)["id"];
        callback(tenantId, data, statusCode);
    })
};

/**
 * Gets the process definitions within an app specified by it's ID. On the callback the response is available as JSON.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param appID {String}
 * @param callback
 * @method getProcessDefinitions
 */
exports.getProcessDefinitions = function (requestOptions, basicAuth, appID, callback) {
    logger.debug("Getting process definitions via API: appID=" + appID + " user=" + basicAuth.user + " password=" + basicAuth.password);

    var uri = '/api/enterprise/process-definitions' + ((appID) ? '?appDefinitionId=' + appID : '');

    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Gets _all_ app definitions for a user. Returns response as JSON on the callback.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param modelType {int} Constants.MODEL_TYPES
 * @param filter {String} Filter, one of "myApps", "sharedWithMe", "sharedWithOthers" or "favorite" (default: "myApps")
 * @param sort {String} Sort mode, one of "modifiedDesc", "modifiedAsc", "nameAsc" or "nameDesc" (default "modifiedDesc")
 * @param callback
 * @method getAppDefinitions
 */
exports.getAppDefinitions = function (requestOptions, basicAuth, modelType, filter, sort, callback) {
    logger.debug("Getting app definitions via API: user=" + basicAuth.user + " password=" + basicAuth.password + " filter=" + filter);

    if (!filter) {
        filter = "myApps";
    }
    if (!sort) {
        sort = "modifiedDesc";
    }

    var uri = '/api/enterprise/models?modelType=' + modelType + '&filter=' + filter + '&sort=' + sort;

    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Gets the process start form.
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processDefinitionID {String}
 * @param callback
 * @method getProcessStartFormByProcessID
 */
exports.getProcessStartFormByProcessID = function (requestOptions, basicAuth, processDefinitionID, callback) {

    var uri = '/api/enterprise/process-definitions/' + processDefinitionID + '/start-form';

    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};


/**
 * Gets the process (specified by processDefinitionName) start form within the app specified by appID
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param appID {String}
 * @param processDefinitionName {String}
 * @param callback
 * @method getProcessStartFormByAppIdAndName
 */
exports.getProcessStartFormByAppIdAndName = function (requestOptions, basicAuth, appID, processDefinitionName, callback) {
    var process_definitions;
    var process_definition_id;
    var process_start_form;
    var runTime_appDefinitions;
    var runTime_appDefinitionId;

    exports.getRunTimeAppDefinitions(requestOptions, basicAuth, function (data) {
        var json_data = JSON.parse(data);
        runTime_appDefinitions = json_data['data'];
        for (var i = 0; i < runTime_appDefinitions.length; i++) {
            if (runTime_appDefinitions[i]['modelId'] == appID) {
                runTime_appDefinitionId = runTime_appDefinitions[i]['id'];
            }
        }
        exports.getProcessDefinitions(requestOptions, basicAuth, runTime_appDefinitionId, function (data) {
            var json_data = JSON.parse(data);
            process_definitions = json_data['data'];
            for (var i = 0; i < process_definitions.length; i++) {
                if (process_definitions[i]['name'] == processDefinitionName) {
                    process_definition_id = process_definitions[i]['id'];
                }
            }
            exports.getProcessStartFormByProcessID(requestOptions, basicAuth, process_definition_id, function (json_data) {
                process_start_form = json_data;
                callback(process_start_form);
            });
        });
    });
};

/**
 * Import App using API
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param filePath
 * @param callback
 * @method importAppViaAPI
 */
exports.importAppViaAPI = function (requestOptions, basicAuth, filePath, callback) {
    logger.debug("Importing app via API: filePath=" + filePath + " user= " + basicAuth.user + " password: " + basicAuth.password);
    var uri = '/api/enterprise/app-definitions/import';
    exports.uploadFileViaAPI(requestOptions, basicAuth, filePath, uri, callback);
};

/**
 * Publish App using API
 *
 * @param authUser
 * @param authPass
 * @param modelId
 * @param callback
 * @method publishAppViaAPI
 */
exports.publishAppViaAPI = function (requestOptions, basicAuth, modelId, callback) {
    logger.debug("Publishing app via API: modelId=" + modelId + " user= " + basicAuth.user + " password:" + basicAuth.password);

    var app = {
        comment: ''
    };

    var uri = '/api/enterprise/app-definitions/' + modelId + '/publish';

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), app, function (data, statusCode) {
        callback(data, statusCode);
    })
};


/**
 * Deploy App using API
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param appIds array of app ids to deploy
 * @param callback
 * @method deployAppViaAPI
 */
exports.deployAppViaAPI = function (requestOptions, basicAuth, appIds, callback) {

    var apps = {appDefinitions: []};
    for (var i = 0; i < appIds.length; i++) {
        apps.appDefinitions.push({id: appIds[i]})
    }

    var uri = '/api/enterprise/runtime-app-definitions';

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), apps, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Upload file using API
 *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param filePath
 * @param appUrl
 * @param callback
 * @method uploadFileViaAPI
 */
exports.uploadFileViaAPI = function (requestOptions, basicAuth, filePath, appUrl, callback) {
    logger.debug("Upload file via API: filePath=" + filePath + " appUrl=" + appUrl + " auth=" + basicAuth.user + " password: " + basicAuth.password);

    var absolutePath = path.join(TestConfig.main.rootPath + filePath);

    var pathSplit = absolutePath.split("/");
    var fileName = pathSplit[pathSplit.length - 1];

    logger.info("absolutePath: " + absolutePath);
    logger.info("fileName: " + fileName);
    var form = new FormData();
    form.append('filename', fileName);
    form.append('file', fs.createReadStream(absolutePath));

    var auth = this.getAuthorization(basicAuth.user, basicAuth.password);

    // form.submit doesn't seem to work (server complains that request is not a multipart request)
    form.getLength(function (err, length) {
        logger.info("Length: " + length);
        var headers = {'Authorization': auth};
        headers['Content-Length'] = length;
        headers['Content-Type'] = form.getHeaders()['content-type'];

        var request = apiRequest.request({
            host: requestOptions.host,
            port: requestOptions.port,
            path: requestOptions.path + appUrl,
            headers: headers,
            method: 'POST',
            rejectUnauthorized: TestConfig.main.rejectUnauthorized
        });

        form.pipe(request);

        request.on('response', function (response) {
            var data = "";

            logger.info("statusCode: ", response.statusCode);

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
 * Creates an user with NoTenant via app's API.
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param email {String}
 * @param firstName {String}
 * @param lastName {String}
 * @param password {String}
 * @method createUserViaAPI
 */
exports.createUserWithNoTenantViaAPI = function (requestOptions, basicAuth, email, firstName, lastName, password, callback) {
    this.createUserByTypeWithNoTenantViaAPI(requestOptions, basicAuth, email, firstName, lastName, password, "enterprise", callback);
};

/**
 * Creates an user by type with NoTenant via app's API
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param email {String}
 * @param firstName {String}
 * @param lastName {String}
 * @param password {String}
 * @param type {String}
 * @method createUserViaAPI
 */
exports.createUserByTypeWithNoTenantViaAPI = function (requestOptions, basicAuth, email, firstName, lastName, password, type, callback) {
    // Type can be: enterprise or trial
    logger.debug("Creating " + type + " user via API: " + email + " (password: " + basicAuth.password + ")");

    var userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        type: type
    };
    var uri = '/api/enterprise/admin/users';

    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), userData, function (data, statusCode) {
        var userId = JSON.parse(data)["id"];
        callback(userId, data, statusCode);
    })
};

/**
 * Delete user from Group via APi
 * Delete api/enterprise/admin/groups/{groupId}/members/{userId}
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param userId {String}
 * @param groupId {String}
 * @param callback {function}
 * @method deleteUserFromGroupViaAPI
 */
exports.deleteUserFromGroupViaAPI = function (requestOptions, basicAuth, userId, groupId, callback) {
    logger.debug("Delete User from Group Via Api, userId: " + userId + ' and GroupId: ' + groupId);

    var uri = '/api/enterprise/admin/groups/' + groupId + "/members/" + userId;
    this.sendRequest(requestOptions, "DELETE", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Add subGroup to Superusers Group via API
 * POST api/enterprise/admin/groups/{superUserGroupID}/related-groups/{subGroupID}/type={subGroupTypeId}
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param superUserGroupId{String}
 * @param subgroupID {String}
 * @param subGroupTypeId{String}
 * @param callback {function}
 * @method addSubGroupToSuperUsersGroup
 */
exports.addSubGroupToSuperUsersGroupViaAPI = function (requestOptions, basicAuth, superUserGroupId, subGroupTypeId, subgroupID, callback) {
    logger.debug("Adding subgroup to superusers group: subGroupId: " + subgroupID);

    var uri = '/api/enterprise/admin/groups/' + superUserGroupId + '/related-groups/' + subgroupID + '?type=' + subGroupTypeId;
    this.sendRequest(requestOptions, 'POST', uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode)
    });
};

/**
 * Delete  Group via API
 * DELETE api/enterprise/admin/groups/{groupId}
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param groupId{String}
 * @param callback {function}
 * @method deleteGroupViaAPI
 */
exports.deleteGroupViaAPI = function (requestOptions, basicAuth, groupId, callback) {
    logger.debug("Deleting Group via groupId: " + groupId);

    var uri = '/api/enterprise/admin/groups/' + groupId;
    this.sendRequest(requestOptions, 'DELETE', uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode)
    });
};
/**
 * Retrive task by user via private cookies
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param size {String}
 * @param start  {String}
 * @param rememberMe (String}
 * @param xCSRFToken (String}
 * @method retrieveTasksByUserViaPrivateAPI
 */
exports.retrieveTasksByUserViaPrivateAPI = function (requestOptions, basicAuth, size, start, rememberMe, xCSRFToken, callback) {

    logger.debug("Retrieve tasks for user via API: " + basicAuth.user + " (password: " + basicAuth.password + ")");

    var taskData = {
        size: size,
        start: start
    };

    var uri = '/app/rest/query/history/tasks';

    this.sendRequestPrivate(requestOptions, "POST", uri, taskData, rememberMe, xCSRFToken, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Gets the run time app definitions for the current user. On the callback the response is available as JSON.
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @method getRunTimeAppDefinitions
 */
exports.getRunTimeAppDefinitions = function (requestOptions, basicAuth, callback) {
    logger.debug("Getting runtime-app-definitions for current user" + " user=" + basicAuth.user + " password=" + basicAuth.password);
    var uri = '/api/enterprise/runtime-app-definitions';
    this.sendRequest(requestOptions, 'GET', uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode)
    });
};

/**
 Gets the processDefinitionId (specified by processDefinitionName) start form within the app specified by appID
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param appID {String}
 * @param processDefinitionName {String}
 * @method getProcessDefinitionIdViaApi
 */
exports.getProcessDefinitionIdViaApi = function (requestOptions, basicAuth, appID, processDefinitionName, callback) {
    logger.debug("Getting ProcessDefinitionId via ProcessDefinitionName : " + processDefinitionName + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    var process_definitions;
    var process_definition_id;
    var runTime_appdefinitions;
    var runTime_appDefinitionId;
    exports.getRunTimeAppDefinitions(requestOptions, basicAuth, function (data,statusCode) {
        var json_data = JSON.parse(data);
        runTime_appdefinitions = json_data['data'];
        for (var i = 0; i < runTime_appdefinitions.length; i++) {
            if (runTime_appdefinitions[i]['modelId'] == appID) {
                runTime_appDefinitionId = runTime_appdefinitions[i]['id'];
            }
        }
        exports.getProcessDefinitions(requestOptions, basicAuth, runTime_appDefinitionId, function (data,statusCode) {
            var json_data = JSON.parse(data);
            process_definitions = json_data['data'];
            for (var i = 0; i < process_definitions.length; i++) {
                if (process_definitions[i]['name'] == processDefinitionName) {
                    process_definition_id = process_definitions[i]['id'];
                    callback(process_definition_id)
                }
            }
            callback(data,statusCode,process_definition_id);
        });
    });
};

/**
 * start processInstance using processDefinitionId, on callback get the processInstanceId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processDefinitionId {String}
 * @method startProcessInstanceViaApi
 */
exports.startProcessInstanceViaAPI = function (requestOptions, basicAuth, processDefinitionId, callback) {
    logger.debug("start Process Instance using ProcessDefinitionId : " + processDefinitionId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    var startReq = {
        processDefinitionId: processDefinitionId
    };
    var uri = '/api/enterprise/process-instances/';
    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), startReq, function (data, statusCode) {
        var json_data = JSON.parse(data);
        var processInstanceId = json_data['id'];
        callback(data, statusCode, processInstanceId);
    });
};

/**
 * Uploads content for ProcessInstance/tasks via type and to the processInstanceId/taskId via typeId, on callback get id of content
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param type {String}
 * @param typeId {String}
 * @param filePath {String}
 * @method uploadContentViaApi
 */
exports.uploadContentViaApi = function (requestOptions, basicAuth, type, typeId, filePath, callback) {
    logger.debug("uploading content for processInstance/Tasks with id " + typeId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);

    var uri = '/api/enterprise/' + type + '/' + typeId + '/raw-content';
    exports.uploadFileViaAPI(requestOptions, basicAuth, filePath, uri, callback);
};

/**
 * Get content for Process via processInstanceId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processInstanceId {String}
 * @method getContentOfProcessViaApi
 */
exports.getContentOfProcessViaApi = function (requestOptions, basicAuth, processInstanceId, callback) {
    logger.debug("Get Content of Process via Api using processInstanceId: " + processInstanceId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);

    var uri = '/api/enterprise/process-instances/' + processInstanceId + '/content';
    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Get content via contentId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param contentId {String}
 * @method getContentViaApi
 */
exports.getContentViaApi = function (requestOptions, basicAuth, contentId, callback) {
    logger.debug("Get Content via Content Id " + contentId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    var uri = '/api/enterprise/content/' + contentId;
    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Get content via contentId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param contentId {String}
 * @method getRawContentViaApi
 */
exports.getRawContentViaApi = function (requestOptions, basicAuth, contentId, callback) {
    logger.debug("Get Raw Content via Content Id " + contentId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    var uri = '/api/enterprise/content/' + contentId + '/raw';
    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Delete content via contentId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param contentId {String}
 * @method deleteContentViaApi
 */
exports.deleteContentViaApi = function (requestOptions, basicAuth, contentId, callback) {
    logger.debug("Delete Content via Content Id " + contentId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    var uri = '/api/enterprise/content/' + contentId;
    this.sendRequest(requestOptions, "DELETE", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Create standalone tasks using processDefinitionId, callback gets taskId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processDefinitionId {String}
 * @param tasksName {String}
 * @method createStandAloneTasksViaApi
 */
exports.createStandAloneTasksViaApi = function (requestOptions, basicAuth, processDefinitionId, taskName, callback) {
    var startReq = {
        name: taskName
    };

    if (processDefinitionId != null) {
        startReq['processDefinitionId'] = processDefinitionId;
        logger.debug("Create standalone task with ProcessDefinitionId : " + processDefinitionId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    }
    else {
        logger.debug("Create standalone task not associated with a process instance for user: " + basicAuth.user + ' password: ' + basicAuth.password);
    }

    var uri = '/api/enterprise/tasks';
    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), startReq, function (data, statusCode) {
        callback(data, statusCode);
        logger.debug("Task created with the taskName: " + taskName + ' taskId: ' + JSON.parse(data)["id"]);
    });
};

/**
 * Get content for Tasks via taskId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param taskId {String}
 * @method getTasksContentViaApi
 */
exports.getTasksContentViaApi = function (requestOptions, basicAuth, taskId, callback) {
    logger.debug("Get Content via taskId " + taskId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);
    var uri = '/api/enterprise/tasks/' + taskId + '/content';
    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Delete Process Instance using processInstanceId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processInstanceId {String}
 * @method deleteProcessInstanceViaApi
 */
exports.deleteProcessInstanceViaApi = function (requestOptions, basicAuth, processInstanceId, callback) {
    logger.debug("Deleting processInstance using processInstanceId : " + processInstanceId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);

    var uri = '/api/enterprise/process-instances/' + processInstanceId;
    this.sendRequest(requestOptions, "DELETE", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Get tenant's all groups details via tenantId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param tenantId {String}
 * @method getGroupsDetailsOfATenantViaApi
 */
exports.getGroupsDetailsOfATenantViaApi = function (requestOptions, basicAuth, tenantId, callback) {
    logger.debug("Getting all groups details for tenant : " + tenantId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);

    var uri = '/api/enterprise/admin/groups?tenantId=' + tenantId;
    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Get groupId for the given groupName of a tenant
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param tenantId {String}
 * @param groupName {String}
 * @method getGroupIdForGroupNameViaApi
 */
exports.getGroupIdForGroupNameViaApi = function (requestOptions, basicAuth, tenantId, groupName, callback) {
    logger.debug("Getting group Id for group-name " + groupName + " for tenantId " + tenantId + " for user " + basicAuth.user + " password: " + basicAuth.password);
    var groupId;

    exports.getGroupsDetailsOfATenantViaApi(requestOptions, basicAuth, tenantId, function (data, statusCode) {
        var json_data = JSON.parse(data);

        for (var i = 0; i < json_data.length; i++) {
            if (json_data[i]['name'] == groupName) {
                groupId = json_data[i]['id'];
            }
        }
        callback(data, statusCode, groupId);
    });
};

/**
 * Add super-users group capabilities to a given group
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param groupId {String}
 * @method addSuperUsersGroupCapabilitiesToAGroupViaApi
 */
exports.addSuperUsersGroupCapabilitiesToAGroupViaApi = function (requestOptions, basicAuth, groupId, callback) {
    logger.debug("Add Super-Users group capabilities to groupId : " + groupId + " for user: " + basicAuth.user + " password: " + basicAuth.password);
    var startReq = {
        "capabilities": [
            "tenant-mgmt",
            "tenant-mgmt-api",
            "tenant-admin",
            "tenant-admin-api",
            "access-metrics",
            "publish-app-to-dashboard",
            "access-all-models-in-tenant",
            "upload-license",
            "access-reports",
            "access-editor"
        ]
    };
    exports.addCapabilitiesToAGroupViaApi(requestOptions, basicAuth, groupId, startReq, function (data, requestStatus) {
        callback(data, requestStatus)
    })
};

/**
 * Add a set Capabilities to a given group using groupId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param groupId {String}
 * @param capabilities  {Json_object}
 * @method addCapabilitiesToAGroupViaApi
 */
exports.addCapabilitiesToAGroupViaApi = function (requestOptions, basicAuth, groupId, capabilities, callback) {
    logger.debug("Add capabilities to group via groupId : " + groupId + ' for user: ' + basicAuth.user + ' password: ' + basicAuth.password);

    var uri = '/api/enterprise/admin/groups/' + groupId + '/capabilities';
    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), capabilities, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Deleting group-manager via private cookies
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param groupId {String}
 * @param userId  {String}
 * @param rememberMe (String}
 * @param xCSRFToken (String}
 * @method removeGroupManagerViaPrivateAPI
 */
exports.removeGroupManagerViaPrivateAPI = function (requestOptions, basicAuth, groupId, userId, rememberMe, xCSRFToken, callback) {
    logger.debug("Deleting group manager of groupId " + groupId + " for user: " + basicAuth.user + " password: " + basicAuth.password);

    var uri = '/app/rest/admin/groups/' + groupId + '/manager/' + userId;
    this.sendRequestPrivate(requestOptions, "DELETE", uri, null, rememberMe, xCSRFToken, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Create New model
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param modelType {String}
 * @param modelName  {String}
 * @param modelDescription (String}
 * @method createNewModelViaApi
 */
exports.createNewModelViaApi = function (requestOptions, basicAuth, modelType, modelName, modelDescription, callback) {
    logger.debug("Creating new model for user: " + basicAuth.user + ' password: ' + basicAuth.password);

    var startReq = {
        "modelType": modelType,
        "name": modelName,
        "description": modelDescription
    };
    var uri = '/api/enterprise/models/';
    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), startReq, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Update model using model Id
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param modelId {String}
 * @param modelName  {String}
 * @param modelDescription (String}
 * @method updateModelViaApi
 */
exports.updateModelViaApi = function (requestOptions, basicAuth, modelId, modelName, modelDescription, callback) {
    logger.debug("Editing model with modelId: " + modelId + " for user: " + basicAuth.user + ' password: ' + basicAuth.password);

    var updatedModel = {
        "name": modelName,
        "description": modelDescription
    };
    var uri = '/api/enterprise/models/' + modelId;
    this.sendRequest(requestOptions, "PUT", uri, this.getAuthorization(basicAuth.user, basicAuth.password), updatedModel, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Gets app definition for a user via model id.  *
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param modelId {String}
 * @param callback
 * @method getAppDefinitionIdViaApi
 */
exports.getAppDefinitionIdViaApi = function (requestOptions, basicAuth, modelId, callback) {
    logger.debug("Getting appDefinitionId by modelId " + modelId + " for user=" + basicAuth.user + " password=" + basicAuth.password);

    var runTime_appDefinitions;
    var runTime_appDefinitionId;
    exports.getRunTimeAppDefinitions(requestOptions, basicAuth, function (data, statusCode) {
        var json_data = JSON.parse(data);
        runTime_appDefinitions = json_data['data'];
        for (var i = 0; i < runTime_appDefinitions.length; i++) {
            if (runTime_appDefinitions[i]['modelId'] == modelId) {
                runTime_appDefinitionId = runTime_appDefinitions[i]['id'];
            }
        }
        callback(data, statusCode, runTime_appDefinitionId);
    });
};

/**
 * Delete runtime app definition
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param appDefinitionId {String}
 * @param callback
 * @method deleteRunTimeAppDefinitionViaApi
 */
exports.deleteRunTimeAppDefinitionViaApi = function (requestOptions, basicAuth, appDefinitionId, callback) {
    logger.debug("Deleting run-time app-definition via appDefinitionId " + appDefinitionId + " for user= " + basicAuth.user + " password= " + basicAuth.password);

    var uri = '/api/enterprise/app-definitions/' + appDefinitionId;
    this.sendRequest(requestOptions, "DELETE", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Get decision-table by Name
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param tenantId {String}
 * @param dtName {String}
 * @param callback
 * @method getDecisionTableByNameViaApi
 */
exports.getDecisionTableByNameViaApi = function (requestOptions, basicAuth, tenantId, dtName, callback) {
    logger.debug("Getting decisionTable Name " + dtName + " for tenantId " + tenantId + " for user " + basicAuth.user + " password: " + basicAuth.password);
    var decisionTableId;
    var decisionTableDetails;
    var uri = '/api/enterprise/decisions/decision-tables?tenantIdLike=tenant_' + tenantId;

    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        var json_data = JSON.parse(data);
        decisionTableDetails = json_data['data'];

        for (var i = 0; i < decisionTableDetails.length; i++) {
            if (decisionTableDetails[i]['name'] == dtName) {
                decisionTableId = decisionTableDetails[i]['id'];
            }
        }
        callback(json_data, statusCode, decisionTableId);
    });
};

/**
 * Get decision-table definition Id by decision-table name
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param dtName {String}
 * @param dtId {String}
 * @param callback
 * @method getDecisionTableDefinitionIdViaApi
 */
exports.getDecisionTableDefinitionIdViaApi = function (requestOptions, basicAuth, dtName, dtId, callback) {
    logger.debug("Getting decisionTable_definitionId by decision_table_name: " + dtName + " for user " + basicAuth.user + " password: " + basicAuth.password);
    var decisionTable_definitionId;
    var uri = '/api/enterprise/decisions/decision-tables/' + dtId + '/editorJson';

    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        var json_data = JSON.parse(data);
        decisionTable_definitionId = json_data['id'];

        var pure_dtDefId = decisionTable_definitionId.replace("definition_", "");
        callback(data, statusCode, pure_dtDefId);
    });
};

/**
 * Update decision-table details via definitionId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param dtId {String}
 * @param dtUpdatedName {String}
 * @param dtUpdatedDescription {String}
 * @param callback
 * @method updateDecisionTableViaPrivateApi
 */
exports.updateDecisionTableViaPrivateApi = function (requestOptions, basicAuth, dtDefinitionId, dtUpdatedName, dtUpdatedDescription, rememberMe, xCSRFToken, callback) {
    logger.debug("Updating decision table with decision_table_definitionId: " + dtDefinitionId + " for user: " + basicAuth.user + " password: " + basicAuth.password);

    var uri = '/app/rest/decision-table-models/' + dtDefinitionId;
    var updateDecisionTable = {
        decisionTableRepresentation: {
            name: dtUpdatedName,
            decisionTableDefinition: {
                id: dtDefinitionId,
                name: dtUpdatedName,
                description: dtUpdatedDescription
            }
        }
    };
    this.sendRequestPrivate(requestOptions, "PUT", uri, updateDecisionTable, rememberMe, xCSRFToken, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Add users to Primary Group
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param userId {String}
 * @param primaryGroupID {String}
 * @param callback
 * @method addUserToPrimaryGroupViaApi
 */
exports.addUserToPrimaryGroupViaApi = function (requestOptions, basicAuth, userId, primaryGroupID, callback) {
    logger.debug("Updating user Primary Group details for userId: " + userId + " for user: " + basicAuth.user + " password: " + basicAuth.password);

    var uri = '/api/enterprise/admin/users';
    var updateDecisionTable = {
        primaryGroupId: primaryGroupID,
        users: [
            userId
        ]
    };
    this.sendRequest(requestOptions, "PUT", uri, this.getAuthorization(basicAuth.user, basicAuth.password), updateDecisionTable, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Delete tenant for the given tenant Id
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param tenantId {String}
 * @param callback {function}
 * @method deleteTenantViaApi
 */
exports.deleteTenantViaApi = function(requestOptions, basicAuth, tenantId, callback) {
    logger.debug("Deleting tenant with the tenantId: " + tenantId + " for user: " + basicAuth.user + " password: " + basicAuth.password);

    var uri = '/api/enterprise/admin/tenants/' + tenantId;

    this.sendRequest(requestOptions, "DELETE", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Updates user tenant via private api
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param tenantId {String}
 * @param userId {String}
 * @param rememberMe {String}
 * @param xCSRFToken {String}
 * @method changeUserTenantViaPrivateApi
 */
exports.changeUserTenantViaPrivateApi = function (requestOptions, basicAuth, tenantId, userId, rememberMe, xCSRFToken, callback) {
    logger.debug("changing user tenant for user " + userId + " to tenantId: " + tenantId);

    var uri = '/app/rest/admin/users';
    var requestData = {
        users: [userId],
        tenantId: tenantId
    };
    this.sendRequestPrivate(requestOptions, "PUT", uri, requestData, rememberMe, xCSRFToken, function (data, statusCode) {
        callback(data, statusCode);
    })
};

/**
 * Involve User/Group to a process instance via processInstanceId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processInstanceId {String}
 * @param groupId {String}
 * @param typeText {function}
 * @param userId {function}
 * @method involveGroupOrUserToProcessInstanceViaApi
 */
exports.involveGroupOrUserToProcessInstanceViaApi = function (requestOptions, basicAuth, processInstanceId, groupId, typeText, userId, callback) {
    logger.debug("Involve user/gorup to process instance via processInstanceId: " + processInstanceId + " with user: " + basicAuth.user + ' password: ' + basicAuth.password);

    var requestData = {
        group: groupId,
        type: typeText,
        user: userId
    };
    var uri = '/api/enterprise/process-instances/' + processInstanceId + '/identitylinks';
    this.sendRequest(requestOptions, "POST", uri, this.getAuthorization(basicAuth.user, basicAuth.password), requestData, function (data, statusCode) {
        callback(data, statusCode);
    });
};

/**
 * Get users and group involved in a process instance via processInstanceId
 * @param requestOptions {RequestOptions}
 * @param basicAuth {BasicAuthorization}
 * @param processInstanceId {String}
 * @method getInvolvedUserAndGroupOfProcessInstance
 */
exports.getInvolvedUserAndGroupOfProcessInstance = function (requestOptions, basicAuth, processInstanceId, callback) {
    logger.debug("Get involved Users and Group Info for processInstantId: " + processInstanceId + ' with user: ' + basicAuth.user + ' password: ' + basicAuth.password);

    var uri = '/api/enterprise/process-instances/'+processInstanceId+'/identitylinks';
    this.sendRequest(requestOptions, "GET", uri, this.getAuthorization(basicAuth.user, basicAuth.password), null, function (data, statusCode) {
        callback(data, statusCode);
    });
};