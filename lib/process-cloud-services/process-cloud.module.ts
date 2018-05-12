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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, TRANSLATION_PROVIDER, CommentsModule } from '@alfresco/adf-core';

import { MaterialModule } from './material.module';

import { ProcessListModule } from './process-list/process-list.module';
import { ProcessInstanceService } from './process-list/services/process-instance.service';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        CommentsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ProcessListModule
    ],
    providers: [
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'adf-process-cloud-services',
                source: 'assets/adf-process-cloud-services'
            }
        },
        ProcessInstanceService
    ],
    exports: [
        CommonModule,
        CommentsModule,
        FormsModule,
        ReactiveFormsModule,
        ProcessListModule
    ]
})
export class ProcessCloudModule {
}
