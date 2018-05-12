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

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DatePipe } from '@angular/common';
import { ProcessInstanceService } from '../services/process-instance.service';
import { ProcessListModel } from '../models/process-list.model';

import {
    PaginatedComponent,
    PaginationModel,
    UserPreferencesService
} from '@alfresco/adf-core';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'adf-cloud-process-instance-list',
    styleUrls: ['./process-instance-list.component.css'],
    templateUrl: './process-instance-list.component.html'
})
export class ProcessInstanceListComponent implements OnChanges, PaginatedComponent {

    @Input()
    appId: number;

    @Output()
    success: EventEmitter<ProcessListModel> = new EventEmitter<ProcessListModel>();

    /** Emitted when an error occurs while loading the list of process instances from the server. */
    @Output()
    error: EventEmitter<any> = new EventEmitter<any>();

    size: number;
    page: number;
    currentInstanceId: string;
    processInstances: any;
    isLoading: boolean = true;
    layoutPresets = {};

    pagination: BehaviorSubject<PaginationModel>;

    constructor(private processInstanceService: ProcessInstanceService,
                private userPreferences: UserPreferencesService) {
        this.size = this.userPreferences.paginationSize;

        this.pagination = new BehaviorSubject<PaginationModel>(<PaginationModel> {
            maxItems: this.size,
            skipCount: 0,
            totalItems: 0
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.reload();
    }

    public reload() {
        this.load();
    }

    private load() {
        this.isLoading = true;
        this.processInstanceService.findAll()
            .subscribe(
                (response) => {
                    this.processInstances = response.data;
                    // let instancesRow = this.createDataRow(response.data);
                    // this.renderInstances(instancesRow);
                    // this.selectFirst();
                    this.success.emit(response);
                    this.isLoading = false;
                    this.pagination.next({
                        count: response.data.length,
                        maxItems: this.size,
                        skipCount: this.page * this.size,
                        totalItems: response.total
                    });
                },
                error => {
                    this.error.emit(error);
                    this.isLoading = false;
                });
    }

    /**
     * Return the current id
     */
    getCurrentId(): string {
        return this.currentInstanceId;
    }

    getProcessNameOrDescription(processInstance, dateFormat): string {
        let name = '';
        if (processInstance) {
            name = processInstance.name ||
                processInstance.processDefinitionName + ' - ' + this.getFormatDate(processInstance.started, dateFormat);
        }
        return name;
    }

    getFormatDate(value, format: string) {
        let datePipe = new DatePipe('en-US');
        try {
            return datePipe.transform(value, format);
        } catch (err) {
            return '';
        }
    }

    updatePagination(params: PaginationModel) {
        const needsReload = params.maxItems || params.skipCount;
        this.size = params.maxItems;
        this.page = this.currentPage(params.skipCount, params.maxItems);
        if (needsReload) {
            this.reload();
        }
    }

    currentPage(skipCount: number, maxItems: number): number {
        return (skipCount && maxItems) ? Math.floor(skipCount / maxItems) : 0;
    }

    get supportedPageSizes(): number[] {
        return this.userPreferences.getDefaultPageSizes();
    }
}
