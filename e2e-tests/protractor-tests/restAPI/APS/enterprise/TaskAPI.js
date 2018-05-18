/*
 * Copyright (c) 2005 - 2018 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Created by ssaiyed on 08/11/17.
 */

var request = require('request');
var url = require('url-join');
var path = require('path');
var fs = require('fs');
var APIUtils = require('../../APIUtil.js');
var TestConfig = require('../../../test.config.js');

var RequestEnterpriseBase = require('./RequestEnterpriseBase');

var TaskAPI = function () {
    var requestBase = new RequestEnterpriseBase();
    var apiUtils = new APIUtils();

    var uri = url(baseUrl, '/tasks');

    this.tasksQuery = function (auth, tasksQuery) {
        logger.info('[ REST API ] Query tasks using:', tasksQuery);

        let options = {
            url: url(uri, '/query'),
            headers:  requestBase.requestHeaders(auth),
            body: tasksQuery,
            json: true
        };
        return new Promise(function (resolve, reject) {
            let responseBody = '';
            request.post(options)
                .on('response', function (response) {
                    response
                        .on('data', function (data) {
                            responseBody += data;
                        }).
                        on('end', function (){
                            logger.info('Query tasks response', responseBody.toString());
                            resolve({
                                responseBody: responseBody.toString(),
                                statusCode: response.statusCode,
                                responseMessage: response.statusMessage
                            });
                        });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Get comments - /enterprise/tasks/{taskId}/comments
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @returns {Promise}
     */
    this.getTaskComments = function (auth, taskId) {
        logger.info("[ REST API ] Get comments for taskId:", taskId);

        var options = {
            url: url(uri, taskId, '/comments'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Get task comments response (taskId:', taskId, '):', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Add comment - /enterprise/tasks/{taskId}/comments
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @taskCommentModel - json containing comment data
     * @returns {Promise}
     */
    this.addTaskComment = function (auth, taskId, taskCommentModel) {
        logger.info("[ REST API ] Add comment for taskId:", taskId);

        var options = {
            url: url(uri, taskId, '/comments'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: taskCommentModel
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Add task comment response (taskId:', taskId, '):', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Get task content  - /enterprise/tasks/{taskId}/content
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @returns {Promise}
     */
    this.getTaskContent = function (auth, taskId) {
        logger.info("[ REST API ] Get content list for taskId:", taskId);

        var options = {
            url: url(uri, taskId, '/content'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Get task content list response (taskId: ' + taskId + '):', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Upload and attach task content - /enterprise/tasks/{taskId}/raw-content
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @filePath - {String}
     * @isRelatedContent - {Boolean}
     * @returns {Promise}
     */
    this.uploadTaskContent = function (auth, taskId, filePath, isRelatedContent = true) {
        logger.info("[ REST API ] Upload content to taskId:", taskId);
        var absoluteFilePath = path.join(TestConfig.main.rootPath + filePath);

        var options = {
            url: url(uri, taskId, '/raw-content') + '?isRelatedContent=' + isRelatedContent,
            headers: requestBase.requestHeaders(auth),
            formData: {
                 file: fs.createReadStream(absoluteFilePath)
            }
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Upload content response (taskId: ' + taskId + '):', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Attach content to a task - /enterprise/tasks/{taskId}/content
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @contentData - JSON containing the content data (name, source, sourceId etc)
     */
    this.attachTaskContent = function (auth, taskId, contentData, isRelatedContent = true) {
        logger.info("[ REST API ] Attach content to taskId:", taskId);

        var options = {
            url: url(uri, taskId, '/content') + '?isRelatedContent=' + isRelatedContent,
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: contentData
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Attach content response (taskId: ' + taskId + '):', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.getTask = function (auth, taskId) {
        logger.info('[ REST API ] Get task details for taskId:', taskId);

        let options = {
            url: url(uri, taskId),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            let responseBody = '';
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        responseBody += data;
                    }).
                    on('end', function () {
                        logger.info('Get task details response:', responseBody.toString());
                        resolve({
                            responseBody: responseBody.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.updateTask = function (auth, taskId, taskData) {
        logger.info('[ REST API ] Update taskId:', taskId);

        let options = {
            url: url(uri, taskId),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: taskData
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Update task response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    this.deleteTask = function (auth, taskId) {
        logger.info("[ REST API ] Delete task:", taskId);

        var options = {
            url: url(uri, taskId),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    }; 

    /**
     * Assign task - /enterprise/tasks/{taskId}/action/assign
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @userIdentifier - userId and user email
     */
    this.assignTask = function (auth, taskId, userIdentifier) {
        logger.info("[ REST API ] Assign task:", taskId);

        var options = {
            url: url(uri, taskId, '/action/assign'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: userIdentifier
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Assign task response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Attach form - /enterprise/tasks/{taskId}/action/attach-form
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @formId - {Number}
     */
    this.attachFormToTask = function (auth, taskId, formId) {
        logger.info('[ REST API ] Attach formId', formId, 'to taskId:', taskId);

        let options = {
            url: url(uri, taskId, '/action/attach-form'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: {"formId": formId}
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Remove task form - /enterprise/tasks/{taskId}/action/remove-form
     * 
     * @auth - credentials
     * @taskId - {Number}
     */
    this.removeFormFromTask = function (auth, taskId) {
        logger.info('[ REST API ] Remove form from taskId:', taskId);

        var options = {
            url: url(uri, taskId, '/action/remove-form'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Claim a task - /enterprise/tasks/{taskId}/action/claim
     * 
     * @auth - credentials
     * @taskId - {Number}
     */
    this.claimTask = function (auth, taskId) {
        logger.info("[ REST API ] Claim task:", taskId);

        var options = {
            url: url(uri, taskId, '/action/claim'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Unclaim a task - /enterprise/tasks/{taskId}/action/unclaim
     * 
     * @auth - credentials
     * @taskId - {Number}
     */
    this.unclaimTask = function (auth, taskId) {
        logger.info("[ REST API ] Unclaim taskId:", taskId);

        let options = {
            url: url(uri, taskId, '/action/unclaim'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
    * Complete a task - /enterprise/tasks/{taskId}/action/complete
    * 
    * @auth - credentials
    * @taskId - {Number}
    */
    this.completeTask = function (auth, taskId) {
        logger.info("[ REST API ] Complete task:", taskId);

        var options = {
            url: url(uri, taskId, '/action/complete'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Delegate a task - /enterprise/tasks/{taskId}/action/delegate
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @userIdentifier - userId and user email
     */
    this.delegateTask = function (auth, taskId, userIdentifier) {
        logger.info("[ REST API ] Delegate taskId:", taskId);

        let options = {
            url: url(uri, taskId, '/action/delegate'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: userIdentifier
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Involve a user with a task - /enterprise/tasks/{taskId}/action/involve
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @userIdentifier - userId and user email
     */
    this.involveUserWithTask = function (auth, taskId, userIdentifier) {
        logger.info("[ REST API ] Involve user with taskId:", taskId);

        let options = {
            url: url(uri, taskId, '/action/involve'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: userIdentifier
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Remove involved user from task - /enterprise/tasks/{taskId}/action/remove-involved
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @userIdentifier - userId and user email
     */
    this.removeInvolvedUserFromTask = function (auth, taskId, userIdentifier) {
        logger.info("[ REST API ] Remove involved user from taskId:", taskId);

        let options = {
            url: url(uri, taskId, '/action/remove-involved'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: userIdentifier
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Resolve a task - /enterprise/tasks/{taskId}/action/resolve
     * 
     * @auth - credentials
     * @taskId - {Number}
     */
    this.resolveTask = function (auth, taskId) {
        logger.info("[ REST API ] Resolve taskId:", taskId);

        let options = {
            url: url(uri, taskId, '/action/resolve'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Involve a group with a task - /enterprise/tasks/{taskId}/groups/{groupId}
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @groupId - {Number}
     */
    this.involveGroupWithTask = function (auth, taskId, groupId) {
        logger.info("[ REST API ] Involve groupId", groupId, "with taskId", taskId);

        let options = {
            url: url(uri, taskId, '/groups', groupId),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Remove an involved group from a task - /enterprise/tasks/{taskId}/groups/{groupId}
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @groupId - {Number}
     */
    this.removeInvolvedGroupFromTask = function (auth, taskId, groupId) {
        logger.info("[ REST API ] Remove involved groupId", groupId, "from taskId", taskId);

        let options = {
            url: url(uri, taskId, '/groups', groupId),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.del(options)
                .on('response', function (response) {
                    resolve(response);
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Add variable list - /enterprise/tasks/{taskId}/variables
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @variableList - list of variables
     */
    this.addVariableListToTask = function (auth, taskId, variableList) {
        logger.info("[ REST API ] Add variable list to taskId:", taskId);

        let options = {
            url: url(uri, taskId, '/variables'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: variableList
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Add variable list to task', taskId, 'response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Get variable list - /enterprise/tasks/{taskId}/variables
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @queryParameters - object containing variable scope
     */
    this.getTaskVariables = function (auth, taskId, queryParameters) {
        logger.info("[ REST API ] Get variable list from taskId:", taskId);
        let options = {
            url: url(uri, taskId, '/variables', apiUtils.buildQueryParams(queryParameters)),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Get variable list from task', taskId, 'response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Get variable - /enterprise/tasks/{taskId}/variables/{variable}
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @variableName - {String}
     * @queryParameters - object containing variable scope
     */
    this.getTaskVariable = function (auth, taskId, variableName, queryParameters) {
        logger.info('[ REST API ] Get variable', variableName, 'from task:', taskId);
        let options = {
            url: url(uri, taskId, '/variables', variableName, apiUtils.buildQueryParams(queryParameters)),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Get variable', variableName, 'from taskId', taskId, 'response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Update variable - /enterprise/tasks/{taskId}/variables/{variable}
     * 
     * @auth - credentials
     * @taskId - {Number}
     * @variableName - {String}
     * @variableData - json containing data to be updated
     */
    this.updateTaskVariable = function (auth, taskId, variableName, variableData) {
        logger.info('[ REST API ] Update variable', variableName, 'from task:', taskId);
        let options = {
            url: url(uri, taskId, '/variables', variableName),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: variableData
        };
        return new Promise(function (resolve, reject) {
            request.put(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Update variable', variableName, 'from taskId', taskId, 'response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Audit task - /enterprise/tasks/{taskId}/audit
     * 
     * @auth - credentials
     * @taskId - {Number}
     */
    this.auditTask = function (auth, taskId) {
        logger.info('[ REST API ] Audit taskId:', taskId);

        let options = {
            url: url(uri, taskId, '/audit'),
            headers: requestBase.requestHeaders(auth)
        };
        return new Promise(function (resolve, reject) {
            request.get(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Audit task response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Filter tasks - /enterprise/tasks/filter
     * 
     * @auth - credentials
     * @tasksFilter - json containing various filters
     */
    this.filterTasks = function (auth, tasksFilter) {
        logger.info('[ REST API ] Filter tasks using:', tasksFilter);

        let options = {
            url: url(uri, '/filter'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: tasksFilter
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Filter tasks response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Create a standalone task - /enterprise/tasks/
     * 
     * @auth - credentials
     * @taskRepresentation - json containing task data
     */
    this.createStandaloneTask = function (auth, taskRepresentation) {
        logger.info('[ REST API ] Create a standalone task');

        let options = {
            url: uri,
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: taskRepresentation
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Create task response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };

    /**
     * Create checklist task - /enterprise/checklist/{taskId}
     * 
     * @auth - credentials
     * @taskId - parent task Id
     */
    this.createChecklistTask = function (auth, parentTaskId, taskRepresentation) {
        logger.info('[ REST API ] Create checklist task for parent taskId:', parentTaskId);

        let options = {
            url: url(uri, parentTaskId, '/checklist'),
            headers: requestBase.requestHeaders(auth),
            json: true,
            body: taskRepresentation
        };
        return new Promise(function (resolve, reject) {
            request.post(options)
                .on('response', function (response) {
                    response.on('data', function (data) {
                        logger.info('Create checklist task for parent taskId', parentTaskId, 'response:', data.toString());
                        resolve({
                            responseBody: data.toString(),
                            statusCode: response.statusCode,
                            responseMessage: response.statusMessage
                        });
                    });
                })
                .on('error', function (err) {
                    reject(err);
                });
        });
    };
};

module.exports = new TaskAPI();