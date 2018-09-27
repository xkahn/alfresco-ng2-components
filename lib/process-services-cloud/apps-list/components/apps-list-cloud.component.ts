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

import { EmptyCustomContentDirective } from '@alfresco/adf-core';
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ContentChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AppsProcessCloudService } from '../services/apps-process-cloud.service';
import { ApplicationInstanceModel } from '../model/application-instance.model';

@Component({
    selector: 'adf-apps-list-cloud',
    templateUrl: './apps-list-cloud.component.html',
    styleUrls: ['./apps-list-cloud.component.scss']
})
export class AppsListCloudComponent implements OnInit, AfterContentInit {

    public static LAYOUT_LIST: string = 'LIST';
    public static LAYOUT_GRID: string = 'GRID';

    @ContentChild(EmptyCustomContentDirective)
    emptyCustomContent: EmptyCustomContentDirective;

    /** (**required**) Defines the layout of the apps. There are two possible
     * values, "GRID" and "LIST".
     */
    @Input()
    layoutType: string = AppsListCloudComponent.LAYOUT_GRID;

    /** Emitted when an app entry is clicked. */
    @Output()
    appClick: EventEmitter<ApplicationInstanceModel> = new EventEmitter<ApplicationInstanceModel>();

    apps$: Observable<any>;

    currentApp: ApplicationInstanceModel;

    hasEmptyCustomContentTemplate: boolean = false;

    constructor(private appsProcessCloudService: AppsProcessCloudService) { }

    ngOnInit() {
        if (!this.isValidType()) {
            this.setDefaultLayoutType();
        }

        this.load();
    }

    ngAfterContentInit() {
        if (this.emptyCustomContent) {
            this.hasEmptyCustomContentTemplate = true;
        }
    }

    private load() {
        this.apps$ = this.appsProcessCloudService.getDeployedApplications();
    }

    /**
     * Pass the selected app as next
     * @param app
     */
    public selectApp(app: ApplicationInstanceModel) {
        this.currentApp = app;
        this.appClick.emit(app);
    }

    /**
     * Return true if the applicationName is the current app
     * @param applicationName
     */
    isSelected(applicationName: string): boolean {
        return (this.currentApp !== undefined && applicationName === this.currentApp.name);
    }

    /**
     * Check if the value of the layoutType property is an allowed value
     */
    isValidType(): boolean {
        if (this.layoutType && (this.layoutType === AppsListCloudComponent.LAYOUT_LIST || this.layoutType === AppsListCloudComponent.LAYOUT_GRID)) {
            return true;
        }
        return false;
    }

    /**
     * Assign the default value to LayoutType
     */
    setDefaultLayoutType(): void {
        this.layoutType = AppsListCloudComponent.LAYOUT_GRID;
    }

    /**
     * Return true if the layout type is LIST
     */
    isList(): boolean {
        return this.layoutType === AppsListCloudComponent.LAYOUT_LIST;
    }

    /**
     * Return true if the layout type is GRID
     */
    isGrid(): boolean {
        return this.layoutType === AppsListCloudComponent.LAYOUT_GRID;
    }
}
