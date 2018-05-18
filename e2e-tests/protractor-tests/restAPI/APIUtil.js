/*
 * Copyright (c) 2005 - 2017 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Wed Oct 23 2017
 */

/**
 * Utility class for API calls
 */

var url = require('url-join');
var TestConfig = require('../test.config');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var Ajv = require('ajv');

var APIUtils = function () {
    /**
     * Return Basic authorization
     *
     * @param user
     * @param password
     * @returns Basic authorization
     */
    this.getAuthorization = function (user, password) {
        return 'Basic ' + Buffer(user + ':' + password).toString('base64');
    };

    /**
     * Return Admin authentication details for each application
     *
     * @param application - application name from test.config file
     */
    this.getAdminAuth = function (application) {
        return new BasicAuthorization(TestConfig[application].adminEmail, TestConfig[application].adminPassword);
    };

     /** 
      * Return any application base URL 
      * <protocol>://<hostname>:<port>/<pathname> 
      *
      * @param application - any application declared in config file: main or adf 
      * @param urlComponentsParam - Object with details required to define the baseURL 
      * { 
      *      protocol: "http", 
      *      hostname: "localhost", 
      *      port: "8080" 
      * } 
      * If urlComponents empty {}, the default test configuration values are set 
      */
      this.getBaseURL = function (application, urlComponentsParam) { 
          var urlComponents = {}; 
          urlComponents.protocol = TestConfig[application].protocol; 
          urlComponents.hostname = TestConfig[application].host; 
          urlComponents.port = TestConfig[application].port; 
          urlComponents.path = TestConfig[application].apiContextRoot;  
          Object.assign(urlComponents, urlComponentsParam);  

          var baseUrl =  url(urlComponents.protocol 
                      + "://" + urlComponents.hostname 
                      + (urlComponents.port !== "" ? ":" + urlComponents.port : ""), 
                      urlComponents.path);  

          return baseUrl;
      };

    /**
     * Search value in JSON data
     * @param data {String} - JSON object
     * @param key {String} - JSON key - value pair to be matched (e.g id: 1234)
     * @param value {String}
     * @param searchedKey {String} - searchedKey to get value for (e.g appDefId)
     * @param nestedDataValue {String} - nested JSON key
     * @method getValueByKeyValuePair
     */
    this.getValueByKeyValuePair = function (data, key, value, searchedKey, nestedDataValue) {
        var searchedValue;

        if (nestedDataValue !== null) {
            data = data[nestedDataValue];
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i][key] == value) {
                searchedValue = data[i][searchedKey];
                break;
            }
        }
        return searchedValue;
    };


    /**
     * Search value in JSON data
     *
     * @param json_data {String} - JSON object
     * @param key {String} - JSON key - value pair to be matched (e.g id: 1234)
     * @param value {String}
     * @param searchedKey {String} - searchedKey to get value for (e.g appDefId)
     */
    this.retrieveValueByKeyValuePair = function (json_data, key, value, searchedKey) {
        var details = json_data.find(function(item) {
            if(typeof item[key] === 'undefined'){
                return undefined;
            }
            return item[key] === value;
        });
        return (typeof details === 'undefined') ? undefined : details[searchedKey];
    };

    /**
     * Build API query parameters string
     * 
     * @param queryParams - query parameters object
     * @returns a string with all parameters appended
     */
    this.buildQueryParams = function (queryParams) {
        var searchParams =  Object.keys(queryParams || {})
            .map(function(key) {
                return encodeURIComponent(key) + '=' +  encodeURIComponent(queryParams[key]);
            })
            .join('&');

        return (typeof queryParams == "undefined") ? '' : '?' + searchParams;
    };

    /**
     * Retrieve HTTP cookies by name
     *
     * @param cookiesNamesArray - cookies names array
     * @returns a single Promise
     */
    
    this.getHTTPCookiesByNames = function (cookiesNamesArray) {
        var promises = [];
        for ( var i = 0; i < cookiesNamesArray.length; i++ ) {
            promises.push(browser.manage().getCookie(cookiesNamesArray[i]));
        }
        return Promise.all(promises);
    };

    /**
     * JSON Schema validator
     *
     * @param schema - JSON schema against which the validation is performed
     * @param data - JSON object that is validated against the schema
     * @param additionalSchemasArray - array with reusable schemas used for the validation
     * When schema is very complex it might be broken into smaller reusable schemas,
     * that are added to ajv instance, before the validation
     * @returns a Promise resolved with validationResult(true/false) or rejected with validation errors
     */
    this.validateJSONSchema = function (schema, data, additionalSchemasArray) {
        var ajv = new Ajv({allErrors: true, verbose: true});

        return new Promise(function (resolve, reject) {
            ajv.addSchema(schema);
            if (typeof additionalSchemasArray !== 'undefined') {
                ajv.addSchema(additionalSchemasArray);
            }
            var validate = ajv.getSchema(schema.$id);
            var validationResult = validate(data);
            if (validate.errors === null) {
                resolve({
                    data: data,
                    validationResult: validationResult
                });
            } else {
                reject(validate.errors);
            }
        });
    }
};

module.exports = APIUtils;

