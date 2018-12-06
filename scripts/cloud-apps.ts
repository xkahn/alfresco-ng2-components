/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AlfrescoApi = require('alfresco-js-api-node');
import fs = require('fs');
import { error } from 'shelljs';

export class ApiService {

    appsAvailable = {};

    HOST_SSO = 'aps2dev.envalfresco.com';

    apiService = new AlfrescoApi({
        provider: 'BPM',
        authType: 'OAUTH',
        oauth2: {
            host: `${this.HOST_SSO}/auth/realms/springboot`,
            clientId: 'activiti',
            scope: 'openid',
            secret: '',
            implicitFlow: false,
            silentLogin: false,
            redirectUri: '/',
            redirectUriLogout: '/logout'
        }

    });

    async login(username, password) {
        await this.apiService.login(username, password);
        // console.log(this.apiService.oauth2Auth.token);
    }

    async performBpmOperation(path, method, queryParams, postBody) {
        const uri = this.HOST_SSO + path;
        const pathParams = {}, formParams = {};
        const authNames = [];
        const contentTypes = ['application/json'];
        const accepts = ['application/json'];

        const headerParams = {
            'Authorization': 'bearer ' + this.apiService.oauth2Auth.token
        };

        return this.apiService.bpmClient.callCustomApi(uri, method, pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, {})
            .catch((error) => {
                throw (error);
            });
    }

    async getListApp() {
        console.log('getListApp');
        const uri = this.HOST_SSO + '/alfresco-deployment-service/v1/applications';
        const pathParams = {}, formParams = {}, queryParams = {}, postBody = {};
        const authNames = [];
        const contentTypes = ['application/json'];
        const accepts = ['application/json'];

        const headerParams = {
            'Authorization': 'bearer ' + this.apiService.oauth2Auth.token
        };

        return this.apiService.bpmClient.callCustomApi(uri, 'GET', pathParams, queryParams, headerParams, formParams, postBody,
            authNames, contentTypes, accepts, [])
            .catch((error) => {
                throw (error);
            });
    }

    async getAvailableApp() {
        console.log('getAvailableApp');
        this.readJson();
        return await this.getListApp();
        // console.log('%o', this.appsAvailable);
    }

}

let api = new ApiService();

let appsLocked = {};

function isAppLock(appName) {
    let result = false;
    appsLocked.locked.forEach((app) => {
        console.log(app.name + '  = ', appName);
        if (app.name === appName) {
            result = true;
        }
    });
    console.log('Final result', result);
    return result;
}

async function init() {
    appsLocked = await readJSONFile();
    console.log('Controllo %o', appsLocked);
    await api.login('qa-super-admin@alfresco.com', 'adf$2018IloveAngular');

    const apps = await api.getListApp();
    // console.log('Controllo %o', apps);
    let result;
    // if (!isAppLock(apps[0].name)) {
    //     result = apps[0];
    // }

    try {
    result = apps.forEach( (app) => {
        console.log('Controllo %o', app);
        if (!isAppLock(app.name)) {
            result = app;
            throw error;
        }
    });
    } catch (error) {
        console.log('The first not locked app is: %o', result);
    }
}

function readJSONFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('app-locked.json', 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
}

init();

// api.login('qa-super-admin@alfresco.com', 'adf$2018IloveAngular').then( () => {
//     console.log('loggin');
//     api.getAvailableApp().then( (apps) => {
//         console.log('Controllo se lock');
//         // console.log('Controllo %o', apps[0]);
//         const appName = apps[0].name;
//         this.appsLocked.locked.filter((app) =>  {
//             console.log('Controllo %o', app);
//             if (app.name === appName) {
//                 console.log('App found' + app.name);
//                 return true;
//             }
//         });
//     });
// });

