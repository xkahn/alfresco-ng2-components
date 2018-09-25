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
import { Observable, of } from 'rxjs';
import { IconModel } from './icon.model';
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
    public static DEFAULT_THEME: string = 'theme-2';
    public static DEFAULT_ICON: string = 'glyphicon-asterisk';

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

    /** Emitted when an error occurs. */
    @Output()
    error: EventEmitter<any> = new EventEmitter<any>();

    apps$: Observable<any>;

    currentApp: ApplicationInstanceModel;

    private iconsMDL: IconModel;

    loading: boolean = false;

    hasEmptyCustomContentTemplate: boolean = false;

    constructor(private appsProcessCloudService: AppsProcessCloudService) { }

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
        this.appsProcessCloudService.getDeployedApplications().subscribe(
            (response: ApplicationInstanceModel[]) => {
                this.apps$ = of(this.createApplicationInstances(response));
                this.loading = false;
            },
            (err) => {
                this.error.emit(err);
                this.loading = false;
            }
        );
    }

    createApplicationInstances(response: ApplicationInstanceModel[]): ApplicationInstanceModel[] {
        let applications: ApplicationInstanceModel[] = [];
        if (response && response.length > 0) {
            applications = response.map((application: ApplicationInstanceModel) => {
                application.theme = AppsListCloudComponent.DEFAULT_THEME;
                application.icon = AppsListCloudComponent.DEFAULT_ICON;
                return application;
            });
        }
        return applications;
    }

    getAppName(app) {
        return app ? app.name : '';
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
     * Return true if the appId is the current app
     * @param appId
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

    isEmpty(apps: any): boolean {
        return apps.length === 0;
    }

    isLoading(): boolean {
        return this.loading;
    }

    getTheme(app: ApplicationInstanceModel): string {
        return app.theme ? app.theme : '';
    }

    getBackgroundIcon(app: ApplicationInstanceModel): string {
        return this.iconsMDL.mapGlyphiconToMaterialDesignIcons(app.icon);
    }
}
