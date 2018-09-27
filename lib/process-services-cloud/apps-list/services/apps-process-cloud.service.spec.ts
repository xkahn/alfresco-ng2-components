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

import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '@alfresco/adf-core';
// import { AlfrescoApiService, AppConfigService, LogService  } from '@alfresco/adf-core';
import { AppsProcessCloudService } from './apps-process-cloud.service';
import { fakeApplicationInstance } from '../mock/application-instance.mock';
import { ProcessTestingModule } from './../../../process-services/testing/process.testing.module';

declare let jasmine: any;

describe('AppsProcessCloudService', () => {

    let service: AppsProcessCloudService;

    setupTestBed({
        imports: [ProcessTestingModule]
    });

    beforeEach(() => {
        service = TestBed.get(AppsProcessCloudService);
    });

    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it('should get the deployed apps ', (done) => {
        service.getDeployedApplications().subscribe(
            (res: any) => {
                expect(res).toBeDefined();
                expect(res.length).toEqual(2);
                expect(res[0].name).toEqual('application-new-1');
                expect(res[1].name).toEqual('application-new-2');
                done();
            }
        );

        jasmine.Ajax.requests.mostRecent().respondWith({
            'status': 200,
            contentType: 'application/json',
            responseText: JSON.stringify(fakeApplicationInstance)
        });
    });
});
