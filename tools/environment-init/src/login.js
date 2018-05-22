'use strict';

var AlfrescoApi = require('alfresco-js-api-node');
var colors = require('colors/safe');

class Login {

    /**
     * @param {String} username
     * @param {String} password
     * @param {String} contentHost Your share server IP or DNS name
     * @param {String} processHost Your activiti server IP or DNS name
     * @param {String} provider ECM, BPM or ALL
     */

    constructor(username, password, contentHost, processHost, provider) {
        this.provider = provider;

        this.config = {
            hostEcm: contentHost,
            hostBpm: processHost,
            username: username,
            password: password,
            provider: provider
        };
    }

    getJSapiInstance() {
        return this.alfrescoJsApi;
    }

    login() {
        this.alfrescoJsApi = new AlfrescoApi(this.config);
        //console.log(colors.red('config: ' + JSON.stringify(this.config )));

        return new Promise((resolve, reject) => {
            this.alfrescoJsApi.login(this.config.username, this.config.password).on('unauthorized', (error) => {
                console.log(colors.red('Unauthorized login into: ' + this.provider + '   ' + error));
                reject(error);
            }).on('error', (error) => {
                console.log(colors.red('Error into: ' + this.provider + '   ' + JSON.stringify(error)));
                reject(error);
            }).on('success', () => {
                console.log(colors.green('Logged In :' + this.provider));
                resolve();
            }).then(() => {
                resolve();
            }, (error) => {
                console.log(colors.red('Error into: ' + JSON.stringify(error)));
                reject(error);
            });
        });
    }

}

module.exports = Login;
