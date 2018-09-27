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

// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppsListCloudComponent } from './apps-list-cloud.component';
import { setupTestBed } from '@alfresco/adf-core';
// import { AppsProcessCloudService } from '../services/apps-process-cloud.service';
import { ProcessTestingModule } from './../../../process-services/testing/process.testing.module';

describe('AppsListCloudComponent', () => {

    let component: AppsListCloudComponent;
    let fixture: ComponentFixture<AppsListCloudComponent>;

    setupTestBed({
        imports: [ProcessTestingModule]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppsListCloudComponent);
        component = fixture.componentInstance;
    });

    it('should create instance of AppsListCloudComponent', () => {
        expect(component instanceof AppsListCloudComponent).toBe(true, 'should create AppsListCloudComponent');
    });

});
