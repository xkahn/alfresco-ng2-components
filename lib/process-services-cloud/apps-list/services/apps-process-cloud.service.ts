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

import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { AppConfigService, LogService } from '@alfresco/adf-core';
import { ApplicationInstanceModel } from '../model/application-instance.model';

@Injectable()
export class AppsProcessCloudService {

    public static DEFAULT_THEME: string = 'theme-2';
    public static DEFAULT_ICON: string = 'favorite_border';

    contextRoot = '';
    constructor(private apiService: AlfrescoApiService,
                private logService: LogService,
                private appConfig: AppConfigService) {
        this.contextRoot = this.appConfig.get('apiHost', '');
    }

    /**
     * Gets a list of deployed apps for this user.
     * @returns The list of deployed apps
     */
    getDeployedApplications(): Observable<ApplicationInstanceModel[]> {
        const api: any = this.apiService.getInstance().oauth2Auth;
        api.basePath = this.contextRoot;
        const path = 'alfresco-deployment-service/v1/applications';
        const httpMethod = 'GET', pathParams = {}, queryParams = {},
            headerParams = {}, formParams = {}, bodyParam = {}, authNames = [],
            contentTypes = ['application/json'], accepts = ['application/json'];
        return from(api.callApi(
            path, httpMethod,
            pathParams, queryParams, headerParams, formParams, bodyParam,
            authNames, contentTypes, accepts, { 'String': 'String' }, ''
        )).pipe(
            map(response => {
                const applications = Object.keys(response).map(key => response[key]);
                return this.createApplicationInstances(applications);
            }),
            catchError(err => this.handleError(err))
        );

    }

    createApplicationInstances(response: ApplicationInstanceModel[]): ApplicationInstanceModel[] {
        let applications: ApplicationInstanceModel[] = [];
        if (response && response.length > 0) {
            applications = response.map((application: ApplicationInstanceModel) => {
                application.theme = AppsProcessCloudService.DEFAULT_THEME;
                application.icon = AppsProcessCloudService.DEFAULT_ICON;
                return application;
            });
        }
        return applications;
    }

    private handleError(error?: any) {
        this.logService.error(error);
        return throwError(error || 'Server error');
    }
}
