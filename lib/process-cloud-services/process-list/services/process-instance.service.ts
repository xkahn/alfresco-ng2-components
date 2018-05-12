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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProcessInstanceListResponseModel } from '../models/process-instance-list-response.model';
import { ProcessListModel } from '@alfresco/adf-process-services/process-list/models/process-list.model';
import { AppConfigService } from '@alfresco/adf-core';
import { BaseProcessCloudService } from './base-process-cloud.service';

@Injectable()
export class ProcessInstanceService extends BaseProcessCloudService {

    constructor(
        protected http: HttpClient,
        protected appConfig: AppConfigService) {
            super(http, appConfig);
    }

    findAll(page?: number, size?: number, sortProperty?: string, sortDirection?: string): Observable<ProcessListModel> {
        const params = new HttpParams()
            .set('page', 0 + '')
            .set('size', 25 + '');
            // .set('sort', sorting);

        return this.http
            .get<ProcessInstanceListResponseModel>(`${this.contextRoot}/query/v1/process-instances`, { params: params })
            .map((instances: ProcessInstanceListResponseModel) => {
                return <ProcessListModel> {
                    size: instances.list.pagination.count,
                    total: instances.list.pagination.totalItems,
                    start: instances.list.pagination.skipCount,
                    length: instances.list.pagination.totalItems,
                    data: instances.list.entries.map(data => data.entry)
                };
            }).catch((err) => {
                return this.handleError(err);
            });
    }

    private handleError(error: any) {
        return Observable.throw(error || 'Server error');
    }

}
