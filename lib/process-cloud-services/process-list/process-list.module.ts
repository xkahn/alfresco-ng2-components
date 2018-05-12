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
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@alfresco/adf-core';
import { MaterialModule } from '../material.module';
import { CardViewModule, DataColumnModule, DataTableModule, DirectiveModule, PipeModule } from '@alfresco/adf-core';

import { ProcessInstanceListComponent } from './components/process-instance-list.component';

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        FormModule,
        MaterialModule,
        FlexLayoutModule,
        TranslateModule,
        CardViewModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        DataColumnModule,
        DirectiveModule
    ],
    declarations: [
        ProcessInstanceListComponent
    ],
    exports: [
        ProcessInstanceListComponent
    ]
})
export class ProcessListModule {
}
