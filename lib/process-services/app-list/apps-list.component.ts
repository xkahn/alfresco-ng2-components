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

import { AppsProcessService, EmptyCustomContentDirective } from '@alfresco/adf-core';
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ContentChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppDefinitionRepresentationModel } from '../task-list';
import { IconModel } from './icon.model';

@Component({
    selector: 'adf-apps',
    templateUrl: 'apps-list.component.html',
    styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent implements OnInit, AfterContentInit {

    public static LAYOUT_LIST: string = 'LIST';
    public static LAYOUT_GRID: string = 'GRID';
    public static DEFAULT_TASKS_APP: string = 'tasks';
    public static DEFAULT_TASKS_APP_NAME: string = 'ADF_TASK_LIST.APPS.TASK_APP_NAME';
    public static DEFAULT_TASKS_APP_THEME: string = 'theme-2';
    public static DEFAULT_TASKS_APP_ICON: string = 'glyphicon-asterisk';
    public static DEFAULT_TASKS_APP_MATERIAL_ICON: string = 'favorite_border';

    @ContentChild(EmptyCustomContentDirective)
    emptyCustomContent: EmptyCustomContentDirective;

    /** (**required**) Defines the layout of the apps. There are two possible
     * values, "GRID" and "LIST".
     */
    @Input()
    layoutType: string = AppsListComponent.LAYOUT_GRID;

    /** Provides a way to filter the apps to show. */
    @Input()
    filtersAppName: any[];

    /** Emitted when an app entry is clicked. */
    @Output()
    appClick: EventEmitter<AppDefinitionRepresentationModel> = new EventEmitter<AppDefinitionRepresentationModel>();

    /** Emitted when an error occurs. */
    @Output()
    error: EventEmitter<any> = new EventEmitter<any>();

    apps$: Observable<any>;

    currentApp: AppDefinitionRepresentationModel;

    private iconsMDL: IconModel;

    loading: boolean = false;

    hasEmptyCustomContentTemplate: boolean = false;

    constructor(
        private appsProcessService: AppsProcessService) {
    }

    ngOnInit() {
        if (!this.isValidType()) {
            this.setDefaultLayoutType();
        }

        this.iconsMDL = new IconModel();
        this.load();
    }

    ngAfterContentInit() {
        if (this.emptyCustomContent) {
            this.hasEmptyCustomContentTemplate = true;
        }
    }

    private load() {
        this.loading = true;
        this.appsProcessService.getDeployedApplications().subscribe(
            (response: any) => {
                const applications: any = [];
                this.filterApps(response).forEach(app => {
                        const application = new AppDefinitionRepresentationModel(app);
                        application.theme = AppsListComponent.DEFAULT_TASKS_APP_THEME;
                        application.icon = AppsListComponent.DEFAULT_TASKS_APP_ICON;
                        applications.push(application);
                    });
                this.apps$ = of(applications);
                this.loading = false;
            },
                (err) => {
                    this.error.emit(err);
                    this.loading = false;
                }
        );
    }

    getAppName(app) {
        return app ? app.name : '';
    }

    /**
     * Pass the selected app as next
     * @param app
     */
    public selectApp(app: AppDefinitionRepresentationModel) {
        this.currentApp = app;
        this.appClick.emit(app);
    }

    /**
     * Return true if the appId is the current app
     * @param appId
     */
    isSelected(applicationName: string): boolean {
        return (this.currentApp !== undefined && applicationName === this.currentApp.name);
    }

    private filterApps(apps: AppDefinitionRepresentationModel[]): AppDefinitionRepresentationModel[] {
        let filteredApps: AppDefinitionRepresentationModel[] = [];
        if (this.filtersAppName) {
            apps.filter((app: AppDefinitionRepresentationModel) => {
                this.filtersAppName.forEach((filter) => {
                    if (app.name === filter.name) {
                        filteredApps.push(app);
                    }
                });
            });
        } else {
            return apps;
        }
        return filteredApps;
    }

    /**
     * Check if the value of the layoutType property is an allowed value
     */
    isValidType(): boolean {
        if (this.layoutType && (this.layoutType === AppsListComponent.LAYOUT_LIST || this.layoutType === AppsListComponent.LAYOUT_GRID)) {
            return true;
        }
        return false;
    }

    /**
     * Assign the default value to LayoutType
     */
    setDefaultLayoutType(): void {
        this.layoutType = AppsListComponent.LAYOUT_GRID;
    }

    /**
     * Return true if the layout type is LIST
     */
    isList(): boolean {
        return this.layoutType === AppsListComponent.LAYOUT_LIST;
    }

    /**
     * Return true if the layout type is GRID
     */
    isGrid(): boolean {
        return this.layoutType === AppsListComponent.LAYOUT_GRID;
    }

    isEmpty(apps: any): boolean {
        return apps.length === 0;
    }

    isLoading(): boolean {
        return this.loading;
    }

    getTheme(app: AppDefinitionRepresentationModel): string {
        return app.theme ? app.theme : '';
    }

    getBackgroundIcon(app: AppDefinitionRepresentationModel): string {
        return this.iconsMDL.mapGlyphiconToMaterialDesignIcons(app.icon);
    }
}
